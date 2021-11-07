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
		issueInput,
		form
	}) {
		if (!todoList || !issueInput || !form) {
			console.warn('Todo: необходимо 3 свойства, "todoList", "issueInput" и "form"!');
		}

		this.todoList = document.querySelector(todoList);
		this.issueInput = document.querySelector(issueInput);
		this.form = document.querySelector(form);
		this.issues = JSON.parse(localStorage.getItem('todoList')) || [];
	}

	renderTodoList(issue) {
		const listItem = document.createElement('li');

		if (issue.isDone) {
			listItem.classList.add('todo__item', 'todo__item-done');
			listItem.innerHTML = `<span class="todo-item-text text-done">${issue.description}</span>
			<div class="buttons">
				<button class="todo_done visible" data-id="${issue.id}">Сделано</button>
				<button class="todo_delete" data-id="${issue.id}">x</button>
			</div>`;

		} else {
			listItem.classList.add('todo__item');
			listItem.innerHTML = `<span class="todo-item-text">${issue.description}</span>
			<div class="buttons">
				<button class="todo_done" data-id="${issue.id}">Сделано</button>
				<button class="todo_delete" data-id="${issue.id}">x</button>
			</div>`;
		}

		this.todoList.append(listItem);
	};

	addIssue(event) {
		event.preventDefault();
		const issueInputValue = this.issueInput.value;

		if (issueInputValue) {
			const issue = new Issue(issueInputValue);
			this.issues.push(issue);
			this.init();
		} else {
			this.invalidIssueInput();
		}

		this.issueInput.value = '';
	};

	invalidIssueInput() {
		this.issueInput.classList.add('invalid');

		setTimeout(() => {
			this.issueInput.classList.remove('invalid');
		}, 1000);
	}

	deleteIssue(event) {
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
			this.issues.forEach(issue => {
				if (issue.id == target.dataset.id) {
					issue.isDone = !issue.isDone;
					this.init();
				}
			});
		}
	}

	init() {
		this.todoList.textContent = '';
		this.issues.forEach(issue => this.renderTodoList(issue));
		localStorage.setItem('todoList', JSON.stringify(this.issues));
	};

	eventListeners() {
		this.form.addEventListener('submit', this.addIssue.bind(this));
		this.todoList.addEventListener('click', this.deleteIssue.bind(this));
		this.todoList.addEventListener('click', this.toggleDone.bind(this));
	}
}

const app = new Application({
	todoList: '.todo__list',
	issueInput: '.issue__input',
	form: '#form'
});

app.eventListeners();
app.init();