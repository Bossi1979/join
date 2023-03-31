let menuSelectorStyles = [
	{
		background: 'background-color: #091931;',
		disabledBackground: 'background-color: unset;',
		color: 'color: #FFFFFF;',
		color1: 'color: default;',
		enableImg: 'imgDisplay',
		disableImg: 'imgDisplayNone',
	},
	{
		menuName: 'btn_summary_menu',
		img1Id: 'imgSummary1',
		img2Id: 'imgSummary2',
		url: './summary.html',
	},
	{
		menuName: 'btn_board_menu',
		img1Id: 'imgBoard1',
		img2Id: 'imgBoard2',
		url: './board.html',
	},
	{
		menuName: 'btn_add_task_menu',
		img1Id: 'imgAddTask1',
		img2Id: 'imgAddTask2',
		url: './add_task.html',
	},
	{
		menuName: 'btn_contacts_menu',
		img1Id: 'imgContacts1',
		img2Id: 'imgContacts2',
	},
	{
		menuName: 'btnLegalNotice',
		url: './legalNotice.html',
	},
	{
		menuName: 'btnLegalNotice1',
		url: './legalNotice.html'
	}
];

let colorUserIndex = ['#02CF2F', '#EE00D6', '#0190E0', '#FF7200', '#FF2500', '#AF1616', '#FFC700', '#3E0099', '#462F8A', '#FF7A00', '#000000'];
let selectedMenuBtnId;
let includeAttribute = 'w3-include-html';
let desktopView;
let viewchange = false;
let clickIndex = 0;
let logOutMenu = false;


function initLoginStart() {
	window.location.href = 'loginDesk.html';
}

/**
 * initializes the init function
 */
async function loadApplicableSummary() {
	init();
}

/**
 * is an async function that includes HTML files and initializes a summary. 
 */
async function init() {
	await includeHTML();
	initSummary();
}

/**
 * is also an async function that gets elements with the specified attribute, fetches the file 
 * specified in the attribute, and displays the contents of the file if the request was successful.
 */
async function includeHTML() {
	let includeElements = document.querySelectorAll(`[${includeAttribute}]`);
	for (let i = 0; i < includeElements.length; i++) {
		const element = includeElements[i];
		file = element.getAttribute(`${includeAttribute}`);
		let resp = await fetch(file);
		if (resp.ok) element.innerHTML = await resp.text();
		else element.innerHTML = 'Page not found';
	}
}

/**
 * Sets the style of the selected menu button and updates the selectedMenuBtnId variable.
 * If the selected menu is the legal notice and is not shown, sets the style of the menu button and
 * updates the selectedMenuBtnId variable accordingly.
 * 
 * @param {string} menuId - The id of the selected menu button. 
 */
function selectedMenuButton(menuId) {
	if (selectedMenuNotShownAndNotLegalNotice(menuId) && selectedMenuBtnId != menuId) setMenuBtnStyle(menuId);
	if (selectedMenuIsLegalNoticeAndNotShown && selectedMenuBtnId != menuId) setLegalNoticeBtnStyle(menuId);
	selectedMenuBtnId = menuId;
	enableDisableScrollContent();
}

/**
 * changes the overflow style of the content based on which menu button is selected.
 */
function enableDisableScrollContent() {
	if (selectedMenuBtnId == 4) document.getElementById('content').style = 'overflow: hidden; overflow-y: hidden;';
	if (selectedMenuBtnId == 3 || selectedMenuBtnId == 2) document.getElementById('content').style = 'overflow: hidden; overflow-y: scroll;';
}

/**
 * Checks if the currently selected menu button is not equal to the new menu button being passed in as `menuId`, 
 * and if the new menu button is not equal to 5 (which is likely the ID for the legal notice menu button). 
 *
 * @param {number} menuId - The ID of the new menu button being selected.
 * @returns {boolean} - True if the selected menu button is not equal to the new menu button and the new menu button 
 * is not the legal notice button (ID 5), false otherwise.
 */
function selectedMenuNotShownAndNotLegalNotice(menuId) {
	return selectedMenuBtnId != menuId && menuId != 5;
}

/**
 * Check selected menu is legal notice.
 * 
 * @param {number} menuId - Number equal to the selected menue.
 * @returns  true if the selected menu is not shown and not the legal notice button or if it is the legal notice button 
 * and not shown, respectively.
 */
function selectedMenuIsLegalNoticeAndNotShown(menuId) {
	return menuId == 5 && selectedMenuBtnId != 5;
}

