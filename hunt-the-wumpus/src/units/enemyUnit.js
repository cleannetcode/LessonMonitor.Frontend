import BaseUnit from "./baseUnit.js";
import Log from "../game-objects/log.js";

export default class EnemyUnit extends BaseUnit {
    constructor(name, posX, posY) {
        super(name, posX, posY);

        this.log = new Log();
    }

    onCollision(_gameInstanse) {
        _gameInstanse.player.isAlive = false;
        this.log.addLogMessage("Game Over!");
    }

    onMove() {

    }
}