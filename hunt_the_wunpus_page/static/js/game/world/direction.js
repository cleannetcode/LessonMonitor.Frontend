import Coordinates from "./coordinates.js";

export default class Direction {
    static get left() { return new Coordinates(-1, 0);  }
    static get right() { return new Coordinates(1, 0); }
    static get down() { return new Coordinates(0, 1); }
    static get up() { return new Coordinates(0, -1); }

    static getRandom() { 
        const dir = Math.round(Math.random() * 2 - 1);
        if (Math.random() > 0.5) {
            return new Coordinates(0, dir); 
        }
        return new Coordinates(dir, 0); 
    }
}