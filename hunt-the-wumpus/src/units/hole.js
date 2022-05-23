import Animation from "../game-animations/animation.js";
import EnemyUnit from "./enemyUnit.js";

export default class Hole extends EnemyUnit {
    constructor(posX, posY) {
        super('hole', posX, posY);
        this.color = "#6457CF";
        this.messages = ["The wind's blowing!", "I feel the breeze!"];
        // найти анимацию (сейчас заглушка)
        this._animations = [new Animation('img/unith/0.gif', 3, this.posX, this.posY)];
    }
}