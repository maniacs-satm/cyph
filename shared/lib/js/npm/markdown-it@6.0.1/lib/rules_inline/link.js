/* */ 
'use strict';
var parseLinkLabel = require('../helpers/parse_link_label');
var parseLinkDestination = require('../helpers/parse_link_destination');
var parseLinkTitle = require('../helpers/parse_link_title');
var normalizeReference = require('../common/utils').normalizeReference;
var isSpace = require('../common/utils').isSpace;
module.exports = function link(state, silent) {
  var attrs,
      code,
      label,
      labelEnd,
      labelStart,
      pos,
      res,
      ref,
      title,
      token,
      href = '',
      oldPos = state.pos,
      max = state.posMax,
      start = state.pos;
  if (state.src.charCodeAt(state.pos) !== 0x5B) {
    return false;
  }
  labelStart = state.pos + 1;
  labelEnd = parseLinkLabel(state, state.pos, true);
  if (labelEnd < 0) {
    return false;
  }
  pos = labelEnd + 1;
  if (pos < max && state.src.charCodeAt(pos) === 0x28) {
    pos++;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (!isSpace(code) && code !== 0x0A) {
        break;
      }
    }
    if (pos >= max) {
      return false;
    }
    start = pos;
    res = parseLinkDestination(state.src, pos, state.posMax);
    if (res.ok) {
      href = state.md.normalizeLink(res.str);
      if (state.md.validateLink(href)) {
        pos = res.pos;
      } else {
        href = '';
      }
    }
    start = pos;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (!isSpace(code) && code !== 0x0A) {
        break;
      }
    }
    res = parseLinkTitle(state.src, pos, state.posMax);
    if (pos < max && start !== pos && res.ok) {
      title = res.str;
      pos = res.pos;
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (!isSpace(code) && code !== 0x0A) {
          break;
        }
      }
    } else {
      title = '';
    }
    if (pos >= max || state.src.charCodeAt(pos) !== 0x29) {
      state.pos = oldPos;
      return false;
    }
    pos++;
  } else {
    if (typeof state.env.references === 'undefined') {
      return false;
    }
    if (pos < max && state.src.charCodeAt(pos) === 0x5B) {
      start = pos + 1;
      pos = parseLinkLabel(state, pos);
      if (pos >= 0) {
        label = state.src.slice(start, pos++);
      } else {
        pos = labelEnd + 1;
      }
    } else {
      pos = labelEnd + 1;
    }
    if (!label) {
      label = state.src.slice(labelStart, labelEnd);
    }
    ref = state.env.references[normalizeReference(label)];
    if (!ref) {
      state.pos = oldPos;
      return false;
    }
    href = ref.href;
    title = ref.title;
  }
  if (!silent) {
    state.pos = labelStart;
    state.posMax = labelEnd;
    token = state.push('link_open', 'a', 1);
    token.attrs = attrs = [['href', href]];
    if (title) {
      attrs.push(['title', title]);
    }
    state.md.inline.tokenize(state);
    token = state.push('link_close', 'a', -1);
  }
  state.pos = pos;
  state.posMax = max;
  return true;
};
