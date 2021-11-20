import Animation from "../game-animations/animation.js";
import BaseUnit from "./baseUnit.js";

export default class Player extends BaseUnit {
    constructor(posX, posY) {
        super('player', posX, posY);
        this.messages = ["Gotcha!"];
        this.missMessages = ["We must shoot better!", "I missed, damn it!"]
        this._animations = [new Animation('img/unitp/1.gif', 3, this.posX, this.posY)];
    }

    shoot(rotation) {
        // Реализовать возможность рисовки анимации атаки с привязкой к позиции игрока.
        this._animations[0]._PosX = this.posX;
        this._animations[0]._PosY = this.posY;
        this._animations[0]._rotation = rotation;
    }
}