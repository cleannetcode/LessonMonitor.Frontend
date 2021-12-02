import Room from './room.js';
import RoomType from './roomType.js';
import Direction from '../direction.js';
import Coordinates from '../coordinates.js';
import Pit from '../gameObjects/pit.js';

class Map {
    #rooms = [];
    #pits = [];
    #width = 0;
    #height = 0;
    
    get width() { return this.#width; }
    get height() { return this.#height; }
    get pitCount() { return this.#pits.length; }
    
    constructor(width, height) {
        if (isNaN(width) || width < 2) {
			throw Error('width should be Number and greater then 2');
		}
        if (isNaN(height) || height < 2) {
			throw Error('height should be Number and greater then 2');
		}
        this.#width = width;
        this.#height = height;
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x< this.width; x++)  {     
                const coordinates = new Coordinates(x, y);
                let roomType = RoomType.simple;
                if (x == 1 && y == 1) {
                    roomType = RoomType.pit;
                    this.#pits.push(new Pit(coordinates));
                }         
                this.#rooms.push(new Room(roomType, coordinates));
            }
        }
    }

    getRoom(coordinates) {
        if (!coordinates || !coordinates instanceof Coordinates) {
			throw Error('coordinates should be instance of Coordinates.');
		}
        if (coordinates.x < 0 || coordinates.x >= this.width ||
            coordinates.y < 0 || coordinates.y >= this.height) {
            throw Error('coordinates is not valide.');
        }
        return this.#rooms[coordinates.x + coordinates.y * this.width];
    }

    getNextRoomByDirection(startCoordinates, direction, range) {
        const roomCoordinate = Coordinates.createCoorndinatesBy(startCoordinates, direction, range);
        return this.getRoom(roomCoordinate);
    }

    getPit(id) {
        if(isNaN(id) || id < 0 || id >= this.pitCount) {
            throw Error("id should be greater than -1 and less than " + this.pitCount);
        }
        return this.#pits[id];
    }

    /**
	 * @param {Direction} direction
	 * @param {MapObject} mapObject
	 * @returns
	 */
	isValidDirectionFor(coordinates, direction, range) {
        if (!coordinates || !coordinates instanceof Coordinates) {
			throw Error('coordinates should be instance of Coordinates');
		}
        var newCoordinates = Coordinates.createCoorndinatesBy(coordinates, direction, range);
		switch (direction) {
			case Direction.up:
				return newCoordinates.y > -1;

			case Direction.down:
				return newCoordinates.y < this.height;

			case Direction.left:
				return newCoordinates.x > -1;

			case Direction.right:
				return newCoordinates.x < this.width;

			default:
				return false;
		}
	}
}

export default Map;