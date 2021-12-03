import Coordinates from "../coordinates.js";
import GameObject from "./gameObject.js";

export default class MovableObject extends GameObject {
    #collisionEvent;

    constructor(name, coordinates, collisionEvent) {
        super(name, coordinates);
        this.#collisionEvent = collisionEvent;
    }

    moveTo(coordinates) {
        if (!coordinates || !coordinates instanceof Coordinates) {
            throw Error('coordinates should be instance of Coordinates');
        }
        this._coordinates = coordinates;
        if (this.#collisionEvent instanceof Function) {
            this.#collisionEvent(this);
        }
    }
}