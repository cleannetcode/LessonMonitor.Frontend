import Map from "../game/map/map.js";
import Player from "../game/gameObjects/player.js";

export default class PitsView {
    #map;
    #player;
    #viewBox;

    constructor(map, player) {
        if (!map || !map instanceof Map) {
            throw new Error("map should be instance of Map.")
        }
        if (!player || !player instanceof Player) {
            throw new Error("player should be instance of Player.")
        }
        this.#map = map;
        this.#player = player;
        this.#createViewBox();
    }

    #createViewBox() {
        const messageBox = document.getElementById('viewMessages');
        this.#viewBox = document.createElement('h3');
        messageBox.append(this.#viewBox);
    }

    update() {
        this.#viewBox.innerHTML = "";
        for (let i = 0; i < this.#map.pitCount; i++) {
            const pit = this.#map.getPit(i);
            if (pit.coordinates.distanceTo(this.#player.coordinates) == 1) {
                this.#viewBox.innerHTML= "Вы чувствуете скозняк";
                break;
            }
        }
    }
}