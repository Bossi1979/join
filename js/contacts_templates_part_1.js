/**
 * It returns a string of HTML code.
 * @returns A string of HTML.
 */
function renderContentHTML() {
    return /*html*/ `
        <div class="shadowOverlay d-none" id="boardPopup" onclick="closeNewContact(), closeEditContact()"></div>
		<div class="contactsContainer">
			<div class="Frame_97" id="Frame_97">
				<div class="Contact_list" id="Contact_list"></div>
			</div>
			<div class="contactContainerRight" id="contactContainerRight">
                <div class="contactContainerList">
				    <div class="better_with_a_team">
					    <h1>Contacts</h1>
					    <div class="vector_5"></div>
					    <span>Better with a team</span>
				    </div>
                </div>
				<div class="showContact" id="showContact"></div>
			</div>
			<div class="new_contact" onclick="openNewContact()">
				<span>New contact</span>
				<img src="assets/img/add_contact_icon.png" alt="" />
			</div>
			<div class="add_contact d-none" id="new_contact"></div>
			<div class="add_contact d-none" id="edit_contact"></div>
		</div>
    `;
}

/**
 * Depending on guestLoggedIn will showup in the list of contacts.
 */
function chooseRightUserArray() {
    calculateUserInAlphabetArray(allUsers);
}

/**
 * Calculates the user in an alphabet array based on their first letter.
 * 
 * @param {Array} arr - The array of users.
 */
function calculateUserInAlphabetArray(arr) {
    arr.forEach((user, i) => {
        let id = i;
        let colorIndex = user.colorIndex;
        let name = user.name;
        let email = user.email;
        let letter = user.firstSecondLetter;
        let firstLetter = user.firstSecondLetter[0];
        alphabetOrd[firstLetter].push({ name: name, email: email, id: id, letter: letter, colorIndex: colorIndex, });
    });
}

/**
 * It loops through the alphabetOrd object, and if the length of the array is greater than 0, it will
 * add the letter to the HTML, and then loop through the array and add the names to the HTML.
 */
function calculateAndShowAlphabet() {
    for (let alphabetLetter in alphabetOrd) {
        if (alphabetOrd[alphabetLetter].length > 0) {
            document.getElementById('Contact_list').innerHTML += showLettersHTML(alphabetLetter);
            for (i = 0; i < alphabetOrd[alphabetLetter].length; i++) {
                let name = alphabetOrd[alphabetLetter][i].name;
                let color = alphabetOrd[alphabetLetter][i].colorIndex;
                let email = alphabetOrd[alphabetLetter][i].email;
                let id = alphabetOrd[alphabetLetter][i].id;
                let letter = alphabetOrd[alphabetLetter][i].letter;
                document.getElementById(alphabetLetter).innerHTML += showAlphabetNames(name, color, email, id, letter);
            }
        }
    }
}

/**
 * It returns a string of HTML that contains a div with a class of "letters" and a div with an id of
 * the alphabet letter.
 * @param alphabetLetter - the letter of the alphabet
 * @returns the HTML code for the letters of the alphabet.
 */
function showLettersHTML(alphabetLetter) {
    return /*html*/ `
        <div class="letters">
            <span><b>${alphabetLetter}</b></span>
        </div>
        <div id='${alphabetLetter}'></div> 
    `;
}

/**
 * Displays a contact query with the given information.
 * 
 * @param {string} name - The name of the person making the query.
 * @param {string} email - The email address of the person making the query.
 * @param {string} phone - The phone number of the person making the query.
 * @param {string} letter - The message of the query.
 * @param {string} color - The color of the query.
 * @param {number} i - The index of the query.
 * @param {HTMLElement} showContact - The element to display the query in.
 */
function showContactQuerry(name, email, phone, letter, color, i, showContact) {
    showContact.classList.remove('d-none');
    showContactHelp(name, email, phone, letter, color, i, showContact);
}

