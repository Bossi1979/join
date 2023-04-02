/**
 * this function returns the basic board html string
 * @returns - basic board html string
 */
function boardHtml() {
    return /*html*/ `
    <div class="boardContainer">
			<div class="boardOverlay">
			<span class="kanbanboardTitleSummary"> Kanban Project Management Tool </span>
				<div class="boardHeadline">
					<span>Board</span>
				</div>
				<div class="inputOutContainer">
					<div class="inputContainer">
						<div class="inputInContainer">
							<div class="inputFontContainer">
								<input type="text" id="searchField" required placeholder="Find Task" onfocus="startSearch(event)" autocomplete="off" />
							</div>
							<div class="vector"></div>
							<img src="./assets/img/search_logo.png" />
						</div>
					</div>
					<button class="addTaskButton" onclick="showAddTaskPopupWindow(0)">
						<span>Add task</span>
						<div class="plusOutContainer">
							<img src="./assets/img/plus_logo_white.png" />
						</div>
					</button>
				</div>
			</div>
			<div class="canbanBoard" id="canbanBoard">
				<div class="columnBoard">
					<div class="toDoAreaHeader">
						<span>To do</span>
						<button class="menuPlusButton" onclick="showAddTaskPopupWindow(0)"></button>
					</div>
					<div class="canbanContainer dragArea" id="dropArea0" ondrop="moveTo(0); removeHighlight('dropArea0')" ondragleave="removeHighlight('dropArea0')" ondragover="allowDrop(event); highlight('dropArea0')">
						<div id="toDoDiv"></div>
					</div>
				</div>
				<div class="columnBoard">
					<div class="inProgressAreaHeader">
						<span>In progress</span>
						<button class="menuPlusButton" onclick="showAddTaskPopupWindow(1)"></button>
					</div>
					<div class="canbanContainer dragArea" id="dropArea1" ondrop="moveTo(1); removeHighlight('dropArea1')" ondragleave="removeHighlight('dropArea1')" ondragover="allowDrop(event); highlight('dropArea1')">
						<div id="progressDiv"></div>
					</div>
				</div>
				<div class="columnBoard">
					<div class="awaitingFeedbackAreaHeader">
						<span>Awaiting Feedback</span>
						<button class="menuPlusButton" onclick="showAddTaskPopupWindow(2)"></button>
					</div>
					<div class="canbanContainer dragArea" id="dropArea2" ondrop="moveTo(2); removeHighlight('dropArea2')" ondragleave="removeHighlight('dropArea2')" ondragover="allowDrop(event); highlight('dropArea2')">
						<div id="awaitingDiv"></div>
					</div>
				</div>
				<div class="columnBoard">
					<div class="doneAreaHeader">
						<span>Done</span>
						<button class="menuPlusButton" onclick="showAddTaskPopupWindow(3)"></button>
					</div>
					<div class="canbanContainer dragArea" id="dropArea3" ondrop="moveTo(3); removeHighlight('dropArea3')" ondragleave="removeHighlight('dropArea3')" ondragover="allowDrop(event); highlight('dropArea3')">
						<div id="doneDiv"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="shadowOverlay d-none" id="boardPopup" onclick="disablePopupWindow()"></div>`;
}

/**
 * It takes the index of a task in the joinTaskArray, and then it renders the assignedTo property of
 * that task as HTML.
 * @param taskIndex - the index of the task in the joinTaskArray
 */
