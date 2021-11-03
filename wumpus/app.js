class Unit {
    constructor(name, posX, posY){
        this.name = name ?? 'unit';
        this.posX = posX ?? 0;
        this.posY = posY ?? 0;
    }
}

class Player extends Unit {

    constructor(){
        super('player');
    }

    turnLeft() {
        if (this.posX > 0) {
            this.posX = this.posX - 1;
        }
    }

    turnRight() {
        if (this.posX < game.map.size.x) {
            this.posX = this.posX + 1;
        }
    }
    
    turnUp() {
        if (this.posY > 0) {
            this.posY = this.posY - 1;
        }
    }
    
    turnDown() {
        if (this.posY < game.map.size.y) {
            this.posY = this.posY + 1;
        }
    }
}

class Wumpus extends Unit {
    constructor(posX, posY){
        super('wumpus', posX, posY)
    }
}

class Bat extends Unit {
    constructor(posX, posY){
        super('bat', posX, posY)
    }
}

class UI {

    constructor(game){
        this.game = game;

        this.app = this.game.app;

        this.app.innerHTML = '';
        this.setStylesVars();

        this.map = this.renderMap(this.game.app);
    }

    setStylesVars() {
        let root = document.documentElement;
        root.style.setProperty('--map-blocks-x', this.game.map.size.w);
        root.style.setProperty('--map-blocks-y', this.game.map.size.h);
        root.style.setProperty('--map-blocks-size', this.game.map.size.block + "px");
        root.style.setProperty('--map-w', this.game.map.size.w * this.game.map.size.block + "px");
        root.style.setProperty('--map-h', this.game.map.size.h * this.game.map.size.block + "px");
    }

    renderMap() {
        let el = document.createElement('map');
        this.app.appendChild(el);
        return el;
    }

    renderUnits() {

        this.game.units.forEach(unit => {
            let unitEl = document.createElement('unit');
            unitEl.classList.add('unit', `unit__${unit.name}`);
            unitEl.style.setProperty('grid-column', unit.posX);
            unitEl.style.setProperty('grid-row', unit.posY);

            this.map.appendChild(unitEl);
        });
    }

    renderControls() {
        let controls = document.createElement('controls');
        this.renderTrackPad(controls);
        this.app.appendChild(controls);
    }

    renderTrackPad(controls) {

        let player = game.units.find(x => x instanceof Player);

        this.renderTrackPadControl(controls, 'left', function(){
            player.turnLeft()
        });
        this.renderTrackPadControl(controls, 'right', player.turnRight);
        this.renderTrackPadControl(controls, 'up', player.turnUp);
        this.renderTrackPadControl(controls, 'down', player.turnDown);
    }

    renderTrackPadControl(controls, classPostfix, func) {
        let control = document.createElement('button');
        control.classList.add('trackpad__control', `trackpad__control-${classPostfix}`);
        control.onclick = function() {
            func();
            this.renderScene();
            this.renderControls();
        };

        controls.appendChild(control);
    }
}

class Game {

    constructor(appSelector, mapW, mapH, mapBlock, batsCount){
        this.app = document.querySelector(appSelector);
        this.map = {
            size: {
                w: mapW,
                h: mapH,
                block: mapBlock
            }
        };

        let wumpusX = getRandomInt(0, this.map.size.w - 1);
        let wumpusY = getRandomInt(0, this.map.size.h - 1);

        this.units = [new Player, new Wumpus(wumpusX, wumpusY)];
        
        for (let i = 0; i < batsCount; i++) {

            let x = getRandomInt(0, this.map.size.w - 1);
            let y = getRandomInt(0, this.map.size.h - 1);

            this.units.push(new Bat(x=x,y=y));
        }
        
        this.UI = new UI(this);
    }

    start() {
        this.UI.renderUnits();
        this.UI.renderControls();
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

let game = new Game('app', 21, 21, 30, 3);
game.start();