'use strict';
let transferArray = [];
let catListStatus = false;
let assignListStatus = false;
let newCatInputActive = false;
let addTaskCategoryList = [];
let joinTaskArray = [];
let taskData = {};
let title = '';
let descripten = '';
let category = '';
let catColor = '';
let assigndTo = '';
let taskForce = [];
let assignToArray = [];
let dueDate = '';
let prio = '';
let subTask = '';
let subTaskArray = [];
let selectedSubtasks = [];
let badgesIndex;
let guestId;
let coworkersToAssignTo = [];
let urgentBtn;
let mediumBtn;
let lowBtn;
let addTaskOpened = false;

/**
 * Initializes the add task functionality, rendering the add task interface and initializing subfunctions.
 */
async function initAddTask() {
	transferArray = [];
	sliderMenuShown = false;
	await renderAddTask();
	initSubfunctionAddTask();
	initAddTaskMobHighlight();
}

/**
 * Initializes the subfunctions for the add task interface, including rendering the category list, subtasks, 
 * assignee dropdown menu, due date input, contributors letter, priority button IDs, and other elements.
 */
function initSubfunctionAddTask() {
	renderCategoryList();
	newCatInputActive = false;
	renderSubtasks();
	selectedMenuButton(3);
	renderLoggedUserInAssignDrobDownMenuIntoYou();
	renderContactsInAssignDropDownMenu();
	setFutureDatesOnlyForInputDueDate();
	loadContributorsLetter();
	taskForce = [];
	addSubtaskMain();
	addContactToTaskForceWithCheckBox(loggedInUserIndex);
	setIndexOfGuest();
	setPrioBtnIdElements();
}

/**
 * Sets the global priority button ID elements and opens the add task interface.
 */
function setPrioBtnIdElements() {
	urgentBtn = document.getElementById('addTaskUrgent');
	mediumBtn = document.getElementById('addTaskMedium');
	lowBtn = document.getElementById('addTaskLow');
	addTaskOpened = true;
}

/**
 * This function render the HTML content of "Add Task Menu" into the content div of the HTML template.
 *
 */
async function renderAddTask() {
	setInnerHtmlById('content', '');
	coworkersToAssignTo = transferallUserData();
	addCheckAttributeToCoworkersToAssignTo();
	await loadExitingCategories();
	document.getElementById('content').innerHTML += generateAddTaskHtml();
}

/**
 * Creates a transfer object containing all user data and coworkers to be assigned to, then returns it.
 * 
 * @returns {object} - The transfer object containing all user data and coworkers to be assigned to.
 */
function transferallUserData() {
	transferArray = [];
	coworkersToAssignTo = [];
	creatingTransferObjectOfContacts();
	return transferArray;
}

/**
 * Creates a copy of allUsers without password
 */
function creatingTransferObjectOfContacts() {
	allUsers.forEach((user) => {
		transferArray.push({
			colorIndex: user.colorIndex,
			email: user.email,
			firstSecondLetter: user.firstSecondLetter,
			name: user.name,
			phone: user.phone,
		});
	});
}

/**
 * Adds "check: false" to every  coworker in coworkersToAssignTo Object
 */
function addCheckAttributeToCoworkersToAssignTo() {
	coworkersToAssignTo.forEach((contact) => {
		contact.check = false;
	});
}

/**
 * On submit (enter) focus is on description
 */
function goToDescripten() {
	document.getElementById('addTaskDescripten').focus();
}

/**
 * On submit (enter) focus is on addTaskUrgent
 */
function goToPrio() {
	document.getElementById('addTaskUrgent').focus();
}

/**
 * Loads existing categories from the joinTaskArray and creats the addTaskCategoryList array.
 * It filter this data to create a JSON Array, with no double entries.
 */
async function loadExitingCategories() {
	await loadTask();
	setCategoryListToDefault();
	joinTaskArray.forEach((task) => {
		let categoryItem = readInTasksCategory(task);
		if (!itemAlreadyInCatList(categoryItem)) addCatToCatList(categoryItem);
	});
}

