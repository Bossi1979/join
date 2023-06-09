let greetingOnce = false;
let noDueDate = 'No due date';
let loggedInUserIndex;
let emailAddressLoggedUser;
let numberInBoard = 0;
let numberToDo = 0;
let numberInProgress = 0;
let numberAwaitingFeedback = 0;
let numberDone = 0;
let numberUrgent = 0;
let allUpcomingTasks = [];
let tasksInBoard = [];
let toDoTasks = [];
let inProgressTasks = [];
let awatingFeedbackTasks = [];
let doneTasks = [];

/**
 * Initializes the task summary and loads the data from the backend server.
 */
async function initSummary() {
	setURL('https://join.stefan-boskamp.de/smallest_backend_ever');
	await loadTask();
	resetsValues();
	selectedMenuButton(1);
	await loadAmountsForSummary();
	loadSummary();
	initSummaryMobHighlight();
}

/**
 * Resets the values.
 */
function resetsValues() {
	resetCounters();
	resetsTasksArrays();
}

/**
 * Loads the summary page
 */
function loadSummary() {
	renderSummary();
	selectsSummaryBtnSideMenu();
	greetingManagement();
	loadContributorsLetter();
	getAllValuesForOverview();
	showNextDueDate();
}

/**
 * Selets btn in side menu (to be replaced with bootstrap)
 */
function selectsSummaryBtnSideMenu() {
	selectedMenuBtnId = 0;
	selectedMenuButton(1);
}

/**
 * Calls functions to greet user and perform greeting animation on smaller screens.
 */
function greetingManagement() {
	greetUser();
	greetingAnimationSmallerScreens();
}

/**
 * Resets the counters used in the application.
 */
function resetCounters() {
	numberInBoard = 0;
	numberToDo = 0;
	numberInProgress = 0;
	numberAwaitingFeedback = 0;
	numberDone = 0;
	numberUrgent = 0;
}

/**
 * Resets the arrays that store the tasks in different stages.
 */
function resetsTasksArrays() {
	toDoTasks = [];
	inProgressTasks = [];
	awatingFeedbackTasks = [];
	doneTasks = [];
	allUpcomingTasks = [];
}

/**
 * Clears the content of the page and generates HTML for the summary view.
 */
async function renderSummary() {
	setInnerHtmlById('content', '');
	document.getElementById('content').innerHTML += generateSummaryHtml(numberInBoard, numberToDo, numberInProgress, numberAwaitingFeedback, numberDone, numberUrgent);
	greetUserInMobileUI();
}

/**
 * Depending on the time greet user being logged in
 */
function greetUser() {
	const currentTime = new Date();
	const hours = currentTime.getHours();
	const greeting = getGreeting(hours);
	setInnerHtmlById('greetUser', greeting);
	setInnerHtmlById('greetingMobile', greeting);
}

/**
 * Depending on time returns greeting
 * @param {number} hours
 * @returns string fitting greeting
 */
function getGreeting(hours) {
	if (hours >= 0 && hours < 12) return 'Good Morning';
	if (hours >= 12 && hours < 18) return 'Good Day';
	return 'Good Evening';
}

/**
 * Puts name of logged in user in mobile greeting ani
 */
function greetUserInMobileUI() {
	setInnerHtmlById('nameToBeingGreeted', userName());
}

/**
 * This function returns the name of the currently logged-in user.
 */
function userName() {
	return allUsers[loggedUser[0]].name;
}

/**
 * Makes sure that the greeting animation is only shown once
 * on mobile devices.
 */
function greetingAnimationSmallerScreens() {
	if (window.innerWidth <= 1024 && !greetingOnce) {
		document.getElementById('greetMobileOverlay').classList.remove('d-none');

		setTimeout(() => {
			document.getElementById('greetMobileOverlay').classList.add('d-none');
		}, 2000);
		greetingOnce = true;
	}
}

/**
 * This function loads the logged in user's array, gets the index of the logged in user, gets the email
 * address of the logged in user, and updates the summary.
 */
async function loadAmountsForSummary() {
	loadLoggedInUserArray();
	getLoggedUserIndex();
	getEmailAdrressOfLoggedUser();
	getAllValuesForOverview();
}

/**
 * It takes the loggedUserAtString from localStorage, parses it into a JSON object,
 * and then logs the id of the object to the console.
 */
function loadLoggedInUserArray() {
	let loggedUserAsString = localStorage.getItem('loggedUser');
	loggedUser = JSON.parse(loggedUserAsString);
}

/**
 * This function takes the logged in user's index from the array
 * and assigns it to a variable.
 */
function getLoggedUserIndex() {
	loggedInUserIndex = loggedUser[0];
}

/**
 * This function takes the index of the logged in user
 * and returns the email address of that user.
 * @param loggedInUserIndex - The index of the user in the users array.
 */
