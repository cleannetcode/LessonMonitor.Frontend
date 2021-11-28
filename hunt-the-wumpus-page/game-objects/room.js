import GameObject from "./game-object.js";
import Pit from "./pit.js";
import Player from "./player.js";

export default class Room {
	constructor(gameObject) {
		if (gameObject && gameObject instanceof GameObject == false) {
			throw new Error('Room can be created only with instance of GameObject.');
		}

		if (gameObject) {
			this.#gameObjects.push(gameObject);
		}
	}

	#gameObjects = [];

	add(gameObject) {
		if (!gameObject || gameObject instanceof GameObject == false) {
			throw new Error('gameObject cannot be null and should be instance of GameObject.');
		}

		this.#gameObjects.push(gameObject);
	}

	remove(gameObject) {
		if (!gameObject || gameObject instanceof GameObject == false) {
			throw new Error('gameObject cannot be null and should be instance of GameObject.');
		}

		const index = this.#gameObjects.indexOf(gameObject);
		this.#gameObjects.splice(index, 1);
	}

	getObjects() {
		return new Array(...this.#gameObjects);
	}

	getObject(predicat) {
		if (!predicat) {
			throw new Error('predicat cannot be null or undefined');
		}

		return this.#gameObjects.find(predicat);
	}

	render() {
		const roomElement = document.createElement('div');
		roomElement.classList.add('room');

		if (this.#gameObjects && this.#gameObjects.length > 0) {

			for (const gameObject of this.#gameObjects) {
				const objectElement = gameObject.render();
				roomElement.append(objectElement);
			}
		}

		return roomElement;
	}
}
