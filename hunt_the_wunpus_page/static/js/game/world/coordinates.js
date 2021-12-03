export default class Coordinates {
    #x = -1;
    #y = -1;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    get x() { return this.#x; }
    get y() { return this.#y; }

    equalsWith(coordinates) {
        if (!coordinates || !coordinates instanceof Coordinates) {
            throw Error('coordinates should be instance of Coordinates');
        }
        return this.x == coordinates.x && this.y == coordinates.y;
    }

    distanceTo(coordinates) {
        if (!coordinates || !coordinates instanceof Coordinates) {
            throw Error('coordinates should be instance of Coordinates');
        }
        const dx = this.x - coordinates.x;
        const dy = this.y - coordinates.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    static createCoorndinatesBy(oldCoordinates, direction, range) {
        if (!oldCoordinates || !oldCoordinates instanceof Coordinates) {
			throw Error('oldCoordinates should be instance of Coordinates');
		}
        if (!direction || !direction instanceof Coordinates) {
			throw Error('direction should be instance of Coordinates');
		}
        if (isNaN(range) || range < 0) {
			throw Error('range cannot be null or undefined');
		}

        let x = oldCoordinates.x + direction.x * range;
        let y = oldCoordinates.y + direction.y * range;
        return new Coordinates(x, y);
    }
}