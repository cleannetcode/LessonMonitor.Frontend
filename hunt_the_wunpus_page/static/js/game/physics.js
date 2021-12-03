import GameObject from "./world/gameObjects/gameObject.js";

export default class Physics {
    #gameObjects = [];
    
    constructor() {
        this.#gameObjects = [];
        this.collisionEvent = this.#collision.bind(this);
    }

    add(object) {
        if (!object || !object instanceof GameObject) {
            throw Error('object should be instance of GameObject');
        }
        this.#gameObjects.push(object);
    }

    #collision(object) {
        if (!object || !object instanceof GameObject) {
            throw Error('object should be instance of GameObject');
        }
        this.#gameObjects.forEach(gameObject => {
            if (gameObject.coordinates.equalsWith(object.coordinates)) {
                gameObject.collisionWith(object);
                object.collisionWith(gameObject);
            }
        });
    }
}