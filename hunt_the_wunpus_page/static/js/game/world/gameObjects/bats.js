import Coordinates from "../coordinates.js";
import GameObject from "./gameObject.js";
import ObjectName from "./objectName.js";
import Player from "./player/player.js";

export default class Bats extends GameObject {
    #worldSize;

    constructor(coordinates, worldSize) {
        if (!worldSize && !worldSize instanceof Coordinates) {
            throw new Error("worldSize should be instance of Coordinates");
        }
        super(ObjectName.bats, coordinates);
        this.#worldSize = worldSize;
    }

    collisionWith(object) {
        super.collisionWith(object);
        if (object instanceof Player) {
            this.#movePlayerInRandomRoom(object);
        }
    }

    #movePlayerInRandomRoom(player) {
        const xPos = Math.floor(Math.random() * this.#worldSize.x);
        const yPos = Math.floor(Math.random() * this.#worldSize.y);
        player.moveTo(new Coordinates(xPos, yPos));
    }
}