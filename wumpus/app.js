const successMessages = ['Поздравляем, вы победили'];
const failMessages = ['К сожалению, вы потерпели поражение'];
const tryAgainMessage = ['Попробовать еще'];
const warningMessagesWumpus = ['Вы чувствуете вонь'];
const warningMessagesBat = ['Вы слышите шелест'];
const warningMessagesHole = ['Вы чувствуете сквозняк'];
const missMessages = ['Мимо','Можно было точнее','Такое себе'];

const directionEnum = {  UP: 'up', LEFT: 'left', RIGHT: 'right', DOWN: 'down' }
const gameState = { init: 0, started: 1, over: 2 }
const isDebug = false;

class Log {
    messages = [];

    constructor(game){
        this.game = game;
    }

    add(message){
        if (message.length < 1) return;

        this.messages.splice(0, 0, message);
        this.game.ui.renderLog(this.messages.join('\n'));
    }
}

class Unit {
    constructor(name, posX, posY){
        this.name = name ?? 'unit';
        this.posX = posX ?? 0;
        this.posY = posY ?? 0;
        this.isAlive = true;
        this.warningMessages = [];
    }
}

class Enemy extends Unit{
    getWarningMessage(){
        return getRandomFromArray(this.warningMessages);
    }
}

class Player extends Unit {
    constructor(){
        super('player');
    }
}

class Wumpus extends Enemy {
    constructor(posX, posY){
        super('wumpus', posX, posY);
        this.warningMessages = warningMessagesWumpus;
    }
}

class Bat extends Enemy {
    constructor(posX, posY){
        super('bat', posX, posY);
        this.warningMessages = warningMessagesBat;
    }
}

class Hole extends Enemy {
    constructor(posX, posY){
        super('hole', posX, posY);
        this.warningMessages = warningMessagesHole;
    }
}

class UI {

    constructor(game){
        this.game = game;

        this.app = this.game.app;

        this.app.innerHTML = '';
        this.setStylesVars();
    }

    setStylesVars() {
        let root = document.documentElement;
        root.style.setProperty('--game-state', this.game.state);
        root.style.setProperty('--map-blocks-x', this.game.map.size.w);
        root.style.setProperty('--map-blocks-y', this.game.map.size.h);
        root.style.setProperty('--map-blocks-size', this.game.map.size.block + "px");
        root.style.setProperty('--map-w', this.game.map.size.w * this.game.map.size.block + "px");
        root.style.setProperty('--map-h', this.game.map.size.h * this.game.map.size.block + "px");

        this.app.setAttribute('data-game-state',this.game.state);
        this.app.setAttribute('data-debug', isDebug);
    }

    render(){
        this.setStylesVars();

        if (game.state == gameState.over){
            this.renderGameOverScreen(this.game.player.isAlive);
        } else {
            this.app.innerHTML = '';
            this.renderMap();
            this.renderLog();
            this.renderUnits();
            this.renderControls();
        }
    }

    renderLog(messages){

        if (messages == undefined || messages.length < 1) return;

        let log = this.app.querySelector('log') ?? this.app.appendChild(document.createElement('log'));
        log.innerText = messages;
    }

    renderMap(){
        this.map = document.createElement('map');
        this.app.appendChild(this.map);
    }

    renderGameOverScreen(isSuccess){

        let old = document.querySelector('#gameOver');
        if (old !== null) old.remove();

        let el = document.createElement('div');
        el.id = 'gameOver';
        let msg = document.createElement('div');
        msg.classList.add('message',`${isSuccess? 'success' : 'fail'}`)
        
        msg.innerText = getRandomFromArray((isSuccess) ? successMessages : failMessages);

        el.append(msg);

        let tryAgainButton = document.createElement('button');
        tryAgainButton.innerText = getRandomFromArray(tryAgainMessage);
        tryAgainButton.onclick = function(){
            game.start();
        };

        el.append(tryAgainButton);

        this.app.appendChild(el);
    }

