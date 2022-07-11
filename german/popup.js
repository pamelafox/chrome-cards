/* global CARDS_PREFIX, CARDS_DATA, YAHOO, accentFold */
// Local storage keys
var LS_INIT = 'initialized';
var LS_BUCKET = 'bucket';
var LS_LASTASKED = 'last-asked';
var LS_SPACEPRESSED = 'space-pressed';
var LS_NUMPRESSED = 'num-pressed';
var LS_MODE = 'answer-mode'
// Number of milliseconds in a day
var DAY_MS = 86400000;

// Country data keyed by country code
var cardsData = {};
var cardsCategories = {};
var currentCard;
var autoComplete;

async function set(items) {
  for (const key in items) {
    items[CARDS_PREFIX + key] = items[key];
    delete items[key];
  }
  await chrome.storage.local.set(items);
}

async function get(key) {
  const result = await chrome.storage.local.get(CARDS_PREFIX + key)  
  return result[CARDS_PREFIX + key]; 
}

async function initBuckets() {
  // Start everything in bucket 1
  var bucket1 = [];
  for (var i = 0; i < CARDS_DATA.length; i++) {
    var datum = CARDS_DATA[i];
    // Use '0' to represent never asked
    bucket1.push({'id': datum.id, 'lastAsked': 0});
  }
  const items = {};
  items[LS_BUCKET + 1] = bucket1;
  items[LS_BUCKET + 2] = [];
  items[LS_BUCKET + 3] = [];
  items[LS_BUCKET + 4] = [];
  items[LS_BUCKET + 5] = [];
  items[LS_INIT] = 'true';
  await set(items);
}
 
async function pickNextCard() {
  // Create an array of eligible cards
  var eligibleCards = [];
  
  // Everything from bucket 1 goes in
  // For the other buckets, it depends on when they were last asked and the bucket num
  async function getBucketCards(bucketNum, numDays) {
    var bucket = await get(LS_BUCKET + bucketNum);
    var currentTime = (new Date()).getTime();
    var eligibleCards = [];
    for (var i = 0; i < bucket.length; i++) {
      var datum = bucket[i];
      datum.bucketNum = bucketNum;
      if (numDays == 0 || ((currentTime - datum.lastAsked) > DAY_MS * numDays)) {
        if (!currentCard || (currentCard.id != datum.id)) {
          eligibleCards.push(datum);
        }
      }
    }
    return eligibleCards;
  }
  
  var counter = 0;
  var days = [0, 1, 3, 7, 28];
  while (eligibleCards.length == 0 && counter < 5) {
    eligibleCards = eligibleCards.concat(await getBucketCards(1, days[0]));
    eligibleCards = eligibleCards.concat(await getBucketCards(2, days[1])); // 0 on iteration 1
    eligibleCards = eligibleCards.concat(await getBucketCards(3, days[2])); // 0 on iteration 2
    eligibleCards = eligibleCards.concat(await getBucketCards(4, days[3])); // 0 on iteration 3
    eligibleCards = eligibleCards.concat(await getBucketCards(5, days[4])); // 0 on iteration 4
    days.unshift(0);
    counter++;
  }
  
  // Now, pick a random one
  var randomNum = Math.floor(Math.random() * eligibleCards.length);
  currentCard = eligibleCards[randomNum];
  
}

function hideAll() {
  getById('front').style.display = 'none';
  getById('back').style.display = 'none';
  getById('stats').style.display = 'none';
  getById('options').style.display = 'none';
  getById('statslink').style.display = 'none';
  getById('cardlink').style.display = 'none';
  getById('footer-cancellink').style.display = 'none';
}

function getById(id) {
  return document.getElementById(id);
}

function trim(str, chars) {
  return ltrim(rtrim(str, chars), chars);
}
 
