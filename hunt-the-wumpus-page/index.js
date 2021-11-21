import Direction from "./Direction.js";
import GameMap from "./game-objects/game-map.js";
import Player from "./game-objects/player.js";
import Pit from "./game-objects/pit.js";

class Game {
	run() {
		const size = 5;
		this.player = new Player(3, 2);

		const gameObjects = [];
		gameObjects.push(this.player);
		gameObjects.push(new Pit(0, 3));
		gameObjects.push(new Pit(4, 1));

		this.map = new GameMap(gameObjects, size);
		this.#draw();

		const controlsElement = document.getElementById('controls');
		const movementElement = this.#renderMovementControls();
		const attackElement = this.#renderAttackControls();
		controlsElement.prepend(movementElement);
		controlsElement.append(attackElement);
	}

	move(direction) {
		console.log('x: ' + (this.player.x + 1), 'y: ' + (this.player.y + 1));
		let movable = false;
		switch (direction) {
			case Direction.up:
				movable = this.player.y > 0;
				break;

			case Direction.down:
				movable = this.player.y < (this.map.size - 1);
				break;

			case Direction.left:
				movable = this.player.x > 0;
				break;

			case Direction.right:
				movable = this.player.x < (this.map.size - 1);
				break;

			default:
				break;
		}

		if (!movable) {
			return;
		}

		let room = this.map.rooms[this.player.y][this.player.x];
		room.remove(this.player);

		this.player.move(direction);

		room = this.map.rooms[this.player.y][this.player.x];
		room.add(this.player);

		this.#update();
	}

	attack(direction) {
		console.log(direction);

		const arrow = this.player.attack(direction);
		const room = this.map.rooms[arrow.y][arrow.x];
		room.add(arrow);

		this.#update();
	}

	#update() {
		const room = this.map.rooms[this.player.y][this.player.x];
		const pit = room.getObject(x => x instanceof Pit);

		if (pit) {
			this.player.die();
		}

		if (!this.player.isAlive) {
			const result = confirm("Ты проиграл!\nПопробуешь еще раз?");
			console.log(result);
		}

		this.#clean();
		this.#draw();
	}

	#draw() {
		const gameElement = document.getElementById('game');
		const mapElement = this.map.render();
		gameElement.prepend(mapElement);
	}

	#clean() {
		const mapElement = document.getElementById('map');
		if (mapElement) {
			mapElement.remove();
		}
	}

	#renderMovementControls() {
		const movementElement = document.createElement('div');

		const moveUpElement = this.#createMovementButton('Up', Direction.up);
		const moveDownElement = this.#createMovementButton('Down', Direction.down);
		const moveLeftElement = this.#createMovementButton('Left', Direction.left);
		const moveRightElement = this.#createMovementButton('Right', Direction.right);

		const nameMovementElement = document.createElement('p');
		nameMovementElement.innerText = 'Премещение';

		movementElement.append(nameMovementElement);
		movementElement.append(moveLeftElement, moveDownElement, moveUpElement, moveRightElement);

		return movementElement;
	}

	#createMovementButton(name, direction) {
		const movementButton = document.createElement('button');
		movementButton.onclick = () => this.move(direction);
		movementButton.innerText = name;
		return movementButton;
	}

	#renderAttackControls() {
		const attackElement = document.createElement('div');

		const attackUpButton = this.#createAttackButton('Up', Direction.up);
		const attackDownButton = this.#createAttackButton('Down', Direction.down);
		const attackLeftButton = this.#createAttackButton('Left', Direction.left);
		const attackRightButton = this.#createAttackButton('Right', Direction.right);

		const nameAttackElement = document.createElement('p');
		nameAttackElement.innerText = 'Стрельба';

		attackElement.append(nameAttackElement);
		attackElement.append(attackLeftButton, attackDownButton, attackUpButton, attackRightButton);

		return attackElement;
	}

	#createAttackButton(name, direction) {
		const attackButton = document.createElement('button');
		attackButton.onclick = () => this.attack(direction);
		attackButton.innerText = name;
		return attackButton;
	}
}

const app = new Game();
app.run();

document.app = app;
