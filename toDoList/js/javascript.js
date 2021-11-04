let tasks = [
    { title: "task1", isDone: false },
    { title: "task2", isDone: false },
    { title: "task3", isDone: false },
    { title: "task4", isDone: false }
];
let sectionTask = document.getElementById('tasks-section');
let listTask = document.getElementById('task-list');


function printInputTask() {
    let inputTask = document.createElement('input');
    inputTask.type = "text";
    inputTask.id = "addNewTask";
    inputTask.placeholder = "New task";
    inputTask.style.padding = "2px 5px";
    inputTask.style.cursor = "pointer";
    let buttonDone = document.createElement('button');
    buttonDone.innerHTML = '<i class="fa fa-plus" aria-hidden="true"></i>';
    buttonDone.style.padding = "0.6px 2px";
    buttonDone.style.cursor = "pointer";
    buttonDone.onclick = addNewTask;
    sectionTask.prepend(buttonDone);
    sectionTask.prepend(inputTask);
}

function addNewTask(e) {
    let valueTask = document.getElementById('addNewTask').value;
    let newTask = { title: valueTask, isDone: false };
    tasks.push(newTask);
    listTask.innerHTML = '';
    printTasks();
}
printInputTask();

function printTasks() {
    for (let index = 0; index < tasks.length; index++) {
        let liTask = document.createElement('li');
        liTask.classList.add('task-border');
        liTask.id = index;
        let spanTask = document.createElement('span');
        spanTask.classList.add('spantask');
        if (tasks[index].isDone == true) {
            spanTask.style.textDecoration = "line-through";
        }
        spanTask.innerHTML = tasks[index].title;
        liTask.appendChild(spanTask);

        let buttonDone = document.createElement('button');
        buttonDone.innerText = '✅';
        buttonDone.id = index;
        buttonDone.onclick = doneTask;
        liTask.appendChild(buttonDone);

        let buttonDelete = document.createElement('button');
        buttonDelete.innerText = '❌';
        buttonDelete.id = index;
        buttonDelete.onclick = deleteTask;
        liTask.appendChild(buttonDelete);
        listTask.appendChild(liTask);
    }
}
printTasks();

function doneTask(e) {
    let id = e.target.id;
    let liter = document.getElementsByClassName('task-border')[id];
    tasks[liter.id].isDone = !tasks[liter.id].isDone;
    if (tasks[liter.id].isDone == true) {
        (document.getElementById(liter.id)).style.textDecoration = "line-through";
    } else {
        (document.getElementById(liter.id)).style.textDecoration = "none";
    }
}

function deleteTask(e) {
    let id = e.target.id;
    let liter = document.getElementsByClassName('task-border')[id];
    tasks.splice(liter.id, 1);
    listTask.innerHTML = '';
    printTasks();
}