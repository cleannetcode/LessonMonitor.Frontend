export default class Animation {
    constructor(srcImage, seconds, posX, posY, rotation) {
        this._srcImage = srcImage;
        this._seconds = seconds ?? 0;
        this._posX = posX ?? 0;
        this._posY = posY ?? 0;
        this._rotation = rotation ?? 0;

        this._imageSize = 37;
        this._currenSeconds = 0;
        this._counter = 0;

        this._frames = [];
    }

    draw(context, gameInstanse, posX, posY) {
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';
        let update = true;

        const image = new Image(this._imageSize, this._imageSize);
        image.src = this._srcImage;
        image.onload = () => { update = true; };

        let dateNowSeconds = Math.floor(Date.now() / 110);

        if (dateNowSeconds != this._currenSeconds) {
            this._currenSeconds = dateNowSeconds;

            this._srcImage = this._srcImage.substr(0, 10) + this._counter + this._srcImage.substr(11);
            this._counter++
        }

        if (this._counter == 10) {
            this._counter = 0;
        }

        // утечка памяти. (необходимо исправить)
        function renderFunction() {
            if (update) {
                update = false;

                context.drawImage(image, posX * gameInstanse.tileW, posY * gameInstanse.tileH, image.width, image.height);
            }
            requestAnimationFrame(renderFunction);
        }

        requestAnimationFrame(renderFunction);
    }
}