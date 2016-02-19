/* jshint node: true */
/* global require, module */

var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
    var app = new EmberAddon(defaults, { });
    app.import('bower_components/jquery.inputmask/dist/min/jquery.inputmask.bundle.min.js');
    return app.toTree();
};
