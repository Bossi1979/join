/**
 * It returns a string of HTML code.
 * @returns A string of HTML.
 */
function openNewContactHTML() {
    return /*html*/ `
        <div class="overlayAdd">
            <div class="blackSite">
                <div class="blackSiteContainer">
                    <span class="fontAddContact">Add contact</span>
                    <span class="fontTaskArBetter">Tasks are better with a team!</span>
                    <div class="editContactVector"></div>
                    <div class="logoContainer">
                        <img class="editContactLogo" src="./assets/img/join_logo.png">
                    </div>
                </div>
            </div>
            <div class="whiteSite">
                <img onclick="closeNewContact()" class="closeLogo" src="./assets/img/close_logo.png">
                <div class="name_logo_inContainer">
                    <div class="elypse">
                        <img src="./assets/img/nameLogoOverlay.png">
                    </div>
                </div>
                <div class="buttonNewOutContainer">
                    <div class="buttonInContainer">
                        <button onclick="closeNewContact()" class="cancel" onmouseover="cancelOn()" onmouseout="cancelOff()">
                            <span>Cancel</span>
                            <img id="cancelImg" width="13px" height="13px" src="./assets/img/close_logo.png">
                        </button>
                        <button onclick="addContact()" class="createContact">
                            <span>Create contact</span>
                            <img src="./assets/img/okHaeckchen.png">
                        </button>
                    </div>
                </div>
                <div class="contactContainer">
                    <div class="nameOutContainer">
                        <div class="nameContainer">
                            <div class="inputEditContainer">
                                <input class="inputName" id="newUserName" type="text" placeholder="Name" required>
                                <img src="./assets/img/name_logo.png" alt="">
                            </div>
                            <span class="required d-none" id="newContentNameRequired">First and Last Name</span>
                        </div>
                        <div class="nameContainer">
                            <div class="inputEditContainer">
                                <input class="inputName" id="newUserEmail" type="email" placeholder="Email" required>
                                <img src="./assets/img/email_Logo.png" alt="">
                            </div>
                            <span class="required d-none" id="newContentEmailRequired">This field is required</span>
                        </div>
                        <div class="nameContainer">
                            <div class="inputEditContainer">
                                <input class="inputName" id="newUserPhone" type="number" placeholder="Phone" required>
                                <img src="./assets/img/phoneLogo.png" alt="">
                            </div>
                            <span class="required d-none" id="newContentPhoneRequired">min 8 numbers</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="contactSucc" id="contactSucc">
            <div class="contactSuccContainer">
                <span>Contact succesfully created</span>
            </div>
        </div>
        </div>
    `;
}

/**
 * It takes in 5 parameters and returns a string of HTML.
 * @param name - "John Doe"
 * @param email - "test@test.com"
 * @param phone - "1234567890"
 * @param letter - the first letter of the name
 * @param color - is a number from 0 to 5
 * @returns A string of HTML.
 */
function showContactHTML(name, email, phone, letter, color, i) {
    return /*html*/ `
        <div class="showContactDetail">
		    <div id="listing">
                    <img onclick="showContactList()" src="assets/img/back_logo_black.png" alt="">
                    </div>                       
            <div class="show_contact_ellipse_5" style='background:${colorIndex[color]}' onclick="deleteContactQuestion(${i}, 'Y')">
                <span id="deleteContactQuestion">${letter}</span>
            </div>
            <div class="showContact_Name_addTask">
                <div class="rightSideShowContacts">
                    <h1 class="nameOnDisplay">${name}</h1>
                    <span onclick="allowAddTaskPopUp(), showAddTaskPopupWindow(0)">+ Add Task</span>
                    <span id="deleteContactQuestion1" onclick="deleteContactQuestion(${i}, 'N')">- Delete Contact  ${letter}</span>
                </div>
            </div>
        </div>
        <div class="showContact_information_edit">
            <div class="contact_information">
                <div class="contact_information_edit">
                    <h2>Contact Information</h2>
                    <div class="edit_contact" onclick="openEditContact(${i})">
                        <img src="./assets/img/edit_button_black.png" alt="">
                        <span>Edit Contact</span>
                    </div>
                </div>
                <div class="contactEmailContainer">
                    <div class="contactEmailAndPhone">Email</div>
                    <div class="contactEmail"><a href="mailto:${email}">${email}</a></div>
                </div>
                <div class="contactPhoneContainer">
                    <div class="contactEmailAndPhone">Phone</div>
                    <div class="contactPhone"><a href="tel:${phone}">${phone}</a></div>
                </div>
            </div>
        </div>
    `;
}

/**
 * This function adds a new contact to the allUsers array, saves the array to local storage, closes the
 * new contact form, and then sorts the contacts into alphabetical order.
 * @param name - name of the contact
 * @param email - email,
 * @param phone - '+1 (123) 456-7890'
 * @param firstLetter - The first letter of the user's name
 * @param secondLetter - the second letter of the user's name
 * @param colorIndex - 0-5
 */
async function addContactSave(name, email, phone, firstLetter, secondLetter, colorIndex) {
    allUsers.push({
        name: name,
        email: email,
        colorIndex: colorIndex,
        firstSecondLetter: firstLetter + secondLetter,
        phone: phone,
    });
    await saveTask();
    closeNewContact();
    closeEditContact();
    userInAlphabetArray();
}

/**
 * It takes the values from the edit contact form and saves them to the allUsers array.
 * @param name - the name of the contact
 * @param email - email,
 * @param password - password
 * @param phone - the phone number
 * @param firstLetter - first letter of the name
 * @param secondLetter - the second letter of the user's name
 * @param colorIndex - the index of the color in the array of colors
 * @param i - the index of the user in the allUsers array
 */
async function editContactSave(name, email, password, phone, firstLetter, secondLetter, colorIndex, i) {
    allUsers[i] = {
        name: name,
        email: email,
        password: password,
        colorIndex: colorIndex,
        firstSecondLetter: firstLetter + secondLetter,
        phone: phone,
    };
    await saveTask();
    closeEditContact();
    document.getElementById('showContact').classList.add('d-none');
    userInAlphabetArray();
    showContact(i);
}

/**
 * When the user hovers over the cancel button, the image changes to a blue version of the same image.
 */
function cancelOn() {
    document.getElementById('cancelImg').src = '././assets/img/close_logo_blue.png';
}

/**
 * When the mouse leaves the cancel button, change the image to the original image.
 */
function cancelOff() {
    document.getElementById('cancelImg').src = './assets/img/close_logo.png';
}
