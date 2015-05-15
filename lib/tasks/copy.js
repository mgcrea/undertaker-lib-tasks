'use strict';

var util = require('util');
var DefaultRegistry = require('undertaker-registry');
var vfs = require('vinyl-fs');

function CopyRegistry() {

  DefaultRegistry.call(this);

  this.set('ng:pages/copy', function(cb) {
    var paths = this.docs;
    return vfs.src(['favicon.ico', paths.images, paths.fonts], {cwd: paths.cwd, base: paths.cwd})
      .pipe(vfs.dest(paths.dest));
  });

}

util.inherits(CopyRegistry, DefaultRegistry);

module.exports = CopyRegistry;
