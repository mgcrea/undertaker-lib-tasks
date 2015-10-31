'use strict';

var util = require('util');
var DefaultRegistry = require('undertaker-registry');
var vfs = require('vinyl-fs');
var resolveRequire = require('resolve-require');

function ViewsRegistry() {

  DefaultRegistry.call(this);

}

util.inherits(ViewsRegistry, DefaultRegistry);

ViewsRegistry.prototype.init = function(taker) {

  this.set('ng:docs/views', function(next) {
    var self = this;

    // Lazy load expensive modules
    var factory = resolveRequire('factory-' + this.factory);
    var reload = require('browser-sync').reload;

    var paths = this.docs;
    var streams = [
      function views() {
        return vfs.src(paths.views, {cwd: paths.cwd, base: paths.cwd})
          .pipe(factory.views.src.bind(self)(paths))
          .pipe(reload({stream: true}));
      }, function index() {
        return vfs.src(paths.index, {cwd: paths.cwd, base: paths.cwd})
          .pipe(factory.index.docs.bind(self)())
          .pipe(reload({stream: true}));
      }
    ];

    taker.parallel(streams)(next);

  });

  this.set('ng:pages/views', function() {

    // Lazy load expensive modules
    var factory = resolveRequire('factory-' + this.factory);

    var paths = this.docs;
    return vfs.src(paths.index, {cwd: paths.cwd, base: paths.cwd})
      .pipe(factory.index.pages.bind(this)());

  });

};

module.exports = ViewsRegistry;
