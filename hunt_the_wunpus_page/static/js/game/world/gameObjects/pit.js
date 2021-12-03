import GameObject from "./gameObject.js";
import ObjectName from "./objectName.js";
import Player from "./player/player.js";

export default class Pit extends GameObject {
    constructor(coordinates) {
        super(ObjectName.pit, coordinates);
    }

    collisionWith(object) {
        super.collisionWith(object);
        if (object instanceof Player && object.isAlive) {
            object.die(this.name);
        }
    }
}