/**
 * Displays a contact query with the given information.
 *
 * @param {string} name - The name of the person making the query.
 * @param {string} email - The email address of the person making the query.
 * @param {string} phone - The phone number of the person making the query.
 * @param {string} letter - The message of the query.
 * @param {string} color - The color of the query.
 * @param {number} i - The index of the query.
 * @param {HTMLElement} showContact - The element to display the query in.
 */
function showContactHelp(name, email, phone, letter, color, i, showContact) {
    showContact.innerHTML = '';
    showContact.innerHTML = showContactHTML(name, email, phone, letter, color, i);
    showContact.classList.add('showContactSlide');
}

/**
 * Adds a new contact with the given information.
 *
 * @param {HTMLInputElement} name - The input element for the name of the new contact.
 * @param {HTMLInputElement} email - The input element for the email of the new contact.
 * @param {HTMLInputElement} phone - The input element for the phone number of the new contact.
 * @param {HTMLSpanElement} newNameRequired - The span element to display the "name required" error message.
 * @param {HTMLSpanElement} newEmailRequired - The span element to display the "email required" error message.
 * @param {HTMLSpanElement} newPhoneRequired - The span element to display the "phone required" error message.
 */
function addContactHelp(name, email, phone, newNameRequired, newEmailRequired, newPhoneRequired) {
    checkNameInput(name, newNameRequired);
    checkEmailInput(email, newEmailRequired);
    checkPhoneInput(phone, newPhoneRequired);
    if (allInformationTypedIn(newNameRequired, newEmailRequired, newPhoneRequired)) {
        comparisonEmailAddress(newEmailRequired, name.value, email.value, phone.value);
    }
}

/**
 * Checks the name input element for a value and displays an error message if it is empty.
 *
 * @param {HTMLInputElement} name - The input element to check for a name value.
 * @param {HTMLSpanElement} newNameRequired - The span element to display the "name required" error message.
 */
function checkNameInput(name, newNameRequired) {
    if (!noNameInput(name)) {
        newNameRequired.classList.remove('d-none');
        newNameRequired.classList.add('requiredOn');
    } else {
        newNameRequired.classList.remove('requiredOn');
        newNameRequired.classList.add('d-none');
    }
}

/**
 * Checks the email input element for a valid email format and displays an error message if it is invalid.
 *
 * @param {HTMLInputElement} email - The input element to check for a valid email format.
 * @param {HTMLSpanElement} newEmailRequired - The span element to display the "email required" error message.
 */
function checkEmailInput(email, newEmailRequired) {
    if (!noValidEmailInput(email)) {
        newEmailRequired.classList.remove('d-none');
        newEmailRequired.classList.add('requiredOn');
    } else {
        newEmailRequired.classList.remove('requiredOn');
        newEmailRequired.classList.add('d-none');
    }
}

/**
 * Checks the phone input element for a phone number and displays an error message if it is empty.
 *
 * @param {HTMLInputElement} phone - The input element to check for a phone number.
 * @param {HTMLSpanElement} newPhoneRequired - The span element to display the "phone required" error message.
 */
function checkPhoneInput(phone, newPhoneRequired) {
    if (noPhoneNumber(phone)) {
        newPhoneRequired.classList.remove('d-none');
        newPhoneRequired.classList.add('requiredOn');
    } else {
        newPhoneRequired.classList.remove('requiredOn');
        newPhoneRequired.classList.add('d-none');
    }
}

/**
 * Checks if the name input element has no value or starts with a space character.
 *
 * @param {HTMLInputElement} name - The input element to check for a name value.
 * @returns {boolean} - True if the name input has no value or starts with a space character, false otherwise.
 */
function noNameInput(name) {
    return nameTest.test(name.value);
}

/**
 * Checks if the email input element has a valid email value.
 *
 * @param {HTMLInputElement} email - The input element to check for a valid email value.
 * @returns {boolean} - True if the email input has an invalid email value, false otherwise.
 */
