'use strict';

module.exports = {
  tasks: require('export-files')(__dirname + '/tasks'),
  defaults: require('./defaults')
};

var util = require('util');
var DefaultRegistry = require('undertaker-registry');
function noop(cb) { cb(); }

function IndexRegistry(taker, config) {

  DefaultRegistry.call(this);

  var setTask = (taker.set || taker._setTask).bind(taker);

  config.banner = require('./templates/banner').bind(config)();

  setTask('ng:serve', taker.series('ng:docs/clean', 'ng:docs/views', taker.parallel('ng:docs/serve', 'ng:docs/watch')));
  setTask('ng:build', taker.series('ng:dist/clean', taker.parallel('ng:dist/templates', 'ng:dist/scripts', 'ng:dist/styles')));
  setTask('ng:pages', taker.series('ng:pages/clean', taker.parallel('ng:pages/views', 'ng:pages/copy')));

}

util.inherits(IndexRegistry, DefaultRegistry);

module.exports.index = IndexRegistry;
