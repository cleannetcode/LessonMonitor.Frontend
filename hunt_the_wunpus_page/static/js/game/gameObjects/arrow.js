import Coordinates from "../Coordinates.js";
import MovableObject from "./movableObject.js";

export default class Arrow extends MovableObject {
    #inAttack = false;

    get inAttack() { return this.#inAttack; }

    constructor(coordinates, collisionEvent) {
        super('arrow', coordinates, collisionEvent);
    }

    attack(coordinates) {
        if (!coordinates || !coordinates instanceof Coordinates) {
            throw Error('coordinates should be instance of Coordinates');
        }
        if (coordinates.distanceTo(this.coordinates) == 1) {
            let oldCoordinates = this.coordinates;
            this.#inAttack = true;
            this.moveTo(coordinates);
            this.#inAttack = false;
            this.moveTo(oldCoordinates);
        }
    }
}