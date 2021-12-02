import GameObject from "./gameObject.js";

export default class Pit extends GameObject {
    constructor(coordinates) {
        super('pit', coordinates);
    }
}