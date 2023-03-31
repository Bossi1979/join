/**
 * Enables a popup window for a task.
 * 
 * @param {number} taskIndex - The index of the task to enable the popup for.
 */
async function enablePopupWindow(taskIndex) {
	if (taskCardInBoardClicked(taskIndex)) {
		document.getElementById('boardPopup').classList.remove('d-none');
	} else if (addTaskSelected(taskIndex)) {
		document.getElementById('boardPopup').classList.remove('d-none');
		setTimeout(() => {
			if (window.innerWidth > 563) document.getElementById('boardAddTaskPopup').classList.add('boardAddTaskPopupOverlay');
		}, 1);
	}
}

/**
 * Checks if the task card with the given index exists in the DOM.
 * 
 * @param {number} taskIndex - The index of the task card to check.
 * @returns {HTMLElement|null} - The task card element or null if it does not exist in the DOM. 
 */
function taskCardInBoardClicked(taskIndex) {
	return document.getElementById(`taskCard${taskIndex}`);
}

/**
 * Checks if the "add task" button has been selected for the given task index.
 * 
 * @param {number} taskIndex - The index of the task to check.
 * @returns {boolean} - True if the "add task" button has been selected, false otherwise. 
 */
function addTaskSelected(taskIndex) {
	return !taskCardInBoardClicked(taskIndex);
}


/**
 * Disables a popup window that has been opened previously.
 */
async function disablePopupWindow() {
	if (boardAddTaskOpened())closeBoardAddTaskPopup();
	if (selectedMenuBtnId == 4) {
	} else closeBoardTaskPopup();
}

/**
 * Close the board popup window addTask.
 */
function closeBoardAddTaskPopup() {
	document.getElementById('boardAddTaskPopup').classList.remove('boardAddTaskPopupOverlay');
	setTimeout(() => {
		document.getElementById('boardPopup').classList.add('d-none');
	}, 500);
}

/**
 * Close the board popup window, edit task and detail view.
 */
async function closeBoardTaskPopup() {
	setTimeout(await renderAfterCloseTask, 500);
	setTimeout(() => {
		document.getElementById('boardPopup').classList.add('d-none');
	}, 500);
	
}

/**
 * Checks if the 'boardAddTaskPopup' element exists in the DOM.
 * @returns {boolean} true if the element exists, false otherwise. 
 */
function boardAddTaskOpened() {
	return document.getElementById('boardAddTaskPopup');
}

/**
 * Renders the board and updates the work status arrays after closing a task.
 */
async function renderAfterCloseTask() {
	await renderBoard();
	await createWorkStatusArrays();
	renderAllCards();
	loadContributorsLetter();
	coworkersToAssignTo = transferallUserData();
	searchAfterPopup();
}

/**
 * This function prevent the closure of the popup window when clicking on the Popup Task Card.
 */
function stopClose(event) {
	event.stopPropagation();
}

/**
 * If the length of the assignedList is greater than 0, then return true. Otherwise, return false.
 * @param assignedList - [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}]
 * @returns true if the assignedList length is greater than 0.
 */
function assignedToDataExists(assignedList) {
	return assignedList.length > 0;
}

/**
 * Render the subtask HTML for the given task index, then set the subtask status for the given task
 * index.
 * @param taskIndex - The index of the task in the task array.
 */
async function renderSubtask(taskIndex) {
	await renderSubtaskHtml(taskIndex);
	setSubTaskStatus(taskIndex);
}

/**
 * If the length of the array is greater than 0, then the array has at least one element.
 * @param subtaskArray - an array of subtasks
 * @returns true if the subtaskArray length is greater than 0.
 */
function subtaskExist(subtaskArray) {
	return subtaskArray.length > 0;
}

/**
 * If the subtaskStatus is true, then check the checkbox.
 * @param taskIndex - the index of the task in the joinTaskArray
 */
function setSubTaskStatus(taskIndex) {
	let subtaskArray = joinTaskArray[taskIndex]['subTasks'];
	for (let i = 0; i < subtaskArray.length; i++) {
		if (subtaskStatusIsTrue(i, subtaskArray)) {
			document.getElementById(`subtask${i}`).checked = true;
		}
	}
}

/**
 * If the subtaskStatus property of the subtask object at the given index is true, return true,
 * otherwise return false.
 * 
 * @param subtaskIndex - The index of the subtask in the subtask array.
 * @param subtaskArray - The array of subtasks
 * @returns the value of the subtaskStatus property of the object at the index of subtaskIndex in the
 * array subtaskArray.
 */
function subtaskStatusIsTrue(subtaskIndex, subtaskArray) {
	return subtaskArray[subtaskIndex]['subtaskStatus'];
}

/**
 * It's a function that takes two parameters, one is the index of the subtask and the other is the
 * index of the task. It then gets the status of the checkbox and sets the status of the subtask in the
 * array to the status of the checkbox.
 * 
 * @param subTaskIndex - the index of the subtask in the subtask array
 * @param taskIndex - The index of the task in the array.
 */
