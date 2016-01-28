
export class World {
    constructor(game, properties) {
        this.game = game;
    }

    static preload(context, game) {
        console.log('preloading World');
    }
    static create(context, game) {
        console.log('creating World');
    }
}