function ltrim(str, chars) {
  chars = chars || "\\s";
  return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
function rtrim(str, chars) {
  chars = chars || "\\s";
  return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

function openLink(url) {
  chrome.tabs.create({url: url})
}

async function changeMode(e) {
  var mode = e.target.value;
  await set({[LS_MODE]: mode});  
  await showNextCard();
}

async function showNextCard() {
  await pickNextCard();
  var cardData = cardsData[currentCard.id];
  if (!cardData) await pickNextCard(); // Just in case
  
  var choices = [];
  choices.push(cardData.answer)
  
  // Tend to ask from ones in the category, more confusing
  var eligibleIds = cardsCategories[cardData.category].slice(0);
  // TODO: At random, put all IDs in there too
  var counter = 0;
  while (choices.length < 3 && counter < 5) {
    var randomNum = Math.floor(Math.random() * eligibleIds.length);
    var eligibleId = eligibleIds[randomNum];
    if (eligibleId != currentCard.id) {
      choices.push(cardsData[eligibleId].answer);
    }
    eligibleIds.splice(randomNum, 1);
    counter++;
  }
  
  // Randomize order of choices
  function randOrd(){
    return (Math.round(Math.random())-0.5);
  }
  choices.sort(randOrd);
 
  getById('front-question').innerHTML = cardData.question;
  const mode = await get(LS_MODE); 
  if (mode == 'multiple-choice') {
    for (var i = 0; i < choices.length; i++) {
      getById('front-button' + (i + 1)).innerHTML = choices[i];
      getById('front-button' + (i + 1)).onclick = showAnswer;
    }
    getById('front-typein').style.display = 'none';
    getById('front-multiplechoice').style.display = 'block';
  } else {
    getById('front-input').value = '';
    getById('front-typein').style.display = 'block';
    getById('front-multiplechoice').style.display = 'none';
    
    if (mode == 'autocomplete') {
      if (!autoComplete) {
        var autoCompleteOptions = [];
        for (var cardId in cardsData) {
          autoCompleteOptions.push({'answer': cardsData[cardId].answer,
                                    'search': accentFold(cardsData[cardId].answer)});
        }
      
        var dataSource = new YAHOO.util.LocalDataSource(autoCompleteOptions); 
        dataSource.responseSchema = {fields : ["answer", "search"]};
        autoComplete = new YAHOO.widget.AutoComplete("front-input", "front-autocomplete", dataSource); 
        autoComplete.autoHighlight = false;
        autoComplete.queryMatchCase = false;
        autoComplete.queryMatchContains = true;  
        autoComplete.maxResultsDisplayed = 5;
        autoComplete.filterResults = function(q, entries, resultObj) {
            var matches = [];
            var re = new RegExp('\\b'+accentFold(q).replace('%20','\\s'), 'i');
            for (var i = 0; i < entries.length; i++) {
                if (re.test(entries[i]['search'])) {
                    matches.push(entries[i]);
                }
            }
            resultObj.results = matches;
            return resultObj;
        };
        
        // For some reason, we need to fake it out to get it to work the first time
        window.setTimeout(function() { 
          hideAll();
          getById('back').style.display = 'block';
          hideAll();
          getById('front').style.display = 'block';
        }, 2000)
        
      } else {
        autoComplete.collapseContainer();
      }
    } else {
      if (autoComplete) {
        autoComplete.destroy();
        autoComplete = null;
      }
    }
  }
  
  getById('front-note').style.display = 'none';
  if (mode == 'multiple-choice' && !await get(LS_NUMPRESSED)) {
    getById('front-note').style.display = 'block';
  }
  
  hideAll();
  getById('front').style.display = 'block';
  getById('statslink').style.display = 'block';
  if (mode != 'multiple-choice') {
    getById('front-input').focus();
  }
}


async function showAnswer(e) {
  if (!e) return;
  
  var answer = e.target.innerHTML;
  var cardData = cardsData[currentCard.id];
  
  var cardStats = await get(currentCard.id);
  if (!cardStats) {
    cardStats = {
      lastAsked: null,
      timesAsked: 0,
      timesCorrect: 0,
      timesIncorrect: 0
    };
  }
  cardStats.lastAsked = new Date().getTime();
  cardStats.timesAsked++;

  let bucketNum, imgUrl, color, text; 
  if ((answer == cardData.answer) || 
      ((await get(LS_MODE) != 'multiple-choice') && accentFold(answer).toLowerCase() == accentFold(cardData.answer).toLowerCase())) {
    // Move to next bucket - max is bucket 5
    bucketNum = Math.min((currentCard.bucketNum + 1), 5);
    cardStats.timesCorrect++;
    // Show happy message
    imgUrl = 'smiley.png';
    color = '#00c62a';
    text = 'Yay, you got it!'; //TODO randomize
  } else {
    // Send back to bucket 1
    bucketNum = 1
    // Increment incorrect counter
    cardStats.timesIncorrect++;
    // Show sad message
    imgUrl = 'frowney.png';
    color = 'red';
    text = 'Better luck next time!';
  }
  
  // Remove from current bucket
  var bucketCurrent = await get(LS_BUCKET + currentCard.bucketNum);
  for (var i = 0; i < bucketCurrent.length; i++) {
    if (bucketCurrent[i].id == currentCard.id) {
      bucketCurrent.splice(i, 1);
    }
  }
  // Add to new bucket
  var bucketNew = await get(LS_BUCKET + bucketNum);
  currentCard.lastAsked = (new Date()).getTime();
  bucketNew.push(currentCard);

  await set({
       // Save current bucket (with card removed)
       [LS_BUCKET + currentCard.bucketNum]: bucketCurrent,
       // Save new bucket (with card added_
       [LS_BUCKET + bucketNum]: bucketNew,
       // Save latest card statistics
       [currentCard.id]: cardStats,
       // Save last asked
       [LS_LASTASKED]: (new Date()).getTime()
      });
  
  // Show stuff
  getById('back-result').style.backgroundColor = color;
  getById('back-smiley').src = imgUrl;
  getById('back-message').innerHTML = text;
  
  if (cardData.answerlong) {
    getById('back-answerlong').innerHTML = cardData.answerlong;
  } else {
    getById('back-answerlong').innerHTML = 'The correct answer is: <b>' + cardData.answer + '</b>';
  }
  
  getById('back-correct').innerHTML = cardStats.timesCorrect;
  getById('back-total').innerHTML = cardStats.timesAsked;
  
  if (cardData.answerimage) {
    getById('back-info').style.float = 'left';
    getById('back-info').style.width = '250px';
    getById('back-img').src = cardData.answerimage;
    getById('back-attribution').innerHTML = cardData.attribution || '';
    getById('back-img').style.display = 'block';
    if (cardData.answerimagelink) {
      getById('back-img').onclick = function() { 
        openLink(cardData.answerimagelink);
      };
    }
  } else {
    getById('back-img').style.display = 'none';
  }
  
  getById('back-nextbutton').onclick = function() {
    showNextCard();
  };
  
  getById('back-note').style.display = 'none';
  if (!get(LS_SPACEPRESSED)) {
    getById('back-note').style.display = 'block';
  }
  
  hideAll();
  getById('back').style.display = 'block';
  getById('statslink').style.display = 'block';
  chrome.action.setBadgeText({text: ''});
}

async function showStats() {
  // Get a local copy of buckets
  var buckets = [];
  for (let i = 0; i < 5; i++) {
    buckets[i] = await get(LS_BUCKET + (i+1));
  }
  
  // Go through bucket 1, figure out how many are unanswered
  var numUnasked = 0;
  for (let i = (buckets[0].length -1); i >= 0; i--) {
    if (buckets[0][i].lastAsked == 0) {
      numUnasked++;
      buckets[0].splice(i, 1);
    } 
  }
  
  var bucketLengths = [];
  var numAsked = 0;
  for (var i = 0; i < buckets.length; i++) {
    bucketLengths.push(buckets[i].length);
    numAsked += buckets[i].length;
  }
  
  var chartUrl = 'https://chart.googleapis.com/chart?cht=bhs&chs=200x140&chd=t:' + bucketLengths.join(',') + '&chco=FF0000|ff9c00|ffea00|ccff00|0ade00&chm=N,000000,0,-1,11';
  
  getById('stats-unasked-note').style.display = 'none';
  if (numUnasked > 0) {
    getById('stats-unasked').innerHTML = numUnasked;
    getById('stats-unasked-note').style.display = 'block';
  }
  getById('stats-asked').innerHTML = numAsked;
  getById('stats-chart').src = chartUrl;
  getById('stats-leitnerlink').onclick = function() {
    openLink('http://en.wikipedia.org/wiki/Leitner_system');
  }
  
  hideAll();
  getById('stats').style.display = 'block';
  getById('cardlink').style.display = 'block';
}

async function showOptions() {
  var modeOptions = getById('options').getElementsByTagName('input');
  var currentMode = await get(LS_MODE);
  for (var i = 0; i < modeOptions.length; i++) {
    modeOptions[i].onclick = changeMode;
    if (modeOptions[i].value == currentMode) {
      modeOptions[i].checked = true;
    }
  }
  
  hideAll();
  getById('options').style.display = 'block';
  getById('footer-cancellink').style.display = 'block';
}

async function init() {
  getById('footer').style.display = 'block';
  
  if (!(await get(LS_INIT))) {
    initBuckets();
  }
  
  if(!(await get(LS_MODE))) {
    set({[LS_MODE]: 'multiple-choice'});
  }
  
  for (var i = 0; i < CARDS_DATA.length; i++) {
    var datum = CARDS_DATA[i];
    cardsData[datum.id] = datum;
    cardsData[datum.id].answer = trim(datum.answer);
    if (!datum.category) {
      datum.category = 'all';
    }
    if (!cardsCategories[datum.category]) {
      cardsCategories[datum.category] = [];
    }
    cardsCategories[datum.category].push(datum.id);
  }
  
  await showNextCard();
  
  document.onkeyup = async function(e) {
    if (getById('back').style.display == 'block') {
      if (e.keyCode == 78 || e.keyCode == 32 || e.keyCode == 13) {
        showNextCard();
        set({[LS_SPACEPRESSED]: 'true'});
        return;
      }
    }
    
    if (getById('front').style.display == 'block') {
      if (await get(LS_MODE) == 'multiple-choice') {
        if (e.keyCode == 49) { // 1
          set({[LS_NUMPRESSED]: 'true'});
          getById('front-button1').onclick({target:getById('front-button1')});
        } else if (e.keyCode == 50) { // 2
          set({[LS_NUMPRESSED]: 'true'});
          getById('front-button2').onclick({target:getById('front-button2')});
        } else if (e.keyCode == 51) { // 3
          set({[LS_NUMPRESSED]: 'true'});
          getById('front-button3').onclick({target:getById('front-button3')});
        }
      } else {
        if (e.keyCode == 13 ) { // Enter
          showAnswer({target: {innerHTML: getById('front-input').value}});
        }
      }
      return;
    }
  };

  document.getElementById('footer-options').addEventListener('click', showOptions);
  document.getElementById('cancellink-click').addEventListener('click', showNextCard);
  document.getElementById('statslink-click').addEventListener('click', showStats);
  document.getElementById('cardlink-click').addEventListener('click', showNextCard);
}

init();
