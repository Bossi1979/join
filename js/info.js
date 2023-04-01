let messageArray = [
    {
        'logo': '<img src="./assets/img/join_logo.png"></img>',
    },
    {
        'title': 'Password not allowed',
        'message': 'Your chosen password is invalid! At least eight characters, with upper and lower case letters and at least one number required.',
        'messageId': 1,
    },
    {
        'title': 'Name entry not complete',
        'message': 'Your entered only one name or nothing. Please enter first and lastname',
        'messageId': 2,
    },
    {
        'title': 'Email invalid',
        'message': 'Your email address format is invaled. Please enter a valid emailadress.',
        'messageId': 3,
    },
    {
        'title': 'Login failed',
        'message': 'Please check your emailaddress and password entrie.',
        'messageId': 4,
    },
    {
        'title': 'Function not included',
        'message': 'This function is part of backend. The course is about frontend though',
        'messageId': 5,
    },
    {
        'title': 'Move not allowed',
        'message': 'Please complete first all subtasks. Before move task to next column',
        'messageId': 6,
    },
    {
        'title': 'Move not allowed',
        'message': 'Please move the card first in the "In progress" column.',
        'messageId': 7,
    },
]

/**
 * This Function open the info popup window.
 */
function openInfoPopup() {
    let shadowScreen = document.getElementById('shadowScreen');
    shadowScreen.classList.remove('d-none');
}

/**
 * This Function close the info popup window.
 */
function closeInfoPopup() {
    let shadowScreen = document.getElementById('shadowScreen');
    shadowScreen.classList.add('d-none');
}

/**
 * Stop propagation of the closeInfoPopup function, if you click on the Infobox.
 * @param {Event} event - The event object to stop propagation for.
 */
function stopCloseure(event) {
    event.stopPropagation(closeInfoPopup);
}

/**
 * Displays an information message on the page based on a message index.
 * 
 * @param {number} messageIndex - The index of the message to display in the `messageArray`.
 */
function insertInfoMessage(messageIndex){
    let infoTitle = document.getElementById('infoTitle');
    let infoText = document.getElementById('infoText');
    infoTitle.innerHTML ='';
    infoText.innerHTML ='';
    infoTitle.innerHTML += messageArray[0].logo;
    infoTitle.innerHTML += messageArray[messageIndex].title;
    infoText.innerHTML += messageArray[messageIndex].message;
    openInfoPopup();
}