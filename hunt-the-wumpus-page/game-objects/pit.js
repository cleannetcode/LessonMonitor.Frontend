import GameObject from "./game-object.js";

export default class Pit extends GameObject {
	constructor(x, y) {
		super(x, y)
	}

	render() {
		const element = document.createElement('div');
		element.classList.add('pit');
		return element;
	}
}
