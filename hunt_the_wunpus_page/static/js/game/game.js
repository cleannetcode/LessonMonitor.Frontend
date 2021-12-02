import Coordinates from './coordinates.js';
import Map from './map/map.js';
import Player from './gameObjects/player.js';
import Bats from './gameObjects/bats.js';
import Wumpus from './gameObjects/wumpus.js';
import GameObject from './gameObjects/gameObject.js';
import Direction from './direction.js';
import Arrow from './gameObjects/arrow.js';

class Game {
    #map;
    #player;
    #wumpus;
    #bats;
    #gameObjects = []

    get map() { return this.#map; }
    get player() { return this.#player; }
    get wumpus() { return this.#wumpus; }
    get bats() { return this.#bats; }

    constructor(mapSize) {
        this.#map = new Map(mapSize, mapSize);
        let arrow = new Arrow(new Coordinates(0,0), this.collision.bind(this));
        this.#player = new Player(new Coordinates(4, 0), arrow, this.collision.bind(this));
        this.#wumpus = new Wumpus(new Coordinates(4, 1), this.collision.bind(this));
        this.#bats = new Bats(new Coordinates(2, 2), mapSize, mapSize);
        this.#gameObjects = [this.#player, arrow, this.#wumpus, this.#bats];
        for (let i = 0; i < this.#map.pitCount; i++) {
            const pit = this.#map.getPit(i);
            this.#gameObjects.push(pit);
        }
    }

    update() {
        if (this.#player.isAlive) {
            if (Math.random() > 0.5) {
                var direction = Direction.getRandom();
                if (this.#map.isValidDirectionFor(this.#wumpus.coordinates, direction, 1)) {
                    var room = this.#map.getNextRoomByDirection(this.#wumpus.coordinates, direction, 1);
                    this.#wumpus.moveTo(room.coordinates);
                }
            }
        }
    }

    collision(object) {
        if (!object || !object instanceof GameObject) {
            throw Error('object should be instance of GameObject');
        }
        this.#gameObjects.forEach(gameObject => {
            if (gameObject.coordinates.equalsWith(object.coordinates)) {
                gameObject.collisionWith(object);
                object.collisionWith(gameObject);
            }
        });
    }
}

export default Game;