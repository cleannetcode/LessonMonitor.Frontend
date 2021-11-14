'use strict';

import Game from './game-objects/game.js';

document.addEventListener("DOMContentLoaded", () => {
    let game = new Game();
    game.eventListeners();
});