/**
 * sets the style of the selected menu button, including the background color and image, and deselects the previously 
 * selected menu button if it is different. 
 * 
 * @param {number} menuId - Number equal to the selected menue.
 */
function setMenuBtnStyle(menuId) {
	let menuBtnId = menuSelectorStyles[menuId]['menuName'];
	let img1Id = menuSelectorStyles[menuId]['img1Id'];
	let img2Id = menuSelectorStyles[menuId]['img2Id'];
	legalNoticeNotSelectedStyleAdd(menuBtnId, img1Id, img2Id);
	if (otherMenuBtnPreSelected()) deselectMenuButton(selectedMenuBtnId);
	if (!document.querySelector('.mobileContent')) setMenuBtnStyleSlider(menuId);
}

/**
 * Sets the style of the selected menu button if the menu is accessed through the slider.
 * 
 * @param {number} menuId - Number equal to the selected menue.
 */
function setMenuBtnStyleSlider(menuId) {
	let menuBtnId = menuSelectorStyles[menuId]['menuName'];
	let img1Id = menuSelectorStyles[menuId]['img1Id'];
	let img2Id = menuSelectorStyles[menuId]['img2Id'];
	menuBtnId = menuBtnId + '1';
	img1Id = img1Id + '1';
	img2Id = img2Id + '1';
	legalNoticeNotSelectedStyleAdd(menuBtnId, img1Id, img2Id);
}

/**
 * Deselects the menu button if it's accessed through the slider. 
 * 
 * @param {number} menuId - Number equal to the selected menue. 
 */
function deselectMenuButtonSlider(menuId) {
	let menuBtnId = menuSelectorStyles[menuId]['menuName'];
	let img1Id = menuSelectorStyles[menuId]['img1Id'];
	let img2Id = menuSelectorStyles[menuId]['img2Id'];
	menuBtnId = menuBtnId + '1';
	img1Id = img1Id + '1';
	img2Id = img2Id + '1';
	if (legalNoticeNotSelected()) legalNoticeNotSelectedStyleRemove(menuBtnId, img1Id, img2Id);
	if (legalNoticeSelected()) document.getElementById(menuBtnId).style = menuSelectorStyles[0]['disabledBackground'];
}

/**
 * Removes the style of the legal notice button if it is not selected. 
 * @param {string} menuBtnId - The id of the menu button element. 
 * @param {string} img1Id - The id of the first image element. 
 * @param {string} img2Id - The id of the second image element.
 */
function legalNoticeNotSelectedStyleRemove(menuBtnId, img1Id, img2Id) {
	document.getElementById(menuBtnId).style = menuSelectorStyles[0]['disabledBackground'];
	document.getElementById(menuBtnId + '_text').style = menuSelectorStyles[0]['color1'];
	document.getElementById(img1Id).classList.remove(menuSelectorStyles[0]['disableImg']);
	document.getElementById(img2Id).classList.remove(menuSelectorStyles[0]['enableImg']);
}

/**
 * Adds the style of the legal notice button if it is not selected.
 * @param {string} menuBtnId - The id of the menu button element. 
 * @param {string} img1Id - The id of the first image element. 
 * @param {string} img2Id - The id of the second image element.
 */
function legalNoticeNotSelectedStyleAdd(menuBtnId, img1Id, img2Id) {
	document.getElementById(menuBtnId).style = menuSelectorStyles[0]['background'];
	document.getElementById(menuBtnId + '_text').style = menuSelectorStyles[0]['color'];
	document.getElementById(img1Id).classList.add(menuSelectorStyles[0]['disableImg']);
	document.getElementById(img2Id).classList.add(menuSelectorStyles[0]['enableImg']);
}

/**
 * Returns the id of the selected menu.
 * 
 * @returns returns the id of the previously selected menu button.
 */
function otherMenuBtnPreSelected() {
	return selectedMenuBtnId;
}

/**
 * sets the style of the legal notice button. 
 *  @param {string} menuBtnId - The id of the menu button element. 
 */
function setLegalNoticeBtnStyle(menuId) {
	let menuBtnId = menuSelectorStyles[menuId]['menuName'];
	let menuBtnId2 = menuSelectorStyles[menuId + 1]['menuName'];
	if (menuBtnId) document.getElementById(menuBtnId).style = menuSelectorStyles[0]['background'];
	if (menuBtnId2 == 'btnLegalNotice1') document.getElementById(menuBtnId2).style = menuSelectorStyles[0]['background'];
	if (otherMenuBtnPreSelected()) deselectMenuButton(selectedMenuBtnId);
}

