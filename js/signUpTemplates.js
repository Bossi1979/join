const nameTest = /^[a-zA-Zäöüß]{1,50}\s[a-zA-Zäöüß]{1,50}$/;
const emailTest = /\S+@\S+\.\S+/;
const passwordTest = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/;



/**
 * If the input fields are not empty, check if the name field is empty or starts with a space, check if
 * the email field is less than 8 characters, does not contain an @ or ., or starts with a space, check
 * if the password field is empty or starts with a space, and if all of the above are false, run the
 * emailToCheck function.
 * 
 * @param {name} - the name input field
 * @param email - the email input
 * @param password - the password input
 * @param requiredName - the span element that will be added to the name input
 * @param requiredEmail - the span element that will be added to the DOM if the email input is invalid
 * @param requiredPassword - the element that will be added the class 'requiredOn' if the password
 * input is empty or starts with a space.
 */
function calculateinputValueTest(name, email, password, requiredName, requiredEmail, requiredPassword) {
	if (name.value || email.value || password.value) {
		LogIninputValidation(name, email, password, requiredName, requiredEmail, requiredPassword)
	} else {
		requiredName.classList.add('requiredOn');
		requiredEmail.classList.add('requiredOn');
		requiredPassword.classList.add('requiredOn');
		insertInfoMessage(1);
		additionalInfoMessage(2);
		additionalInfoMessage(3);
	}
}

/**
 * Check the input login values.
 * @param {name} - the name input field
 * @param email - the email input
 * @param password - the password input
 * @param requiredName - the span element that will be added to the name input
 * @param requiredEmail - the span element that will be added to the DOM if the email input is invalid
 * @param requiredPassword - the element that will be added the class 'requiredOn' if the password
 * input is empty or starts with a space.
 */
function LogIninputValidation(name, email, password, requiredName, requiredEmail, requiredPassword) {
	if (nameTest.test(name.value)) requiredName.classList.remove('requiredOn');
	else requiredName.classList.add('requiredOn');
	if (emailTest.test(email.value)) requiredEmail.classList.remove('requiredOn');
	else requiredEmail.classList.add('requiredOn');
	if (passwordTest.test(password.value)) requiredPassword.classList.remove('requiredOn');
	else requiredPassword.classList.add('requiredOn');
	if (!requiredName.classList.contains('requiredOn') && !requiredEmail.classList.contains('requiredOn') && !requiredPassword.classList.contains('requiredOn')) {
		emailToCheck(name.value, email.value, password.value);
	} else showRequiredInfoMsg2( requiredName, requiredEmail, requiredPassword);
}

/**
 * A function that check witch two parameter unvalid, and call the associated info message.
 * 
 * @param requiredName - the span element that will be added to the name input
 * @param requiredEmail - the span element that will be added to the DOM if the email input is invalid
 * @param requiredPassword - the element that will be added the class 'requiredOn' if the password
 */
function showRequiredInfoMsg(requiredName, requiredEmail, requiredPassword) {
	if (twoEntriesUnvalid(requiredName, requiredEmail)) {
		insertInfoMessage(1);
		additionalInfoMessage(2);
	} else if (twoEntriesUnvalid(requiredName, requiredPassword)) {
		insertInfoMessage(1);
		additionalInfoMessage(3);
	} else if (twoEntriesUnvalid(requiredEmail, requiredPassword)) {
		insertInfoMessage(2);
		additionalInfoMessage(3);
	} else showRequiredInfoMsg2(requiredName, requiredEmail, requiredPassword);
}

/**
 * A function that check witch parameter unvalid, and call the associated info message.
 * 
 * @param requiredName - the span element that will be added to the name input
 * @param requiredEmail - the span element that will be added to the DOM if the email input is invalid
 * @param requiredPassword - the element that will be added the class 'requiredOn' if the password
 */
function showRequiredInfoMsg2(requiredName, requiredEmail, requiredPassword) {
	if(requiredName !=0) if (oneEntrieUnvalid(requiredName)) insertInfoMessage(1);
	if (oneEntrieUnvalid(requiredEmail)) additionalInfoMessage(2);
	if (oneEntrieUnvalid(requiredPassword)) additionalInfoMessage(3);
}

/**
 * A function that checks whether a required input field has the 'requiredOn' class.
 * 
 * @param {Element} entrieOne - The required input field to check.
 * @returns {boolean} Returns true if the input field has the 'requiredOn' class, 
 * indicating that it is invalid, and false otherwise. 
 */
function oneEntrieUnvalid(entrieOne) {
	return entrieOne.classList.contains('requiredOn');
}

/**
 * A function that checks whether a required input field has the 'requiredOn' class.
 * 
 * @param {Element} entrieOne - The required input field to check.
 * @returns {boolean} Returns true if the input field has the 'requiredOn' class, 
 * indicating that it is invalid, and false otherwise. 
 */
function twoEntriesUnvalid(entrieOne, entrieTwo) {
	return entrieOne.classList.contains('requiredOn') &&
		entrieTwo.classList.contains('requiredOn');
}

/**
 * If the email address is already available, then add the class 'requiredOn' to the element with the
 * id 'requiredEmail' and change the innerHTML of that element to 'This email address is already
 * available!!'. Otherwise, call the function 'calculateAllUserArray' with the parameters 'name',
 * 'email', and 'password'.
 * @param requiredEmail - is the div that will show the error message
 * @param name - the name of the user
 * @param email - the email address that the user has entered
 * @param password - the password that the user has entered
 */
function comparisonEmail(requiredEmail, name, email, password) {
	let valueToCheck = email;
	let check = 0;
	for (let i = 0; i < allUsers.length; i++) {
		let testValue = allUsers[i].email;
		if (testValue === valueToCheck) {
			check = 1;
			break;
		}
	}
	if (check == 1) {
		requiredEmail.classList.add('requiredOn');
		requiredEmail.innerHTML = `This email address is not available!!`;
	} else calculateAllUserArray(name, email, password);
}

/**
 * This function takes in a name, email, and password, and then calls the calcSecondLetter function,
 * which returns a second letter, and then calls the calcColorIndex function, which returns a color
 * index, and then calls the userSignIn function, which returns a user object.
 * 
 * @param name - the user's name
 * @param email - string
 * @param password - string
 */
async function calculateAllUserArray(name, email, password) {
	let firstLetter = name[0].toUpperCase();
	let secondLetter = await calcSecondLetter(name);
	let colorIndex = await calcColorIndex(firstLetter, secondLetter);
	userSignIn(firstLetter, secondLetter, name, email, password, colorIndex);
}

/**
 * It takes a string, finds the index of the space, then takes the substring from the space to the end
 * of the string, then takes the first letter of that substring.
 * 
 * @param name - the name of the person
 * @returns The second letter of the second name.
 */
function calcSecondLetter(name) {
	let spaceIndex = name.indexOf(' ');
	let secondName = name.substring(spaceIndex + 1);
	let secondLetter = secondName[0].toUpperCase();
	return secondLetter;
}

/**
 * It takes two letters, converts them to their ASCII values, adds them together, and then returns the
 * remainder of that sum divided by 10.
 * 
 * @param firstLetter - The first letter of the name of the person you want to get the color for.
 * @param secondLetter - The second letter of the name of the person you want to get the color for.
 * @returns The colorIndex is being returned.
 */
function calcColorIndex(firstLetter, secondLetter) {
	let asciiFirstLetter = firstLetter.charCodeAt(0);
	let asciiSecondLetter = secondLetter.charCodeAt(0);
	let sum = asciiFirstLetter + asciiSecondLetter;
	let colorIndex = sum % 10;
	return colorIndex;
}
