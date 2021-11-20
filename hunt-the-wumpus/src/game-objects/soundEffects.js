export default class SoundEffects {
    constructor() {
        this._mainTheme = new Audio("audio/8-bit-mysterious-dungeon.mp3");
        this._playerStep = new Audio("audio/palyerStep.mp3");
        this._borderCollision = new Audio("audio/border.mp3");
        this._gameOver = new Audio("audio/gameOver.mp3");
        this._logNotification = new Audio("audio/logNotification.mp3");
        this._playerDeath = new Audio("audio/playerDeath.mp3");
        this._batTeleportation = new Audio("audio/batTeleport.mp3");
        this._win = new Audio("audio/win.mp3");
        this._slice = new Audio("audio/slice.mp3");

        // miss effect
        // wumpus dead effect
    }

    playMainAudio() {
        this._mainTheme.play();
        this._mainTheme.volume = 0.1;
        this._mainTheme.loop = true;
    }

    stopMainAudio() {
        this._mainTheme.pause();
        this._mainTheme.currentTime = 0.0;
    }

    playPlayerStep() {
        this._playerStep.play();
        this._playerStep.volume = 0.3;
    }

    playBorderCollision() {
        this._borderCollision.play();
        this._borderCollision.volume = 0.3;
    }

    playGameOver() {
        this._playerDeath.play();
        this._playerDeath.volume = 0.1;
        this._gameOver.play();
        this._gameOver.volume = 0.1;
    }

    stopGameOver() {
        this._gameOver.pause();
        this._gameOver.currentTime = 0.0;
    }

    playWin() {
        this._win.play();
        this._win.volume = 0.1;
    }

    stopWin() {
        this._win.pause();
        this._win.currentTime = 0.0;
    }

    playLogNotification() {
        this._logNotification.play();
        this._logNotification.volume = 0.1;
    }

    playTeleport() {
        this._batTeleportation.play();
        this._batTeleportation.volume = 0.1;
    }

    playSliceAudio() {
        this._slice.play();
        this._slice.volume = 0.3;
    }
}