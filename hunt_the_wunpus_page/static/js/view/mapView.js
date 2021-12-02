import Map from "../game/map/map.js";
import Coordinates from "../game/coordinates.js";

export default class MapView {
    #map;

    constructor(map) {
        if (!map || !map instanceof Map) {
            throw new Error("map should be instance of Map.")
        }
        this.#map = map;
    }

    update() {
        const mapElement = document.getElementById('map');
		mapElement.innerHTML = "";
        for (let y = 0; y < this.#map.height; y++) {
            const rowElement = document.createElement('div');
            rowElement.className = 'row';
            for (let x = 0; x < this.#map.width; x++) {
                const coordinates = new Coordinates(x, y);
                const room = this.#map.getRoom(coordinates);
                const roomElement = this.#createRoomElement(room);
                rowElement.append(roomElement);
            }    
            mapElement.append(rowElement);       
        } 
    }

    #createRoomElement(room) {
        const element = document.createElement('div');
		element.setAttribute('id', 'room_' + room.coordinates.x + '_' + room.coordinates.y);
        this.#debugView(room, element);
		return element;
    }
    
    #debugView(room, element) {
        element.classList.add('room');
        switch (room.type) {
            case 1:
                element.classList.add('pit');
                break;		
            default:
                break;
        }
    }
}