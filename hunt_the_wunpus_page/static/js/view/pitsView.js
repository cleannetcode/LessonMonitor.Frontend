import World from "../game/world/world.js";
import Player from "../game/world/gameObjects/player/player.js";

export default class PitsView {
    #world;
    #player;
    #viewBox;
    #debug;

    constructor(world, player, debug) {
        if (!world || !world instanceof World) {
            throw new Error("world should be instance of Map.")
        }
        if (!player || !player instanceof Player) {
            throw new Error("player should be instance of Player.")
        }
        this.#world = world;
        this.#player = player;
        this.#debug = debug;
        this.#createViewBox();
    }

    #createViewBox() {
        const messageBox = document.getElementById('viewMessages');
        this.#viewBox = document.createElement('h3');
        messageBox.append(this.#viewBox);
    }

    update() {
        this.#viewBox.innerHTML = "";
        for (let i = 0; i < this.#world.pitCount; i++) {
            const pit = this.#world.getPit(i);
            if (pit.coordinates.distanceTo(this.#player.coordinates) == 1) {
                this.#viewBox.innerHTML = "Вы чувствуете скозняк";
                break;
            }
        }
        this.#debugView();
    }

    #debugView() {
        if (this.#debug) {
            for (let i = 0; i < this.#world.pitCount; i++) {
                const pitCoordinate = this.#world.getPit(i).coordinates;
                const id = 'room_' + pitCoordinate.x + '_' + pitCoordinate.y;
                const element = document.getElementById(id);
                element.classList.add('pit');
            }
        }
    }
}