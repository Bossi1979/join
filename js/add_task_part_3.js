/**
 * Updates the source of the "clear" image element in the add task form to display a blue "close" logo.
 */
function addTaskClearOn() {
	document.getElementById('addTaskClear').src = '././assets/img/close_logo_blue.png';
}

/**
 * Sets the image source of the "addTaskClear" element to "./assets/img/close_logo.png", which changes the appearance of the image.
 */
function addTaskClearOff() {
	document.getElementById('addTaskClear').src = './assets/img/close_logo.png';
}

/**
 * Handles the selection and deselection of priority buttons for a task, based on a given index.
 * 
 * @param {number} prioIdIndex - The index of the priority button. 
 */
async function addPrio(prioIdIndex) {
	let idList = ['addTaskUrgent', 'addTaskMedium', 'addTaskLow'];
	let selectedId = idList[+prioIdIndex];
	let cListLength = document.getElementById(selectedId).classList.length;
	let btnName = selectedId.replace('addTask', '');
	idList.splice(prioIdIndex, 1);
	if (btnNotSelected(cListLength)) {
		selectPrioBtn(selectedId, btnName);
		unselectOtherBtn(idList);
	} else removeBtnSelection(btnName);
}

/**
 * Checks if a button is currently not selected based on the number of its CSS classes.
 *
 * @param {number} cListLength - The number of CSS classes of the button.
 * @returns {boolean} - True if the button is not selected, false otherwise.
 */
function btnNotSelected(cListLength) {
	return cListLength == 1;
}

/**
 * Selects and styles the priority button when clicked.
 * @param {string} selectedId - The id of the selected priority button.
 * @param {string} btnName - The name of the selected priority button.
 */
function selectPrioBtn(selectedId, btnName) {
	document.getElementById(selectedId).classList.add(`${btnName.toLowerCase()}-color`);
	document.getElementById(`addTask${btnName}Span`).classList.add('color-white');
	document.getElementById(`addTask${btnName}Img`).src = `./assets/img/${btnName.toLowerCase()}_white.png`;
	prio = btnName;
}

/**
 * Removes the selection from the priority button of the given name.
 * 
 * @param {string} btnName - The name of the priority button to deselect.
 */
function removeBtnSelection(btnName) {
	document.getElementById(`addTask${btnName}`).classList.remove(`${btnName.toLowerCase()}-color`);
	document.getElementById(`addTask${btnName}Span`).classList.remove('color-white');
	document.getElementById(`addTask${btnName}Img`).src = `./assets/img/${btnName.toLowerCase()}.png`;
}

/**
 * Unselects all priority buttons except the one with the specified ID.
 * 
 * @param {array} idList - An array of the IDs of the priority buttons.
 */
function unselectOtherBtn(idList) {
	for (let i = 0; i < idList.length; i++) {
		let selectedId = idList[i];
		let cListLength = document.getElementById(selectedId).classList.length;
		let btnName = selectedId.replace('addTask', '');
		if (btnIsSelected(cListLength)) deselectPrioBtn(btnName);
	}
}

/**
 * Deselects the priority button with the specified name.
 * @param {string} btnName - The name of the priority button.
 */
function deselectPrioBtn(btnName) {
	document.getElementById(`addTask${btnName}`).classList.remove(`${btnName.toLowerCase()}-color`);
	document.getElementById(`addTask${btnName}Span`).classList.remove('color-white');
	document.getElementById(`addTask${btnName}Img`).src = `./assets/img/${btnName.toLowerCase()}.png`;
}

/**
 * Checks if a button is currently selected.
 * 
 * @param {number} cListLength - The length of the class list of the button element.
 * @returns {boolean} - True if the button is currently selected, false otherwise.
 */
function btnIsSelected(cListLength) {
	return cListLength == 2;
}

/**
 * Hides the "cross" icon and shows the "subtask" icon when a user enters text in the subtask input field.
 */
function subTaskInputentered() {
	document.getElementById('subtaskCross').classList.add('d-none');
	document.getElementById('subTaskImgDiv').classList.remove('d-none');
	enterSubTaskInput();
}

/**
* Hides the subtaskCross and shows the subtask image div when the subtask input is entered.
*/
function subTaskInputLeave() {
	let subTaskText = document.getElementById('subTask').value;
	subTaskText = subTaskText.trim();
	if (subtaskInputFieldEmty(subTaskText)) {
		document.getElementById('subtaskCross').classList.remove('d-none');
		document.getElementById('subTaskImgDiv').classList.add('d-none');
	}
}

