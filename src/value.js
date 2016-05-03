'use strict';

var compile = require('./compile');
var utilities = require('./utilities');

function transforms(value) {
  return utilities.removeInlineComments(utilities.removeFlags(value));
}

function Value(scssString, precursor) {
  this._parse(scssString, precursor);
}

Value.prototype = {
  _parse: function(scssString, precursor) {
    var transformed = transforms(scssString);
    var compiled = compile.fromString(transformed, precursor);
    this.value = compiled.trim();
  }
};

module.exports = Value;
