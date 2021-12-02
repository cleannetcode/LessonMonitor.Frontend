import Wumpus from "../game/gameObjects/wumpus.js";
import ObjectView from "./objectView.js";

export default class WumpusView extends ObjectView {
    #wumpus;
    
    constructor(wumpus, player) {
        if (!wumpus || !wumpus instanceof Wumpus) {
            throw new Error("wumpus should be instance of Wumpus.")
        }
        super(wumpus, player);
        this.#wumpus = wumpus;
    }

    update() {
        this.showMessage("Вы чувствуете вонь.");
        this.#debugView();
    }
        
    #debugView() {
        let id = 'room_' + this.#wumpus.coordinates.x + '_' + this.#wumpus.coordinates.y;
        let roomHtml = document.getElementById(id);
        roomHtml.classList.add('wumpus');
    }
}