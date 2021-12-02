import Player from "../game/gameObjects/player.js";
import Wumpus from "../game/gameObjects/wumpus.js";

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
            case 'pit':
                this.#viewElement.innerHTML += "Вы упали в яму. ";
                break;
            case 'wumpus':
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