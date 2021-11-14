
export default class Animation {
    constructor(image, seconds, posX, posY) {

        this._seconds = seconds;
        this._rotation = null;
        this._animationPosX = posX;
        this._animationPosY = posY;
        this._isAnimationStart = true;
    }

    drawSwordAttack(rotation) {
        this._rotation = rotation;

        switch (this._rotation) {
            case '225':
                this._animationPosX -= 1;
                break;
            case '320':
                this._animationPosY -= 1;
                break;
            case '135':
                this._animationPosX += 1;
                break;
            case '45':
                this._animationPosY += 1;
                break;

            default:
                console.warn('Rotation is not recognized.');
                break;
        }
    }
}