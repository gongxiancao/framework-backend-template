'use strict';

var gulp = require('gulp'),
  gulpLoadPlugins = require('gulp-load-plugins'),
  plugins = gulpLoadPlugins(),
  merge = require('merge-stream'),
  runSequence = require('run-sequence'),
  del = require('del');

gulp.task('clean:dist', function () {
  return del(['dist/*']);
});

gulp.task('copy:dist', function () {
  return merge(
    gulp.src(['server/**/*'], {base: '.'})
      .pipe(gulp.dest('dist')),
    gulp.src(['package.json'], {base: '.'})
      .pipe(gulp.dest('dist/server'))
    );
});

gulp.task('build:dist', function (cb) {
  runSequence('jshint', 'clean:dist', 'copy:dist', cb);
});

gulp.task('staging', function(cb) {
  runSequence(
    'build:dist', ['start:server'],
    cb);
});
