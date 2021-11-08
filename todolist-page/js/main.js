function Application(){
    const tasks = [
        new Task('task 1',false),
        new Task('task 2',true),
        new Task('task 3',false),
        new Task('task 4',false)
    ];

    let $this = this;
    let htmlWorker = new HtmlWorker();

    this.start = function(){
        htmlWorker.initTasks(tasks, this.deleteTask, this.toggleTaskIsDone);
        htmlWorker.initNewTaskButton(this.addNewTask);
    }

    this.addNewTask = function()
    {
        let newTaskName = htmlWorker.getNewTaskName();

        if (isEmptyString(newTaskName))
        {
            htmlWorker.showError();
            return;
        }

        let newTask = new Task(newTaskName,false);
        tasks.push(newTask);

        htmlWorker.addNewTask(newTask, $this.deleteTask, $this.toggleTaskIsDone);
    }
    
    this.deleteTask = function(task) {
        let elementIndex = tasks.indexOf(task,0);
        tasks.splice(elementIndex,1);
    }

    this.toggleTaskIsDone = function(task) {
        task.isDone = !task.isDone;
    }

    function isEmptyString(str) {
        return (str.length === 0 || !str.trim());
    };
}

function HtmlWorker(){
    let $this = this;
    let input = document.getElementById("newTaskName");

    this.initNewTaskButton = function(addNewTaskFunction)
    {
        let btnNewTask = document.getElementById('btnNewTask');
        btnNewTask.addEventListener("click", addNewTaskFunction);
    }

    this.showError = function()
    {
        input.classList.add('error');
        setTimeout(function() {
            input.classList.remove('error');
        }, 2000)
    }

    this.addNewTask = function(task, appDeleteTask, appToggleTaskIsDone)
    {
        let newTask = document.createElement('li');
        newTask.id = task.id;

        let newTaskName = document.createElement('span');
        newTaskName.innerText = task.name;
        if (task.isDone)
            newTaskName.classList.add("taskDone");

        let taskDoneButton = document.createElement('button');
        
        taskDoneButton.addEventListener("click", function(){
            appToggleTaskIsDone(task)
            $this.toggleTaskIsDone(task);
        });

        taskDoneButton.innerText = 'Done';

        let taskDeleteButton = document.createElement('button');

        taskDeleteButton.addEventListener("click", function(){
            appDeleteTask(task); 
            $this.deleteTask(task);
        });

        taskDeleteButton.innerText = 'Delete';

        newTask.append(newTaskName);
        newTask.append(taskDoneButton);
        newTask.append(taskDeleteButton);

        const rootTaskElement = document.getElementById('tasks');
        rootTaskElement.append(newTask);
    }

    this.initTasks = function(tasks, appDeleteTask, appToggleTaskIsDone ){
        for (let i = 0; i < tasks.length; i++) {
            this.addNewTask(tasks[i], appDeleteTask, appToggleTaskIsDone)
        }
    };

    this.getNewTaskName = function(){
        let newTaskName = input.value;
        input.value = "";
        return newTaskName;
    }

    this.toggleTaskIsDone = function(task) {
        let taskName = document.querySelector(`#${task.id} > span`);
        taskName.classList.toggle("taskDone");
    }

    this.deleteTask = function(task) {
        let htmlElement = document.getElementById(task.id);
        htmlElement.remove();
    }
}

function Task(name, isDone) {
    this.name = name;
    this.isDone = isDone;
    this.id = createUniqueId();

    function createUniqueId()
    {
        return "task-" + Math.random().toString(16).slice(2);
    };
}

let app = new Application();
app.start();
