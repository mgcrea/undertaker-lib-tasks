'use strict';

var util = require('util');
var DefaultRegistry = require('undertaker-registry');
var vfs = require('vinyl-fs');
var resolveRequire = require('resolve-require');

function StylesRegistry() {

  DefaultRegistry.call(this);

  this.set('ng:src/styles', function(cb) {

    // Lazy load expensive modules
    var factory = resolveRequire('factory-' + this.factory);
    var reload = require('browser-sync').reload;

    var paths = this.paths;
    return vfs.src(paths.styles, {cwd: paths.cwd, base: paths.cwd})
      .pipe(factory.styles.src.bind(this)())
      .pipe(reload({stream: true}));

  });

  this.set('ng:dist/styles', function(cb) {

    // Lazy load expensive modules
    var factory = resolveRequire('factory-' + this.factory);
    var paths = this.paths;
    return vfs.src(paths.styles, {cwd: paths.cwd, base: paths.cwd})
      .pipe(factory.styles.dist.bind(this)());

  });

}

util.inherits(StylesRegistry, DefaultRegistry);

module.exports = StylesRegistry;