async function checkboxSubtaskSelected(subTaskIndex, taskIndex) {
	let checkboxStatus = document.getElementById(`subtask${subTaskIndex}`).checked;
	joinTaskArray[taskIndex]['subTasks'][subTaskIndex]['subtaskStatus'] = checkboxStatus;
	joinTaskArray[taskIndex]['subTasks'][subTaskIndex]['subtaskStatus'] = checkboxStatus;
	await saveTask();
}

/**
 * This function set the category background-color of the category.
 * 
 * @param {number} taskIndex -this value is equal to the index number of the main array 'joinTaskArray', where
 * the task card information is stored.
 */
function setTaskCardPopupCatColor(taskIndex) {
	let cardCatColorIndex = joinTaskArray[taskIndex]['catColor'];
	let cardCatColor = categoryBackgroundColors[cardCatColorIndex];
	document.getElementById('taskCardPopupCategory').style = `background-color: ${cardCatColor};`;
}

/**
 * This function sets the background color of the prio button and transfers the url of the image associated with the prio button.
 * 
 * @param {*} taskIndex --this value is equal to the index number of the main array 'joinTaskArray', where
 * the task card information is stored.
 */
function setTaskCardPopupPrioBackground(taskIndex) {
	let cardPrio = joinTaskArray[taskIndex]['prio'];
	cardPrio = cardPrio.toLowerCase();
	let cardPrioBackground = prioColorAndUrlArray[0][cardPrio][0];
	let cardPrioImgSrc = prioColorAndUrlArray[0][cardPrio][1];
	document.getElementById('prioContainer').style = `background-color: ${cardPrioBackground};`;
	document.getElementById('cardPrioImg').src = cardPrioImgSrc;
}


/**
 * It opens a modal window with a form to edit a task.
 * 
 * @param taskIndex - the index of the task in the array of tasks
 */
async function openEditTaskCard(taskIndex) {
	resetAssignToList();
	await renderEditTaskCardHtml(taskIndex);
	showDeleteButton(taskIndex);
	await renderLoggedUserInAssignDrobDownMenuIntoYou();
	await renderContactsInAssignDropDownMenu();
	renderEditTaskCardInputFields(taskIndex);
	await boardEditTaskCardAssignPreseselction(taskIndex);
}

/**
 * It takes the index of the task in the array and then renders the input fields with the values of the
 * task.
 * 
 * @param taskIndex - the index of the task in the array
 */
async function renderEditTaskCardInputFields(taskIndex) {
	let cardTitle = joinTaskArray[taskIndex]['title'];
	let cardDescription = joinTaskArray[taskIndex]['descripten'];
	let cardDueDate = joinTaskArray[taskIndex]['dueDate'];
	let taskPrio = joinTaskArray[taskIndex]['prio'];
	boardEditedPrio = taskPrio;
	let prioArray = { Urgent: 0, Medium: 1, Low: 2 };
	let taskPrioNumber = prioArray[taskPrio];
	await addPrio(taskPrioNumber);
	document.getElementById('boardEditTitle').value = cardTitle;
	document.getElementById('boardEditDecription').value = cardDescription;
	document.getElementById('boardEditDueDate').value = cardDueDate;
}

/**
 * Populates the 'assigned to' section in the edit task card popup with preselected options.
 * 
 * @param taskIndex - the index of the task in the joinTaskArray.
 */
async function boardEditTaskCardAssignPreseselction(taskIndex) {
	let assignToArray = joinTaskArray[taskIndex]['assignedTo'];
	for (let i = 0; i < assignToArray.length; i++) {
		let refEmail = assignToArray[i]['email'];
		for (let index = 0; index < coworkersToAssignTo.length; index++) {
			let email = coworkersToAssignTo[index]['email'];
			if (refEmail == email) {
				addContactToTaskForceWithCheckBox(index);
			}
		}
	}
}

/**
 * Sets the preselected priority in the 'edit task card' popup.
 * 
 * @param taskIndex - The index of the task in the array.
 */
function setPrioPreselection(taskIndex) {
	let preselectedPrio = joinTaskArray[taskIndex]['prio'];
	let boardPrioStatusJson = { Urgent: 0, Medium: 1, Low: 2 };
	addPrio(boardPrioStatusJson[preselectedPrio]);
	boardEditedPrio = preselectedPrio;
}

/**
 * Resets the 'assigned to' list in the 'edit task card' popup.
 */
function resetAssignToList() {
	for (let i = 0; i < coworkersToAssignTo.length; i++) {
		coworkersToAssignTo[i]['check'] = false;
		assignToArray = [];
		taskForce = [];
	}
}

/**
 * Get the edited values for a task and validate them before saving the changes.
 * 
 * @param {number} taskIndex - The index of the task in the joinTaskArray.
 */
