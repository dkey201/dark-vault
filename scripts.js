document.addEventListener('DOMContentLoaded', () => {
    const contractsIcon = document.getElementById('contracts-icon');
    const messagingIcon = document.getElementById('messaging-icon');
    const backButtons = document.querySelectorAll('.back-button');
    const homeScreen = document.getElementById('home-screen');
    const contractsSection = document.getElementById('contracts-section');
    const messagingSection = document.getElementById('messaging-section');
    const contractsContainer = document.getElementById('contracts-container');
    const tabsContainer = document.getElementById('tabs-container');
    const messagesContainer = document.getElementById('messages-container');
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const lockScreen = document.getElementById('lock-screen');
    const unlockForm = document.getElementById('unlock-form');
    const questionContainer = document.getElementById('question-container');
    const answerInput = document.getElementById('answer-input');
    const usernameFooter = document.getElementById('username-footer');

    // Function to get URL parameters
    function getUrlParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Function to decode base64
    function decodeBase64(encodedStr) {
        return JSON.parse(atob(encodedStr));
    }

    // Function to sanitize input
    function sanitizeInput(input) {
        return input.replace(/[&<>"']/g, function(match) {
            const escape = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            };
            return escape[match];
        });
    }

    // Function to validate messages structure
    function validateMessages(data) {
        if (typeof data !== 'object' || data === null) return false;
        for (const key in data) {
            if (!Array.isArray(data[key])) return false;
            for (const message of data[key]) {
                if (typeof message.sender !== 'string' || typeof message.text !== 'string') return false;
            }
        }
        return true;
    }

    // Function to validate contracts structure
    function validateContracts(data) {
        if (!Array.isArray(data)) return false;
        for (const contract of data) {
            if (typeof contract.title !== 'string' || typeof contract.description !== 'string') return false;
        }
        return true;
    }

    // Function to validate questions structure
    function validateQuestions(data) {
        if (!Array.isArray(data)) return false;
        for (const question of data) {
            if (typeof question.question !== 'string' || typeof question.answer !== 'string') return false;
        }
        return true;
    }

    // Default values
    let messages = {
        'Agent X': [
            { sender: 'Agent X', text: 'The target is on the move.' },
            { sender: 'Me', text: 'Roger that.' }
        ],
        'HQ': [
            { sender: 'HQ', text: 'Proceed with caution.' },
            { sender: 'Me', text: 'Understood.' }
        ],
        'Agent Y': [
            { sender: 'Agent Y', text: 'Mission accomplished.' },
            { sender: 'Me', text: 'Good job.' }
        ]
    };

    let contracts = [
        { title: 'Eliminate the Target', description: 'Location: Unknown. Target: John Doe.' },
        { title: 'Retrieve the Package', description: 'Location: Warehouse 13. Package: Confidential.' },
        { title: 'Protect the VIP', description: 'Location: City Hall. VIP: Mr. Smith.' }
    ];

    let questions = [
        { question: 'Who is the target for the elimination contract?', answer: 'John Doe' }
    ];

    // Override variables from URL parameters if present
    const messagesParam = getUrlParameter('messages');
    if (messagesParam) {
        const decodedMessages = decodeBase64(messagesParam);
        if (validateMessages(decodedMessages)) {
            messages = decodedMessages;
        }
    }

    const contractsParam = getUrlParameter('contracts');
    if (contractsParam) {
        const decodedContracts = decodeBase64(contractsParam);
        if (validateContracts(decodedContracts)) {
            contracts = decodedContracts;
        }
    }

    const questionsParam = getUrlParameter('questions');
    if (questionsParam) {
        const decodedQuestions = decodeBase64(questionsParam);
        if (validateQuestions(decodedQuestions)) {
            questions = decodedQuestions;
        }
    }

    let currentThread = Object.keys(messages)[0];
    let currentQuestionIndex = 0;

    function displayQuestion() {
        questionContainer.textContent = questions[currentQuestionIndex].question;
    }

    unlockForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userAnswer = answerInput.value.trim();
        if (userAnswer === questions[currentQuestionIndex].answer) {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                displayQuestion();
                answerInput.value = '';
            } else {
                lockScreen.classList.add('hidden');
                homeScreen.classList.remove('hidden');
            }
        } else {
            alert('Incorrect answer. Try again.');
        }
    });

    displayQuestion();

    contractsIcon.addEventListener('click', () => {
        homeScreen.classList.add('hidden');
        contractsSection.classList.remove('hidden');
        displayContracts();
    });

    messagingIcon.addEventListener('click', () => {
        homeScreen.classList.add('hidden');
        messagingSection.classList.remove('hidden');
        displayTabs();
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
            messages[currentThread].push({ sender: 'Me', text: newMessage });
            displayMessages();
            messageInput.value = '';
        }
    });

    function displayContracts() {
        contractsContainer.innerHTML = '';
        contracts.forEach(contract => {
            const contractElement = document.createElement('div');
            contractElement.classList.add('contract');
            contractElement.innerHTML = `<strong>${contract.title}</strong><p>${contract.description}</p>`;
            contractsContainer.appendChild(contractElement);
        });
    }

    function displayTabs() {
        tabsContainer.innerHTML = '';
        Object.keys(messages).forEach(sender => {
            const tab = document.createElement('div');
            tab.classList.add('tab');
            if (sender === currentThread) {
                tab.classList.add('active');
            }
            tab.textContent = sender;
            tab.addEventListener('click', () => {
                currentThread = sender;
                displayTabs();
                displayMessages();
            });
            tabsContainer.appendChild(tab);
        });
    }

    function displayMessages() {
        messagesContainer.innerHTML = '';
        messages[currentThread].forEach(message => {
            const div = document.createElement('div');
            div.classList.add('message');
            if (message.sender === 'Me') {
                div.classList.add('sender');
            }
            div.innerHTML = `<strong>${message.sender}:</strong> <p>${message.text}</p>`;
            messagesContainer.appendChild(div);
        });
    }

    // Set default username
    let username = 'hacker';

    // Override username from URL parameter if present
    const usernameParam = getUrlParameter('username');
    if (usernameParam) {
        username = sanitizeInput(usernameParam);
    }

    // Update the username footer text
    usernameFooter.textContent = `vault-id: ${username}`;
});