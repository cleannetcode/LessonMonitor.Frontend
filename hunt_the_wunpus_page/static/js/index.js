import Game from './game/game.js';
import { gameSetup } from './game/gameSetup.js';
import UserInterface from './userInterface.js';
import View from './view/view.js';

const debug = true;
const setup = gameSetup;
const game = new Game(setup);
const view = new View(game, debug);
new UserInterface(game, view);