function getEmailAdrressOfLoggedUser() {
	emailAddressLoggedUser = allUsers[loggedInUserIndex].email;
	emailAddressLoggedUser == guestEmail ? (guestLoggedIn = true) : null;
}

/**
 * generic function
 * @param {object} tasks of the logged in user
 * @returns array of all tasks of the logged in user
 */
function allUserTasks(tasks) {
	return tasks.filter((task) => task.assignedTo.some((person) => emailMatch(person)));
}

/**
 * Filters an array of tasks by their workflow status.
 * @param {Array} taskArray - The array of tasks to filter.
 * @param {string} status - The workflow status to filter by.
 * @param {string} emailAddressLoggedUser
 * @return {Array} - An array of tasks that have the specified workflow status.
 */
function filterTasks(taskArray, status) {
	return taskArray.filter((task) => task.workFlowStatus === status);
}

/**
 * Returns an array of tasks with the specified priority level.
 * @param {Array} taskArray - An array of task objects.
 * @param {string} priority - The priority level to filter the tasks by.
 * @returns {Array} An array of task objects with the specified priority level
 */
function filterTasksPriority(taskArray, priority) {
	return taskArray.filter((task) => task.prio === priority);
}

/**
 * Checks if the email address of a person matches the email address of the logged in user.
 * @param {object} person - The person object to check.
 * @returns {boolean} - Returns true if the email address of the person matches the email address of the logged in user, false otherwise.
 */
function emailMatch(person) {
	return person.email === emailAddressLoggedUser;
}

/**
 * This function asynchronously calls getTasks() and getAmountTasks() functions to retrieve all the necessary task data for 
 * the overview page.
 */
async function getAllValuesForOverview() {
	getTasks();
	getAmountTasks();
}

/**
 * This function gets all tasks of the logged in user
 * and filters them by status and priority.
 */
function getTasks() {
	// tasksInBoard = allUserTasks(joinTaskArray);
	tasksInBoard = joinTaskArray;
	toDoTasks = filterTasks(joinTaskArray, 0);
	inProgressTasks = filterTasks(joinTaskArray, 1);
	awatingFeedbackTasks = filterTasks(joinTaskArray, 2);
	doneTasks = filterTasks(joinTaskArray, 3);
	allYourUrgentTasks = filterTasksPriority(joinTaskArray, 'Urgent');
}

/**
 * This function gets the amount of tasks of the logged in user
 * and filters them by status and priority.
 */
function getAmountTasks() {
	numberInBoard = joinTaskArray.length;
	numberToDo = toDoTasks.length;
	numberInProgress = inProgressTasks.length;
	numberAwaitingFeedback = awatingFeedbackTasks.length;
	numberDone = doneTasks.length;
	numberUrgent = allYourUrgentTasks.length;
}

/**
 * Shows the next due date of a task and renders it on the page.
 */
function showNextDueDate() {
	getNextDueDate();
	renderUpcomingDueDate();
}

/**
 * Extracts the next upcoming due date from the tasks in the board.
 * @returns {Date|null} The next upcoming due date, or null if no tasks with due dates are found.
 */
function getNextDueDate() {
	let tasks = tasksInBoard.filter((task) => task.dueDate != null);
	tasks.forEach((task) => {
		let convertedDate = new Date(task.dueDate);
		task.dueDate = convertedDate;
		selectAllUpcomingTasks(convertedDate, task);

		allUpcomingTasks.sort((a, b) => {
			return new Date(a.dueDate) - new Date(b.dueDate);
		});
	});
	return nextUpcomingDate();
}

/**
 * @returns {string} next due date of task in joinTaskArray
 */
function nextUpcomingDate() {
	if (allUpcomingTasks.length == 0) return;
	return allUpcomingTasks[0].dueDate;
}

/**
 * Pushes all upcoming tasks into allUpcomingTask array
 * @param {string} convertedDate
 * @param {object} task
 */
function selectAllUpcomingTasks(convertedDate, task) {
	if (convertedDate > yesterday()) {
		allUpcomingTasks.push(task);
	}
}

/**
 * Renders the next due date in the summary section
 */
function renderUpcomingDueDate() {
	setInnerHtmlById('deadlineDate', formattedDueDate());
}

/**
 *Formats due date for display
 * @returns {string}formatted date of next due date
 */
function formattedDueDate() {
	let nextDueDate = getNextDueDate();
	if (nextDueDate == undefined) return noDueDate;
	let fullDateString = new Date(nextDueDate); // full date string
	let formattedDateString = fullDateString.toLocaleDateString('en-US', {
		month: 'long',
		day: '2-digit',
		year: 'numeric',
	});
	return formattedDateString;
}

/**
 * @returns date of yesterday
 */
function yesterday() {
	let today = new Date();
	let yesterday = today.setDate(today.getDate() - 1);
	return yesterday;
}


