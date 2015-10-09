'use strict';

var _ = require('lodash').runInContext();
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

module.exports = function() {

  var template = ['/**',
    ' * {{ pkg.name }}',
    ' * @version v{{ pkg.version }} - {{ today }}',
    ' * @link {{ pkg.homepage }}',
    ' * @author {{ pkg.author.name }} <{{ pkg.author.email }}> ({{ pkg.author.url }})',
    ' * @license MIT License, http://www.opensource.org/licenses/MIT',
    ' */',
    ''].join('\n');

  var today = new Date().toISOString().substr(0, 10);

  return _.template(template)({pkg: this.pkg, today: today});

};
