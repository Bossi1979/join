/**
 * This function render the category field to a input field to create a new category and
 * create on the right side of the category field a enter and cancel button for the new entered category name.
 */
function setSettingsForNewCategoryInput() {
	document.getElementById('selectedCat').innerHTML = newCategoryInputHtml();
	newCatInputActive = true;
	enableDisableCatList();
	document.getElementById('addTaskNewCatBtn').classList.remove('d-none');
	document.getElementById('dropdownImg').classList.add('d-none');
	document.getElementById('colorSelection').classList.remove('listD-none');
	setInnerHtmlById('sColor', '');
	addColorToCat(3);
}

/**
 * This function perform the settings for the category field indication for a existing category.
 * 
 * @param {number} catId - This value is equal to the index of the category list of the selected category.
 */
function setSettingsForExistingCategory(catId) {
	let newCat = addTaskCategoryList[catId]['category'];
	let categoryColor = addTaskCategoryList[catId]['catColor'];
	document.getElementById('selectedCat').innerHTML = existingCategoryHtml(newCat, categoryColor);
	catColor = categoryColor;
	enableDisableCatList();
	document.getElementById('dropdownImg').classList.remove('d-none');
	document.getElementById('colorSelection').classList.add('listD-none');
}

/**
 * This function set the settings for a selected catogory of the submenu of the new category creation.
 * @param {number} colorId
 */
function addColorToCat(colorId) {
	if (catColor != '' || catColor == '0') {
		document.getElementById('color' + catColor + 'Div').classList.remove('colorDivSelected');
		catColor = '';
	}
	document.getElementById('color' + colorId + 'Div').classList.add('colorDivSelected');
	catColor = colorId;
}

/**
 * This function show a popup, that indicated that the new task is succsessfully created.
 */
function showAddDiv() {
	document.getElementById('taskCreatedIndication').classList.add('taskCreatedIndication');
}

/**
 * This function inhibited to show a popup, that indicated that the new task is succsessfuly created.
 */
function notShowAddDiv() {
	document.getElementById('taskCreatedIndication').classList.remove('taskCreatedIndication');
}

/**
 * This function check over some subfunction, all required form values are valid. If not it starts subfuction
 * to indicated the required fields.
 * 
 * @param {number} workflow - This value is equal to the workflow status of the task,
 * e.g. workflow status 0 is equal to 'To do' at board.
 */
function checkInputs(workflow) {
	getReqiredFieldValues();
	resetRequiredWarnings();
	if (requiredFieldAreNotValid()) {
		setRequiredTextWarnings();
	} else {
		createTaskData(workflow);
	}
}

/**
 * Checks if the required fields for creating a task are not valid.
 * 
 * @returns {boolean} - Returns true if any of the required fields
 * (title, due date, category, description) are empty or if no priority level is selected; otherwise, returns false.
 */
function requiredFieldAreNotValid() {
	return title == '' || dueDate == '' || category == '' || descripten == '' || noPrioritySelected();
}

/**
 * It returns the current date in the format YYYY-MM-DD.
 * @returns The current date in the format of YYYY-MM-DD.
 */
function currentDate() {
	let date = new Date();
	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();
	if (month < 10) month = '0' + month;
	if (day < 10) day = '0' + day;
	let today = year + '-' + month + '-' + day;
	return today;
}

/**
 * The function setFutureDatesOnlyForInputDueDate() sets the minimum date for the input element with
 * the id of dueDate to the current date.
 */
function setFutureDatesOnlyForInputDueDate() {
	document.getElementById('dueDate').min = currentDate();
}

/**
 * If the title is empty, make the titleReq element visible
 */
function checkTitle() {
	if (title == '') document.getElementById('titleReq').style = 'opacity: 1;';
}

/**
 * If the input date is older than the current date,
 * then display the error message
 */
function checkFutureDate() {
	let inputDate = new Date(dueDate);
	let currentDate = new Date();
	if (inputDate < currentDate) document.getElementById('dateReq').style = 'opacity: 1';
}

