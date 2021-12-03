import World from "../game/world/world.js";

export default class MapView {
    #world;

    constructor(world) {
        if (!world || !world instanceof World) {
            throw new Error("world should be instance of Map.")
        }
        this.#world = world;
    }

    update() {
        const mapElement = document.getElementById('world');
		mapElement.innerHTML = "";
        for (let y = 0; y < this.#world.size.y; y++) {
            const rowElement = document.createElement('div');
            rowElement.className = 'row';
            for (let x = 0; x < this.#world.size.x; x++) {
                const roomElement = this.#createTileElement(x, y);
                rowElement.append(roomElement);
            }    
            mapElement.append(rowElement);       
        } 
    }

    #createTileElement(x, y) {
        const element = document.createElement('div');
		element.setAttribute('id', 'room_' + x + '_' + y);
        element.classList.add('room');
        return element;
    }
}