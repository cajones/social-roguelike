(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _SocialGame = require('./model/SocialGame');

window.SocialGame = _SocialGame.SocialGame;

},{"./model/SocialGame":3}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Person = exports.Person = function () {
    function Person(game, properties) {
        _classCallCheck(this, Person);

        this.game = game;
        this.sprite = game.add.sprite(properties.x, properties.y, 'person');
    }

    _createClass(Person, null, [{
        key: 'preload',
        value: function preload(context, game) {
            console.log('preloading Person');
            game.load.spritesheet('person', '/images/person.png', 128, 128);
        }
    }, {
        key: 'create',
        value: function create(context, game) {
            console.log('creating Person');
        }
    }]);

    return Person;
}();

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SocialGame = undefined;

var _World = require("./World");

var _Person = require("./Person");

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

            var world = new _World.World(_this.game);
            var dude = new _Person.Person(_this.game, { x: 256, y: 256 });
            world.add(dude);
        },
        update: function update() {}
    };

    this.game = new Phaser.Game(this.config.width, this.config.height, Phaser.Canvas, this.config.element, state);
};

;

},{"./Person":2,"./World":4}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var World = exports.World = function () {
    function World(game, properties) {
        _classCallCheck(this, World);

        this.game = game;
        this.population = [];
    }

    _createClass(World, [{
        key: 'add',
        value: function add(entity) {
            var x = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
            var y = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

            entity.x = x;
            entity.y = y;
            this.population.push(entity);
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
        }
    }]);

    return World;
}();

},{}]},{},[1]);
