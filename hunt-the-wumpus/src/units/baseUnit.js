export default class BaseUnit {
    constructor(name, posX, posY) {
        this.name = name ?? 'unit';
        this.posX = posX ?? this.getRandomInt(3, 20);
        this.posY = posY ?? this.getRandomInt(3, 10);
        this.color = "#FFFFFF";
        this.img = null;
        this.isAlive = true;
        this.messages = [];
    }

    moveTo(direction) {
        let newLocation = this.getMoveTo(direction);
        this.posX = newLocation.X;
        this.posY = newLocation.Y;
    }

    getMoveTo(direction) {
        switch (direction) {
            case 'ArrowLeft':
                return { X: this.posX - 1, Y: this.posY };
            case 'ArrowUp':
                return { X: this.posX, Y: this.posY - 1 };
            case 'ArrowDown':
                return { X: this.posX, Y: this.posY + 1 };
            case 'ArrowRight':
                return { X: this.posX + 1, Y: this.posY };
            default:

                console.warn('Direction is not recognized.');
                break;
        }
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}