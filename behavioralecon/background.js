var LS_LASTASKED = 'last-asked';
var DAY_MS = 86400000;
var DAY_MS = 60;
  
function sync() {
    chrome.storage.local.get([LS_LASTASKED], function(result) {
       var lastAsked = result[LS_LASTASKED];
       if (lastAsked) {
         var rightNow = (new Date()).getTime();
         var timeDiff = (rightNow - lastAsked);
         if (timeDiff > DAY_MS) {
           chrome.action.setBadgeBackgroundColor({color:[0, 0, 0, 255]});
           var numDays = Math.floor(timeDiff/DAY_MS);
           chrome.action.setBadgeText({text: numDays + ''});
        }
      }
   });
}
  
// Once an hour, check if it's been too long
sync();
chrome.alarms.create('check-inactivity', {periodInMinutes: 60});
chrome.alarms.onAlarm.addListener(sync);
