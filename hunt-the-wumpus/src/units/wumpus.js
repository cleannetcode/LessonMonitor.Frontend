import EnemyUnit from "./enemyUnit.js";

export default class Wumpus extends EnemyUnit {
    constructor(posX, posY) {
        super('wumpus', posX, posY);
        this.color = "#2FF"
        this.img = "img/wumpus.png"
        this.messages = ["Strange sound!", "Stinks of something!", "Oink-oink-oink!"];
    }

    onMove(gameInstanse) {
        let newX = this.posX;
        let newY = this.posY;
        let i = 0;

        let isLocationValid = false;

        while (isLocationValid == false && i < 3) {
            let rnd = this.getRandomInt(0, 4);
            newX = this.posX;
            newY = this.posY;
            i++;

            switch (rnd) {
                case 0:
                    newX += 1;
                    break;
                case 1:
                    newX -= 1;
                    break;
                case 2:
                    newY += 1;
                    break;
                case 3:
                    newY -= 1;
                    break;
                default:

                    throw new Error('Direction is not recognized.');
                    break;
            }

            let newLocation = gameInstanse.getGameMapLocation(newX, newY);

            isLocationValid = (newLocation == 1);

            if (isLocationValid == false) { continue; }

            gameInstanse.enemies.forEach(enemy => {
                if (enemy.posX == newX && enemy.posY == newY) {
                    isLocationValid = false;
                }
            });
        }

        this.posX = newX;
        this.posY = newY;
    }
}