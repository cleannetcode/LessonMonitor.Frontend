import Game from "../game/game.js"
import BatsView from "./batsView.js";
import EndingMessage from "./endingMessage.js";
import MapView from "./mapView.js";
import PitsView from "./pitsView.js";
import PlayerView from "./playerView.js";
import WumpusView from "./wumpusView.js";

export default class View {
    #mapView;
    #playerView;
    #wumpusView;
    #pitsView;
    #batsView;
    #endingMessage;

    constructor(game) {
        if (!game || !game instanceof Game) {
            throw new Error("game should be instance of Game.")
        }
        this.#mapView = new MapView(game.map);
        this.#playerView = new PlayerView(game.player);
        this.#endingMessage = new EndingMessage(game.player, game.wumpus);
        this.#pitsView = new PitsView(game.map, game.player);
        this.#batsView = new BatsView(game.bats, game.player);
        this.#wumpusView = new WumpusView(game.wumpus, game.player);
        this.update();
    }

    update() {
        this.#mapView.update();
        this.#playerView.update();
        this.#batsView.update();
        this.#pitsView.update();
        this.#endingMessage.update();
        this.#wumpusView.update();
    }
}