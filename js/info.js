let messageArray = [
    {
        'logo': '<img src="./assets/img/join_logo.png"></img>',
    },
    {
        'title': 'Name entry not complete',
        'message': 'Your entered only one name or nothing. Please enter first and lastname',
        'messageId': 1,
    },
    {
        'title': 'Email address unvalid',
        'message': 'An e-mail address consists of an @ sign, as well as a local part in front of it and a domain part behind it, as in our example joinuser@test.de',
        'messageId': 2,
    },
    {
        'title': 'Password not allowed',
        'message': 'Your chosen password is invalid! At least eight characters, with upper and lower case letters and at least one number required.',
        'messageId': 3,
    },
    {
        'title': 'Login failed',
        'message': 'Please check your emailaddress and password entrie. Or use the "Forgot my password" function by clicking on the link below the email input.',
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
    {
        'title': 'Password not allowed',
        'message': 'Your chosen password is invalid! At least eight characters, with upper and lower case letters and at least one number required.',
        'messageId': 8,
    },
    {
        'title': 'Email address unknown',
        'message': 'The email you entered is not active in our database. Please check the entered email address.',
        'messageId': 9,
    },
    {
        'title': 'Phonenumber unvalid',
        'message': 'The phone number you entered is invalid. Please enter a phone number with at least eight digits.',
        'messageId': 10,
    },
]

let infoPopupOpened = false;

/**
 * This Function open the info popup window.
 */
function openInfoPopup() {
    let shadowScreen = document.getElementById('shadowScreen');
    shadowScreen.classList.remove('d-none');
    infoPopupOpened = true;
}

/**
 * This Function close the info popup window.
 */
function closeInfoPopup() {
    let shadowScreen = document.getElementById('shadowScreen');
    shadowScreen.classList.add('d-none');
    infoPopupOpened = false;
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
async function insertInfoMessage(messageIndex){
    let infoTitle = document.getElementById('infoTitle');
    let infoText = document.getElementById('infoText');
    infoTitle.innerHTML ='';
    infoText.innerHTML ='';
    infoTitle.innerHTML += messageArray[0].logo;
    infoTitle.innerHTML += messageArray[messageIndex].title;
    infoText.innerHTML += messageArray[messageIndex].message;
    openInfoPopup();
}

/**
 * An asynchronous function that displays an additional info message 
 * if the previous popup window closed.
 * 
 * @param {number} messageIndex - The index of the info message to be displayed.
 */
async function additionalInfoMessage(messageIndex){
    if (!infoPopupOpened){
        await insertInfoMessage(messageIndex);
        openInfoPopup();
    }else setTimeout(()=>{additionalInfoMessage(messageIndex);}, 500);
}