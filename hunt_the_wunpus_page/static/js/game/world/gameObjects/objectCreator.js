import Coordinates from "../coordinates.js";
import Physics from "../../physics.js";
import Bats from "./bats.js";
import Pit from "./pit.js";
import Player from "./player/player.js";
import Wumpus from "./wumpus.js";
import Arrow from "./arrow.js";

export default class ObjectCreator {
    #physics;
    #worldSize;
    #objectsCoordinates = [];

    constructor(physics, worldSize) {
        if (!physics || !physics instanceof Physics) {
            throw Error('physics should be instance of Physics');
        }
        if (!worldSize && !worldSize instanceof Coordinates) {
            throw new Error("worldSize should be instance of Coordinates");
        }
        this.#physics = physics;
        this.#worldSize = worldSize;
        this.#createCoordinates();
    }

    #createCoordinates() {
        for (let x = 0; x < this.#worldSize.x; x++) {
            for (let y = 0; y < this.#worldSize.y; y++) {
                this.#objectsCoordinates.push(new Coordinates(x, y));     
            }
        }
        this.#objectsCoordinates.splice(0, 1);       
    }

    createPlayer() {
        const coordinates = new Coordinates(0, 0);
        const arrow = this.createArrow(coordinates);
        const player = new Player(coordinates, this.#worldSize, arrow, this.#physics.collisionEvent);
        this.#physics.add(player);
        return player;
    }
    
    createArrow(coordinates) {
        const arrow = new Arrow(coordinates, this.#physics.collisionEvent);
        this.#physics.add(arrow);
        return arrow;
    }
    
    createWumpus() {
        const coordinates = this.#getRandomCordinates();
        const wumpus = new Wumpus(coordinates, this.#worldSize, this.#physics.collisionEvent);
        this.#physics.add(wumpus);
        return wumpus;
    }
    
    #getRandomCordinates() {
        const id = Math.floor(Math.random() * this.#objectsCoordinates.length);
        const coordinates = this.#objectsCoordinates[id];
        this.#objectsCoordinates.splice(id, 1);
        return coordinates;
    }

    createBats() {
        const coordinates = this.#getRandomCordinates();
        const bats = new Bats(coordinates, this.#worldSize);
        this.#physics.add(bats);
        return bats;
    }

    createPit() {
        const coordinates = this.#getRandomCordinates();
        const pit = new Pit(coordinates);
        this.#physics.add(pit);
        return pit;
    }
}