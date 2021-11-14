import SoundEffects from "./soundEffects.js";

export default class Log {
    constructor() {
        this.messages = [];
        this.gameLog = document.querySelector('.game-log') ?? null;
        this._soundsEf = new SoundEffects();
    }

    addLogMessage(message) {
        this._soundsEf.playLogNotification();
        const time = document.querySelector('.time').innerHTML;

        if (message.length < 1 || time == null) {
            throw new Error('Selector is not string type.')
        };

        const spanItem = document.createElement('span');
        spanItem.classList.add('game-log__label');
        spanItem.innerHTML = `
            Log: <span class="game-log__text">${message}</span>
                <span class="game-log__time">${time}</span>`;

        this.gameLog.append(spanItem);
        this.gameLog.scrollTop = this.gameLog.scrollHeight - this.gameLog.clientHeight;
    }

    clearLog() {
        this.gameLog.innerHTML = '';
    }
}