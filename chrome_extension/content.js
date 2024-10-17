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

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = chrome.runtime.getURL('assets/css/boxicons.min.css');
        document.head.appendChild(link);

        // MESSAGE INPUT
        const textarea = document.querySelector('.chatbox-message-input');
        const chatboxForm = document.querySelector('.chatbox-message-form');

        textarea.addEventListener('input', function () {
            let line = textarea.value.split('\n').length;

            if(textarea.rows < 6 || line < 6) {
                textarea.rows = line;
            }

            if(textarea.rows > 1) {
                chatboxForm.style.alignItems = 'flex-end';
            } else {
                chatboxForm.style.alignItems = 'center';
            }
        })

        // TOGGLE CHATBOX
        const chatboxToggle = document.querySelector('.chatbox-toggle');
        const chatboxMessage = document.querySelector('.chatbox-message-wrapper');

        chatboxToggle.addEventListener('click', function () {
            // chrome.runtime.sendMessage({message: "extract"}, (response) => {
            //     const apiURL = "http://localhost:5000/repo_structure?url=" + response.url;
            //     fetch(apiURL);
            // });
            chatboxMessage.classList.toggle('show');
        })

        // DROPDOWN TOGGLE
        const dropdownToggle = document.querySelector('.chatbox-message-dropdown-toggle');
        const dropdownMenu = document.querySelector('.chatbox-message-dropdown-menu');

        dropdownToggle.addEventListener('click', function () {
            dropdownMenu.classList.toggle('show');
        })

        document.addEventListener('click', function (e) {
            if(!e.target.matches('.chatbox-message-dropdown, .chatbox-message-dropdown *')) {
                dropdownMenu.classList.remove('show');
            }
        })


        // CHATBOX MESSAGE
        const chatboxMessageWrapper = document.querySelector('.chatbox-message-content');
        const chatboxNoMessage = document.querySelector('.chatbox-message-no-message');

        chatboxForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if(isValid(textarea.value)) {
                writeMessage();
                setTimeout(autoReply, 1000);
            }
        })


        function writeMessage() {
            const today = new Date()
            // let message = `
            //     <div class="chatbox-message-item sent">
            //         <span class="chatbox-message-item-text">
            //             ${textarea.value.trim().replace(/\n/g, '<br>\n')}
            //         </span>
            //         <span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
            //     </div>
            // `
            let message = `
                <div class="chatbox-message-item sent">
                    <span class="chatbox-message-item-text">
                        ${textarea.value.trim().replace(/\n/g, '<br>\n')}
                    </span>
                    <span class="chatbox-message-item-time"></span>
                </div>
            `;
            chatboxMessageWrapper.insertAdjacentHTML('beforeend', message);
            chatboxForm.style.alignItems = 'center';
            textarea.rows = 1;
            textarea.focus();
            textarea.value = '';
            chatboxNoMessage.style.display = 'none';
            scrollBottom();
        }
        
        function autoReply() {
            const today = new Date()
            // let message = `
            //     <div class="chatbox-message-item received">
            //         <span class="chatbox-message-item-text">
            //             Thank you for your awesome support!
            //         </span>
            //         <span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
            //     </div>
            // `
            let message = `
                <div class="chatbox-message-item received">
                    <span class="chatbox-message-item-text">
                        Thank you for your awesome support!
                    </span>
                    <span class="chatbox-message-item-time"></span>
                </div>
            `;
            chatboxMessageWrapper.insertAdjacentHTML('beforeend', message);
            scrollBottom();
        }
        
        function scrollBottom() {
            chatboxMessageWrapper.scrollTo(0, chatboxMessageWrapper.scrollHeight);
        }
        
});


function addZero(num) {
	return num < 10 ? '0'+num : num
}

function isValid(value) {
	let text = value.replace(/\n/g, '');
	text = text.replace(/\s/g, '');

	return text.length > 0
}