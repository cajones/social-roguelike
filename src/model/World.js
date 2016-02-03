import {Entity} from "./Entity";

export class World {
    constructor(game, properties) {
        this.game = game;
        this.population = [];
        this.properties = properties;
    }

    static preload(context, game) {
        console.log('preloading World');
    }
    static create(context, game) {
        console.log('creating World');
        game.physics.startSystem(Phaser.Physics.ARCADE);
    }

    update () {
    }

    add(entity, x=0, y=0) {
        entity.x = x;
        entity.y = y;
        this.population.push(entity);
        this.game.physics.arcade.enable(entity);
    }
}