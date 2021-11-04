let task = [
    { task: "task1", isDone: false },
    { task: "task2", isDone: false },
    { task: "task3", isDone: false },
    { task: "task4", isDone: false }
];
let sectionTask = document.getElementById('section_task');
let mytask = document.getElementById('mytask');


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
    task.push(newTask);
    mytask.innerHTML = '';
    printTask();
}
printAddTask();

function printTask() {
    for (let index = 0; index < task.length; index++) {
        let liTask = document.createElement('li');
        liTask.classList.add('task-border');
        liTask.id = index;
        let spanTask = document.createElement('span');
        spanTask.classList.add('spantask');
        if (task[index].isDone == true) {
            spanTask.style.textDecoration = "line-through";
        }
        spanTask.innerHTML = task[index].task;
        liTask.appendChild(spanTask);

        let buttonDone = document.createElement('button');
        buttonDone.innerText = '✅';
        buttonDone.id = index;
        buttonDone.onclick = doneTask;
        liTask.appendChild(buttonDone);

        let buttonDel = document.createElement('button');
        buttonDel.innerText = '❌';
        buttonDel.id = index;
        buttonDel.onclick = deleteTask;
        liTask.appendChild(buttonDel);
        mytask.appendChild(liTask);
    }
}
printTask();

function doneTask(e) {
    let id = e.target.id;
    let liter = document.getElementsByClassName('task-border')[id];
    task[liter.id].isDone = !task[liter.id].isDone;
    if (task[liter.id].isDone == true) {
        (document.getElementById(liter.id)).style.textDecoration = "line-through";
    } else {
        (document.getElementById(liter.id)).style.textDecoration = "none";
    }
}

function deleteTask(e) {
    let id = e.target.id;
    let liter = document.getElementsByClassName('task-border')[id];
    task.splice(liter.id, 1);
    mytask.innerHTML = '';
    printTask();
}