(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _SocialGame = require('./model/SocialGame');

window.SocialGame = _SocialGame.SocialGame;

},{"./model/SocialGame":5}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = exports.Entity = function () {
    function Entity() {
        var properties = arguments.length <= 0 || arguments[0] === undefined ? { x: 0, y: 0 } : arguments[0];

        _classCallCheck(this, Entity);
    }

    _createClass(Entity, [{
        key: "update",
        value: function update() {}
    }]);

    return Entity;
}();

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    Happy: 0,
    Sad: 1
};

},{}],4:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Person = undefined;

var _Mood = require("./Mood");

var _Mood2 = _interopRequireDefault(_Mood);

var _Entity2 = require("./Entity");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mood = Symbol('mood');
var _destination = Symbol('destination');

var Person = exports.Person = function (_Entity) {
    _inherits(Person, _Entity);

    function Person(game) {
        var properties = arguments.length <= 1 || arguments[1] === undefined ? { mood: _Mood2.default.Happy } : arguments[1];

        _classCallCheck(this, Person);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Person).call(this, properties));

        _this.game = game;
        _this.sprite = game.add.sprite(properties.x, properties.y, 'person');
        game.physics.arcade.enable(_this.sprite);

        _this.mood = properties.mood;
        _this.destination = new Phaser.Point(properties.x, properties.y);
        _this.target = null;
        return _this;
    }

    _createClass(Person, [{
        key: "follow",
        value: function follow(person) {
            this.target = person;
        }
    }, {
        key: "moveTo",
        value: function moveTo(point) {
            function approach(body, point) {
                var maxVelocity = arguments.length <= 2 || arguments[2] === undefined ? 25 : arguments[2];

                if (Phaser.Point.equals(body, point)) return;

                if (body.x < point.x) body.velocity.x = Math.min(point.x - body.x, maxVelocity);else if (body.x > point.x) body.velocity.x = Math.min(point.x - body.x, maxVelocity);

                if (body.y < point.y) body.velocity.y = Math.min(point.y - body.y, maxVelocity);else if (body.y > point.y) body.velocity.y = -Math.min(point.y - body.y, maxVelocity);
            }

            if (point) approach(this.sprite.body, point);
        }
    }, {
        key: "update",
        value: function update(world) {
            if (this.target) {
                this.moveTo(this.target.sprite);
            } else {
                this.moveTo(this.destination);
            }
        }
    }, {
        key: "mood",
        get: function get() {
            return this[_mood];
        },
        set: function set(value) {
            this[_mood] = value;
            this.sprite.frame = value;
        }
    }, {
        key: "destination",
        get: function get() {
            return this[_destination];
        },
        set: function set(point) {
            this[_destination] = point;
        }
    }], [{
        key: "preload",
        value: function preload(context, game) {
            console.log('preloading Person');
            game.load.spritesheet('person', '/images/person.png', 128, 128);
        }
    }, {
        key: "create",
        value: function create(context, game) {
            console.log('creating Person');
        }
    }]);

    return Person;
}(_Entity2.Entity);

},{"./Entity":2,"./Mood":3}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SocialGame = undefined;

var _World = require("./World");

var _Person = require("./Person");

var _Mood = require("./Mood");

var _Mood2 = _interopRequireDefault(_Mood);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SocialGame = exports.SocialGame = function SocialGame(Phaser, config) {
    var _this = this;

    _classCallCheck(this, SocialGame);

    var defaults = {
        element: 'game',
        width: 800,
        height: 600
    };
    this.config = _.extend({}, config, defaults);

    var state = {
        config: this.config,
        preload: function preload() {
            _World.World.preload(_this, _this.game);
            _Person.Person.preload(_this, _this.game);
        },
        create: function create() {
            _World.World.create(_this, _this.game);
            _Person.Person.create(_this, _this.game);

            _this.world = new _World.World(_this.game);

            var dude1 = new _Person.Person(_this.game, { x: 200, y: 256, mood: _Mood2.default.Happy });
            _this.world.add(dude1);

            var dude2 = new _Person.Person(_this.game, { x: 50, y: 150, mood: _Mood2.default.Happy });
            _this.world.add(dude2);

            var dude3 = new _Person.Person(_this.game, { x: 400, y: 50, mood: _Mood2.default.Sad });
            _this.world.add(dude3);

            var dude4 = new _Person.Person(_this.game, { x: 500, y: 350, mood: _Mood2.default.Happy });
            _this.world.add(dude4);

            dude2.follow(dude3);
            dude3.follow(dude4);
            dude4.follow(dude1);
            dude1.destination = new Phaser.Point(_this.config.width - 64, _this.config.height - 64);
        },
        update: function update() {
            _this.world.update();
            _this.world.population.forEach(function (entity) {
                entity.update(_this.world);
            });
        }
    };

    this.game = new Phaser.Game(this.config.width, this.config.height, Phaser.Canvas, this.config.element, state);
};

;

},{"./Mood":3,"./Person":4,"./World":6}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.World = undefined;

var _Entity = require('./Entity');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var World = exports.World = function () {
    function World(game, properties) {
        _classCallCheck(this, World);

        this.game = game;
        this.population = [];
        this.properties = properties;
    }

    _createClass(World, [{
        key: 'update',
        value: function update() {}
    }, {
        key: 'add',
        value: function add(entity) {
            var x = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
            var y = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

            entity.x = x;
            entity.y = y;
            this.population.push(entity);
            this.game.physics.arcade.enable(entity);
        }
    }], [{
        key: 'preload',
        value: function preload(context, game) {
            console.log('preloading World');
        }
    }, {
        key: 'create',
        value: function create(context, game) {
            console.log('creating World');
            game.physics.startSystem(Phaser.Physics.ARCADE);
        }
    }]);

    return World;
}();

},{"./Entity":2}]},{},[1]);
