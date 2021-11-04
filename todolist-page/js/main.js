// массив для хранения задач
let tasks = [
    { id:'', name: 'task 1', isDone: false },
    { id:'', name: 'task 2', isDone: true },
    { id:'', name: 'task 3', isDone: false },
    { id:'', name: 'task 4', isDone: false }
];

//Список в который добавляются задачи
let rootTaskElement = document.getElementById('tasks');

//Начальная инициализация массива и отрисовка
for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    task.id = CreateUniqueId();
    AddTaskElement(task)
}

// Добавление нового задания в массив и отрисовка его на экране.
function AddNewTask()
{
    let input = document.getElementById("newTaskName");
    let newTaskName = input.value;
    if (isEmptyString(newTaskName))
    {
        input.classList.add('error');
        setTimeout(function() {
            input.classList.remove('error');
        }, 2000)

        return;
    }

    input.value = "";

    let newTask = { 
        id: CreateUniqueId(), 
        name: newTaskName, 
        isDone: false 
    };
    AddTaskElement(newTask);
    tasks.push(newTask);
}

// добавляет задачу в массив и отрисовывает в список
function AddTaskElement(task)
{
    let newTask = document.createElement('li');
    newTask.id = task.id;

    let newTaskName = document.createElement('span');
    newTaskName.innerText = task.name;
    if (task.isDone)
        newTaskName.classList.add("taskDone");

    let taskDoneButton = document.createElement('button');
    taskDoneButton.onclick = (e) => toggleTaskIsDone(task);
    taskDoneButton.innerText = 'Done';

    let taskDeleteButton = document.createElement('button');
    taskDeleteButton.onclick = (e) => deleteTask(task);
    taskDeleteButton.innerText = 'Delete';

    newTask.append(newTaskName);
    newTask.append(taskDoneButton);
    newTask.append(taskDeleteButton);

    rootTaskElement.append(newTask);
}

// Удаляет задачу
function deleteTask(task) {
    //Удалить из массива tasks
    let elementIndex = tasks.indexOf(task,0);
    tasks.splice(elementIndex,1);

    //Удалить из списка UL в DOM
    let htmlElement = document.getElementById(task.id);
    htmlElement.remove();
}

// Меняет статус задачи с выполнено на невыполнено и наоборот
function toggleTaskIsDone(task) {
    let taskName = document.querySelector(`#${task.id} > span`);
    task.isDone = !task.isDone;
    taskName.classList.toggle("taskDone");
}

//Создать уникальный идентификатор
function CreateUniqueId()
{
    return "task-" + Math.random().toString(16).slice(2);
}

//Проверка что строка пустая и не содержит пробелов.
function isEmptyString(str) {
    return (str.length === 0 || !str.trim());
};