/**
 * Add the category to addTaskCategoryList array.
 */
function addCatToCatList(categoryItem) {
	addTaskCategoryList.push({
		category: categoryItem.category,
		catColor: categoryItem.catColor,
	});
}

/**
 * Sets the addTaskCategoryList to a default category list with a single 'New Category' entry.
 */
function setCategoryListToDefault() {
	addTaskCategoryList = [
		{
			category: 'New Category',
			catColor: '',
		},
	];
}

/**
 * Reads in the category and color of a task and creates an object with these properties.
 * 
 * @param {object} task - The task object containing a 'category' and 'catColor' property. 
 * @returns {object} - An object containing the task's category and color. 
 */
function readInTasksCategory(task) {
	let taskCategory = task['category'];
	let categoryColor = task['catColor'];
	let categoryItem = {
		category: taskCategory,
		catColor: categoryColor,
	};
	return categoryItem;
}

/**
 * Returns the value of 'joinTaskArray' stored in the browser's local storage.
 *
 * @returns {string} - The value of 'joinTaskArray' stored in the browser's local storage.
 */
function joinTaskArrayExistInStorage() {
	return localStorage.getItem('joinTaskArray');
}

/**
 * This function enable or disable the Dropdown Menu of the category selector.
 */
function enableDisableCatList() {
	if (categoryListAndNewCategoryInputNotActive()) showCategoryList();
	else hideCategoryList();
	catListStatus = !catListStatus;
}

/**
 * This function show the category list.
 */
function showCategoryList() {
	document.getElementById('CatListDropdown').classList.remove('listD-none');
	document.getElementById('addTaskAssignedBox').classList.add('addMarginTop');
	borderBottomOffAssignedBoxButton('selectedCat');
}

/**
 * This function hide the category list.
 */
function hideCategoryList() {
	document.getElementById('CatListDropdown').classList.add('listD-none');
	document.getElementById('addTaskAssignedBox').classList.remove('addMarginTop');
	borderBottomOnAssignedBoxButton('selectedCat');
}

/**
 * Closes category list
 */
function closeCatList() {
	catListStatus ? enableDisableCatList() : null;
}

/**
 * Returns a boolean value indicating whether the category list and the new category input are not active.
 *
 * @returns {boolean} - Returns true if the category list and the new category input are not active; false otherwise.
 */
function categoryListAndNewCategoryInputNotActive() {
	return !catListStatus && !newCatInputActive;
}

/**
 * Renders the category list by iterating over the addTaskCategoryList array 
 * and generating HTML based on the category name and color.
 */
function renderCategoryList() {
	for (let i = 0; i < addTaskCategoryList.length; i++) {
		let categoryName = addTaskCategoryList[i]['category'];
		let categoryColor = addTaskCategoryList[i]['catColor'];
		if (categoryColorAvailable(categoryColor)) renderCatNameAndColor(categoryName, categoryColor, i);
		else renderCatName(categoryName, i);
	}
}

/**
 * Renders a category with both name and color.
 * 
 * @param {string} categoryName - The name of the category.
 * @param {string} categoryColor - The color associated with the category.
 * @param {number} i - The index of the category in the addTaskCategoryList array.
 */
function renderCatNameAndColor(categoryName, categoryColor, i) {
	document.getElementById('CatListDropdown').innerHTML += dropdownCategoryListHtml(categoryName, categoryColor, i);
}

/**
 * Renders a category with only name.
 * 
 * @param {string} categoryName - The name of the category.
 * @param {number} i - The index of the category in the addTaskCategoryList array.
 */
function renderCatName(categoryName, i) {
	document.getElementById('CatListDropdown').innerHTML += dropdownCategoryListHtml1(categoryName, i);
}

/**
 * This function checked, a backgroundcolor is set for this category.
 * 
 * @param {number} categoryColor - This is a number that is equal to the css color classes. Example, if the number is 1
 * the related css color class is 'color1'.
 * @returns - true, if a backgroundcolor is set. if not, it returns false.
 */
