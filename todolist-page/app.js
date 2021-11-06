const TaskStatuses = {
    Default: "Default",
    IsDone: "IsDone"
};

const taskService = {

    tasks: [],

    Add: function(task){
        if (typeof task !== 'object') return;
        if (task.text == '') return;

        if (this.tasks.filter(x=>x.text == task.text).length > 0) return;

        task.id = Math.random().toString(36).substr(2, 9);
        task.status = TaskStatuses.Default;

        this.tasks.push(task);
        
        newTaskTextInput.value = '';
        renderList(this.Get());
    },

    Remove: function(taskId){
        let findTasks = this.tasks.filter(x=>x.id == taskId);

        if (findTasks.length > 0)
        {
            const idx = this.tasks.indexOf(findTasks[0]);
            if (idx > -1) {
                this.tasks.splice(idx, 1);
                renderList(this.Get());
            }
        }
    },

    SetStatus: function(taskId, taskStatus){
        let findTasks = this.tasks.filter(x=>x.id == taskId);

        if (findTasks.length > 0)
        {
            findTasks[0].status = taskStatus
            renderList(this.Get());
        }
    },

    Get(){
        return this.tasks;
    }
};

let newTaskTextInput = document.querySelector('#newTaskTextInput');
let addNewTaskButton = document.querySelector('#addNewTaskButton');
let ul = document.querySelector('#taskslist');

addNewTaskButton.onclick = function(e){

    taskService.Add({
        text: newTaskTextInput.value,
        isDone: false
    });
}

function renderList(tasks){
    
    ul.innerHTML = '';

    tasks.forEach(task => {
        renderListItem(ul, task);
    });
}

function renderListItem(ul, task){
    
    let checkbox = getCheckBoxElement(task);
    
    let itemTextContainer = document.createElement('span');
    itemTextContainer.innerText = task.text;

    let itemRemoveButton = document.createElement('button');
    itemRemoveButton.innerText = 'удалить';

    let li = document.createElement('li');
    li.setAttribute('data-id', task.id);
    li.setAttribute('data-status', task.status);

    li.appendChild(checkbox);
    li.appendChild(itemTextContainer);
    li.appendChild(itemRemoveButton);

    itemRemoveButton.onclick = function(e) {
        taskService.Remove(task.id);
    }

    ul.appendChild(li);
}

function getCheckBoxElement(task){
    let checkBox = document.createElement('input');
    checkBox.classList.add('task__checker');
    checkBox.setAttribute('id', `checkbox-${task.id}`);
    checkBox.setAttribute('type','checkbox');

    if (task.status == TaskStatuses.IsDone)
        checkBox.setAttribute('checked', task.isDone);

    checkBox.onchange = function(e){
        taskService.SetStatus(task.id, (e.target.checked) ? TaskStatuses.IsDone : TaskStatuses.Default);
    }

    return checkBox;
}