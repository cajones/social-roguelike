
export class World {
    constructor(game, properties) {
        this.game = game;
        this.population = [];
    }

    static preload(context, game) {
        console.log('preloading World');
    }
    static create(context, game) {
        console.log('creating World');
    }

    add(entity, x=0, y=0) {
        entity.x = x;
        entity.y = y;
        this.population.push(entity);
    }
}