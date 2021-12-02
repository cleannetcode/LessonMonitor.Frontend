export default class Direction {
    static get left() { return 0; }
    static get right() { return 1; }
    static get up() { return 2; }
    static get down() { return 3; }

    static getRandom() { return Math.floor(Math.random() * 4); }
}