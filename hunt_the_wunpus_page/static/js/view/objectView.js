import GameObject from "../game/world/gameObjects/gameObject.js";
import Player from "../game/world/gameObjects/player/player.js";

export default class ObjectView {
    #gameObject;
    #player;
    #viewBox;

    get player() { return this.#player; }

    constructor(gameObject, player) {
        if (!gameObject || !gameObject instanceof GameObject) {
            throw new Error("gameObject should be instance of GameObject.")
        }
        if (!player || !player instanceof Player) {
            throw new Error("player should be instance of Player.")
        }
        this.#gameObject = gameObject;
        this.#player = player;
        this.#createViewBox();
    }

    #createViewBox() {
        const messageBox = document.getElementById('viewMessages');
        this.#viewBox = document.createElement('h3');
        messageBox.append(this.#viewBox);
    }

    showMessage(message) {
        this.#viewBox.innerHTML = "";
        if (this.#player.isAlive) {
            const coordinates = this.#gameObject.coordinates;
            if (coordinates.distanceTo(this.#player.coordinates) == 1) {
                this.#viewBox.innerHTML = message;
            }
        }
    }
}