import RoomType from "./roomType.js";
import Coordinates from "../Coordinates.js";

class Room {
	#type = 0;
	#coordinates;

	constructor(type, coordinates) {
		if (isNaN(type) || type < 0 || type > (RoomType.count - 1)) {
			throw new Error('type cannot be null and should be in 0..' + (RoomType.count - 1) + " range");
		}

		if (!coordinates || !coordinates instanceof Coordinates) {
			throw Error('coordinates should be instance of Coordinates');
		}
		this.#type = type;
		this.#coordinates = coordinates;
	}

	get type() { return this.#type; }
	get coordinates() { return this.#coordinates; }
}

export default Room;