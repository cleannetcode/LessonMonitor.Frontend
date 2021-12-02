import Game from './game/game.js';
import UserInterface from './userInterface.js';
import View from './view/view.js';


const game = new Game(5)
const view = new View(game);
const ui = new UserInterface(game, view);