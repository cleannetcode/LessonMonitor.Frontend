import Coordinates from "../coordinates.js";
import MovableObject from "./movableObject.js";
import ObjectName from "./objectName.js";
import Wumpus from "./wumpus.js";

export default class Arrow extends MovableObject {
    #inAttack = false;

    get attackDistance() { return 1; }

    constructor(coordinates, collisionEvent) {
        super(ObjectName.arrow, coordinates, collisionEvent);
    }

    attack(startCoordinates, targetCoordinate) {
        if (!startCoordinates || !startCoordinates instanceof Coordinates) {
            throw Error('startCoordinates should be instance of Coordinates');
        }
        if (!targetCoordinate || !targetCoordinate instanceof Coordinates) {
            throw Error('targetCoordinate should be instance of Coordinates');
        }
        if (startCoordinates.distanceTo(targetCoordinate) == this.attackDistance) {
            this._coordinates = startCoordinates;
            this.#inAttack = true;
            this.moveTo(targetCoordinate);
            this.#inAttack = false;
            this._coordinates = startCoordinates;
        }
    }

    collisionWith(object) {
        super.collisionWith(object);
        if (this.#inAttack) {
            if (object instanceof Wumpus && object.isAlive) {
                object.die();
            }
        }
    }
}