import ObjectView from "./objectView.js";
import Bats from "../game/gameObjects/bats.js";

export default class BatsView extends ObjectView {
    #bats;

    constructor(bats, player) {
        if (!bats || !bats instanceof Bats) {
            throw new Error("bats should be instance of Bats.")
        }
        super(bats, player);
        this.#bats = bats;
    }

    update() {
        this.showMessage("Вы слышите шелест.");
        this.#debugView();
    }
    
    #debugView(){
        let id = 'room_' + this.#bats.coordinates.x + '_' + this.#bats.coordinates.y;
        let roomHtml = document.getElementById(id);
        roomHtml.classList.add('bats');
    }
}