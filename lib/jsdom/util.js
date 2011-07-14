var util = {};

util.mapper = function(parent, filter, recursive) {
  return function() {
    return util.mapDOMNodes(parent, recursive !== false, filter);
  };
};

// Returns Array
util.mapDOMNodes = function(parent, recursive, callback) {
  function visit(parent, result) {
    if (parent.childNodes) {
      return parent.childNodes.toArray().reduce(reducer, result);
    } else {
      return result;
    }
  }

  function reducer(array, child) {
    if (callback === true || callback(child)) {
      array.push(child);
    }
    if (recursive && child._childNodes) {
      visit(child, array);
    }
    return array;
  }

  return visit(parent, []);
};

util.visitTree = function(root, callback) {
  var cur = root; // TODO: Unroll this.

  function visit(el) {
    if (el) {
      callback(el);
      if (el._childNodes) {
        var i        = 0,
            children = el._childNodes,
            l        = children.length;

        for (i; i<l; i++) {
          visit(children[i]);
        }
      }
    }
  }
  visit(root);
};

util.markTreeReadonly = function(node) {
  function markLevel(el) {
    el._readonly = true;
    // also mark attributes and their children read-only
    if (el.attributes) {
      var attributes = el.attributes, l = attributes.length, i=0;
      attributes._readonly = true;

      for (i; i<l; i++) {
        util.visitTree(attributes[i], markLevel);
      }
    }
  }

  util.visitTree(node, markLevel);
};

var xml1_0StartRegex = ":\\a-z_\\uC0-\\uD6\\uD8-\\uF6\\uF8-\\u2FF\\u370-\\u37D\\u37F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\u10000-\\uEFFFF\\u4a"
var xml1_0Regex = new RegExp('^[' + xml1_0StartRegex + '][' + xml1_0StartRegex + '\\-\\.0-9\\uB7\\u300-\\u36F\\u203F-\\u2040]*$', 'i');

util.regex = {
  fallback : {
    filters : {
      tag       : /^[\w:\d_\.-]+$/i,
      entity    : /^[\w:\d_\.-]+$/i,
      attribute : /^[\w\d_\-&:;]+$/i,
      namespace : /^[\w:\d_\.-]+$/i
    }
  },
  'xml1.0' : {
    filters : {
      tag       : xml1_0Regex,
      entity    : xml1_0Regex,
      attribute : xml1_0Regex,
      namespace : xml1_0Regex
    }
  },
  'xml1.1' : {
    filters : {
      tag       : /^[\u9\uA\uD\u20-\uD7FF\uE000-\uFFFD\u10000-\u10FFFF]+$/,
      entity    : /^[\u9\uA\uD\u20-\uD7FF\uE000-\uFFFD\u10000-\u10FFFF]+$/,
      attribute : /^[\u9\uA\uD\u20-\uD7FF\uE000-\uFFFD\u10000-\u10FFFF]+$/,
      namespace : /^[\u9\uA\uD\u20-\uD7FF\uE000-\uFFFD\u10000-\u10FFFF]+$/
    }
  }
};

util.validate = function(element, type, value, mode) {
  mode = mode || 'fallback';
  if (util.regex[mode] && util.regex[mode].filters[type]) {
    var filters = util.regex[mode].filters;
    var result = filters[type].test(value);

    if (!result) {
      // TODO: forward this to the proper channel (document.trigger?)
      return false;
    } else {
      return result;
    }
  }
};

module.exports = util;
