'use strict';

var gulp = require('gulp'),
  gulpLoadPlugins = require('gulp-load-plugins'),
  through = require('through'),
  gutil = require('gulp-util'),
  plugins = gulpLoadPlugins(),
  http = require('http'),
  _ = require('lodash'),
  merge = require('merge-stream'),
  paths = {
    server: {
      scripts: [
        'server/**/*.js',
        'tests/**/*.js',
      ]
    }
  },
  config,
  path = require('path'),
  serverPath = path.join(process.cwd(), 'server'),
  runSequence = require('run-sequence'),
  del = require('del');

function count(taskName, message) {
  var fileCount = 0;

  function countFiles(/*file*/) {
    fileCount++; // jshint ignore:line
  }

  function endStream() {
    gutil.log(gutil.colors.cyan(taskName + ': ') + fileCount + ' ' + message || 'files processed.');
    this.emit('end'); // jshint ignore:line
  }
  return through(countFiles, endStream);
}

function onServerLog(log) {
  console.log(plugins.util.colors.white('[') +
    plugins.util.colors.yellow('nodemon') +
    plugins.util.colors.white('] ') +
    log.message);
}

gulp.task('jshint:server', function () {
  return gulp.src(paths.server.scripts)
    .pipe(plugins.jshint('.jshintrc_server'))
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    // .pipe(plugins.jshint.reporter('fail')) to avoid shutdown gulp by warnings
    .pipe(count('jshint', 'files lint free'));
});

gulp.task('jshint', ['jshint:server']);

gulp.task('start:server', function () {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  config = require(serverPath + '/config/env/' + process.env.NODE_ENV);

  plugins.nodemon('-w server server')
    .on('log', onServerLog);
});

gulp.task('migrate:up', function(cb) {
  require('../server/migrate.js').up(cb);
});

gulp.task('migrate:down', function(cb) {
  require('../server/migrate.js').down(cb);
});

gulp.task('cucumber', function() {
  return gulp.src('tests/features/*.feature').pipe(plugins.cucumber({
    steps: 'tests/features/step_definitions/*.js',
    support: 'tests/features/support/*js',
    format: 'pretty'
  }));
});

gulp.task('mocha', function() {
  return gulp.src('tests/unit/specs/**/*.js', {read: false})
  .pipe(plugins.spawnMocha({
    timeout: 10000,
    reporter: 'spec' // 'nyan'
  }))
  .once('error', function (err) {
    console.error(err.stack);
    process.exit(1);
  });
});

gulp.task('development', function (cb) {
  runSequence(
    'jshint',
    'start:server',
    cb);
});

gulp.task('test', function (cb) {
  runSequence(
    'start:server',
    cb);
});
