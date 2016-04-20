/* */ 
var Base = require('./compiler');
var inherits = require('inherits');
module.exports = Compiler;
function Compiler(options) {
  Base.call(this, options);
}
inherits(Compiler, Base);
Compiler.prototype.compile = function(node) {
  return node.stylesheet.rules.map(this.visit, this).join('');
};
Compiler.prototype.comment = function(node) {
  return this.emit('', node.position);
};
Compiler.prototype.import = function(node) {
  return this.emit('@import ' + node.import + ';', node.position);
};
Compiler.prototype.media = function(node) {
  return this.emit('@media ' + node.media, node.position) + this.emit('{') + this.mapVisit(node.rules) + this.emit('}');
};
Compiler.prototype.document = function(node) {
  var doc = '@' + (node.vendor || '') + 'document ' + node.document;
  return this.emit(doc, node.position) + this.emit('{') + this.mapVisit(node.rules) + this.emit('}');
};
Compiler.prototype.charset = function(node) {
  return this.emit('@charset ' + node.charset + ';', node.position);
};
Compiler.prototype.namespace = function(node) {
  return this.emit('@namespace ' + node.namespace + ';', node.position);
};
Compiler.prototype.supports = function(node) {
  return this.emit('@supports ' + node.supports, node.position) + this.emit('{') + this.mapVisit(node.rules) + this.emit('}');
};
Compiler.prototype.keyframes = function(node) {
  return this.emit('@' + (node.vendor || '') + 'keyframes ' + node.name, node.position) + this.emit('{') + this.mapVisit(node.keyframes) + this.emit('}');
};
Compiler.prototype.keyframe = function(node) {
  var decls = node.declarations;
  return this.emit(node.values.join(','), node.position) + this.emit('{') + this.mapVisit(decls) + this.emit('}');
};
Compiler.prototype.page = function(node) {
  var sel = node.selectors.length ? node.selectors.join(', ') : '';
  return this.emit('@page ' + sel, node.position) + this.emit('{') + this.mapVisit(node.declarations) + this.emit('}');
};
Compiler.prototype['font-face'] = function(node) {
  return this.emit('@font-face', node.position) + this.emit('{') + this.mapVisit(node.declarations) + this.emit('}');
};
Compiler.prototype.host = function(node) {
  return this.emit('@host', node.position) + this.emit('{') + this.mapVisit(node.rules) + this.emit('}');
};
Compiler.prototype['custom-media'] = function(node) {
  return this.emit('@custom-media ' + node.name + ' ' + node.media + ';', node.position);
};
Compiler.prototype.rule = function(node) {
  var decls = node.declarations;
  if (!decls.length)
    return '';
  return this.emit(node.selectors.join(','), node.position) + this.emit('{') + this.mapVisit(decls) + this.emit('}');
};
Compiler.prototype.declaration = function(node) {
  return this.emit(node.property + ':' + node.value, node.position) + this.emit(';');
};
