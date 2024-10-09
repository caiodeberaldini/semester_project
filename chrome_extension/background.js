let color = '#3aa757';
let chatButton = document.getElementById("chatButton")
chrome.runtime.onInstalled.addListener(() => {
chrome.storage.sync.set({ color });
console.log('Default background color set to %cgreen', `color: ${color}`);
});

// chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
//   if (!tab.url) return;
//   const url = new URL(tab.url);
//   // Enables the side panel on google.com
//   if (url.origin === GOOGLE_ORIGIN) {
//     await chrome.sidePanel.setOptions({
//       tabId,
//       path: 'sidepanel.html',
//       enabled: true
//     });
//   } else {
//     // Disables the side panel on all other sites
//     await chrome.sidePanel.setOptions({
//       tabId,
//       enabled: false
//     });
//   }
// });

chrome.webNavigation.onCompleted.addListener(
    async () => {
        await chrome.tabs.query({
                active: true, 
                lastFocusedWindow: true
            }, (tabs) => {
                let tab = tabs[0];
                let tabURL = tab.url;
                if (tabURL.includes("https://github.com/")){
                    chrome.scripting.executeScript({
                        function: showButton,
                    })
                }
            }
        )
        
        const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
        console.log(tab.url);
    },
);

function showButton(){
    document.getElementById("chatButton").style.display = "block";
}