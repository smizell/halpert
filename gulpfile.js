require('coffee-script/register');

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    mocha = require('gulp-mocha'),
    coffee = require('gulp-coffee'),
    gutil = require('gulp-util'),
    coffeelint = require('gulp-coffeelint');

var mochaOpts = {
  ui: "bdd",
  reporter: "list",
  compilers: "coffee:coffee-script"
}

gulp.task('buildLint', function() {
  return gulp
    .src(['./src/**/*.coffee', './test/**/*.coffee'])
    .pipe(coffeelint())
    .pipe(coffeelint.reporter('fail'))
    .on('error', function(err) {
      console.log(err.stack);
    })
});

gulp.task('lint', function() {
  return gulp
    .src(['./src/**/*.coffee', './test/**/*.coffee'])
    .pipe(coffeelint())
    .pipe(coffeelint.reporter())
});

gulp.task('test', function() {
  return gulp
    .src('./test/**/*.coffee')
    .pipe(mocha(mochaOpts))
});

gulp.task('coffee', ['buildLint', 'test'], function() {
  return gulp
    .src('./src/**/*.coffee')
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest('./lib/'))
});

gulp.task('watch', function() {
  gulp.watch(['./src/**/*.coffee', './test/**/*.coffee'], ['lint', 'test']);
});

gulp.task('build', ['buildLint', 'test', 'coffee'])
gulp.task('default', ['lint', 'test', 'watch']);
