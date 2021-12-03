import Coordinates from './coordinates.js';
import ObjectCreator from './gameObjects/ObjectCreator.js';
import Physics from '../physics.js';

export default class World {
    #size;
    #pits = [];
    #player;
    #wumpus;
    #bats;

    get size() { return this.#size; }
    get player() { return this.#player; }
    get wumpus() { return this.#wumpus; }
    get bats() { return this.#bats; }
    get pitCount() { return this.#pits.length; }

    constructor(setup, physics) {
        if (!physics || !physics instanceof Physics) {
            throw Error('physics should be instance of Physics');
        }
        this.#size = new Coordinates(setup['width'], setup['height']);
        const objectCreator = new ObjectCreator(physics, this.#size);
        this.#createObjects(objectCreator, setup['pitsCount']);
    }

    #createObjects(objectCreator, pitsCount) {
        this.#player = objectCreator.createPlayer();
        this.#wumpus = objectCreator.createWumpus();
        this.#bats = objectCreator.createBats();
        this.#createPits(pitsCount, objectCreator);
    }
    
    #createPits(count, objectCreator) {
        for (let i = 0; i < count; i++) {
            this.#pits.push(objectCreator.createPit());            
        }
    }

    getPit(id) {
        if (isNaN(id) || id < 0 || id >= this.pitCount) {
            throw Error("id should be greater than -1 and less than " + this.pitCount);
        }
        return this.#pits[id];
    }

    isValidCoordinates(coordinates) {
        if (!coordinates || !coordinates instanceof Coordinates) {
            throw Error('coordinates should be instance of Coordinates');
        }
        return coordinates.x > -1 && coordinates.x < this.size.x &&
            coordinates.y > -1 && coordinates.y < this.size.y;
    }

    update() {
        this.wumpus.update();
        this.player.update();
    }
}