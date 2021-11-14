export default class FPS {
    constructor(context) {
        this._curren_seconds = 0;
        this._frameCount = 0;
        this._framesLast_second = 0;
    }

    showFPS(context) {
        if (context == null) {
            throw new Error("Context is empty.")
        }

        let _seconds = Math.floor(Date.now() / 1000);

        if (_seconds != this._curren_seconds) {
            this._curren_seconds = _seconds;
            this._framesLast_second = this._frameCount;
            this._frameCount = 1

        } else {
            this._frameCount++;
        }

        context.fillStyle = '#ff0000';
        context.fillText("FPS: " + this._framesLast_second, 10, 20);
    }
}