'use strict';

var Value = require('./value');
var Variable = require('./variable');

var ASSIGNMENT_OPERATOR = ':';

function hasGlobalFlag(value) {
  var regex = new RegExp('\\!global(\\s|\$|\\W)');
  return !!value.match(regex);
}

function Declaration(line, declarationStore, precursor) {
  this._parse(line, declarationStore, precursor);
}

Declaration.prototype = {
  _parse: function(line, declarationStore, precursor) {
    var assignmentIndex = line.indexOf(ASSIGNMENT_OPERATOR);
    var assignedVariable = line.substring(0, assignmentIndex).trim();
    var assignedValue = line.substring(assignmentIndex + 1, line.length).trim();

    var replacedValue = declarationStore.replaceVariables(assignedValue);

    this.variable = new Variable(assignedVariable);
    this.value = new Value(replacedValue, precursor);
    this.global = hasGlobalFlag(replacedValue);

    declarationStore.addDeclaration(this);
  }
};

module.exports = Declaration;
