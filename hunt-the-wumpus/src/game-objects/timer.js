export default class Timer {
    constructor(stopwatchSelector) {
        this._sec = 0;
        this._min = 0;
        this._hr = 0;
        this._stopTime = true;
        this._stTimeer = null;

        if (typeof stopwatchSelector !== 'string') {
            throw new Error('Selector is not string type.')
        }

        this._stopwatchElem = document.querySelector(stopwatchSelector);
    }

    timer() {

        if (this._stopTime == false) {
            this._sec = parseInt(this._sec);
            this._min = parseInt(this._min);
            this._hr = parseInt(this._hr);

            this._sec = this._sec + 1;

            if (this._sec == 60) {
                this._min = this._min + 1;
                this._sec = 0;
            }
            if (this._min == 60) {
                this._hr = this._hr + 1;
                this._min = 0;
                this._sec = 0;
            }

            if (this._sec < 10 || this._sec == 0) {
                this._sec = '0' + this._sec;
            }
            if (this._min < 10 || this._min == 0) {
                this._min = '0' + this._min;
            }
            if (this._hr < 10 || this._hr == 0) {
                this._hr = '0' + this._hr;
            }

            this._stopwatchElem.innerHTML = this._hr + ':' + this._min + ':' + this._sec;
        }

        this._stTimeer = setTimeout(() => this.timer(), 1000);
    }

    startTimer() {
        if (this._stopTime == true) {
            this._stopTime = false;
            this.timer();
        }
    }

    stopTimer() {
        if (this._stopTime == false) {
            this._stopTime = true;
        }
    }

    resetTimer() {
        this._stopwatchElem.innerHTML = '00:00:00';

        this._stopTime = true;
        this._sec = 0;
        this._min = 0;
        this._hr = 0;

        clearTimeout(this._stTimeer);
    }
}