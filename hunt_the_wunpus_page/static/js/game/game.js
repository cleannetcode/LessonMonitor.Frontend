import World from './world/world.js';
import Coordinates from './world/coordinates.js';
import Physics from './physics.js';

class Game {
    #world;

    get world() { return this.#world; }
    get isRun() { return this.world.player.isAlive; }

    constructor(gameSetup) {
        const physics = new Physics();
        this.#world = new World(gameSetup['world'], physics);
    }

    update() {
        if (this.isRun) {
            this.world.update();
        }
    }
}

export default Game;