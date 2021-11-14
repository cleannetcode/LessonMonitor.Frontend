"use strict"

class Application {
    constructor(
        createdTasks
    ){
        this.tasks = createdTasks;
        this.htmlWorker = new HtmlWorker();
    }

    start() { 
        this.htmlWorker.initTasks(tasks, this.deleteTask, this.toggleTaskIsDone);
        this.htmlWorker.initNewTaskButton(() => {this.addNewTask()});
    }

    addNewTask(e) {
        let newTaskName = this.htmlWorker.getNewTaskNameAndClearInput();

        if (this.isEmptyString(newTaskName))
        {
            this.htmlWorker.showError();
            return;
        }

        let newTask = new Task(newTaskName,false);
        tasks.push(newTask);

        this.htmlWorker.addNewTask(newTask, this.deleteTask, this.toggleTaskIsDone);
    };
    
    deleteTask(task) {
        let elementIndex = tasks.indexOf(task,0);
        tasks.splice(elementIndex,1);
    }

    toggleTaskIsDone(task) {
        task.isDone = !task.isDone;
    }

    isEmptyString(str) {
        return (str.length === 0 || !str.trim());
    };
}

class HtmlWorker{
    constructor() {
        this.input = document.getElementById("newTaskName");
    }

    initNewTaskButton(addNewTaskFunction) {
        let btnNewTask = document.getElementById('btnNewTask');
        btnNewTask.addEventListener("click", addNewTaskFunction);
    }

    showError() {
        this.input.classList.add('error');
        setTimeout( () => {
            this.input.classList.remove('error');
        }, 2000)
    }

    addNewTask (task, appDeleteTask, appToggleTaskIsDone) {
        let newTask = document.createElement('li');
        newTask.id = task.id;

        let newTaskName = document.createElement('span');
        newTaskName.innerText = task.name;
        if (task.isDone)
            newTaskName.classList.add("taskDone");

        let taskDoneButton = document.createElement('button');
        taskDoneButton.addEventListener("click", () => {
            appToggleTaskIsDone(task)
            this.toggleTaskIsDone(task);
        });

        taskDoneButton.innerText = 'Done';

        let taskDeleteButton = document.createElement('button');

        taskDeleteButton.addEventListener("click", () => {
            appDeleteTask(task); 
            this.deleteTask(task);
        });

        taskDeleteButton.innerText = 'Delete';

        newTask.append(newTaskName);
        newTask.append(taskDoneButton);
        newTask.append(taskDeleteButton);

        const rootTaskElement = document.getElementById('tasks');
        rootTaskElement.append(newTask);
    }

    initTasks (tasks, appDeleteTask, appToggleTaskIsDone ) {
        for (let i = 0; i < tasks.length; i++) {
            this.addNewTask(tasks[i], appDeleteTask, appToggleTaskIsDone)
        }
    };

    getNewTaskNameAndClearInput = function() {
        let newTaskName = this.input.value;
        this.input.value = "";
        return newTaskName;
    }

    toggleTaskIsDone = function(task) {
        let taskName = document.querySelector(`#${task.id} > span`);
        taskName.classList.toggle("taskDone");
    }

    deleteTask = function(task) {
        let htmlElement = document.getElementById(task.id);
        htmlElement.remove();
    }
}

class Task {
    constructor(
        name, 
        isDone
    )
    {
        this.name = name;
        this.isDone = isDone;
        this.id = this.createUniqueId();
    }
    
    createUniqueId()
    {
        return "task-" + Math.random().toString(16).slice(2);
    };
}

let tasks = [
        new Task('task 1',false),
        new Task('task 2',true),
        new Task('task 3',false),
        new Task('task 4',false)
    ];

var app = new Application(tasks);
app.start();


