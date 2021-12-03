import ObjectView from "./objectView.js";
import Bats from "../game/world/gameObjects/bats.js";

export default class BatsView extends ObjectView {
    #bats;
    #debug;

    constructor(bats, player, debug) {
        if (!bats || !bats instanceof Bats) {
            throw new Error("bats should be instance of Bats.")
        }
        super(bats, player);
        this.#bats = bats;
        this.#debug = debug;
    }

    update() {
        this.showMessage("Вы слышите шелест.");
        this.#debugView();
    }

    #debugView() {
        if (this.#debug) {
            let id = 'room_' + this.#bats.coordinates.x + '_' + this.#bats.coordinates.y;
            let roomHtml = document.getElementById(id);
            roomHtml.classList.add('bats');
        }
    }
}