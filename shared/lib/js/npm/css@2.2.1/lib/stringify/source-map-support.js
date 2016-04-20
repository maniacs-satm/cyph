/* */ 
var SourceMap = require('source-map').SourceMapGenerator;
var SourceMapConsumer = require('source-map').SourceMapConsumer;
var sourceMapResolve = require('source-map-resolve');
var urix = require('urix');
var fs = require('fs');
var path = require('path');
module.exports = mixin;
function mixin(compiler) {
  compiler._comment = compiler.comment;
  compiler.map = new SourceMap();
  compiler.position = {
    line: 1,
    column: 1
  };
  compiler.files = {};
  for (var k in exports)
    compiler[k] = exports[k];
}
exports.updatePosition = function(str) {
  var lines = str.match(/\n/g);
  if (lines)
    this.position.line += lines.length;
  var i = str.lastIndexOf('\n');
  this.position.column = ~i ? str.length - i : this.position.column + str.length;
};
exports.emit = function(str, pos) {
  if (pos) {
    var sourceFile = urix(pos.source || 'source.css');
    this.map.addMapping({
      source: sourceFile,
      generated: {
        line: this.position.line,
        column: Math.max(this.position.column - 1, 0)
      },
      original: {
        line: pos.start.line,
        column: pos.start.column - 1
      }
    });
    this.addFile(sourceFile, pos);
  }
  this.updatePosition(str);
  return str;
};
exports.addFile = function(file, pos) {
  if (typeof pos.content !== 'string')
    return;
  if (Object.prototype.hasOwnProperty.call(this.files, file))
    return;
  this.files[file] = pos.content;
};
exports.applySourceMaps = function() {
  Object.keys(this.files).forEach(function(file) {
    var content = this.files[file];
    this.map.setSourceContent(file, content);
    if (this.options.inputSourcemaps !== false) {
      var originalMap = sourceMapResolve.resolveSync(content, file, fs.readFileSync);
      if (originalMap) {
        var map = new SourceMapConsumer(originalMap.map);
        var relativeTo = originalMap.sourcesRelativeTo;
        this.map.applySourceMap(map, file, urix(path.dirname(relativeTo)));
      }
    }
  }, this);
};
exports.comment = function(node) {
  if (/^# sourceMappingURL=/.test(node.comment))
    return this.emit('', node.position);
  else
    return this._comment(node);
};
