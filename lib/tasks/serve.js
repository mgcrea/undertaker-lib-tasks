'use strict';

var util = require('util');
var DefaultRegistry = require('undertaker-registry');
var _ = require('lodash');

function ServeRegistry(taker) {

  function getArgv(opt, def) {
    if(process.argv.indexOf('--no-' + opt) !== -1) return false;
    if(process.argv.indexOf('--' + opt) !== -1) return true;
    return def;
  }

  DefaultRegistry.call(this);

  this.set('ng:docs/serve', function(cb) {

    // Lazy load expensive modules
    var browserSync = require('browser-sync');

    var paths = this.paths, docs = this.docs, ports = this.ports;
    browserSync({
      port: ports.docs,
      notify: getArgv('notify', false),
      open: getArgv('open', true),
      logPrefix: function () {
        return this.compile('[{gray:' + new Date().toLocaleTimeString() + '}] ');
      },
      server: _.defaults(this.server || {}, {
        middleware: this.middleware,
        baseDir: [paths.tmp, docs.cwd, paths.cwd]
      })
    }, cb);
  });

  this.set('ng:dist/serve', function(cb) {

    // Lazy load expensive modules
    var browserSync = require('browser-sync');

    var paths = this.paths, docs = this.docs, ports = this.ports;
    return browserSync({
      port: ports.dist,
      notify: getArgv('notify', false),
      open: getArgv('open', true),
      logPrefix: function () {
        return this.compile('[{gray:' + new Date().toLocaleTimeString() + '}] ');
      },
      server: _.defaults(this.server || {}, {
        middleware: this.middleware,
        baseDir: [docs.dest]
      })
    }, cb);
  });

}

util.inherits(ServeRegistry, DefaultRegistry);

module.exports = ServeRegistry;
