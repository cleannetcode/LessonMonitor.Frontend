import EnemyUnit from "./enemyUnit.js";

export default class Hole extends EnemyUnit {
    constructor(posX, posY) {
        super('hole', posX, posY);
        this.color = "#6457CF"
        this.img = "img/hole.png"
        this.messages = ["The wind's blowing!", "I feel the breeze!"];
    }
}