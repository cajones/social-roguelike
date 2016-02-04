import {World} from "./World";
import {Person} from "./Person";
import { default as Mood} from "./Mood";

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
                Person.create(this, this.game);

                this.world = new World(this.game);

                let dude1 = new Person(this.game, { x: 200, y:256, mood: Mood.Happy });
                this.world.add(dude1);

                let dude2 = new Person(this.game, { x: 50, y:150, mood: Mood.Happy });
                this.world.add(dude2);

                let dude3 = new Person(this.game, { x: 400, y:50, mood: Mood.Sad });
                this.world.add(dude3);

                let dude4 = new Person(this.game, { x: 500, y:350, mood: Mood.Happy });
                this.world.add(dude4);

                dude2.follow(dude3);
                dude3.follow(dude4);
                dude4.follow(dude1);
                dude1.destination = new Phaser.Point(this.config.width-64, this.config.height-64);
            },
            update: () => {
                this.world.update();
                this.world.population.forEach((entity) => {
                    entity.update(this.world);
                });
            }
        };

        this.game = new Phaser.Game(this.config.width, this.config.height, Phaser.Canvas, this.config.element, state);
    }

};