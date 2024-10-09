// Initialize button with user’s preferred color
let changeColor = document.getElementById("changeColor");
let elementURL = document.getElementById("URL");
let sendInfo = document.getElementById("sendUrlInfo");
let chat = document.getElementById("chat");
var reset = false;
chrome.storage.sync.get("color", ({color}) => {
    changeColor.style.backgroundColor = color;
});

chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, (tabs) => {
        let tab = tabs[0];
        let tabURL = tab.url;
        if (tabURL.includes("https://github.com/")){
            elementURL.innerText = "URL: \n" + tabURL;
        }
    }
);

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        args: [reset],
        target: {tabId: tab.id},
        function: setPageBackgroundColor,
    })
    if (! reset){
        reset = true;
    } else {
        reset = false;
    }
});

sendInfo.addEventListener("click", async () => {
    await chrome.tabs.query({
            active: true,
            currentWindow: true
        }, (tabs) => {
            let tab = tabs[0];
            let tabURL = tab.url;
            if (tabURL.includes("https://github.com/")){
                let apiURL = "http://localhost:5000/repo_structure?url=" + tabURL;
                fetch(apiURL)            
            }
        }
    );
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor(reset) {
    chrome.storage.sync.get("color", ({color}) => {
        if (!(reset)){
            document.body.style.backgroundColor = color;
        } else {
            document.body.style.backgroundColor = '#FFFFFF';
        }
    });
}