/**
 * Asks the user to confirm deletion of a contact and performs the corresponding action.
 * 
 * @param {number} i - The index of the contact to be deleted in the allUsers array.
 */
async function deleteContactQuestion(i, confirm) {
	let letter = allUsers[i].firstSecondLetter;
	let email = allUsers[i].email;
	let deleteQuestion = document.getElementById('deleteContactQuestion');
	let deleteQuestionInner = document.getElementById('deleteContactQuestion').innerHTML;
	let deleteQuestion1 = document.getElementById('deleteContactQuestion1');
	let deleteQuestionInner1 = document.getElementById('deleteContactQuestion1').innerHTML;
	if (guestLoggedIn || email == guestEmail) return;
	if (deletionRequested(letter, deleteQuestionInner)) openDeleteMenu(deleteQuestion, deleteQuestion1);
	else if (deletionConfirmed(deleteQuestionInner, confirm)) deleteUser(i);
	else if (deletionCanceled(deleteQuestionInner1, confirm)) closeDeletionMenu(deleteQuestion, deleteQuestion1, letter);
}

/**
 * Checks if the user has cancelled the deletion of a contact.
 * 
 * @param {string} deleteQuestionInner1 - The inner HTML of the delete question element. 
 * @param {string} confirm - The confirmation status for the deletion. Either 'Y' for yes or 'N' for no.
 * @returns {boolean} - A boolean value indicating whether the user has cancelled the deletion. 
 */
function deletionCanceled(deleteQuestionInner1, confirm) {
	return deleteQuestionInner1 == 'Cancel Deletion' && confirm == 'N';
}

/**
 * Checks if the user has confirmed the deletion of a contact.
 * 
 * @param {string} deleteQuestionInner - The inner HTML of the delete question element. 
 * @param {string} confirm - The confirmation status for the deletion. Either 'Y' for yes or 'N' for no. 
 * @returns {boolean} - A boolean value indicating whether the user has confirmed the deletion. 
 */
function deletionConfirmed(deleteQuestionInner, confirm) {
	return deleteQuestionInner == `Delete ? <br>Click here to<br> confirm.` && confirm == 'Y';
}

/**
 * Sets the content and style of two HTML elements to display a confirmation message for deleting an item.
 * 
 * @param {HTMLElement} deleteQuestion - The HTML element to be modified to show the confirmation message.
 * @param {HTMLElement} deleteQuestion1 - Another HTML element to be modified to show the confirmation message.
 */
function openDeleteMenu(deleteQuestion, deleteQuestion1) {
	deleteQuestion.innerHTML = `Delete ? <br>Click here to<br> confirm.`;
	deleteQuestion.style = 'font-size: 16px; text-align: center;';
	deleteQuestion1.innerHTML = 'Cancel Deletion';
}

/**
 * Changes the content and styling of the delete contact menu to display the given letter as its title,
 * and to show a message to confirm the deletion along with a cancel option.
 * 
 * @param {HTMLElement} deleteQuestion - The HTML element representing the delete contact menu.
 * @param {HTMLElement} deleteQuestion1 - The HTML element representing the cancel option within the delete contact menu.
 * @param {string} letter - The first letter of the contact's name that is being deleted.
 */
function closeDeletionMenu(deleteQuestion, deleteQuestion1, letter){
	deleteQuestion.innerHTML = `${letter}`;
	deleteQuestion.style = 'font-size: 47px; text-align: center;';
	deleteQuestion1.innerHTML = `- Delete Contact  ${letter}`;
}

/**
 * Checks whether the passed letter matches the passed delete question content.
 * @param {string} letter The letter to be compared to the delete question content.
 * @param {string} deleteQuestionInner The delete question content to which the letter is compared.
 * @returns {boolean} Returns `true` if the letter matches the delete question content, `false` otherwise.
 */
function deletionRequested(letter, deleteQuestionInner) {
	return letter === deleteQuestionInner;
}

/**
 * Deletes a user from the array allUsers
 * 
 * @param {number} i - user index
 */
async function deleteUser(i) {
	allUsers.splice(i, 1);
	await renderContactsAfterDeletion();
}

/**
 * This function is called when the user clicks on the contacts delete button in the menu. It loads the
 * contacts page and renders the content.
 */
async function renderContactsAfterDeletion() {
	document.getElementById('content').innerHTML = '';
	document.getElementById('content').innerHTML = renderContentHTML();
	sliderMenuShown = false;
	selectedMenuButton(4);
	await userInAlphabetArray();
	loadContributorsLetter();
	coworkersToAssignTo = transferallUserData();
	initContactsMobHighlight();
	await saveTask();
}

/**
 * Checks if the given email address is already taken by another user.
 *
 * @param {HTMLElement} newEmailRequired - The element representing the error message for the email input.
 * @param {string} name - The name value entered by the user.
 * @param {string} email - The email value entered by the user.
 * @param {string} phone - The phone number value entered by the user.
 * @param {string} valueToCheck - The email value to be checked.
 */
function comparisonEmailHelp(newEmailRequired, name, email, phone, valueToCheck) {
	check = 0;
	for (let i = 0; i < allUsers.length; i++) {
		let testValue = allUsers[i].email;
		if (testValue === valueToCheck) {
			check = 1;
			break;
		}
	}
	if (check == 1) {
		newEmailRequired.classList.remove('d-none');
		newEmailRequired.classList.add('requiredOn');
		newEmailRequired.innerHTML = `This email address is not available!!`;
	} else calculateNewAllUserArray(name, email, phone);
}

/**
 * Validates the input values of the edited contact and calls the editContact function if all the required fields are filled.
 * @param {number} i - The index of the contact to be edited.
 */
async function validateEditContact(i) {
	editContactShown = true;
	let name = document.getElementById('editUserName');
	let email = document.getElementById('editUserEmail');
	let phone = document.getElementById('editUserPhone');
	let newNameRequired = document.getElementById('editContentNameRequired');
	let newEmailRequired = document.getElementById('editContentEmailRequired');
	let newPhoneRequired = document.getElementById('editContentPhoneRequired');
	checkInputValues(name, email, phone, newNameRequired, newEmailRequired, newPhoneRequired, i);
}

/**
 * Checks the input values of the edited contact for name, email, and phone.
 * 
 * @param {Object} name - The input field for the name.
 * @param {Object} email - The input field for the email.
 * @param {Object} phone - The input field for the phone number.
 * @param {Object} newNameRequired - The field that displays a message if name is required. 
 * @param {Object} newEmailRequired - The field that displays a message if email is required. 
 * @param {Object} newPhoneRequired - The field that displays a message if phone is required. 
 * @param {number} i - The index of the contact to be edited.
 */
function checkInputValues(name, email, phone, newNameRequired, newEmailRequired, newPhoneRequired, i) {
    checkNameInput(name, newNameRequired);
    checkEmailInput(email, newEmailRequired);
    checkPhoneInput(phone, newPhoneRequired);
    if (allInformationTypedIn(newNameRequired, newEmailRequired, newPhoneRequired)) editContact(i);
}