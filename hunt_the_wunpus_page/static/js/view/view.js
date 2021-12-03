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

    constructor(game, debug) {
        if (!game || !game instanceof Game) {
            throw new Error("game should be instance of Game.")
        }
        this.#mapView = new MapView(game.world);
        this.#playerView = new PlayerView(game.world.player);
        this.#endingMessage = new EndingMessage(game.world.player, game.world.wumpus);
        this.#pitsView = new PitsView(game.world, game.world.player, debug);
        this.#batsView = new BatsView(game.world.bats, game.world.player, debug);
        this.#wumpusView = new WumpusView(game.world.wumpus, game.world.player, debug);
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