function getTaskChanges(taskIndex) {
	document.getElementById('titleEditReq').style = "color: #f6f7f8";
	document.getElementById('descEditReq').style = "color: #f6f7f8";
	let boardEditedTitle = document.getElementById('boardEditTitle').value;
	let boardEditedDescripten = document.getElementById('boardEditDecription').value;
	let boardEditedDueDate = document.getElementById('boardEditDueDate').value;
	if (!boardEditedTitle || !boardEditedDescripten || checkPrioSel()) {
		if (!boardEditedTitle) document.getElementById('titleEditReq').style = "color:red";
		if (!boardEditedDescripten) document.getElementById('descEditReq').style = "color:red";
		if (checkPrioSel()) document.getElementById('titleReq').style = "opacity: 1";
	} else saveEditTask(taskIndex, boardEditedTitle, boardEditedDescripten, boardEditedDueDate);
}


/**
 * Check if a priority level has been selected.
 * 
 * @returns {boolean} True if a priority level has not been selected, false otherwise.
 */
function checkPrioSel() {
	return !addTaskUrgent.classList.contains('urgent-color') && !addTaskMedium.classList.contains('medium-color') && !addTaskLow.classList.contains('low-color');
}

/**
* Saves the edited task with the given details.
* 
* @param {number} taskIndex - The index of the task to be edited.
* @param {string} boardEditedTitle - The edited title of the task.
* @param {string} boardEditedDescripten - The edited description of the task.
* @param {string} boardEditedDueDate - The edited due date of the task.
*/
async function saveEditTask(taskIndex, boardEditedTitle, boardEditedDescripten, boardEditedDueDate) {
	joinTaskArray[taskIndex]['assignedTo'] = taskForce;
	joinTaskArray[taskIndex]['title'] = boardEditedTitle;
	joinTaskArray[taskIndex]['descripten'] = boardEditedDescripten;
	joinTaskArray[taskIndex]['dueDate'] = boardEditedDueDate;
	joinTaskArray[taskIndex]['prio'] = boardEditedPrio;
	await saveTask();
	await renderBoard();
	await createWorkStatusArrays();
	await renderAllCards();
	await searchAfterPopup();
}

/**
 * If the user clicks on a priority button, the function will check if the button is already selected.
 * If it is, it will deselect it. If it isn't, it will select it
 * 
 * @param index - the index of the status in the statusNames array
 */
function prioStatusChange(index) {
	let statusNames = ['Urgent', 'Medium', 'Low'];
	if (actualClickedPrioBtnIsSet(index, statusNames)) boardEditedPrio = '';
	else boardEditedPrio = statusNames[index];
}

/**
 * If the index of the clicked button is the same as the index of the edited priority, then return
 * true, else return false.
 * 
 * @param index - the index of the button in the array of buttons
 * @param statusNames - an array of strings, each string is a status name
 * @returns the value of the expression:
 * statusNames[index] == boardEditedPrio
 */
function actualClickedPrioBtnIsSet(index, statusNames) {
	return statusNames[index] == boardEditedPrio;
}

/**
 * Shows the "Add Task" popup window with the specified workflow.
 */
async function showAddTaskPopupWindow(workflow) {
	taskForce = [];
	coworkersToAssignTo[loggedInUserIndex].check = false;
	enablePopupWindow();
	await renderAddTaskPopup(workflow);
	await loadExitingCategories();
	renderCategoryList();
	newCatInputActive = false;
	renderAssignToPopupWindow();
	setFutureDatesOnlyForInputDueDate();
	setPrioBtnforOtherPages();
}

/**
 * Renders the "Assign To"  to popup window with the logged-in user and contacts.
 */
function renderAssignToPopupWindow() {
	renderLoggedUserInAssignDrobDownMenuIntoYou();
	renderContactsInAssignDropDownMenu();
	loadContributorsLetter();
	addContactToTaskForceWithCheckBox(loggedInUserIndex);
}

/**
* Sets the values of the priority buttons to global variables if the "Add Task" form is not currently open.
*/
function setPrioBtnforOtherPages() {
	if (addTaskOpened == false) {
		urgentBtn = document.getElementById('addTaskUrgent');
		mediumBtn = document.getElementById('addTaskMedium');
		lowBtn = document.getElementById('addTaskLow');
	}
}

/**
 * This function render the popup menu AddTask.
 */
async function renderAddTaskPopup(workflow) {
	document.getElementById('boardPopup').innerHTML = '';
	document.getElementById('boardPopup').innerHTML = renderAddTaskPopupHtml(workflow);
}

/**
 * If the workFlowStatus of the task is 3, then remove the class 'd-none' from the delete button.
 * @param taskIndex - the index of the task in the array
 */
function showDeleteButton(taskIndex) {
	if (joinTaskArray[taskIndex].workFlowStatus == 3) {
		document.getElementById('deleteButton').classList.remove('d-none');
	}
}