/**
 * If the dueDate variable is empty, then make the dateReq div visible.
 */
function checkDueDateExists() {
	if (dueDate == '') document.getElementById('dateReq').style = 'opacity: 1;';
}

/**
 * If the category variable is empty, then make the catReq element visible.
 */
function checkCategory() {
	if (category == '') {
		document.getElementById('catReq').style = 'opacity: 1;';
		document.getElementById('catReq').classList.remove('listD-none');
	}
}

/**
 * If the description is empty, make the description required message visible.
 */
function checkDiscription() {
	if (descripten == '') document.getElementById('descReq').style = 'opacity: 1;';
}

/**
 * If no priority is selected, make the prioReq element visible.
 */
function checkPriorityExists() {
	if (noPrioritySelected()) showRequiredTextPriority();
}

/**
 * Checks if no priority button has been selected.
 * 
 * @returns @returns {boolean} - Returns true if none of the priority buttons have been selected; otherwise, returns false.
 */
function noPrioritySelected() {
	return !urgentBtn.classList.contains('urgent-color') &&
		!mediumBtn.classList.contains('medium-color') &&
		!lowBtn.classList.contains('low-color') &&
		!addTaskUrgent.classList.contains('urgent-color') &&
		!addTaskMedium.classList.contains('medium-color') &&
		!addTaskLow.classList.contains('low-color');
}

function showRequiredTextPriority() {
	document.getElementById('prioReq').style = 'opacity: 1';
}

/**
 * This function enable or disable the indication 'this field is required'.
 */
function setRequiredTextWarnings() {
	checkTitle();
	checkFutureDate();
	checkDueDateExists();
	checkCategory();
	checkDiscription();
	checkPriorityExists();
}

/**
 * This function get all required fields values.
 */
function getReqiredFieldValues() {
	title = document.getElementById('addTaskTitle').value;
	title = title.trim();
	dueDate = document.getElementById('dueDate').value;
	dueDate = dueDate.trim();
	descripten = document.getElementById('addTaskDescripten').value;
	descripten = descripten.trim();
	if (newCatInputActive) category = document.getElementById('selectedCatInput').value;
	else category = document.getElementById('selectedCatInput').innerHTML;
	category = category.trim();
}

/**
 * This function disable all 'This field is required' indications.
 */
function resetRequiredWarnings() {
	document.getElementById('titleReq').style = 'opacity: 0;';
	document.getElementById('dateReq').style = 'opacity: 0;';
	document.getElementById('catReq').style = 'opacity: 0;';
	document.getElementById('descReq').style = 'opacity: 0;';
	document.getElementById('prioReq').style = 'opacity: 0 !important;';
}

/**
 * Clear form data and elements in an add task form.
 */
function clearFormularData() {
	resetRequiredWarnings();
	clearTaskTitleAndDescription();
	clearSelectedCategory();
	clearDueDate();
	clearSubtasks();
	clearValidationMessages();
	resetAssignToList();
	emptySubTaskArray();
	renderSubtasks();
	closeCatList();
	clearTaskForce();
	addContactToTaskForceWithCheckBox(loggedInUserIndex);
}

/**
 * Clears the task title and description input fields in the HTML form.
 */
function clearTaskTitleAndDescription() {
	document.getElementById('addTaskTitle').value = '';
	document.getElementById('addTaskDescripten').value = '';
}

/**
 * Clears the due date field.
 */
function clearDueDate() {
	document.getElementById('dueDate').value = '';
}

/**
 * Clears the selected subtasks and resets the subtask section to its default state.
 */
function clearSubtasks() {
	resetSubtaskSelections();
	selectedSubtasks = [];
}

/**
 * Clears any validation error messages that may be displayed.
 */
function clearValidationMessages() {
	document.getElementById('titleReq').style.opacity = '0';
	document.getElementById('dateReq').style.opacity = '0';
	document.getElementById('catReq').style.opacity = '0';
	document.getElementById('catReq').classList.add('listD-none');
}

