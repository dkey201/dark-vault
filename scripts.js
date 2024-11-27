document.addEventListener('DOMContentLoaded', () => {
    const contractsMenu = document.getElementById('contracts-menu');
    const messagingMenu = document.getElementById('messaging-menu');
    const contractsSection = document.getElementById('contracts-section');
    const messagingSection = document.getElementById('messaging-section');
    const contractsList = document.getElementById('contracts-list');
    const messagesContainer = document.getElementById('messages-container');

    const contracts = [
        { title: 'Eliminate the Target', description: 'Location: Unknown. Target: John Doe.' },
        { title: 'Retrieve the Package', description: 'Location: Warehouse 13. Package: Confidential.' },
        { title: 'Protect the VIP', description: 'Location: City Hall. VIP: Mr. Smith.' }
    ];

    const messages = [
        { sender: 'Agent X', text: 'The target is on the move.' },
        { sender: 'HQ', text: 'Proceed with caution.' },
        { sender: 'Agent X', text: 'Mission accomplished.' }
    ];

    contractsMenu.addEventListener('click', () => {
        contractsSection.classList.remove('hidden');
        messagingSection.classList.add('hidden');
        displayContracts();
    });

    messagingMenu.addEventListener('click', () => {
        messagingSection.classList.remove('hidden');
        contractsSection.classList.add('hidden');
        displayMessages();
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
            div.innerHTML = `<strong>${message.sender}:</strong> <p>${message.text}</p>`;
            messagesContainer.appendChild(div);
        });
    }
});