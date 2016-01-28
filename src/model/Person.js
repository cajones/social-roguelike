export class Person {
    constructor(game, properties) {
        this.game = game;
    }

    static preload(context, game) {
        console.log('preloading Person');
        game.load.spritesheet('person', '/images/moods.png', 64, 64);
    }
    static create(context, game){
        console.log('creating Person');
    }

    spawn(x=0, y=0) {
        this.sprite = game.add.sprite(x, y, 'person')
    }
}