/**
 * Checks if the subtask input field is empty.
 * 
 * @param {string} subTaskText - The text entered in the subtask input field.
 * @returns {boolean} Returns true if the subtask input field is empty, otherwise false. 
 */
function subtaskInputFieldEmty(subTaskText) {
	return subTaskText == '';
}

/**
 * Simulates the user clicking on the subTask input field by giving it focus.
 */
function enterSubTaskInput() {
	document.getElementById('subTask').focus();
}

/**
 * Resets the value of the "subTask" input element to an empty string.
 */
function resetSubtaskInput() {
	document.getElementById('subTask').value = '';
}

/**
 * Adds a new subtask to the task.
 */
function addSubtask() {
	let subTaskText = document.getElementById('subTask').value;
	subTaskText = subTaskText.trim();
	if (subTaskText != '' && subTaskText.length >= 3) {
		pushNewSubtaskDatatoArray(subTaskText);
		renderSubtasks();
		resetSubtaskInput();
		createSubtaskListToSave();
		subTaskInputLeave();
	}
}

/**
 * Pushes a new subtask object to the subTaskArray with subtaskText and subtaskStatus properties.
 * @param {string} subTaskText - The text of the new subtask.
 */
function pushNewSubtaskDatatoArray(subTaskText) {
	let subtaskJson = {
		subtaskText: subTaskText,
		subtaskStatus: true,
	};
	subTaskArray.push(subtaskJson);
}

/**
 * Deletes the subtask object at the specified index from the subTaskArray and updates the display of subtasks.
 * 
 * @param {number} i - The index of the subtask object to be deleted.
 */
function deleteSubtask(i) {
	subTaskArray.splice(i, 1);
	renderSubtasks();
	createSubtaskListToSave();
}

/**
 * Renders the subtasks list to the UI and sets the checked status of each subtask.
 * based on its 'subtaskStatus' value.
 */
async function renderSubtasks() {
	await subtaskListHtml();
	for (let i = 0; i < subTaskArray.length; i++) {
		if (subtaskSelected(i)) document.getElementById(`subtask${i}`).checked = true;
	}
}

/**
 * Returns a boolean indicating whether the subtask at index 'i' has a 'subtaskStatus value of true.
 * 
 * @param {number} i - The index of the subtask to check. 
 * @returns {boolean} - True if the subtask has a 'subtaskStatus' value of true, false otherwise.
 */
function subtaskSelected(i) {
	return subTaskArray[i]['subtaskStatus'];
}

/**
* Updates the status of the subtask in the subTaskArray based on the checkbox selection.
* @param {number} subTaskIndex - Index of the subtask in the subTaskArray.
*/
function subtaskSelectionChange(subTaskIndex) {
	let actualSubTaskStatus = document.getElementById(`subtask${subTaskIndex}`).checked;
	if (actualSubTaskStatus) subTaskArray[subTaskIndex]['subtaskStatus'] = true;
	else subTaskArray[subTaskIndex]['subtaskStatus'] = false;
	createSubtaskListToSave();
}

/**
* Creates a list of subtasks to be saved, based on the subTaskArray
*/
function createSubtaskListToSave() {
	selectedSubtasks = [];
	for (let i = 0; i < subTaskArray.length; i++) {
		let subTaskText = subTaskArray[i]['subtaskText'];
		let subTaskStatus = subTaskArray[i]['subtaskStatus'];
		let subtaskJson = {
			subtaskText: subTaskText,
			subtaskStatus: subTaskStatus,
		};
		if (subTaskStatus) {
			selectedSubtasks.push(subtaskJson);
		}
	}
}

/**
* Resets the checkboxes for subtask selection by unchecking all of them.
*/
function resetSubtaskSelections() {
	for (let i = 0; i < subTaskArray.length; i++) {
		document.getElementById(`subtask${i}`).checked = false;
	}
}

/**
* Removes all elements from the subTaskArray except for the first element
*/
function emptySubTaskArray() {
	subTaskArray.splice(1);
}

/**
 * gets Index of Guest
 */
function setIndexOfGuest() {
	guestId = allUsers.findIndex((user) => user.email === guestEmail);
}