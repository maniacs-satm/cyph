/* */ 
var Base = require('./compiler');
var inherits = require('inherits');
module.exports = Compiler;
function Compiler(options) {
  options = options || {};
  Base.call(this, options);
  this.indentation = options.indent;
}
inherits(Compiler, Base);
Compiler.prototype.compile = function(node) {
  return this.stylesheet(node);
};
Compiler.prototype.stylesheet = function(node) {
  return this.mapVisit(node.stylesheet.rules, '\n\n');
};
Compiler.prototype.comment = function(node) {
  return this.emit(this.indent() + '/*' + node.comment + '*/', node.position);
};
Compiler.prototype.import = function(node) {
  return this.emit('@import ' + node.import + ';', node.position);
};
Compiler.prototype.media = function(node) {
  return this.emit('@media ' + node.media, node.position) + this.emit(' {\n' + this.indent(1)) + this.mapVisit(node.rules, '\n\n') + this.emit(this.indent(-1) + '\n}');
};
Compiler.prototype.document = function(node) {
  var doc = '@' + (node.vendor || '') + 'document ' + node.document;
  return this.emit(doc, node.position) + this.emit(' ' + ' {\n' + this.indent(1)) + this.mapVisit(node.rules, '\n\n') + this.emit(this.indent(-1) + '\n}');
};
Compiler.prototype.charset = function(node) {
  return this.emit('@charset ' + node.charset + ';', node.position);
};
Compiler.prototype.namespace = function(node) {
  return this.emit('@namespace ' + node.namespace + ';', node.position);
};
Compiler.prototype.supports = function(node) {
  return this.emit('@supports ' + node.supports, node.position) + this.emit(' {\n' + this.indent(1)) + this.mapVisit(node.rules, '\n\n') + this.emit(this.indent(-1) + '\n}');
};
Compiler.prototype.keyframes = function(node) {
  return this.emit('@' + (node.vendor || '') + 'keyframes ' + node.name, node.position) + this.emit(' {\n' + this.indent(1)) + this.mapVisit(node.keyframes, '\n') + this.emit(this.indent(-1) + '}');
};
Compiler.prototype.keyframe = function(node) {
  var decls = node.declarations;
  return this.emit(this.indent()) + this.emit(node.values.join(', '), node.position) + this.emit(' {\n' + this.indent(1)) + this.mapVisit(decls, '\n') + this.emit(this.indent(-1) + '\n' + this.indent() + '}\n');
};
Compiler.prototype.page = function(node) {
  var sel = node.selectors.length ? node.selectors.join(', ') + ' ' : '';
  return this.emit('@page ' + sel, node.position) + this.emit('{\n') + this.emit(this.indent(1)) + this.mapVisit(node.declarations, '\n') + this.emit(this.indent(-1)) + this.emit('\n}');
};
Compiler.prototype['font-face'] = function(node) {
  return this.emit('@font-face ', node.position) + this.emit('{\n') + this.emit(this.indent(1)) + this.mapVisit(node.declarations, '\n') + this.emit(this.indent(-1)) + this.emit('\n}');
};
Compiler.prototype.host = function(node) {
  return this.emit('@host', node.position) + this.emit(' {\n' + this.indent(1)) + this.mapVisit(node.rules, '\n\n') + this.emit(this.indent(-1) + '\n}');
};
Compiler.prototype['custom-media'] = function(node) {
  return this.emit('@custom-media ' + node.name + ' ' + node.media + ';', node.position);
};
Compiler.prototype.rule = function(node) {
  var indent = this.indent();
  var decls = node.declarations;
  if (!decls.length)
    return '';
  return this.emit(node.selectors.map(function(s) {
    return indent + s;
  }).join(',\n'), node.position) + this.emit(' {\n') + this.emit(this.indent(1)) + this.mapVisit(decls, '\n') + this.emit(this.indent(-1)) + this.emit('\n' + this.indent() + '}');
};
Compiler.prototype.declaration = function(node) {
  return this.emit(this.indent()) + this.emit(node.property + ': ' + node.value, node.position) + this.emit(';');
};
Compiler.prototype.indent = function(level) {
  this.level = this.level || 1;
  if (null != level) {
    this.level += level;
    return '';
  }
  return Array(this.level).join(this.indentation || '  ');
};
