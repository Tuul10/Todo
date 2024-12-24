let _addButton = document.getElementsByClassName("addButton")[0];
let _model = document.getElementsByClassName("model")[0];
let _addTaskSelect = document.getElementById("selectOption");

function createtask() {
  showModal();
  _addTaskSelect.value = "";
  _addTaskNameInput.value = "";
}

function showModal() {
  _model.style.display = "block";
}

_addButton.onclick = createtask;

let _addTaskNameInput = document.getElementById("task1");
let _edit_input = document.getElementById("edit_input");
let _edit_select = document.getElementById("edit_select");
let _edit_button = document.getElementsByClassName("editButton")[0];
let _grid__item = document.getElementsByClassName("grid__item")[0];
let _todo_board = document.getElementsByClassName("todo_board")[0];
let _inprogress_board = document.getElementsByClassName("inprogress_board")[0];
let _done_board = document.getElementsByClassName("done_board")[0];
let _blocked_board = document.getElementsByClassName("blocked_board")[0];
let _submitButton = document.getElementsByClassName("submitButton")[0];
let _plusNumber = document.getElementsByClassName("plusNumber");
let _editModel = document.getElementById("edit_task");

let taskId = 100;
let tasks = [];

function createTaskElement(text, id) {
  let addTaskHtml = `<div class="todo_task">
      <input type="radio" />
      <p >${text}</p>
      <img class="ipen" onclick="edittask(${id})" src="./kharandaa.png" alt="" />
      <img class="itrash" onclick="deleteTask(${id})" src="./delete.png" alt="" />
    </div>`;
  return addTaskHtml;
}
window.onclick = function (event) {
  if (event.target === _model) {
    hideModal();
  }
  if (event.target === _editModel) {
    _editModel.style.display = "none";
  }
};
function submitTask() {
  let taskText = _addTaskNameInput.value;
  let taskStatus = _addTaskSelect.value;

  if (taskText === "" || taskStatus === "") {
    alert("hoosen baina");
    return;
  }

  let task = {
    id: taskId,
    text: taskText,
    status: taskStatus,
    isDone: false,
  };
  taskId += 1;
  tasks.push(task);
  renderTask();
  _editModel.style.display = "none";
}
function submitEditTask() {
  let taskText = _edit_input.value;
  let taskStatus = _edit_select.value;

  if (taskText === "" || taskStatus === "") {
    alert("hoosen baina");
    return;
  }

  let task = {
    id: taskId,
    text: taskText,
    status: taskStatus,
    isDone: false,
  };
  taskId += 1;
  tasks.push(task);
  renderTask();
  _editModel.style.display = "none";
}
function deleteTask(id) {
  let taskIndex = tasks.findIndex((task) => {
    if (task.id === id) {
      return task;
    }
  });

  tasks.splice(taskIndex, 1);

  renderTask();
}

function edittask(id) {
  _editModel.style.display = "block";
  let taskIndex = tasks.findIndex((task) => {
    if (task.id === id) {
      return task;
    }
  });

  tasks.splice(taskIndex, 1);

  renderTask();
}

function editSumTask(id) {
  let taskOfText = _edit_input.value;
  let taskOfStatus = _edit_select.value;

  if (taskOfText === "" || taskOfStatus === "") {
    alert("hoosen baina");
    return;
  }

  let task = {
    id: taskId,
    text: taskOfText,
    status: taskOfStatus,
    isDone: false,
  };
  taskId += 1;
  tasks.push(task);

  renderTask();
  _editModel.style.display = "none";
}

function hideModal() {
  _model.style.display = "none";
}

function renderTask() {
  let todoHtml = "";
  let inprogressHtml = "";
  let doneHtml = "";
  let blockedHtml = "";
  let todoNumber = "";
  let inprogressNumber = "";
  let doneNumber = "";
  let blockedNUmber = "";

  tasks.forEach((task) => {
    let taskText = task.text;
    let taskCheck = task.isDone;
    let taskId = task.id;

    let addTaskHtml = createTaskElement(taskText, taskId, taskCheck);

    if (task.status === "todo") {
      todoHtml = todoHtml + addTaskHtml;
      todoNumber = todoNumber++ + 1;
    }
    if (task.status === "inprogress") {
      inprogressHtml = inprogressHtml + addTaskHtml;
      inprogressNumber = inprogressNumber++ + 1;
    }
    if (task.status === "done") {
      doneHtml = doneHtml + addTaskHtml;
      doneNumber = doneNumber++ + 1;
    } else if (task.status === "block") {
      blockedHtml = blockedHtml + addTaskHtml;
      blockedNUmber = blockedNUmber++ + 1;
    }
    hideModal();
  });

  _todo_board.innerHTML = todoHtml;
  _inprogress_board.innerHTML = inprogressHtml;
  _done_board.innerHTML = doneHtml;
  _blocked_board.innerHTML = blockedHtml;
  _plusNumber[0].innerHTML = todoNumber;
  _plusNumber[1].innerHTML = inprogressNumber;
  _plusNumber[2].innerHTML = doneNumber;
  _plusNumber[3].innerHTML = blockedNUmber;
}

_submitButton.onclick = submitTask;
_edit_button.onclick = editSumTask;
