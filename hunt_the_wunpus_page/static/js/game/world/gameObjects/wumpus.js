import Player from "./player/player.js";
import MovableObject from "./movableObject.js";
import Coordinates from "../coordinates.js";
import Direction from "../direction.js";
import ObjectName from "./objectName.js";

export default class Wumpus extends MovableObject {
    #isAlive = true;
    #worldSize;

    get isAlive() { return this.#isAlive; }
    get isDead() { return this.#isAlive == false; }
    get moveDistance() { return 1; }

    constructor(coordinates, worldSize, collisionEvent) {
        if (!worldSize && !worldSize instanceof Coordinates) {
            throw new Error("worldSize should be instance of Coordinates");
        }
        super(ObjectName.wumpus, coordinates, collisionEvent);
        this.#worldSize = worldSize;
    }

    update() {
        if (Math.random() > 0.2) {
            var direction = Direction.getRandom();
            const coordinates = Coordinates.createCoorndinatesBy(this.coordinates, direction, this.moveDistance);
            if (coordinates.x > 0 && coordinates.x < this.#worldSize.x &&
                coordinates.y > 0 && coordinates.y < this.#worldSize.y) {
                this.moveTo(coordinates);
            }
        }
    }

    moveTo(coordinates) {
        if (this.isAlive) {
            super.moveTo(coordinates);
        }
    }

    die() {
        this.#isAlive = false;
    }

    collisionWith(object) {
        super.collisionWith(object);
        if (this.isAlive) {
            if (object instanceof Player && object.isAlive) {
                object.die(this.name);
            }
        }
    }
}