/**
 * Creates a new task and saves it to the task list
 * 
 * @param {string} workflow - The workflow status of the new task.
 * @returns {Promise<void>} - A Promise that resolves when the task data is successfully saved.
 */
async function createTaskData(workflow) {
	await loadTask();
	getDataFromFomular();
	await createAssignToListForSave();
	await minOneSubtask();
	fillTaskData(workflow);
	pushTaskData();
	saveTask();
	setTimeout(initBoard, 1200);
	resetAssignToList();
	clearFormularData();
}

/**
 * Checks if at least one subtask has been selected. If not, adds a default subtask.
 * @returns - {Promise<void>} - Promise object that resolves with no value.
 */
async function minOneSubtask() {
	if (noSubtaskSelected()) {
		alert('At least one subtask is required! A subtask is set automatically.');
		setDefaultSubtask();
	}
}


/**
 * Checks if there are no selected subtasks, alerts the user, and returns true.
 * 
 * @returns {boolean} - Returns true if there are no selected subtasks; otherwise, returns false. 
 */
function noSubtaskSelected() {
	return selectedSubtasks.length == 0;
}

/**
 * Sets the selectedSubtasks array to a default subtask object.
 */
function setDefaultSubtask() {
	selectedSubtasks = [{ subtaskText: 'Subtask', subtaskStatus: true }];
}

/**
* Gets the values of the task description and subtask fields from the form and assigns them to the corresponding variables.
*/
function getDataFromFomular() {
	descripten = document.getElementById('addTaskDescripten').value;
	subTask = document.getElementById('subTask').value;
}

/**
* Creates an array of selected coworkers to assign the task to from the list of available coworkers.
* Only coworkers with a checked checkbox are included in the array.
* The resulting array is assigned to the global variable assignToArray.
*/
async function createAssignToListForSave() {
	clearAssignToArray();
	for (let i = 0; i < coworkersToAssignTo.length; i++) {
		if (coworkerSelected(i)) addToAssignToList(i);
	}
}

/**
 * Clear the AssignToArray.
 */
function clearAssignToArray() {
	assignToArray = [];
}

/**
 * Check the coworker selected.
 * 
 * @param {i} i - Index of the coworkers List.
 * @returns - True if the coworker is selected as assigned to.
 */
function coworkerSelected(i) {
	return coworkersToAssignTo[i]['check'];
}

/**
 * Add the coworker to the assign to list.
 * 
 * @param {i} i - Index of the coworkers List.
 */
function addToAssignToList(i) {
	assignToArray.push(coworkersToAssignTo[i]);
}

/**
 * Creates an object that represents a task, with various properties including 
 * the task's title, description, due date, category, priority, subtasks, and workflow status.
 * 
 * @param {number} workflow - A number representing the workflow status of the task.
 */
function fillTaskData(workflow) {
	setSubtaskStatusForBoardToFalse();
	taskData = {
		title: title,
		descripten: descripten,
		category: category,
		catColor: catColor,
		assignedTo: assignToArray,
		dueDate: dueDate,
		prio: prio,
		subTasks: selectedSubtasks,
		workFlowStatus: workflow,
		creator: allUsers[loggedInUserIndex]['name'],
	};
	catColor = '';
}

/**
 * Sets the subtask status for the board to false.
 */
function setSubtaskStatusForBoardToFalse() {
	for (let i = 0; i < selectedSubtasks.length; i++) {
		selectedSubtasks[i]['subtaskStatus'] = false;
	}
}

/**
 * This function push all Taskdata to the main Array.
 */
function pushTaskData() {
	joinTaskArray.push(taskData);
}

// deleteJoinTaskArrayFromServer() is not used in this code, it is only to remove the Array from Server!!!!!!!!!!!
async function deleteJoinTaskArrayFromServer() {
	await backend.deleteItem('joinTaskArray');
}