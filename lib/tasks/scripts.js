'use strict';

var util = require('util');
var DefaultRegistry = require('undertaker-registry');
var vfs = require('vinyl-fs');
var resolveRequire = require('resolve-require');

function ScriptsRegistry() {

  DefaultRegistry.call(this);

  this.set('ng:src/scripts', function(cb) {

    // Lazy load expensive modules
    var factory = resolveRequire('factory-' + this.factory);
    var reload = require('browser-sync').reload;

    var paths = this.paths;
    return vfs.src(paths.scripts, {cwd: paths.cwd, base: paths.cwd})
      .pipe(factory.scripts.src.bind(this)())
      .pipe(reload({stream: true}));

  });

  this.set('ng:dist/scripts', function(cb) {

    // Lazy load expensive modules
    var factory = resolveRequire('factory-' + this.factory);

    var paths = this.paths;
    return vfs.src(paths.scripts, {cwd: paths.cwd, base: paths.cwd})
      .pipe(factory.scripts.dist.bind(this)());

  });

}

util.inherits(ScriptsRegistry, DefaultRegistry);

module.exports = ScriptsRegistry;