function categoryColorAvailable(categoryColor) {
	return categoryColor != '';
}

/**
 * Sets a new category to the category list. It retrieves the new category name from the selectedCatInput input element, 
 * creates a new category object, checks if the object already exists in the category list, and adds it to the 
 * addTaskCategoryList array.
 */
function setNewCategoryToList() {
	let newSetCategory = document.getElementById('selectedCatInput').value.trim();
	if (categoryFieldNotEmty(newSetCategory)) {
		let newCategoryItem = createNewCatObject(newSetCategory);
		if (!itemAlreadyInCatList(newCategoryItem)) addCategory(newCategoryItem);
		else alert('This category already exist! Please rename the category or select another color');
		newCatInputActive = false;
	}
}

/**
 * Checks whether the newSetCategory string is not empty.
 * 
 * @param {string} newSetCategory - The category name entered by the user. 
 * @returns {boolean} - Returns true if the newSetCategory is not empty; otherwise, returns false. 
 */
function categoryFieldNotEmty(newSetCategory) {
	return newSetCategory != '';
}

/**
 * Creates a new category object with the given category name and a default color.
 * 
 * @param {string} newSetCategory - The name of the new category. 
 * @returns {object} - Returns an object representing the new category. 
 */
function createNewCatObject(newSetCategory) {
	return { category: newSetCategory, catColor: catColor };
}

/**
 * Adds the new category to the addTaskCategoryList array, renders the category list, 
 * selects the new category, and enables/disables the category list.
 * 
 * @param {object} newCategoryItem - The category object to be added to the category list.
 */
function addCategory(newCategoryItem) {
	addTaskCategoryList.push(newCategoryItem);
	let newCategoryIndex = addTaskCategoryList.length - 1;
	renderCategoryList();
	selectCategory(+newCategoryIndex);
	enableDisableCatList();
}

/**
 * Checks if a new category item already exists in the add task category list.
 * 
 * @param {object} newCategoryItem - The category object to check if it already exists in the category list.
 */
function itemAlreadyInCatList(newCategoryItem) {
	let catExist = false;
	for (let i = 0; i < addTaskCategoryList.length; i++) {
		if (doubleEntry(newCategoryItem, i)) catExist = true;
	}
	return catExist;
}

/**
 * Compares the newCategoryItem object with the object at the specified index i in the addTaskCategoryList array 
 * to check if they are the same.
 * @param {object} newCategoryItem - The category object to compare.
 * @param {number} i - The index of the object in the addTaskCategoryList array to compare with. 
 * @returns {boolean} - Returns true if the objects have the same category name and category color properties; 
 * otherwise, returns false. 
 */
function doubleEntry(newCategoryItem, i) {
	return addTaskCategoryList[i]['category'] == newCategoryItem['category']
		&& addTaskCategoryList[i]['catColor'] == newCategoryItem['catColor'];
}

/**
 * This function set the input field for a new category to 'selected a category'.
 */
function resetCatSelection() {
	newCatInputActive = false;
	catListStatus = !catListStatus;
	document.getElementById('selectedCatInput').value = '';
	document.getElementById('colorSelection').classList.add('listD-none');
	document.getElementById('selectedCat').innerHTML = '';
	document.getElementById('selectedCat').innerHTML = resetCatSelectionHtml();
	// setInnerHtmlById('CatListDropdown', resetCatSelectionHtml());
}

/**
 * This function start subfunction to set the selected category (catId > 0) in the field category or open a input field to create a
 * new category (catId = 0)
 * @param {number} catId - This value is equal to the index of the category list of the selected category.
 */
function selectCategory(catId) {
	if (newCategoryCreationIsSelected(catId)) {
		setSettingsForNewCategoryInput();
	} else {
		setSettingsForExistingCategory(catId);
	}
}

/**
 * This function returns true or false for the if query. It is 'true' if the catId Value is 0.
 * @param {number} catId - This value is equal to the index of the category list of the selected category.
 * @returns - true or false for the if query
 */
function newCategoryCreationIsSelected(catId) {
	return catId == 0;
}