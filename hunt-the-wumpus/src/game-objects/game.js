import Timer from '../game-objects/timer.js';
import FPS from '../game-objects/fps.js';
import Log from '../game-objects/log.js';
import SoundEffects from './soundEffects.js'
import GameInstanse from '../game-instanse/gameInstanse.js';
import Helper from "../helper/helper.js"

export default class Game {
    constructor() {
        this._canvas = document.getElementById('canvas');
        this._canvas.width = 610;
        this._canvas.height = 370;
        this._context = this._canvas.getContext('2d');
        this._imageSize = 35;
        this._btnStart = document.querySelector('.btn-start');
        this._btnReset = document.querySelector('.btn-reset');
        this._countSteps = document.querySelector('.steps');
        this._countkills = document.querySelector('.kills');
        this._win = document.querySelector('.game-won');
        this._lose = document.querySelector('.game-lose');
        this._shootController = document.querySelectorAll('.game-arrows');

        this._gameInstanse = new GameInstanse();
        this._stopwatch = new Timer('.time');
        this._fps = new FPS();
        this._log = new Log();
        this._soundEf = new SoundEffects();

        this._stepCouner = 0;
        this._killCouner = 0;
        this._frames = [];
        this._tileW
        this._tileH
        this._gameState = false;

        this._mapTexture = {
            0: 'img/border/Brick_Wall_Cracked.png',
            1: 'img/border/Dirt_Road.png'
        }

        this._arrowEnum = {
            0: 'ArrowLeft',
            1: 'ArrowUp',
            2: 'ArrowDown',
            3: 'ArrowRight'
        }
    }

    #drawMap() {
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

                this._context.drawImage(image, x * this._gameInstanse.tileW, y * this._gameInstanse.tileH, this._gameInstanse.tileW, this._gameInstanse.tileH);
            }
        }

        this._fps.showFPS(this._context);
        //this._frames.push(requestAnimationFrame(this.#drawMap.bind(this)));
        requestAnimationFrame(this.#drawMap.bind(this));
    }

    #drawUnits() {
        this._gameInstanse.player._animations.forEach(
            (animation) => animation.draw(this._context, this._gameInstanse, this._gameInstanse.player.posX, this._gameInstanse.player.posY));

        this._gameInstanse.enemies.forEach((enemy) => {
            enemy._animations.forEach((animation) => animation.draw(this._context, this._gameInstanse, enemy.posX, enemy.posY));
        })

        //this._frames.push(requestAnimationFrame(this.#drawUnits.bind(this)));
        requestAnimationFrame(this.#drawUnits.bind(this));
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
                    this._log.addLogMessage(enemy.messages[Helper.getRandomInt(0, enemy.messages.length)]);
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
                this._countSteps.innerHTML = parseInt(++this._stepCouner);
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
        this._btnReset.disabled = !this._btnReset.disabled;

        this._shootController.forEach((arrow) => {
            arrow.disabled = !arrow.disabled;
        });
    }

    #shooting(direction, wumpus) {
        switch (direction) {
            case 'ArrowLeft':
                wumpus.isAlive = !(wumpus.posX == this._gameInstanse.player.posX - 1 && wumpus.posY == this._gameInstanse.player.posY);

                break;
            case 'ArrowUp':
                wumpus.isAlive = !(wumpus.posX == this._gameInstanse.player.posX && wumpus.posY == this._gameInstanse.player.posY - 1);
                break;

            case 'ArrowDown':
                wumpus.isAlive = !(wumpus.posY == this._gameInstanse.player.posY + 1 && wumpus.posX == this._gameInstanse.player.posX);
                break;

            case 'ArrowRight':
                wumpus.isAlive = !(wumpus.posY == this._gameInstanse.player.posY && wumpus.posX == this._gameInstanse.player.posX + 1);
                break;
            default:

                console.warn('Direction is not recognized.');
                break;
        }

        if (wumpus.isAlive) {
            this._log.addLogMessage(this._gameInstanse.player.missMessages[Helper.getRandomInt(0, this._gameInstanse.player.missMessages.length)]);
        } else {
            this._soundEf.playSliceAudio();
        }
    }

    #checkGameOver() {
        let wumpus = this._gameInstanse.enemies.find(x => x.name == 'wumpus');
        let isGameOver = !this._gameInstanse.player.isAlive || !wumpus.isAlive;

        if (isGameOver) {
            this._gameState = false;
            this._stopwatch.stopTimer();
            this.#gameOver()
            this._countkills.innerHTML = parseInt(++this._killCouner);
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

    #reset() {
        this._log.clearLog();
        this._log.addLogMessage('Reset Game!');
        this._stopwatch.stopTimer();
        this._stopwatch.resetTimer();
        this._gameState = false;
        this._stepCouner = 0;
        this._killCouner = 0
        this._countSteps.innerHTML = parseInt(this._stepCouner);
        this._countkills.innerHTML = parseInt(this._killCouner);
        this.#toggleBtnDisable();
        this._soundEf.stopMainAudio();
        this._soundEf.stopGameOver();
        this._soundEf.stopWin();
        this._win.style.display = 'none';
        this._lose.style.display = 'none';
        this._gameInstanse.player.isAlive = true;
        this._gameInstanse.enemies.forEach((enemy) => { enemy.isAlive = true; })
        this._gameInstanse.setValidLocation();

        //this._frames.forEach((id) => cancelAnimationFrame(id));
    }

    #start() {
        this._log.clearLog();
        this._log.addLogMessage('Start Game!');
        this._stopwatch.startTimer();
        this._gameState = true;
        this.#toggleBtnDisable();
        this._soundEf.playMainAudio();
    }

    init() {
        this.#drawMap();
        this.#drawUnits();
        this.eventListeners();
    }

    eventListeners() {
        this._btnStart.addEventListener('click', this.#start.bind(this));
        this._btnReset.addEventListener('click', this.#reset.bind(this));
        document.addEventListener('keyup', (e) => this.#keyPressHandler(e));
        this._shootController.forEach((arrow) => {
            arrow.addEventListener('click', (e) => {
                let wumpus = this._gameInstanse.enemies.find(x => x.name == 'wumpus');
                this.#shooting(e.target.dataset.direction, wumpus);
                this.#checkGameOver();
            })
        })
    }
}