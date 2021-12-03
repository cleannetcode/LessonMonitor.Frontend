import Coordinates from "../coordinates.js";

export default class GameObject {
    #name;
    
    get coordinates() { return this._coordinates; }
    get name() { return this.#name; }

    constructor(name, coordinates) {
        if (!coordinates || !coordinates instanceof Coordinates) {
            throw Error('coordinates should be instance of Coordinates');
        }
        this.#name = name;
        this._coordinates = coordinates;
    }

    collisionWith(gameObject) {
        if (!gameObject || !gameObject instanceof GameObject) {
            throw Error('gameObject should be instance of GameObject');
        }
    }
}