function renderAssignToHtml(taskIndex) {
    let assignedList = joinTaskArray[taskIndex]['assignedTo'];
    let divId = 'contributorsList' + taskIndex;
    document.getElementById(divId).innerHTML = '';
    if (assignedList.length > 0) {
        if (assignedList.length <= 3) {
            for (let i = 0; i < assignedList.length; i++) {
                let name = assignedList[i].name;
                let nameLetters = assignedList[i].firstSecondLetter;
                let assignToColor = colorIndex[assignedList[i].colorIndex];
                let assignToTitle = name;
                document.getElementById(divId).innerHTML += /*html*/ `
                <div class='contributorsLogo' title='${assignToTitle}' style='background-color: ${assignToColor}'>
                    <span>${nameLetters}</span>
                </div>`;
            }
        } else {
            for (let i = 0; i < 3; i++) {
                let name = assignedList[i].name;
                let nameLetters = assignedList[i].firstSecondLetter;
                let assignToColor = colorIndex[assignedList[i].colorIndex];
                let assignToTitle = name;
                document.getElementById(divId).innerHTML += /*html*/ `
                <div class='contributorsLogo' title='${assignToTitle}' style='background-color: ${assignToColor}'>
                    <span>${nameLetters}</span>
                </div>`;
            }
            let assignedListLength = assignedList.length - 3;
            document.getElementById(divId).innerHTML += /*html*/ `
            <div class='contributorsLogo' style='background-color:#000000; color:white'>
                <span>+${assignedListLength}</span>
            </div>`;
        }
    }
}

/**
 * this function returns the html code for each todo task card.
 * @param {number} arrayIndex - is the index number of the workStatus0Array.
 * @returns - the html string for each todo task card.
 */
function toDoCardHtml(arrayIndex) {
    let cardTitle = workStatus0Array[arrayIndex]['cardTitle'];
    let cardDescription = workStatus0Array[arrayIndex]['cardDescription'];
    let cardCategory = workStatus0Array[arrayIndex]['cardCategory'];
    let taskIndex = workStatus0Array[arrayIndex]['taskIndex'];
    let workStatusArrayNo = 0;
    let subTasksAmount = workStatus0Array[arrayIndex]['subTasks'].length;
    let subTaskDoneAmount = determindSubTasksDone(arrayIndex, workStatusArrayNo);
    let percentDone = calculatePercentage(subTaskDoneAmount, subTasksAmount);
    let donebarClass = 'class="doneBar"';
    if (subTasksAmount == 0) donebarClass = 'class="doneBar d-none"';
    let doneId = 'dBar' + taskIndex;
    return /*html*/ `
        <div class='taskBackground' id='taskCard${taskIndex}' draggable='true' ondragstart='startDrag(${taskIndex})' onclick='enablePopupWindow(${taskIndex}); renderPopupTaskCardHtml(${taskIndex})'>
            <div class='taskContainer'>
                <div class='boardTaskCategory' id='toDoCardCat${arrayIndex}'>
                    <span>${cardCategory}</span>
                </div>
                <div class='taskHeadline'>
                    <span class='taskHeadlineContent'>${cardTitle}</span>
                    <span class='taskContent'>${cardDescription}</span>
                </div>
                <div  ${donebarClass} id= ${doneId}>
                    <div class='doneBarOuter' id='doneBarOuter${taskIndex}'>
                        <div style='background-color: #29ABE2; height: 8px; width: ${percentDone}%;' id='doneBar${taskIndex}'></div>
                    </div>
                    <span>${subTaskDoneAmount}/${subTasksAmount} Done</span>
                </div>
                <div class='contributorsPrio'>
                    <div class='contributorsLogoContainer' id='contributorsList${taskIndex}'>
                       
                    </div>
                    <div class='prio'>
                        <img src='./assets/img/low.png' id='contributorsPrioIcon${taskIndex}'>
                    </div>
                </div>
            </div>
        </div>`;
}

/**
 * this function returns the html code for each in progress task card.
 * @param {number} arrayIndex - is the index number of the workStatus1Array.
 * @returns - the html string for each in progress task card
 */
