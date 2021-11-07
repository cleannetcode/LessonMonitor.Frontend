'use strict';

class Application {
	#issues = [
		new Issue('item 1'),
		new Issue('item 2'),
		new Issue('item 3'),
		new Issue('item 4')
	];

	#issueName = document.getElementById('issue-name');

	start() {
		this.printIssues();
	};

	printIssues() {
		let issuesElement = document.getElementById('issues');
		issuesElement.innerHTML = null;

		for (let index = 0; index < this.#issues.length; index++) {
			const issue = this.#issues[index];

			const issueId = this.#composeIssueId(index);
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

	createNewIssue() {
		const issue = new Issue(this.#issueName.value);
		this.#issues.push(issue);
		this.printIssues();
	};

	deleteIssue(index) {
		this.#issues.splice(index, 1);
		this.printIssues();
	};

	toggleDone(index) {
		this.#issues[index].toggleDone();
		this.printIssues();
	};

	#composeIssueId(issueId) {
		return `issue-${issueId}`;
	}
}

class Issue {
	constructor(name) {
		this.name = name;
		this.isDone = false;
	}

	name = '';
	isDone = false;

	toggleDone() {
		this.isDone = !this.isDone;
	};
}

const app = new Application();
app.start();
