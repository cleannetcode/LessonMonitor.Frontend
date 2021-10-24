let issues = [
	{ name: 'item 1', isDone: false },
	{ name: 'item 2', isDone: false },
	{ name: 'item 3', isDone: false },
	{ name: 'item 4', isDone: false }
];

let printIssues = function () {
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
		toggleDoneButton.onclick = (e) => toggleDone(index);
		toggleDoneButton.innerText = 'Done';

		let deleteIssueButton = document.createElement('button');
		deleteIssueButton.onclick = (e) => deleteIssue(index);
		deleteIssueButton.innerText = 'Delete';

		issueElement.append(issueNameElement);
		issueElement.append(toggleDoneButton);
		issueElement.append(deleteIssueButton);

		issuesElement.append(issueElement);
	}
}
printIssues();

let issueName = document.getElementById('issue-name');

function createNewIssue()
{
	let issue = {
		name: issueName.value,
		isDone: false
	};

	issues.push(issue);
	printIssues();
}

function deleteIssue(index) {
	issues.splice(index, 1);
	printIssues();
}

function toggleDone(index) {
	let issue = issues[index];
	issue.isDone = !issue.isDone;
	printIssues();
}

function composeIssueId(issueId) {
	return `issue-${issueId}`;
}
