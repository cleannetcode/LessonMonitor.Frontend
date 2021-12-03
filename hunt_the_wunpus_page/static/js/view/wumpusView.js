import Wumpus from "../game/world/gameObjects/wumpus.js";
import ObjectView from "./objectView.js";

export default class WumpusView extends ObjectView {
    #wumpus;
    #debug;

    constructor(wumpus, player, debug) {
        if (!wumpus || !wumpus instanceof Wumpus) {
            throw new Error("wumpus should be instance of Wumpus.")
        }
        super(wumpus, player);
        this.#wumpus = wumpus;
        this.#debug = debug;
    }

    update() {
        this.showMessage("Вы чувствуете вонь.");
        this.#debugView();
    }

    #debugView() {
        if (this.#debug) {
            let id = 'room_' + this.#wumpus.coordinates.x + '_' + this.#wumpus.coordinates.y;
            let roomHtml = document.getElementById(id);
            roomHtml.classList.add('wumpus');
        }
    }
}