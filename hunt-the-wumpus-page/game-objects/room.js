import GameObject from "./game-object.js";

export default class Room {
	constructor(gameObject) {
		if (gameObject && gameObject instanceof GameObject == false) {
			throw new Error('Room can be created only with instance of GameObject.');
		}

		this.gameObject = gameObject;
	}

	gameObject = null;

	render() {
		const roomElement = document.createElement('div');
		roomElement.classList.add('room');

		if (this.gameObject) {
			const objectElement = this.gameObject.render();
			roomElement.append(objectElement);
		}

		return roomElement;
	}
}
