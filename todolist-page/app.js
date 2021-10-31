let issues = [];
let newIssueText = '';

let input = document.querySelector('input');
let button = document.querySelector('button');

input.onchange = function(e){
    newIssueText = e.target.value;
}

button.onclick = function(e){
    addNewIssue(newIssueText);
}

function addNewIssue(issue){

    if (issue == '') return;
    if (issues.includes(issue)) return;

    issues.push(issue);
    
    input.value = '';
    renderList();
}

function removeIssue(issue){

    if (issues.includes(issue)){
        const idx = issues.indexOf(issue);
        if (idx > -1) {
            issues.splice(idx, 1);
            renderList();
        }
    }
}

function renderList(){
    let ul = document.querySelector('ul');
    ul.innerHTML = '';

    issues.forEach(issue => {
        renderListItem(ul, issue);
    });
}

function renderListItem(ul, issue){
    
    let itemTextContainer = document.createElement('span');
    itemTextContainer.innerText = issue;

    let itemRemoveButton = document.createElement('button');
    itemRemoveButton.innerText = 'удалить';

    let li = document.createElement('li');

    li.appendChild(itemTextContainer);
    li.appendChild(itemRemoveButton);

    itemRemoveButton.onclick = function(e) {
        removeIssue(e.target.parentNode.children[0].innerText);
    }

    ul.appendChild(li);
}