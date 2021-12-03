import ObjectName from "../game/world/gameObjects/objectName.js";
import Player from "../game/world/gameObjects/player/player.js";
import Wumpus from "../game/world/gameObjects/wumpus.js";

export default class EndingMessage {
    #player;
    #wumpus;
    #viewElement;

    constructor(player, wumpus) {
        if (!player || !player instanceof Player) {
            throw new Error("player should be instance of Player.")
        }
        if (!wumpus || !wumpus instanceof Wumpus) {
            throw Error('wumpus should be instance of Wumpus');
        }
        this.#player = player;
        this.#wumpus = wumpus;
        this.#viewElement = document.getElementById("endingMessage")
    }

    update() {
        this.#viewElement.innerHTML = "";
        if (this.#player.isDead) {
            this.#showDeadMessage();
        }
        if (this.#wumpus.isDead) {
            this.#showWinMessage();
        }
    }

    #showDeadMessage() {
        switch (this.#player.killerName) {
            case ObjectName.pit:
                this.#viewElement.innerHTML += "Вы упали в яму. ";
                break;
            case ObjectName.wumpus:
                this.#viewElement.innerHTML += "Вас съел Вампус. ";
                break;
            default:
                break;
        }
    }

    #showWinMessage() {
        this.#viewElement.innerHTML += "Вы победили! ";
    }
}