document.addEventListener('DOMContentLoaded', () => {
    const contractsIcon = document.getElementById('contracts-icon');
    const messagingIcon = document.getElementById('messaging-icon');
    const backButtons = document.querySelectorAll('#back-button');
    const homeScreen = document.getElementById('home-screen');
    const contractsSection = document.getElementById('contracts-section');
    const messagingSection = document.getElementById('messaging-section');
    const contractsList = document.getElementById('contracts-list');
    const messagesContainer = document.getElementById('messages-container');
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');

    const contracts = [
        { title: 'Eliminate the Target', description: 'Location: Unknown. Target: John Doe.' },
        { title: 'Retrieve the Package', description: 'Location: Warehouse 13. Package: Confidential.' },
        { title: 'Protect the VIP', description: 'Location: City Hall. VIP: Mr. Smith.' }
    ];

    const messages = [
        { sender: 'Agent X', text: 'The target is on the move.' },
        { sender: 'HQ', text: 'Proceed with caution.' },
        { sender: 'Agent X', text: 'Mission accomplished.' },
        { sender: 'Me', text: 'Roger that.' }
    ];

    contractsIcon.addEventListener('click', () => {
        homeScreen.classList.add('hidden');
        contractsSection.classList.remove('hidden');
        displayContracts();
    });

    messagingIcon.addEventListener('click', () => {
        homeScreen.classList.add('hidden');
        messagingSection.classList.remove('hidden');
        displayMessages();
    });

    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            contractsSection.classList.add('hidden');
            messagingSection.classList.add('hidden');
            homeScreen.classList.remove('hidden');
        });
    });

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newMessage = messageInput.value.trim();
        if (newMessage) {
            messages.push({ sender: 'Me', text: newMessage });
            displayMessages();
            messageInput.value = '';
        }
    });

    function displayContracts() {
        contractsList.innerHTML = '';
        contracts.forEach(contract => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${contract.title}</strong><p>${contract.description}</p>`;
            contractsList.appendChild(li);
        });
    }

    function displayMessages() {
        messagesContainer.innerHTML = '';
        messages.forEach(message => {
            const div = document.createElement('div');
            div.classList.add('message');
            if (message.sender === 'Me') {
                div.classList.add('sender');
            }
            div.innerHTML = `<strong>${message.sender}:</strong> <p>${message.text}</p>`;
            messagesContainer.appendChild(div);
        });
    }
});