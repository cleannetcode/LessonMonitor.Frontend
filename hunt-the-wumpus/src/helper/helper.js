export default class Helper {

    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}