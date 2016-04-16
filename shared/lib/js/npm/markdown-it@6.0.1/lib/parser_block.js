/* */ 
'use strict';
var Ruler = require('./ruler');
var _rules = [['table', require('./rules_block/table'), ['paragraph', 'reference']], ['code', require('./rules_block/code')], ['fence', require('./rules_block/fence'), ['paragraph', 'reference', 'blockquote', 'list']], ['blockquote', require('./rules_block/blockquote'), ['paragraph', 'reference', 'list']], ['hr', require('./rules_block/hr'), ['paragraph', 'reference', 'blockquote', 'list']], ['list', require('./rules_block/list'), ['paragraph', 'reference', 'blockquote']], ['reference', require('./rules_block/reference')], ['heading', require('./rules_block/heading'), ['paragraph', 'reference', 'blockquote']], ['lheading', require('./rules_block/lheading')], ['html_block', require('./rules_block/html_block'), ['paragraph', 'reference', 'blockquote']], ['paragraph', require('./rules_block/paragraph')]];
function ParserBlock() {
  this.ruler = new Ruler();
  for (var i = 0; i < _rules.length; i++) {
    this.ruler.push(_rules[i][0], _rules[i][1], {alt: (_rules[i][2] || []).slice()});
  }
}
ParserBlock.prototype.tokenize = function(state, startLine, endLine) {
  var ok,
      i,
      rules = this.ruler.getRules(''),
      len = rules.length,
      line = startLine,
      hasEmptyLines = false,
      maxNesting = state.md.options.maxNesting;
  while (line < endLine) {
    state.line = line = state.skipEmptyLines(line);
    if (line >= endLine) {
      break;
    }
    if (state.sCount[line] < state.blkIndent) {
      break;
    }
    if (state.level >= maxNesting) {
      state.line = endLine;
      break;
    }
    for (i = 0; i < len; i++) {
      ok = rules[i](state, line, endLine, false);
      if (ok) {
        break;
      }
    }
    state.tight = !hasEmptyLines;
    if (state.isEmpty(state.line - 1)) {
      hasEmptyLines = true;
    }
    line = state.line;
    if (line < endLine && state.isEmpty(line)) {
      hasEmptyLines = true;
      line++;
      if (line < endLine && state.parentType === 'list' && state.isEmpty(line)) {
        break;
      }
      state.line = line;
    }
  }
};
ParserBlock.prototype.parse = function(src, md, env, outTokens) {
  var state;
  if (!src) {
    return;
  }
  state = new this.State(src, md, env, outTokens);
  this.tokenize(state, state.line, state.lineMax);
};
ParserBlock.prototype.State = require('./rules_block/state_block');
module.exports = ParserBlock;
