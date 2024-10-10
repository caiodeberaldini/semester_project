fetch(chrome.runtime.getURL('template.html'))
    .then(response => response.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Extract <link> tags from the <template.html> head section and move them to the actual document head
        const linkElements = doc.querySelectorAll('link[rel="stylesheet"]');
        linkElements.forEach(link => document.head.appendChild(link));

        const container = document.createElement('div');
        container.innerHTML = doc.body.innerHTML;
        document.body.appendChild(container);

        const chatPopup = document.getElementById("chatButton");
        const cancelBtn = document.getElementById("cancelBtn");

        chatPopup.addEventListener('click', () =>{
            chrome.runtime.sendMessage({message: "extract"}, (response) => {
                const apiURL = "http://localhost:5000/repo_structure?url=" + response.url;
                fetch(apiURL);
            });
            openForm();
        });
        
        cancelBtn.addEventListener('click', async () => {
            closeForm();
        });        
});

function openForm(){
    document.getElementById("myForm").style.display = 'block';
};
function closeForm(){
    document.getElementById("myForm").style.display = 'none';
};