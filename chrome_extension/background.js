let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
    console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (request.message === "extract"){
            chrome.tabs.query({
                    active: true,
                    currentWindow: true
                }, (tabs) => {
                    const tab = tabs[0];
                    const tabURL = tab.url;
                    sendResponse({ url: tabURL });
                }
            );
            return true;
        }
    }
);