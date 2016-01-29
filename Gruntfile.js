module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

  // Project configuration.
  grunt.initConfig({

    browserify: {
      dist: {
        options: {
          transform: [["babelify", {presets: ["es2015"]}]]
        },
        files: {
          'build/game.js': ['src/game.js']
        }
      }
    },

    'string-replace': {
      dist: {
        files: {
          'build/index.html': 'src/index.html'
        },
        options: {
          replacements: [{
            pattern: /phaser\.js/ig,
            replacement: 'phaser.min.js'
          }]
        }
      }
    },

    copy: {
      dist: {
        files: [
          { src: ['lib/lodash/lodash.min.js'], dest: 'build/lib/lodash/lodash.min.js' },
          { src: ['lib/vendor/phaser/phaser.min.js'], dest: 'build/lib/vendor/phaser/phaser.min.js' },
          { cwd: 'src/images/', src: ['**/*.png'], dest: 'build/images', expand: true }
        ]
      }
    },

    connect: {
        dev: {
            options: {
                base: ['src', '.'],
                port: 8080,
                open: true
            }
        },
        dist: {
            options: {
                base: 'build',
                port: 8080,
                open: true
            }
        }
    }

  });

  grunt.registerTask('default', ['browserify', 'string-replace', 'copy']);
  grunt.registerTask('server', ['browserify', 'string-replace', 'copy', 'connect:dist:keepalive'])

};