function noValidEmailInput(email) {
    return emailTest.test(email.value);
}

/**
 * Checks if the phone input element has a valid phone number value.
 *
 * @param {HTMLInputElement} phone - The input element to check for a valid phone number value.
 * @returns {boolean} - True if the phone input has an invalid phone number value, false otherwise.
 */
function noPhoneNumber(phone) {
    return phone.value.length < 8 || phone.value[0] === ' ';
}

/**
 * Checks if all required information has been typed in by the user.
 *
 * @param {HTMLElement} newNameRequired - The element that indicates if the name input is required.
 * @param {HTMLElement} newEmailRequired - The element that indicates if the email input is required.
 * @param {HTMLElement} newPhoneRequired - The element that indicates if the phone input is required.
 * @returns {boolean} - True if all required inputs have been typed in, false otherwise.
 */
function allInformationTypedIn(newNameRequired, newEmailRequired, newPhoneRequired) {
    return !newNameRequired.classList.contains('requiredOn') && !newEmailRequired.classList.contains('requiredOn') && !newPhoneRequired.classList.contains('requiredOn');
}

/**
 * It takes in 5 parameters, and returns a string of HTML code.
 * @param name - the name of the contact
 * @param color - the color of the circle
 * @param email - the email of the contact
 * @param id - the id of the contact
 * @param letter - The first letter of the name
 * @returns A string of HTML code.
 */
function showAlphabetNames(name, color, email, id, letter) {
    return /*html*/ `
        <div class="contact" id="contact${i}" onclick="showContact(${id})">
            <div class="ellipse" style='background:${colorIndex[color]}'>
                <span>${letter}</span>
            </div>
            <div class="name_and_email">
                <div class="name">
                <span>${name}</span>
                </div>
                <div class="email">${email}</div>
            </div>
        </div>
    `;
}

/**
 * It returns a string of HTML code that is used to create a popup window.
 * @param color - the color of the contact's elypse
 * @param letter - the first letter of the name of the contact
 * @param name - "John Doe"
 * @param email - "test@test.com"
 * @param phone - "123456789"
 * @returns A string of HTML.
 */
function openEditContactHTML(color, letter, name, email, phone, i) {
    return /*html*/ `   
        <div class="overlayAdd">
            <div class="blackSite">
                <div class="blackSiteContainer">
                    <span class="fontAddContact">Edit contact</span>
                    <div class="editContactVector"></div>
                    <div class="logoContainer">
                        <img class="editContactLogo" src="./assets/img/join_logo.png">
                    </div>
                </div>
            </div>
            <img onclick="closeEditContact()" class="closeLogo" src="./assets/img/close_logo.png">
            <div class="name_logo_inContainer">
                <div class="elypse" style='background:${colorIndex[color]}'>
                    <span>${letter}</span>
                </div>
            </div>
            <div class="buttonOutContainer">
                <div class="buttonInContainer">
                    <button onclick="saveEditContact(${i})" class="save">
                        <span id="saveEditButton">Save</span>
                    </button>
                </div>
            </div>
            <div class="contactContainer">
                <div class="nameOutContainer">
                    <div class="nameContainer">
                        <div class="inputEditContainer">
                            <input class="inputName" id="editUserName" type="text" value="${name}">
                            <img src="./assets/img/name_logo.png" alt="">
                        </div>
                        <span class="required d-none">First and Last Name</span>
                    </div>
                    <div class="nameContainer">
                        <div class="inputEditContainer">
                            <input class="inputName" id="editUserEmail" type="email" value="${email}">
                            <img src="./assets/img/email_Logo.png" alt="">
                        </div>
                        <span class="required d-none">This field is required</span>
                    </div>
                    <div class="nameContainer">
                        <div class="inputEditContainer">
                            <input class="inputName" id="editUserPhone" type="number" value="${phone}">
                            <img src="./assets/img/phoneLogo.png" alt="">
                        </div>
                        <span class="required d-none">This field is required</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}