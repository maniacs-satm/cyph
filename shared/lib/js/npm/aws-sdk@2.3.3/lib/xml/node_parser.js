/* */ 
var util = require('../util');
var Shape = require('../model/shape');
var xml2js = require('xml2js');
var options = {
  explicitCharkey: false,
  trim: false,
  normalize: false,
  explicitRoot: false,
  emptyTag: null,
  explicitArray: true,
  ignoreAttrs: false,
  mergeAttrs: false,
  validator: null
};
function NodeXmlParser() {}
NodeXmlParser.prototype.parse = function(xml, shape) {
  shape = shape || {};
  var result = null;
  var error = null;
  var parser = new xml2js.Parser(options);
  parser.parseString(xml, function(e, r) {
    error = e;
    result = r;
  });
  if (result) {
    var data = parseXml(result, shape);
    if (result.ResponseMetadata) {
      data.ResponseMetadata = parseXml(result.ResponseMetadata[0], {});
    }
    return data;
  } else if (error) {
    throw util.error(error, {
      code: 'XMLParserError',
      retryable: true
    });
  } else {
    return parseXml({}, shape);
  }
};
function parseXml(xml, shape) {
  switch (shape.type) {
    case 'structure':
      return parseStructure(xml, shape);
    case 'map':
      return parseMap(xml, shape);
    case 'list':
      return parseList(xml, shape);
    case undefined:
    case null:
      return parseUnknown(xml);
    default:
      return parseScalar(xml, shape);
  }
}
function parseStructure(xml, shape) {
  var data = {};
  if (xml === null)
    return data;
  util.each(shape.members, function(memberName, memberShape) {
    var xmlName = memberShape.name;
    if (xml.hasOwnProperty(xmlName) && Array.isArray(xml[xmlName])) {
      var xmlChild = xml[xmlName];
      if (!memberShape.flattened)
        xmlChild = xmlChild[0];
      data[memberName] = parseXml(xmlChild, memberShape);
    } else if (memberShape.isXmlAttribute && xml.$ && xml.$.hasOwnProperty(xmlName)) {
      data[memberName] = parseScalar(xml.$[xmlName], memberShape);
    } else if (memberShape.type === 'list') {
      data[memberName] = memberShape.defaultValue;
    }
  });
  return data;
}
function parseMap(xml, shape) {
  var data = {};
  if (xml === null)
    return data;
  var xmlKey = shape.key.name || 'key';
  var xmlValue = shape.value.name || 'value';
  var iterable = shape.flattened ? xml : xml.entry;
  if (Array.isArray(iterable)) {
    util.arrayEach(iterable, function(child) {
      data[child[xmlKey][0]] = parseXml(child[xmlValue][0], shape.value);
    });
  }
  return data;
}
function parseList(xml, shape) {
  var data = [];
  var name = shape.member.name || 'member';
  if (shape.flattened) {
    util.arrayEach(xml, function(xmlChild) {
      data.push(parseXml(xmlChild, shape.member));
    });
  } else if (xml && Array.isArray(xml[name])) {
    util.arrayEach(xml[name], function(child) {
      data.push(parseXml(child, shape.member));
    });
  }
  return data;
}
function parseScalar(text, shape) {
  if (text && text.$ && text.$.encoding === 'base64') {
    shape = new Shape.create({type: text.$.encoding});
  }
  if (text && text._)
    text = text._;
  if (typeof shape.toType === 'function') {
    return shape.toType(text);
  } else {
    return text;
  }
}
function parseUnknown(xml) {
  if (xml === undefined || xml === null)
    return '';
  if (typeof xml === 'string')
    return xml;
  if (Array.isArray(xml)) {
    var arr = [];
    for (i = 0; i < xml.length; i++) {
      arr.push(parseXml(xml[i], {}));
    }
    return arr;
  }
  var keys = Object.keys(xml),
      i;
  if (keys.length === 0 || keys === ['$']) {
    return {};
  }
  var data = {};
  for (i = 0; i < keys.length; i++) {
    var key = keys[i],
        value = xml[key];
    if (key === '$')
      continue;
    if (value.length > 1) {
      data[key] = parseList(value, {member: {}});
    } else {
      data[key] = parseXml(value[0], {});
    }
  }
  return data;
}
module.exports = NodeXmlParser;
