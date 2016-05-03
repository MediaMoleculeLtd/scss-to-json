'use strict';

var sass = require('node-sass');
var cssmin = require('cssmin');

function wrapValue(value) {
  return '.test { content: ' + value + ' };';
}

function unwrapValue(value) {

  var testIndex = '.test{content:',
      subStrValue = value.substr(value.indexOf(testIndex) + testIndex.length);

  subStrValue = subStrValue.replace('}', '');

  return subStrValue;
}

var Compile = {
  fromString: function(value, precursor) {
    var wrappedValue = precursor + '\r\n\r\n' + wrapValue(value);
    var s = sass.renderSync({ data: wrappedValue });
    var compiled = String(s.css);
    var minifiedCompiled = cssmin(compiled);
    return unwrapValue(minifiedCompiled);
  }
};

if (process.env.NODE_ENV === 'test') {
  Compile.wrapValue = wrapValue;
  Compile.unwrapValue = unwrapValue;
}

module.exports = Compile;
