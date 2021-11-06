function Issue(name) {
	this.name = name;
	this.isDone = false;
	this.toggleDone = function () {
		this.isDone = !this.isDone;
	};
}
