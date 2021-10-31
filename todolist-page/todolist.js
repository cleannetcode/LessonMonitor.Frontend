'use strict';

function Application() {
	const issues = [
		new Issue('item 1'),
		new Issue('item 2'),
		new Issue('item 3'),
		new Issue('item 4')
	];

	this.start = function () {
		this.printIssues();
	}

	this.printIssues = function () {
		let issuesElement = document.getElementById('issues');
		issuesElement.innerHTML = null;

		for (let index = 0; index < issues.length; index++) {
			const issue = issues[index];

			const issueId = composeIssueId(index);
			if (document.getElementById(issueId)) {
				continue;
			}

			let issueElement = document.createElement('li');
			issueElement.id = issueId;

			let issueNameElement = document.createElement('span');
			issueNameElement.innerText = issue.name;
			issueNameElement.style.textDecoration = issue.isDone ? 'line-through' : null;

			let toggleDoneButton = document.createElement('button');
			toggleDoneButton.onclick = (e) => this.toggleDone(index);
			toggleDoneButton.innerText = 'Done';

			let deleteIssueButton = document.createElement('button');
			deleteIssueButton.onclick = (e) => this.deleteIssue(index);
			deleteIssueButton.innerText = 'Delete';

			issueElement.append(issueNameElement);
			issueElement.append(toggleDoneButton);
			issueElement.append(deleteIssueButton);

			issuesElement.append(issueElement);
		}
	};

	const issueName = document.getElementById('issue-name');

	this.createNewIssue = function () {
		const issue = new Issue(issueName.value);
		issues.push(issue);
		this.printIssues();
	}

	this.deleteIssue = function (index) {
		issues.splice(index, 1);
		this.printIssues();
	}

	this.toggleDone = function (index) {
		issues[index].toggleDone();
		this.printIssues();
	}

	function composeIssueId(issueId) {
		return `issue-${issueId}`;
	}
}

function Issue(name) {
	this.name = name;
	this.isDone = false;
	this.toggleDone = function () {
		this.isDone = !this.isDone;
	}
}

function Task(name, description) {
	Issue.call(this, name);
	this.description = description;
}

const app = new Application();
app.start();