    renderUnits() {

        this.map.innerHTML = '';

        this.game.units.forEach(unit => {
            let unitEl = document.createElement('unit');
            unitEl.classList.add('unit', `unit__${unit.name}`);
            unitEl.style.setProperty('grid-column', unit.posX + 1);
            unitEl.style.setProperty('grid-row', unit.posY + 1);
            this.map.appendChild(unitEl);
        });
    }

    renderControls() {
        let controls = document.createElement('controls');
        this.renderTrackPad(controls);
        this.renderShootPad(controls);
        this.app.appendChild(controls);
    }

    renderTrackPad(controls) {

        let player = game.units.find(x => x instanceof Player);

        this.renderTrackPadControl(controls, directionEnum.LEFT, function(){
            game.moveUnitLeft(player);
        });
        this.renderTrackPadControl(controls, directionEnum.RIGHT, function(){
            game.moveUnitRight(player);
        });
        this.renderTrackPadControl(controls, directionEnum.UP, function(){
            game.moveUnitUp(player);
        });
        this.renderTrackPadControl(controls, directionEnum.DOWN, function(){
            game.moveUnitDown(player);
        });
    }

    renderShootPad(controls) {

        this.renderShootPadControl(controls, directionEnum.LEFT, function(){
            game.shootBow(directionEnum.LEFT);
        });
        this.renderShootPadControl(controls, directionEnum.RIGHT, function(){
            game.shootBow(directionEnum.RIGHT);
        });
        this.renderShootPadControl(controls, directionEnum.UP, function(){
            game.shootBow(directionEnum.UP);
        });
        this.renderShootPadControl(controls, directionEnum.DOWN, function(){
            game.shootBow(directionEnum.DOWN);
        });
    }

    renderTrackPadControl(controls, classPostfix, func) {
        let control = document.createElement('button');
        control.classList.add('trackpad__control', `trackpad__control-${classPostfix}`);
        control.onclick = func;
        controls.appendChild(control);
    }

    renderShootPadControl(controls, classPostfix, func) {
        let control = document.createElement('button');
        control.classList.add('shootpad__control', `shootpad__control-${classPostfix}`);
        control.onclick = func;
        controls.appendChild(control);
    }
}

class Game {

    constructor(appSelector, mapW, mapH, mapBlock, batCount, holeCount){

        if (mapW < 11 || mapH < 11)
            throw 'Размеры карты не могут быть меньше 11 единиц';

        if (batCount < 0 || holeCount < 0)
            throw 'Количество вражеских элеменетов должно быть больше 0';

        let maxUnits = Math.floor((mapW * mapH) * 0.3);
        let unitsCount  = batCount + holeCount + 2;

        if (unitsCount > maxUnits)
            throw 'Увеличьте размеры карты, либо уменьшите количество вражеских юнитов';
        
        this.app = document.querySelector(appSelector);
        this.map = {
            size: {
                w: mapW,
                h: mapH,
                block: mapBlock
            }
        };

        this.batCount = batCount;
        this.holeCount = holeCount;

        this.log = new Log(this);

        this.ui = new UI(this);

        this.state = gameState.init;
    }

    start() {
        let wumpusX = getRandomInt(0, this.map.size.w - 1);
        let wumpusY = getRandomInt(0, this.map.size.h - 1);

        this.player = new Player();
        this.wumpus = new Wumpus(wumpusX, wumpusY);

        this.units = [this.player, this.wumpus];
        
        this.generateAndPlaceUnits(Bat, this.batCount);
        this.generateAndPlaceUnits(Hole, this.holeCount);

        this.state = gameState.started;

        this.ui.render();
        this.warnIfDangerIsNear();
    }

    end(){
        game.state = gameState.over;
        this.ui.render();
    }

    generateAndPlaceUnits(className, count){
        for (let i = 0; i < count; i++) {

            let x = getRandomInt(0, this.map.size.w - 1);
            let y = getRandomInt(0, this.map.size.h - 1);

            let obj = new className(x,y);
            this.map[x,y] = obj;
            this.units.push(obj);
        }
    }

