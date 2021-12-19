import GameObject from "./game-object.js";
import Direction from "../Direction.js";

export default class MoveableObject extends GameObject {
	/**
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(x, y) {
		super(x, y);
	}

	/**
	 * @param {Direction} direction
	 */
	move(direction) {
		switch (direction) {
			case Direction.up:
				this.y--;
				break;

			case Direction.down:
				this.y++;
				break;

			case Direction.left:
				this.x--;
				break;

			case Direction.right:
				this.x++;
				break;

			default:
				break;
		}
	}
}
