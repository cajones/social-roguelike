import { default as Mood } from "./Mood";
import {Entity} from "./Entity";

const _mood = Symbol('mood');

export class Person extends Entity {
    constructor(game, properties={ mood: Mood.Happy }) {
        super(properties);
        this.game = game;
        this.sprite = game.add.sprite(properties.x, properties.y, 'person');
        this.mood = properties.mood;
        console.log(this)
    }

    static preload(context, game) {
        console.log('preloading Person');
        game.load.spritesheet('person', '/images/person.png', 128, 128);
    }
    static create(context, game){
        console.log('creating Person');
    }

    get mood () {
        return this[_mood];
    }

    set mood (value) {
        this[_mood] = value;
        this.sprite.frame = value;
    }

    update(world) {

    }

    moveTo (x=0, y=0) {
        this.move(x, y);
    }
}