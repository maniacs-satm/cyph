/* */ 
var Compressed = require('./compress');
var Identity = require('./identity');
module.exports = function(node, options) {
  options = options || {};
  var compiler = options.compress ? new Compressed(options) : new Identity(options);
  if (options.sourcemap) {
    var sourcemaps = require('./source-map-support');
    sourcemaps(compiler);
    var code = compiler.compile(node);
    compiler.applySourceMaps();
    var map = options.sourcemap === 'generator' ? compiler.map : compiler.map.toJSON();
    return {
      code: code,
      map: map
    };
  }
  var code = compiler.compile(node);
  return code;
};
