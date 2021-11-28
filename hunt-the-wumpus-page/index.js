import Direction from "./Direction.js";
import GameMap from "./game-objects/game-map.js";
import Player from "./game-objects/player.js";
import Pit from "./game-objects/pit.js";
import Bats from "./game-objects/bats.js";
import Wumpus from "./game-objects/wumpus.js";
import MoveableObject from "./game-objects/moveable-object.js";

class Game {
	run() {
		const size = 5;
		this.player = new Player(3, 2);
		this.wumpus = new Wumpus(1, 1);

		const gameObjects = [];
		gameObjects.push(this.player);
		gameObjects.push(new Pit(0, 3));
		gameObjects.push(new Pit(4, 1));
		gameObjects.push(new Bats(3, 0));
		gameObjects.push(new Bats(2, 3));
		gameObjects.push(this.wumpus);

		this.map = new GameMap(gameObjects, size);
		this.#draw();

		const controlsElement = document.getElementById('controls');
		const movementElement = this.#renderMovementControls();
		const attackElement = this.#renderAttackControls();
		controlsElement.prepend(movementElement);
		controlsElement.append(attackElement);
	}

	move(direction) {
		this.#moveGameObject(this.player, direction);

		this.#update();
		this.#redraw();
	}

	#moveGameObject(moveableObject, direction) {
		console.log('x: ' + (this.player.x + 1), 'y: ' + (this.player.y + 1));

		if (!direction) {
			throw Error('direction cannot be null or undefined');
		}

		if (!moveableObject || !moveableObject instanceof MoveableObject) {
			throw Error('only MoveableObject can be moved by Game.moveGameObject');
		}

		if (!this.map.isValidDirection(moveableObject, direction)) {
			return;
		}

		let room = this.map.rooms[moveableObject.y][moveableObject.x];
		room.remove(moveableObject);

		moveableObject.move(direction);

		room = this.map.rooms[moveableObject.y][moveableObject.x];
		room.add(moveableObject);
	}

	attack(direction) {
		const arrow = this.player.attack(direction);
		const room = this.map.rooms[arrow.y][arrow.x];
		room.add(arrow);

		this.#update();
		this.#redraw();
	}

	#update() {
		const room = this.map.rooms[this.player.y][this.player.x];

		const wumpus = room.getObject(x => x instanceof Wumpus);
		const pit = room.getObject(x => x instanceof Pit);
		const bats = room.getObject(x => x instanceof Bats);

		if (wumpus || pit) {
			this.player.die();
		} else if (bats) {
			const x = Math.floor(Math.random() * this.map.size);
			const y = Math.floor(Math.random() * this.map.size);

			let room = this.map.rooms[this.player.y][this.player.x];
			room.remove(this.player);

			this.player.x = x;
			this.player.y = y;

			room = this.map.rooms[this.player.y][this.player.x];
			room.add(this.player);

			this.#update();
		}

		const isWumpusSleep = Math.round(Math.random());
		if (!isWumpusSleep) {
			this.#moveGameObject(this.wumpus, Direction.random);
			const room = this.map.rooms[this.wumpus.y][this.wumpus.x];
			const player = room.getObject(x => x instanceof Player);
			if (player) {
				this.player.die();
			}
		}

		if (!this.player.isAlive) {
			const result = confirm("Ты проиграл!\nПопробуешь еще раз?");
			console.log(result);
		}

		if (!this.wumpus.isAlive) {
			const result = confirm("Ты победил!\nПопробуешь еще раз?");
			console.log(result);
		}
	}

	#redraw() {
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
