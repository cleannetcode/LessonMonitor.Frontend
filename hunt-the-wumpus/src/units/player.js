import BaseUnit from "./baseUnit.js";

export default class Player extends BaseUnit {
    constructor(posX, posY) {
        super('player', posX, posY);
        this.img = "img/player.png"
        this.messages = ["Gotcha!"];
        this.missMessages = ["We must shoot better!", "I missed, damn it!"]
    }

    shoot(rotation) {

    }
}