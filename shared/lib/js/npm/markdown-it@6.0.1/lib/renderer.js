/* */ 
'use strict';
var assign = require('./common/utils').assign;
var unescapeAll = require('./common/utils').unescapeAll;
var escapeHtml = require('./common/utils').escapeHtml;
var default_rules = {};
default_rules.code_inline = function(tokens, idx) {
  return '<code>' + escapeHtml(tokens[idx].content) + '</code>';
};
default_rules.code_block = function(tokens, idx) {
  return '<pre><code>' + escapeHtml(tokens[idx].content) + '</code></pre>\n';
};
default_rules.fence = function(tokens, idx, options, env, slf) {
  var token = tokens[idx],
      info = token.info ? unescapeAll(token.info).trim() : '',
      langName = '',
      highlighted;
  if (info) {
    langName = info.split(/\s+/g)[0];
    token.attrJoin('class', options.langPrefix + langName);
  }
  if (options.highlight) {
    highlighted = options.highlight(token.content, langName) || escapeHtml(token.content);
  } else {
    highlighted = escapeHtml(token.content);
  }
  if (highlighted.indexOf('<pre') === 0) {
    return highlighted + '\n';
  }
  return '<pre><code' + slf.renderAttrs(token) + '>' + highlighted + '</code></pre>\n';
};
default_rules.image = function(tokens, idx, options, env, slf) {
  var token = tokens[idx];
  token.attrs[token.attrIndex('alt')][1] = slf.renderInlineAsText(token.children, options, env);
  return slf.renderToken(tokens, idx, options);
};
default_rules.hardbreak = function(tokens, idx, options) {
  return options.xhtmlOut ? '<br />\n' : '<br>\n';
};
default_rules.softbreak = function(tokens, idx, options) {
  return options.breaks ? (options.xhtmlOut ? '<br />\n' : '<br>\n') : '\n';
};
default_rules.text = function(tokens, idx) {
  return escapeHtml(tokens[idx].content);
};
default_rules.html_block = function(tokens, idx) {
  return tokens[idx].content;
};
default_rules.html_inline = function(tokens, idx) {
  return tokens[idx].content;
};
function Renderer() {
  this.rules = assign({}, default_rules);
}
Renderer.prototype.renderAttrs = function renderAttrs(token) {
  var i,
      l,
      result;
  if (!token.attrs) {
    return '';
  }
  result = '';
  for (i = 0, l = token.attrs.length; i < l; i++) {
    result += ' ' + escapeHtml(token.attrs[i][0]) + '="' + escapeHtml(token.attrs[i][1]) + '"';
  }
  return result;
};
Renderer.prototype.renderToken = function renderToken(tokens, idx, options) {
  var nextToken,
      result = '',
      needLf = false,
      token = tokens[idx];
  if (token.hidden) {
    return '';
  }
  if (token.block && token.nesting !== -1 && idx && tokens[idx - 1].hidden) {
    result += '\n';
  }
  result += (token.nesting === -1 ? '</' : '<') + token.tag;
  result += this.renderAttrs(token);
  if (token.nesting === 0 && options.xhtmlOut) {
    result += ' /';
  }
  if (token.block) {
    needLf = true;
    if (token.nesting === 1) {
      if (idx + 1 < tokens.length) {
        nextToken = tokens[idx + 1];
        if (nextToken.type === 'inline' || nextToken.hidden) {
          needLf = false;
        } else if (nextToken.nesting === -1 && nextToken.tag === token.tag) {
          needLf = false;
        }
      }
    }
  }
  result += needLf ? '>\n' : '>';
  return result;
};
Renderer.prototype.renderInline = function(tokens, options, env) {
  var type,
      result = '',
      rules = this.rules;
  for (var i = 0,
      len = tokens.length; i < len; i++) {
    type = tokens[i].type;
    if (typeof rules[type] !== 'undefined') {
      result += rules[type](tokens, i, options, env, this);
    } else {
      result += this.renderToken(tokens, i, options);
    }
  }
  return result;
};
Renderer.prototype.renderInlineAsText = function(tokens, options, env) {
  var result = '',
      rules = this.rules;
  for (var i = 0,
      len = tokens.length; i < len; i++) {
    if (tokens[i].type === 'text') {
      result += rules.text(tokens, i, options, env, this);
    } else if (tokens[i].type === 'image') {
      result += this.renderInlineAsText(tokens[i].children, options, env);
    }
  }
  return result;
};
Renderer.prototype.render = function(tokens, options, env) {
  var i,
      len,
      type,
      result = '',
      rules = this.rules;
  for (i = 0, len = tokens.length; i < len; i++) {
    type = tokens[i].type;
    if (type === 'inline') {
      result += this.renderInline(tokens[i].children, options, env);
    } else if (typeof rules[type] !== 'undefined') {
      result += rules[tokens[i].type](tokens, i, options, env, this);
    } else {
      result += this.renderToken(tokens, i, options, env);
    }
  }
  return result;
};
module.exports = Renderer;
