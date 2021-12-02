import Arrow from "./arrow.js";
import MovableObject from "./movableObject.js";

export default class Wumpus extends MovableObject {
    #isAlive = true;

    get isAlive() { return this.#isAlive; }
    get isDead() { return this.#isAlive == false; }

    constructor(coordinates, collisionEvent) {
        super('wumpus', coordinates, collisionEvent);
    }

    moveTo(coordinates) {
        if (this.isAlive) {
            super.moveTo(coordinates);
        }
    }
    
    collisionWith(object) {
        super.collisionWith(object);
        if (this.isAlive) {
            if (object instanceof Arrow && object.inAttack) {
                this.#die();
            }
        }
    }
    
    #die() {
        this.#isAlive = false;
    }
}