/**
 * Deselects the menu button, removes the style of the legal notice button if it is not selected, and removes the slider style.
 * @param {string} menuBtnId - The id of the menu button element.
 */
function deselectMenuButton(menuId) {
	let menuBtnId = menuSelectorStyles[menuId]['menuName'];
	let img1Id = menuSelectorStyles[menuId]['img1Id'];
	let img2Id = menuSelectorStyles[menuId]['img2Id'];
	if (legalNoticeNotSelected()) legalNoticeNotSelectedStyleRemove(menuBtnId, img1Id, img2Id);
	if (legalNoticeSelected()) document.getElementById(menuBtnId).style = menuSelectorStyles[0]['disabledBackground'];
	if (!document.querySelector('.mobileContent')) deselectMenuButtonSlider(menuId);
}

/**
 * Check legal notice not selected.
 * @returns - False if the selected menu is not legal notice, otherwise true.
 */
function legalNoticeNotSelected() {
	return selectedMenuBtnId != 5;
}

/**
 * Check legal notice selected.
 * @returns - True if the selected menu is not legal notice, otherwise false. 
 */
function legalNoticeSelected() {
	return selectedMenuBtnId == 5;
}

/**
 * This function renders various elements of the web application, including a summary, a board, and a legal notice.
 */
function logOutBtn() {
	document.getElementById('logOut').classList.toggle('logOutOn');
	logOutMenu = !logOutMenu;
}

/**
 * This function toggles the class logOutOn on an element with ID 
 */
function logOut() {
	window.location.href = './index.html';
	localStorage.removeItem('loggedUser');
}

/**
 * This function sets the background color and text of an element with ID 
 */
function loadContributorsLetter() {
	let colorIndex = allUsers[loggedUser[0]].colorIndex;
	document.getElementById('contributorsLogoHeadder').style = `background:${colorUserIndex[colorIndex]}`;
	document.getElementById('contributorsLogoHeadderLetters').innerHTML = `<p style='color:white'>${allUsers[loggedUser].firstSecondLetter}</p>`;
}

/**
 * Initializes the highlighting of the mobile summary button by adding the 'initMobHighlight' class to it,
 * and removes the class from the other mobile buttons.
 */
function initSummaryMobHighlight() {
	document.getElementById('initSummaryMob').classList.add('initMobHighlight');
	document.getElementById('initBoardMob').classList.remove('initMobHighlight');
	document.getElementById('initAddTaskMob').classList.remove('initMobHighlight');
	document.getElementById('initContactsMob').classList.remove('initMobHighlight');
}

/**
 * Initializes the highlighting of the mobile board button by adding the 'initMobHighlight' class to it,
 * and removes the class from the other mobile buttons.
 */
function initBoardMobHighlight() {
	document.getElementById('initSummaryMob').classList.remove('initMobHighlight');
	document.getElementById('initBoardMob').classList.add('initMobHighlight');
	document.getElementById('initAddTaskMob').classList.remove('initMobHighlight');
	document.getElementById('initContactsMob').classList.remove('initMobHighlight');
}

/**
 * Initializes the highlighting of the mobile addTask button by adding the 'initMobHighlight' class to it,
 * and removes the class from the other mobile buttons.
 */
function initAddTaskMobHighlight() {
	document.getElementById('initSummaryMob').classList.remove('initMobHighlight');
	document.getElementById('initBoardMob').classList.remove('initMobHighlight');
	document.getElementById('initAddTaskMob').classList.add('initMobHighlight');
	document.getElementById('initContactsMob').classList.remove('initMobHighlight');
}

/**
 * Initializes the highlighting of the mobile contacts button by adding the 'initMobHighlight' class to it,
 * and removes the class from the other mobile buttons.
 */
function initContactsMobHighlight() {
	document.getElementById('initSummaryMob').classList.remove('initMobHighlight');
	document.getElementById('initBoardMob').classList.remove('initMobHighlight');
	document.getElementById('initAddTaskMob').classList.remove('initMobHighlight');
	document.getElementById('initContactsMob').classList.add('initMobHighlight');
}

window.onclick = function(event) {
	let modal = document.getElementById('logOut');
	if (event.target !== modal && logOutMenu){
		clickIndex++;
	}
    if (logOutMenu && clickIndex > 1) {
		logOutBtn();
		clickIndex = 0;
    }
}