import Player from "../game/gameObjects/player.js";

export default class PlayerView {
    #player;

    constructor(player) {
        if (!player || !player instanceof Player) {
            throw new Error("player should be instance of Player.")
        }
        this.#player = player;
    }

    update() {
        let id = 'room_' + this.#player.coordinates.x + '_' + this.#player.coordinates.y;
        let roomHtml = document.getElementById(id);
        roomHtml.classList.add('player');
    }
}