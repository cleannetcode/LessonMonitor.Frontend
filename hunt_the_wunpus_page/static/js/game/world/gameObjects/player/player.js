import Coordinates from "../../coordinates.js";
import Arrow from "../arrow.js";
import MovableObject from "../movableObject.js";
import ObjectName from "../objectName.js";
import PlayerState from "./playerState.js";

class Player extends MovableObject {
    #killerName;
    #arrow;
    #worldSize;
    #state;

    get isDead() { return this.#state == PlayerState.isDead; }
    get isAlive() { return this.isDead == false; }
    get killerName() { return this.#killerName; }
    get arrow() { return this.#arrow; }
    get moveDistance() { return 1; }
    get moveInterface() { return this.moveByDirectrion.bind(this); }
    get attackInterface() { return this.attack.bind(this); }

    constructor(coordinates, worldSize, arrow, collisionEvent) {
        super(ObjectName.player, coordinates, collisionEvent);
        if (!worldSize || !worldSize instanceof Coordinates) {
            throw Error('worldSize should be instance of Coordinates');
        }
        if (!arrow || !arrow instanceof Arrow) {
            throw Error('arrow should be instance of Arrow');
        }
        this.#worldSize = worldSize;
        this.#arrow = arrow;
        this.#state = PlayerState.inGame;
    }

    moveTo(coordinates) {
        if (this.isAlive) {
            super.moveTo(coordinates);
        }
    }

    die(killerName) {
        if (this.isAlive) {
            this.#state = PlayerState.isDead;
            this.#killerName = killerName;
        }
    }
    
    update() {
        if (this.#state == PlayerState.isWait) {
            this.#state = PlayerState.inGame;
        }
    }

    moveByDirectrion(direction) {
        if (this.#state == PlayerState.inGame) {
            const coordinates = Coordinates.createCoorndinatesBy(this.coordinates, direction, this.moveDistance);
            if (this.#valideCoordinate(coordinates)) {
                this.moveTo(coordinates);
                this.#endTurn();
                return true;
            }
        }
        return false;
    }

    #valideCoordinate(coordinates) {
        return coordinates.x > -1 && coordinates.x < this.#worldSize.x &&
            coordinates.y > -1 && coordinates.y < this.#worldSize.y;
    }

    #endTurn() {
        if (this.#state == PlayerState.inGame) {
            this.#state = PlayerState.isWait;
        }
    }
    
    attack(direction) {
        if (this.#state == PlayerState.inGame) {
            const target = Coordinates.createCoorndinatesBy(this.coordinates, direction, this.#arrow.attackDistance);
            if (this.#valideCoordinate(target)) {
                this.#arrow.attack(this.coordinates, target);
                this.#endTurn();
                return true;
            }
        }
        return false;
    }    
}

export default Player;