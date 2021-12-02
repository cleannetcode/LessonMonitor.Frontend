import Arrow from "./arrow.js";
import MovableObject from "./movableObject.js";
import Pit from "./pit.js";
import Wumpus from "./wumpus.js";

class Player extends MovableObject {
    #isAlive = true;
    #killerName;
    #arrow;
    
    get isAlive() { return this.#isAlive; }
    get isDead() { return this.isAlive == false; }
    get killerName() { return this.#killerName; }
    get arrow() { return this.#arrow; }

    constructor(coordinates, arrow, collisionEvent) {
        if (!arrow || !arrow instanceof Arrow) {
            throw Error('arrow should be instance of Arrow');
        }
        super('player', coordinates, collisionEvent);
        this.#arrow = arrow;
        this.#arrow.moveTo(coordinates);
    }

    moveTo(coordinates) {
        if (this.isAlive) {
            super.moveTo(coordinates);
        }
    }
    
    attack(coordinates) {
        this.#arrow.attack(coordinates);
    }
    
    collisionWith(object) {
        super.collisionWith(object);
        if (this.isAlive) {
            if (object instanceof Wumpus || object instanceof Pit) {
                this.#die(object.name);
            }
        }
    }

    #die(killerName) {
        this.#isAlive = false;
        this.#killerName = killerName;
    }
}

export default Player;