function inProgressHtml(arrayIndex) {
    let cardTitle = workStatus1Array[arrayIndex]['cardTitle'];
    let cardDescription = workStatus1Array[arrayIndex]['cardDescription'];
    let cardCategory = workStatus1Array[arrayIndex]['cardCategory'];
    let taskIndex = workStatus1Array[arrayIndex]['taskIndex'];
    let workStatusArrayNo = 1;
    let subTasksAmount = workStatus1Array[arrayIndex]['subTasks'].length;
    let subTaskDoneAmount = determindSubTasksDone(arrayIndex, workStatusArrayNo);
    let percentDone = calculatePercentage(subTaskDoneAmount, subTasksAmount);
    let donebarClass = 'class="doneBar"';
    if (subTasksAmount == 0) donebarClass = 'class="doneBar d-none"';
    let doneId = 'dBar' + taskIndex;
    return /*html*/ `
            <div class='taskBackground' id='taskCard${taskIndex}' draggable='true' ondragstart='startDrag(${taskIndex})' onclick='enablePopupWindow(${taskIndex}); renderPopupTaskCardHtml(${taskIndex})'>
                <div class='taskContainer'>
                    <div class='boardTaskCategory' id='progressCard${arrayIndex}'>
                        <span>${cardCategory}</span>
                    </div>
                    <div class='taskHeadline'>
                        <span class='taskHeadlineContent'>${cardTitle}</span>
                        <span class='taskContent'>${cardDescription}</span>
                    </div>
                    <div ${donebarClass} id= ${doneId}>
                        <div class='doneBarOuter' id='doneBarOuter${taskIndex}'>
                            <div style='background-color: #29ABE2; height: 8px; width: ${percentDone}%;' id='doneBar${taskIndex}'></div>
                        </div>
                        <span>${subTaskDoneAmount}/${subTasksAmount} Done</span>
                    </div>
                    <div class='contributorsPrio'>
                        <div class='contributorsLogoContainer' id='contributorsList${taskIndex}'>
                           
                        </div>
                        <div class='prio'>
                            <img src='./assets/img/low.png' id='contributorsPrioIcon${taskIndex}'>
                        </div>
                    </div>
                </div>
            </div>`;
}

/**
 * this function returns the html code for each awaitingFeedback task card.
 * @param {number} arrayIndex - is the index number of the workStatus2Array.
 * @returns - the html string for each awaitingFeedback task card
 */
function awaitingFeedbackHtml(arrayIndex) {
    let cardTitle = workStatus2Array[arrayIndex]['cardTitle'];
    let cardDescription = workStatus2Array[arrayIndex]['cardDescription'];
    let cardCategory = workStatus2Array[arrayIndex]['cardCategory'];
    let taskIndex = workStatus2Array[arrayIndex]['taskIndex'];
    let workStatusArrayNo = 2;
    let subTasksAmount = workStatus2Array[arrayIndex]['subTasks'].length;
    let subTaskDoneAmount = determindSubTasksDone(arrayIndex, workStatusArrayNo);
    let percentDone = calculatePercentage(subTaskDoneAmount, subTasksAmount);
    let doneId = 'dBar' + taskIndex;
    let donebarClass = 'class="doneBar"';
    if (subTasksAmount == 0) donebarClass = 'class="doneBar d-none"';
    return /*html*/ `
        <div class='taskBackground' id='taskCard${taskIndex}' draggable='true' ondragstart='startDrag(${taskIndex})' onclick='enablePopupWindow(${taskIndex}); renderPopupTaskCardHtml(${taskIndex})'>
            <div class='taskContainer'>
                <div class='boardTaskCategory' id='feedbackCard${arrayIndex}'>
                    <span>${cardCategory}</span>
                </div>
                <div class='taskHeadline'>
                    <span class='taskHeadlineContent'>${cardTitle}</span>
                    <span class='taskContent'>${cardDescription}</span>
                </div>
                <div ${donebarClass} id= ${doneId}>
                    <div class='doneBarOuter' id='doneBarOuter${taskIndex}'>
                        <div style='background-color: #29ABE2; height: 8px; width: ${percentDone}%;' id='doneBar${taskIndex}'></div>
                    </div>
                    <span>${subTaskDoneAmount}/${subTasksAmount} Done</span>
                </div>
                <div class='contributorsPrio'>
                    <div class='contributorsLogoContainer' id='contributorsList${taskIndex}'>
                        
                    </div>
                    <div class='prio'>
                        <img src='./assets/img/low.png' id='contributorsPrioIcon${taskIndex}'>
                    </div>
                </div>
            </div>
        </div>`;
}

