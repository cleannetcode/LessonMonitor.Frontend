import Direction from "./game/direction.js";
import Game from "./game/game.js";
import View from "./view/view.js";

export default class UserInterface {
    #game;
    #view;

    constructor(game, view) {
        if (!game || !game instanceof Game) {
            throw Error('game should be instance of game');
        }
        if (!view || !view instanceof View) {
            throw Error('view should be instance of View');
        }
        this.#game = game;
        this.#view = view;
        this.#addMoveEventToBtns();
        this.#addAttackEventToBtns();
    }

    #addMoveEventToBtns() {
        this.#createMoveAction('LMoveBtn', Direction.left);
        this.#createMoveAction('RMoveBtn', Direction.right);
        this.#createMoveAction('UMoveBtn', Direction.up);
        this.#createMoveAction('DMoveBtn', Direction.down);
    }

    #createMoveAction(btnName, direction) {
        const btn = document.getElementById(btnName);
        btn.addEventListener('click', () => {
            if (this.#movePlayer(this.#game.player, this.#game.map, direction)) {
                this.#update();
            }
        });
    }

    #movePlayer(player, map, direction) {
        if (isNaN(direction) || direction < 0) {
            throw Error('direction should be Number and greater then 0');
        }

        if (map.isValidDirectionFor(player.coordinates, direction, 1)) {
            const room = map.getNextRoomByDirection(player.coordinates, direction, 1);
            player.moveTo(room.coordinates);
            return true;
        }
        return true;
    }

    #addAttackEventToBtns() {
        this.#createAttackAction('LAttackBtn', Direction.left);
        this.#createAttackAction('RAttackBtn', Direction.right);
        this.#createAttackAction('UAttackBtn', Direction.up);
        this.#createAttackAction('DAttackBtn', Direction.down);
    }

    #createAttackAction(btnName, direction) {
        const btn = document.getElementById(btnName);
        btn.addEventListener('click', () => {
            if (this.#attack(this.#game.player, this.#game.map, direction)) {
                this.#update();
            }
        });
    }

    #attack(player, map, direction) {
        if (isNaN(direction) || direction < 0) {
            throw Error('direction should be Number and greater then 0');
        }
        if (map.isValidDirectionFor(player.coordinates, direction, 1)) {
            const room = map.getNextRoomByDirection(player.coordinates, direction, 1);
            player.arrow.attack(room.coordinates);
            return true;
        }
        return false;
    }

    #update() {
        this.#game.update();
        this.#view.update();
    }
}