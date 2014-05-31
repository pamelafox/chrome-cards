// Local storage keys
var LS_INIT = 'initialized';
var LS_BUCKET = 'bucket';
var LS_LASTASKED = 'last-asked';
var LS_SPACEPRESSED = 'space-pressed';
var LS_NUMPRESSED = 'num-pressed';
var LS_MODE = 'answer-mode'
// Number of milliseconds in a day
var DAY_MS = 86400000;

var CARDS_PREFIX = 'pics';
var CARDS_DATA = [];

var cardsData = {};
var cardsCategories = {};
var currentCard;
var autoComplete;

function set(key, value) {
  lscache.set(CARDS_PREFIX + key, value);
}

function get(key) {
  return lscache.get(CARDS_PREFIX + key)  
}

function initBuckets() {
  // Start everything in bucket 1
  var bucket1 = [];
  for (var i = 0; i < CARDS_DATA.length; i++) {
    var datum = CARDS_DATA[i];
    // Use '0' to represent never asked
    bucket1.push({'id': datum.id, 'lastAsked': 0});
  }
  set(LS_BUCKET + 1, bucket1);
  set(LS_BUCKET + 2, []);
  set(LS_BUCKET + 3, []);
  set(LS_BUCKET + 4, []);
  set(LS_BUCKET + 5, []);
  set(LS_INIT, 'true')
}
 
function pickNextCard() {
  // Create an array of eligible cards
  var eligibleCards = [];
  
  // Everything from bucket 1 goes in
  // For the other buckets, it depends on when they were last asked and the bucket num
  function getBucketCards(bucketNum, numDays) {
    var bucket = get(LS_BUCKET + bucketNum);
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
    eligibleCards = eligibleCards.concat(getBucketCards(1, days[0]));
    eligibleCards = eligibleCards.concat(getBucketCards(2, days[1])); //0 on iteration 1
    eligibleCards = eligibleCards.concat(getBucketCards(3, days[2])); // 0 on iteration 2
    eligibleCards = eligibleCards.concat(getBucketCards(4, days[3])); // 0 on iteration 3
    eligibleCards = eligibleCards.concat(getBucketCards(5, days[4])); // 0 on iteration 4
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

function changeMode(e) {
  var mode = e.target.value;
  set(LS_MODE, mode);  
  showNextCard();
}

function showNextCard() {
  pickNextCard();
  var cardData = cardsData[currentCard.id];
  if (!cardData) pickNextCard(); //Just in case
  
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
 
 
  getById('front-question').innerHTML = '<img src="' + cardData.question + '">';
  
  if (get(LS_MODE)=='multiple-choice') {
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
    
    if (get(LS_MODE) == 'autocomplete') {
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
        autoComplete.filterResults = function(q, entries, resultObj, cb) {
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
  if (!get(LS_NUMPRESSED)) {
    getById('front-note').style.display = 'block';
  }
  
  hideAll();
  getById('front').style.display = 'block';
  getById('statslink').style.display = 'block';
}


function showAnswer(e) {
  if (!e) return;
  
  var answer = e.target.innerHTML;
  var cardData = cardsData[currentCard.id];
  
  var cardStats = get(currentCard.id);
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
  
  if ((answer == cardData.answer) || 
      ((get(LS_MODE) != 'multiple-choice') && accentFold(answer).toLowerCase() == accentFold(cardData.answer).toLowerCase())) {
    // Move to next bucket - max is bucket 5
    var bucketNum = Math.min((currentCard.bucketNum + 1), 5);
    cardStats.timesCorrect++;
    // Show happy message
    var imgUrl = 'smiley.png';
    var color = '#00c62a';
    var text = 'Yay, you got it!'; //TODO randomize
  } else {
    // Send back to bucket 1
    var bucketNum = 1
    // Increment incorrect counter
    cardStats.timesIncorrect++;
    // Show sad message
    var imgUrl = 'frowney.png';
    var color = 'red';
    var text = 'Better luck next time!';
  }
  
  // Remove from current bucket
  var bucket = get(LS_BUCKET + currentCard.bucketNum);
  for (var i = 0; i < bucket.length; i++) {
    if (bucket[i].id == currentCard.id) {
      bucket.splice(i, 1);
    }
  }
  set(LS_BUCKET + currentCard.bucketNum, bucket);
  
  // Add to new bucket
  var bucket = get(LS_BUCKET + bucketNum);
  currentCard.lastAsked = (new Date()).getTime();
  bucket.push(currentCard);
  set(LS_BUCKET + bucketNum, bucket);
  
  // Save latest card statistics
  set(currentCard.id, cardStats);

  // Save last asked
  set(LS_LASTASKED, (new Date()).getTime());
  
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
  chrome.browserAction.setBadgeText({text: ''});
}

function showStats() {
  // Get a local copy of buckets
  var buckets = [];
  for (var i = 0; i < 5; i++) {
    buckets[i] = get(LS_BUCKET + (i+1));
  }
  
  // Go through bucket 1, figure out how many are unanswered
  var numUnasked = 0;
  for (var i = (buckets[0].length -1); i >= 0; i--) {
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
  
  var width1
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

function showOptions() {
  var modeOptions = getById('options').getElementsByTagName('input');
  var currentMode = get(LS_MODE);
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

function init() {
  getById('footer').style.display = 'block';
  
  if (!get(LS_INIT)) {
    initBuckets();
  }
  
  if(!get(LS_MODE)) {
    set(LS_MODE, 'multiple-choice');
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
  
  showNextCard();
  
  document.onkeyup = function(e) {
    var e=window.event || e;
    if (getById('back').style.display == 'block') {
      if (e.keyCode == 78 || e.keyCode == 32 || e.keyCode == 13) {
        showNextCard();
        set(LS_SPACEPRESSED, 'true');
        return;
      }
    }
    
    if (getById('front').style.display == 'block') {
      if (get(LS_MODE)=='multiple-choice') {
        if (e.keyCode == 49) { // 1
          set(LS_NUMPRESSED, 'true');
          getById('front-button1').onclick({target:getById('front-button1')});
        } else if (e.keyCode == 50) { // 2
          set(LS_NUMPRESSED, 'true');
          getById('front-button2').onclick({target:getById('front-button2')});
        } else if (e.keyCode == 51) { // 3
          set(LS_NUMPRESSED, 'true');
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

var onDataLoad = function(json) {
  CARDS_DATA = [];

  var getRowData = function(row, name) {
    return (row['gsx$' + name] && row['gsx$' + name].$t) || null;
  }

  var entries = json.feed.entry;
  for (var i = 0; i < entries.length; i++) {
     var row = entries[i];
     CARDS_DATA.push({id: getRowData(row, 'id'),
                      category: getRowData(row, 'category'),
                      question: getRowData(row, 'question'),
                      answer: getRowData(row, 'answer'),
                      answerlong: getRowData(row, 'answerlong')});
  }
  init();
};

var getData = function() {
  var scr = document.createElement('script');
  scr.src = 'https://spreadsheets.google.com/feeds/list/1FPEIXdK-aN1GIyiQ_Q2oyp4rvXWOqHf1KJnyA2HKGMg/od6/public/values?'
    + 'alt=json-in-script&callback=onDataLoad';
  document.getElementsByTagName('head')[0].appendChild(scr);
};

getData();
