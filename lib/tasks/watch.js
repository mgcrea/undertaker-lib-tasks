'use strict';

var util = require('util');
var path = require('path');
var DefaultRegistry = require('undertaker-registry');
var vfs = require('vinyl-fs');
var chalk = require('chalk');
var resolveRequire = require('resolve-require');
var rename = require('gulp-rename');
var _ = require('lodash');

function WatchRegistry(taker) {

  function watchErrorHandler(error) {
    console.log('[' + chalk.grey(new Date().toLocaleTimeString()) + '] ' + error.toString());
  }

  function getRelativeFilePath(file, cwd) {
    return file.path.replace(path.join(process.cwd(), cwd), '').substr(1);
  }

  DefaultRegistry.call(this);

  this.set('ng:docs/watch', function() {

    // Lazy load expensive modules
    var factory = resolveRequire('factory-' + this.factory);
    var browserSync = require('browser-sync');
    var reload = browserSync.reload;

    var self = this, paths = this.paths;
    vfs.watch(paths.scripts, {cwd: paths.cwd}).on('change', function(file) {
      return vfs.src(getRelativeFilePath(file, paths.cwd), {cwd: paths.cwd, base: paths.cwd})
        .pipe(factory.scripts.src.bind(_.defaults({tmp: path.join(paths.tmp, paths.cwd)}, this))())
        .on('error', watchErrorHandler)
        .pipe(reload({stream: true}));
    });
    vfs.watch(paths.docsScripts, {cwd: paths.cwd}).on('change', function(file) {
      return vfs.src(getRelativeFilePath(file, paths.cwd), {cwd: paths.cwd, base: paths.cwd})
        .pipe(factory.scripts.src.bind(_.defaults({tmp: path.join(paths.tmp, paths.cwd)}, this))())
        .on('error', watchErrorHandler)
        .pipe(reload({stream: true}));
    });
    // Always watch all styles files
    vfs.watch(paths.styles.replace(/([,{/])(\*\.)/g, '$1**/*.'), {cwd: paths.cwd}, function(files) {
      // But only process root styles files
      return vfs.src(paths.styles, {cwd: paths.cwd})
        .pipe(factory.styles.src.bind(_.defaults({tmp: path.join(paths.tmp, paths.cwd)}, this))())
        .on('error', watchErrorHandler)
        .pipe(reload({stream: true}));
    });
    vfs.watch(paths.index, {cwd: paths.cwd}, function() {
      return vfs.src(paths.index, {cwd: paths.cwd})
        .pipe(factory.index.src.bind(self)())
        .on('error', watchErrorHandler)
        .pipe(reload({stream: true}));
    });
    vfs.watch(paths.views, {cwd: paths.cwd}).on('change', function(file) {
      return vfs.src(getRelativeFilePath(file, paths.cwd), {cwd: paths.cwd, base: paths.cwd})
        .pipe(factory.views.src.bind(self)())
        .on('error', watchErrorHandler)
        .pipe(reload({stream: true}));
    });

    var self = this, docsPaths = this.docs;
    vfs.watch(docsPaths.scripts, {cwd: docsPaths.cwd}).on('change', function(file) {
      return vfs.src(getRelativeFilePath(file, docsPaths.cwd), {cwd: docsPaths.cwd, base: docsPaths.cwd})
        .pipe(factory.scripts.src.bind(self)())
        .on('error', watchErrorHandler)
        .pipe(reload({stream: true}));
    });
    // Always watch all styles files
    vfs.watch(docsPaths.styles.replace(/([,{/])(\*\.)/g, '$1**/*.'), {cwd: docsPaths.cwd}, function(files) {
      // But only process root styles files
      return vfs.src(docsPaths.styles, {cwd: docsPaths.cwd})
        .pipe(factory.styles.src.bind(self)())
        .on('error', watchErrorHandler)
        .pipe(reload({stream: true}));
    });
    vfs.watch(docsPaths.index, {cwd: docsPaths.cwd}, function() {
      return vfs.src(docsPaths.index, {cwd: docsPaths.cwd})
        .pipe(factory.index.src.bind(self)())
        .on('error', watchErrorHandler)
        .pipe(reload({stream: true}));
    });
    vfs.watch(docsPaths.views, {cwd: docsPaths.cwd}).on('change', function(file) {
      return vfs.src(getRelativeFilePath(file, docsPaths.cwd), {cwd: docsPaths.cwd, base: docsPaths.cwd})
        .pipe(factory.views.src.bind(self)())
        .on('error', watchErrorHandler)
        .pipe(reload({stream: true}));
    });
  });

}

util.inherits(WatchRegistry, DefaultRegistry);

module.exports = WatchRegistry;
