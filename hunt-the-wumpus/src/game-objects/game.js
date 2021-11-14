import Timer from '../game-objects/timer.js';
import FPS from '../game-objects/fps.js';
import Log from '../game-objects/log.js';
import SoundEffects from './soundEffects.js'
import GameInstanse from '../game-instanse/gameInstanse.js';

export default class Game {
    constructor() {
        this._context = document.getElementById('canvas').getContext('2d');
        this.width = this._context.width = 610;
        this.height = this._context.height = 370;

        this._gameWindow = document.querySelector('.game-map');
        this._btnStart = document.querySelector('.btn-start');
        this._btnClear = document.querySelector('.btn-clear');
        this._countSteps = document.querySelector('.steps');
        this._win = document.querySelector('.game-won');
        this._lose = document.querySelector('.game-lose');
        this._shootController = document.querySelectorAll('.game-arrows');

        this._couner = 0;
        this._frames = [];
        this._tileW = null;
        this._tileH = null;
        this._gameState = false;

        this._gameInstanse = new GameInstanse();
        this._stopwatch = new Timer('.time');
        this._fps = new FPS();
        this._log = new Log();
        this._soundEf = new SoundEffects();

        this._mapTexture = {
            0: 'img/Brick_Wall_Cracked.png',
            1: 'img/Dirt_Road.png'
        }

        this._arrowEnum = {
            0: 'ArrowLeft',
            1: 'ArrowUp',
            2: 'ArrowDown',
            3: 'ArrowRight'
        }
    }

    init() {
        this.drawGame();
        this._log.clearLog();
        this._log.addLogMessage('Start Game!');
        this._stopwatch.startTimer();
        this._gameState = true;
        this.#toggleBtnDisable();
        this._soundEf.playMainAudio();
    }

    drawGame() {
        this._tileW = this._gameWindow.offsetWidth / this._gameInstanse.mapW;
        this._tileH = this._gameWindow.offsetHeight / this._gameInstanse.mapH;

        if (this._context === null) {
            return;
        }

        for (let y = 0; y < this._gameInstanse.mapH; y++) {
            for (let x = 0; x < this._gameInstanse.mapW; x++) {

                let tileValue = this._gameInstanse.getGameMapLocation(x, y)
                let texturePath = this._mapTexture[tileValue];

                this._context.imageSmoothingEnabled = true;
                this._context.imageSmoothingQuality = 'high';
                const image = new Image();
                image.src = texturePath;

                this._context.drawImage(image, x * this._tileW, y * this._tileH, this._tileW, this._tileH);
            }
        }

        this._fps.showFPS(this._context);
        this.#drawUnits();
        this._frames.push(requestAnimationFrame(() => this.drawGame()));
    }

    #drawUnits() {
        this._gameInstanse.enemies.forEach((enemy) => {
            const image = new Image(37, 37);
            image.src = enemy.img;

            this._context.imageSmoothingEnabled = true;
            this._context.imageSmoothingQuality = 'high';
            this._context.drawImage(image, enemy.posX * this._tileW, enemy.posY * this._tileH, image.width, image.height,);
        })

        const image = new Image(37, 37);
        image.src = this._gameInstanse.player.img;
        this._context.drawImage(image, this._gameInstanse.player.posX * this._tileW, this._gameInstanse.player.posY * this._tileH, image.width, image.height);
    }

    #checkUnitCollision() {
        this._gameInstanse.enemies.forEach((enemy) => {
            if (enemy != this._gameInstanse.player) {

                let diffX = this._gameInstanse.player.posX - enemy.posX;
                let diffY = this._gameInstanse.player.posY - enemy.posY;

                if (diffX == 0 && diffY == 0) {
                    enemy.onCollision(this._gameInstanse);
                    this.#checkGameOver();

                } else if (diffX >= -1 && diffX <= 1 && diffY >= -1 && diffY <= 1) {
                    this._log.addLogMessage(enemy.messages[enemy.getRandomInt(0, enemy.messages.length)]);
                }
            }
        });
    }

    #keyPressHandler(e) {
        if (this._gameState && this.#checkKey(e)) {
            let location = this._gameInstanse.player.getMoveTo(e.key);
            let mapLocation = this._gameInstanse.getGameMapLocation(location.X, location.Y);

            this._gameInstanse.enemies.forEach((enemy) => enemy.onMove(this._gameInstanse));
            this.#checkUnitCollision();

            if (mapLocation == 1) {
                this._gameInstanse.player.moveTo(e.key);
                this.#checkUnitCollision();
                this.#checkGameOver();
                this._countSteps.innerHTML = parseInt(++this._couner);
                this._soundEf.playPlayerStep();

            } else {
                this._log.addLogMessage('Auch!!');
                this._soundEf.playBorderCollision();
            }
        }
    }

    #checkKey(e) {
        e = e || window.event;

        switch (e.key) {
            case 'ArrowLeft':
                return true;
            case 'ArrowUp':
                return true;
            case 'ArrowDown':
                return true;
            case 'ArrowRight':
                return true;
            default:
                return false;
        }
    }

    #toggleBtnDisable() {
        this._btnStart.disabled = !this._btnStart.disabled;
        this._btnClear.disabled = !this._btnClear.disabled;

        this._shootController.forEach((arrow) => {
            arrow.disabled = !arrow.disabled;
        });
    }

    #reset() {
        this._gameInstanse = new GameInstanse();
        this._log.clearLog();
        this._log.addLogMessage('Drawing removed!');
        this._stopwatch.stopTimer();
        this._stopwatch.resetTimer();
        this._couner = 0;
        this._countSteps.innerHTML = parseInt(this._couner);
        this.#toggleBtnDisable();
        this._context.clearRect(0, 0, this.width, this.height);
        this._soundEf.stopMainAudio();
        this._soundEf.stopGameOver();
        this._soundEf.stopWin();
        this._win.style.display = 'none';
        this._lose.style.display = 'none';

        if (this._frames.length > 0) {
            this._frames.forEach(id => cancelAnimationFrame(id));
        }
    }

    #checkGameOver() {
        let wumpus = this._gameInstanse.enemies.find(x => x.name == 'wumpus');
        let isGameOver = !this._gameInstanse.player.isAlive || !wumpus.isAlive;

        if (isGameOver) {
            this._gameState = false;
            this._stopwatch.stopTimer();
            this.#gameOver()
        }
    }

    #gameOver() {
        if (this._gameInstanse.player.isAlive) {
            this._win.style.display = 'block';
            this._soundEf.stopMainAudio();
            this._soundEf.playWin();
        } else {
            this._lose.style.display = 'block';
            this._soundEf.stopMainAudio();
            this._soundEf.playGameOver();
        }
    }

    eventListeners() {
        this._btnStart.addEventListener('click', this.init.bind(this));
        this._btnClear.addEventListener('click', this.#reset.bind(this));
        document.addEventListener('keyup', (e) => this.#keyPressHandler(e));
        this._shootController.forEach((arrow) => {
            arrow.addEventListener('click', (e) => {
                this._gameInstanse.player.shoot(e.target.dataset.rotation);
            })
        })
    }
}