/**
 * this function returns the html code for each done task card.
 * @param {number} arrayIndex - is the index number of the workStatus3Array.
 * @returns - the html string for each done task card
 */
function doneHtml(arrayIndex) {
    let cardTitle = workStatus3Array[arrayIndex]['cardTitle'];
    let cardDescription = workStatus3Array[arrayIndex]['cardDescription'];
    let cardCategory = workStatus3Array[arrayIndex]['cardCategory'];
    let taskIndex = workStatus3Array[arrayIndex]['taskIndex'];
    let workStatusArrayNo = 3;
    let subTasksAmount = workStatus3Array[arrayIndex]['subTasks'].length;
    let subTaskDoneAmount = determindSubTasksDone(arrayIndex, workStatusArrayNo);
    let percentDone = calculatePercentage(subTaskDoneAmount, subTasksAmount);
    let doneId = 'dBar' + taskIndex;
    let donebarClass = 'class="doneBar"';
    if (subTasksAmount == 0) donebarClass = 'class="doneBar d-none"';
    return /*html*/ `
        <div class='taskBackground' id='taskCard${taskIndex}' draggable='true' ondragstart='startDrag(${taskIndex})' onclick='enablePopupWindow(${taskIndex}); renderPopupTaskCardHtml(${taskIndex})'>
            <div class='taskContainer'>
                <div class='boardTaskCategory' id='doneCard${arrayIndex}'>
                    <span>${cardCategory}</span>
                </div>
                <div class='taskHeadline'>
                    <span class='taskHeadlineContent'>${cardTitle}</span>
                    <span class='taskContent'>${cardDescription}</span>
                </div>
                <div ${donebarClass} id= ${doneId}>
                    <div class='doneBarOuter' id='doneBarOuter${taskIndex}'>
                        <div style='background-color: #29ABE2; height: 8px; width: ${percentDone}%;' id='doneBar${taskIndex}'></div>
                    </div>
                    <span>${subTaskDoneAmount}/${subTasksAmount} Done</span>
                </div>
                <div class='contributorsPrio'>
                    <div class='contributorsLogoContainer' id='contributorsList${taskIndex}'>
                        
                    </div>
                    <div class='prio'>
                        <img src='./assets/img/low.png' id='contributorsPrioIcon${taskIndex}'>
                    </div>
                </div>
            </div>
        </div>`;
}

/**
 * Renders the HTML code for a button to move tasks on mobile devices.
 * @param {string} buttonText - The text to be displayed on the button.
 * @param {string} newTaskStatus - The new status of the task being postponed.
 * @param {number} taskIndex - The index of the task being moved.
 */
function renderMoveBtnMobilHtml(buttonText, newTaskStatus, taskIndex) {
    document.getElementById('moveBtnMobil').innerHTML += /*html*/ `
    <button onclick='moveMobilTaskTo(${taskIndex}, ${newTaskStatus})'>
        ${buttonText}
    </button>`;
}

/**
 * It renders a popup window with a form to edit a task.
 * @param taskIndex - the index of the task in the array of tasks
 */
