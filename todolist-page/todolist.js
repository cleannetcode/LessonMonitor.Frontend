'use strict';

class Issue {
	constructor(issueDescription) {
		this.id = `id${Math.round(Math.random() * 1e8).toString(16)}`;
		this.description = issueDescription;
		this.isDone = false;
	}
}

class Application {
	constructor({
		todoList,
		taskInput,
		form
	}) {
		if (!todoList || !taskInput || !form) {
			console.warn('Todo: необходимо 3 свойства, "todoList", "taskInput" и "form"!');
		}

		this.todoList = document.querySelector(todoList);
		this.taskInput = document.querySelector(taskInput);
		this.form = document.querySelector(form);
		this.issues = JSON.parse(localStorage.getItem('todoList')) || [];
	}

	renderTodoList(task) {
		const listItem = document.createElement('li');

		if (task.isDone) {
			listItem.classList.add('todo__item', 'todo__item-done');
			listItem.innerHTML = `<span class="todo-item-text text-done">${task.description}</span>
			<div class="buttons">
				<button class="todo_done visible" data-id="${task.id}">Сделано</button>
				<button class="todo_delete" data-id="${task.id}">x</button>
			</div>`;

		} else {
			listItem.classList.add('todo__item');
			listItem.innerHTML = `<span class="todo-item-text">${task.description}</span>
			<div class="buttons">
				<button class="todo_done" data-id="${task.id}">Сделано</button>
				<button class="todo_delete" data-id="${task.id}">x</button>
			</div>`;
		}

		this.todoList.append(listItem);
	};

	addTask(event) {
		event.preventDefault();
		const taskInputValue = this.taskInput.value;

		if (taskInputValue) {
			const issue = new Issue(taskInputValue);
			this.issues.push(issue);
			this.init();
		} else {
			this.invalidTaskInput();
		}

		this.taskInput.value = '';
	};

	invalidTaskInput() {
		this.taskInput.classList.add('invalid');

		setTimeout(() => {
			this.taskInput.classList.remove('invalid');
		}, 1000);
	}

	deleteTask(event) {
		const target = event.target;

		if (target.classList.contains('todo_delete')) {
			this.issues = this.issues
				.filter(note => note.id !== target.dataset.id);
			this.init();
		}
	};

	toggleDone(event) {
		const target = event.target;

		if (target.classList.contains('todo_done')) {
			this.issues.forEach(task => {
				if (task.id == target.dataset.id) {
					task.isDone = !task.isDone;
					this.init();
				}
			});
		}
	}

	init() {
		this.todoList.textContent = '';
		this.issues.forEach(task => this.renderTodoList(task));
		localStorage.setItem('todoList', JSON.stringify(this.issues));
	};

	eventListeners() {
		this.form.addEventListener('submit', this.addTask.bind(this));
		this.todoList.addEventListener('click', this.deleteTask.bind(this));
		this.todoList.addEventListener('click', this.toggleDone.bind(this));
	}
}

const app = new Application({
	todoList: '.todo__list',
	taskInput: '.task__input',
	form: '#form'
});

app.eventListeners();
app.init();