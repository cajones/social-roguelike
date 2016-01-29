export class Person {
    constructor(game, properties) {
        this.game = game;
        this.sprite = game.add.sprite(properties.x, properties.y, 'person')
    }

    static preload(context, game) {
        console.log('preloading Person');
        game.load.spritesheet('person', '/images/person.png', 128, 128);
    }
    static create(context, game){
        console.log('creating Person');
    }
}