async function renderEditTaskCardHtml(taskIndex) {
    document.getElementById('boardPopup').innerHTML = '';
    document.getElementById('boardPopup').innerHTML = /*html*/ `
        <div class='boardTaskCardPopup' onclick='stopClose(event)'>
        <img class='close_logo' src='./assets/img/close_logo.png' onclick='disablePopupWindow()'>
            <div class='boardTaskCardInnerContainer'>
                <div class='boardEditTitleContainer'>
                    <span>Title</span>
                    <input type='text' placeholder='Enter a title' id='boardEditTitle'>
                    <span class="requiredText" id="titleEditReq">This field is required</span>
                </div>
                <div class='boardEditDescriptionContainer'>
                    <span>Descripten</span>
                    <textarea name='Description'  cols='30' rows='10' placeholder='Enter Descriptiom' id='boardEditDecription'></textarea>
                    <span class="requiredText" id="descEditReq">This field is required</span>
                </div>
                <div class='boardEditDateContainer'>
                    <span>Due Date</span>
                    <input type='date' id='boardEditDueDate'>
                </div>
                <div class='editTaskCardPrio'>
                    <h3>Prio</h3>
                    <div class='editTaskCardPrioBtn'>
                        <div class='addTaskUrgent' id='addTaskUrgent' onclick='addPrio(0); prioStatusChange(0)'>
                            <span id='addTaskUrgentSpan'>Urgent</span>
                            <img id='addTaskUrgentImg' src='./assets/img/urgent_arrows.png'>
                        </div>
                        <div class='addTaskMedium' id='addTaskMedium' onclick='addPrio(1); prioStatusChange(1)'>
                            <span id='addTaskMediumSpan'>Medium</span>
                            <img id='addTaskMediumImg' src='./assets/img/prio_medium.png'>
                        </div>
                        <div class='addTaskLow' id='addTaskLow' onclick='addPrio(2); prioStatusChange(2)'>
                            <span id='addTaskLowSpan'>Low</span>
                            <img id='addTaskLowImg' src='./assets/img/prio_low.png'>
                        </div>
                    </div>
                    <span class='requiredText' id='titleReq'>This field is required</span>
                </div>
                <div class='boardAddTaskAssignedBox' id='addTaskAssignedBox'>
                        <h3>Assigned to</h3>
                        <button id='addTaskAssignedButton' onclick='enableDisableAssignList()'>
                        <input disabled onclick='doNotCloseOnClick(event)' id='selectedAssign' name='selectedAssign' class='inputselectedAssign' placeholder='Select contacts to assign' autocomplete='off'/>
                        <div id='assignToCancelConfirmImgContainer' class='assignToCancelConfirmImgContainer d-none'>
                            <img onclick='assignBoxBackToDefaultMode(), enableAssignList()' class='assignToCancelIcon' src='assets/img/cancel-black.png' alt='cancel'/>
                            <img class='assignToDeviderIcon' src='assets/img/bnt_divider.png' />
                            <img onclick='frontEndDeveloper()' class='assignToCheckIcon' src='assets/img/akar-icons_check.png' alt='confirm'/>
                        </div>
                        <img id='assignDropDownImg' src='assets/img/Vector 2.png' class='dropdownImg' />
                        </button>
                        <span id='assignReq'>This field is required</span>
                        <div id='badgesTaskForce' class='badgesTaskForce'></div>
                        <ul class='addTaskAssignList listD-none' id='dropdown2'>
                        <li onclick='assigendContactEmail()' class='inviteNewContacts'>
                            Invite new contacts<img class='assignInviteNewContactImage' src='assets/img/assigned_inviteNewContact.png'/>
                        </li>
                    </div>
            </div>

            <div class="confimationDiv" id="confimationDiv">
                <div class="taskAddedToBoardContainer">
                    <span id='confimationText'></span>
                    <img src="./assets/img/img_board_w.png" />
                </div>
            </div>

            <div class="btnsContainerboardTaskCardPopup">
                    <button class='editTaskOkBtn' onclick='getTaskChanges(${taskIndex})'>Ok <img src='./assets/img/akar-icons_check_white.png' ></button>
                    <button class='deleteButton d-none' id='deleteButton' onclick='deleteButton(${taskIndex})'> 
                        Delete <img src='./assets/img/akar-icons_check_white.png' >
                    </button>
                    
                </div>
                    
        </div>`;
}



