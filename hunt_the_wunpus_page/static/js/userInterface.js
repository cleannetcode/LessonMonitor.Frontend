import Direction from "./game/world/direction.js";
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
        this.#createBtnAction('LMoveBtn', Direction.left, this.#game.world.player.moveInterface);
        this.#createBtnAction('RMoveBtn', Direction.right, this.#game.world.player.moveInterface);
        this.#createBtnAction('UMoveBtn', Direction.up, this.#game.world.player.moveInterface);
        this.#createBtnAction('DMoveBtn', Direction.down, this.#game.world.player.moveInterface);
    }

    #addAttackEventToBtns() {
        this.#createBtnAction('LAttackBtn', Direction.left, this.#game.world.player.attackInterface);
        this.#createBtnAction('RAttackBtn', Direction.right, this.#game.world.player.attackInterface);
        this.#createBtnAction('UAttackBtn', Direction.up, this.#game.world.player.attackInterface);
        this.#createBtnAction('DAttackBtn', Direction.down, this.#game.world.player.attackInterface);
    }

    #createBtnAction(btnName, direction, action) {
        const btn = document.getElementById(btnName);
        btn.addEventListener('click', () => {
            if (action(direction)) {
                this.#update();
            }
        });
    }

    #update() {
        this.#game.update();
        this.#view.update();
    }
}