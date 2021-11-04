let tasks = [
    { task: "task1", isDone: false },
    { task: "task2", isDone: false },
    { task: "task3", isDone: false },
    { task: "task4", isDone: false }
];
let sectionTask = document.getElementById('task-section');
let listingTask = document.getElementById('task-Listing');


function printAddTask() {
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
    let newTask = { task: valueTask, isDone: false };
    tasks.push(newTask);
    listingTask.innerHTML = '';
    printTasks();
}
printAddTask();

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
        spanTask.innerHTML = tasks[index].task;
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
        listingTask.appendChild(liTask);
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
    listingTask.innerHTML = '';
    printTasks();
}