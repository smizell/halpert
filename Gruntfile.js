module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'lib/*.js', 'test/*.js']
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
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask( "build", ["jshint", "browserify", "uglify"] );
};