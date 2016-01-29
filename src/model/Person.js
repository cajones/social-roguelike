export class Person {
    constructor(game, properties={ x:0, y:0 }) {
        this.game = game;
        let sprite = game.add.sprite(properties.x, properties.y, 'person');
        _.extend(this, sprite);
    }

    static preload(context, game) {
        console.log('preloading Person');
        game.load.spritesheet('person', '/images/person.png', 128, 128);
    }
    static create(context, game){
        console.log('creating Person');
    }
}