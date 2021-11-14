import BaseUnit from "./baseUnit.js";
import Log from "../game-objects/log.js";

export default class EnemyUnit extends BaseUnit {
    constructor(posX, posY) {
        super(posX, posY);

        this.log = new Log();
    }

    onCollision(_gameInstanse) {
        _gameInstanse.player.isAlive = false;
        this.log.addLogMessage("Game Over!");
    }

    onMove() {

    }
}