/* */ 
'use strict';
var isSpace = require('../common/utils').isSpace;
module.exports = function blockquote(state, startLine, endLine, silent) {
  var nextLine,
      lastLineEmpty,
      oldTShift,
      oldSCount,
      oldBMarks,
      oldIndent,
      oldParentType,
      lines,
      initial,
      offset,
      ch,
      terminatorRules,
      token,
      i,
      l,
      terminate,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];
  if (state.src.charCodeAt(pos++) !== 0x3E) {
    return false;
  }
  if (silent) {
    return true;
  }
  if (state.src.charCodeAt(pos) === 0x20) {
    pos++;
  }
  oldIndent = state.blkIndent;
  state.blkIndent = 0;
  initial = offset = state.sCount[startLine] + pos - (state.bMarks[startLine] + state.tShift[startLine]);
  oldBMarks = [state.bMarks[startLine]];
  state.bMarks[startLine] = pos;
  while (pos < max) {
    ch = state.src.charCodeAt(pos);
    if (isSpace(ch)) {
      if (ch === 0x09) {
        offset += 4 - offset % 4;
      } else {
        offset++;
      }
    } else {
      break;
    }
    pos++;
  }
  lastLineEmpty = pos >= max;
  oldSCount = [state.sCount[startLine]];
  state.sCount[startLine] = offset - initial;
  oldTShift = [state.tShift[startLine]];
  state.tShift[startLine] = pos - state.bMarks[startLine];
  terminatorRules = state.md.block.ruler.getRules('blockquote');
  for (nextLine = startLine + 1; nextLine < endLine; nextLine++) {
    if (state.sCount[nextLine] < oldIndent) {
      break;
    }
    pos = state.bMarks[nextLine] + state.tShift[nextLine];
    max = state.eMarks[nextLine];
    if (pos >= max) {
      break;
    }
    if (state.src.charCodeAt(pos++) === 0x3E) {
      if (state.src.charCodeAt(pos) === 0x20) {
        pos++;
      }
      initial = offset = state.sCount[nextLine] + pos - (state.bMarks[nextLine] + state.tShift[nextLine]);
      oldBMarks.push(state.bMarks[nextLine]);
      state.bMarks[nextLine] = pos;
      while (pos < max) {
        ch = state.src.charCodeAt(pos);
        if (isSpace(ch)) {
          if (ch === 0x09) {
            offset += 4 - offset % 4;
          } else {
            offset++;
          }
        } else {
          break;
        }
        pos++;
      }
      lastLineEmpty = pos >= max;
      oldSCount.push(state.sCount[nextLine]);
      state.sCount[nextLine] = offset - initial;
      oldTShift.push(state.tShift[nextLine]);
      state.tShift[nextLine] = pos - state.bMarks[nextLine];
      continue;
    }
    if (lastLineEmpty) {
      break;
    }
    terminate = false;
    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) {
      break;
    }
    oldBMarks.push(state.bMarks[nextLine]);
    oldTShift.push(state.tShift[nextLine]);
    oldSCount.push(state.sCount[nextLine]);
    state.sCount[nextLine] = -1;
  }
  oldParentType = state.parentType;
  state.parentType = 'blockquote';
  token = state.push('blockquote_open', 'blockquote', 1);
  token.markup = '>';
  token.map = lines = [startLine, 0];
  state.md.block.tokenize(state, startLine, nextLine);
  token = state.push('blockquote_close', 'blockquote', -1);
  token.markup = '>';
  state.parentType = oldParentType;
  lines[1] = state.line;
  for (i = 0; i < oldTShift.length; i++) {
    state.bMarks[i + startLine] = oldBMarks[i];
    state.tShift[i + startLine] = oldTShift[i];
    state.sCount[i + startLine] = oldSCount[i];
  }
  state.blkIndent = oldIndent;
  return true;
};
