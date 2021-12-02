import Coordinates from "../coordinates.js";
import GameObject from "./gameObject.js";
import Player from "./player.js";

export default class Bats extends GameObject {
    #mapWidth;
    #mapHeight;

    constructor(coordinates, mapWidth, mapHeight) {
        if (isNaN(mapWidth) || mapWidth < 0) {
            throw Error("mapWidth should be greater than 0");
        }
        if (isNaN(mapHeight) || mapHeight < 0) {
            throw Error("mapHeight should be greater than 0");
        }
        super('bats', coordinates);
        this.#mapWidth = mapWidth;
        this.#mapHeight = mapHeight;
    }

    movePlayerInRandomRoom(player) {
        if (!player || !player instanceof Player) {
            throw new Error("player should be instance of Player.")
        }
        const xPos = Math.floor(Math.random() * this.#mapWidth);
        const yPos = Math.floor(Math.random() * this.#mapHeight);
        player.moveTo(new Coordinates(xPos, yPos));
    }

    collisionWith(object) {
        super.collisionWith(object);
        if (object instanceof Player) {
            this.movePlayerInRandomRoom(object);
        }
    }
}