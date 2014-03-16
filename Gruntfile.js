module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/.js']
    },
    browserify: {
      dist: {
        files: {
          'dist/halpert.js': 'lib/halpert.js',
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          'dist/halpert.min.js': 'dist/halpert.js'
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask("default", ["jshint", "mochaTest"]);
  grunt.registerTask("test", ["mochaTest"]);
  grunt.registerTask("build", ["jshint", "mochaTest", "browserify", "uglify"]);
};