    moveUnitLeft(unit){
        if (unit.posX > 0) {
            unit.posX = unit.posX - 1;
            this.afterPlayerGo();
        }
    }

    moveUnitRight(unit) {
        if (unit.posX < this.map.size.w - 1) {
            unit.posX = unit.posX + 1;
            this.afterPlayerGo();
        }
    }
    
    moveUnitUp(unit) {
        if (unit.posY > 0) {
            unit.posY = unit.posY - 1;
            this.afterPlayerGo();
        }
    }
    
    moveUnitDown(unit) {
        if (unit.posY < this.map.size.h - 1) {
            unit.posY = unit.posY + 1;
            this.afterPlayerGo();
        }
    }

    afterPlayerGo(isShoot = false){

        if (!this.checkGameOver())
        {
            if (!isShoot){
                this.warnIfDangerIsNear();
            }
            this.wumpusGo();
            this.ui.renderUnits();
        }
        
    }

    checkGameOver(){

        this.units.forEach(unit => {
            if (unit instanceof Enemy) {
                let playerDie = unit.posX === this.player.posX && unit.posY === this.player.posY;

                if (playerDie){
                    this.player.isAlive = !playerDie;
                }
                
            }
        });

        let isGameOver = !this.player.isAlive || !this.wumpus.isAlive;

        if (isGameOver) {
            this.end();
        }

        return isGameOver;
    }

    moveUnit(unit, position) {
        delete this.map[unit.posX, unit.posY];
        unit.posX = position.x;
        unit.posY = position.y;
        this.map[unit.posX, unit.posY] = unit;
    }

    wumpusGo(){
        let positions = [
            { x: this.wumpus.posX - 1, y: this.wumpus.posY },
            { x: this.wumpus.posX + 1, y: this.wumpus.posY },
            { x: this.wumpus.posX, y: this.wumpus.posY - 1 },
            { x: this.wumpus.posX, y: this.wumpus.posY + 1 }
        ];

        let filteredPositions = [];

        for (let i = 0; i < positions.length; i++)
        {
            var canUsePosition =
                positions[i].x >= 0 && positions[i].x < this.map.size.w
                &&
                positions[i].y >= 0 && positions[i].y < this.map.size.h
                &&
                !(this.map[positions.x, positions.y] instanceof Enemy);

            if (canUsePosition)
                filteredPositions.push(positions[i]);
        }

        let idx = getRandomInt(0, filteredPositions.length);
        this.moveUnit(this.wumpus, filteredPositions[idx]);

        this.player.isAlive = !(this.wumpus.posX == this.player.posX && this.wumpus.posY == this.player.posY);

        if (!this.checkGameOver())
            this.ui.renderUnits();
    }

    shootBow(direction){

        switch (direction) {
            case directionEnum.UP:
                this.wumpus.isAlive = !(this.wumpus.posX == this.player.posX && this.wumpus.posY == this.player.posY - 1);
                break;

            case directionEnum.DOWN:
                this.wumpus.isAlive = !(this.wumpus.posX == this.player.posX && this.wumpus.posY == this.player.posY + 1);
                break;

            case directionEnum.LEFT:
                this.wumpus.isAlive = !(this.wumpus.posY == this.player.posY && this.wumpus.posX == this.player.posX - 1);
                break;

            case directionEnum.RIGHT:
                this.wumpus.isAlive = !(this.wumpus.posY == this.player.posY && this.wumpus.posX == this.player.posX + 1);
                break;
        }

        if (this.wumpus.isAlive){
            this.log.add(getRandomFromArray(missMessages));
        }

        this.afterPlayerGo(true);
    }

    warnIfDangerIsNear(){

        this.units.forEach(unit => {

            if (unit.posX >= this.player.posX - 1 && unit.posX <= this.player.posX + 1 
                && 
                unit.posY >= this.player.posY - 1 && unit.posY <= this.player.posY + 1
                ){

                    if (unit instanceof Enemy) {
                        this.log.add(unit.getWarningMessage());
                    }

                }

        });
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomFromArray(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}

let game = new Game('app', 21, 21, 30, 3, 3);
game.start();