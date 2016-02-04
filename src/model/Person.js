import { default as Mood } from "./Mood";
import {Entity} from "./Entity";

const _mood = Symbol('mood');
const _destination = Symbol('destination');

export class Person extends Entity {
    constructor(game, properties={ mood: Mood.Happy }) {
        super(properties);

        this.game = game;
        this.sprite = game.add.sprite(properties.x, properties.y, 'person');
        game.physics.arcade.enable(this.sprite);

        this.mood = properties.mood;
        this.destination = new Phaser.Point(properties.x, properties.y);
        this.target = null;
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

    get destination () {
        return this[_destination];
    }
    set destination (point) {
        this[_destination] = point;
    }

    follow(person) {
        this.target = person;
    }

    moveTo(point) {
        function approach(body, point, maxVelocity=25) {
            if(Phaser.Point.equals(body, point)) return;

            if(body.x < point.x)
                body.velocity.x = Math.min(point.x - body.x, maxVelocity);
            else if(body.x > point.x)
                body.velocity.x = Math.min(point.x - body.x, maxVelocity);

            if(body.y < point.y)
                body.velocity.y = Math.min(point.y - body.y, maxVelocity);
            else if(body.y > point.y)
                body.velocity.y = -Math.min(point.y - body.y, maxVelocity);
        }

        if(point) approach(this.sprite.body, point);
    }

    update(world) {
        if(this.target) {
            this.moveTo(this.target.sprite);
        } else {
            this.moveTo(this.destination);
        }
    }

}