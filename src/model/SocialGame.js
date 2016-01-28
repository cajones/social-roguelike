import {World} from "./World";
import {Person} from "./Person";

export class SocialGame  {

    constructor(Phaser, config) {

        const defaults = {
            element: 'game',
            width: 800,
            height: 600
        };
        this.config = _.extend({}, config, defaults);

        let state = {
            config: this.config,
            preload: () => {
                World.preload(this, this.game);
                Person.preload(this, this.game);
            },
            create: () => {
                World.create(this, this.game);
                let world = new World()
                Person.create(this, this.game);
            },
            update: () => {
            }
        };

        this.game = new Phaser.Game(this.config.width, this.config.height, Phaser.Canvas, this.config.element, state);
    }

};