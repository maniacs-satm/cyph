/* */ 
'use strict';
var isSpace = require('../common/utils').isSpace;
module.exports = function hr(state, startLine, endLine, silent) {
  var marker,
      cnt,
      ch,
      token,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];
  marker = state.src.charCodeAt(pos++);
  if (marker !== 0x2A && marker !== 0x2D && marker !== 0x5F) {
    return false;
  }
  cnt = 1;
  while (pos < max) {
    ch = state.src.charCodeAt(pos++);
    if (ch !== marker && !isSpace(ch)) {
      return false;
    }
    if (ch === marker) {
      cnt++;
    }
  }
  if (cnt < 3) {
    return false;
  }
  if (silent) {
    return true;
  }
  state.line = startLine + 1;
  token = state.push('hr', 'hr', 0);
  token.map = [startLine, state.line];
  token.markup = Array(cnt + 1).join(String.fromCharCode(marker));
  return true;
};
