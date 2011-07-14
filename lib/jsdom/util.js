var util = {};

util.mapper = function(parent, filter, recursive) {
  return function() {
    return util.mapDOMNodes(parent, recursive !== false, filter);
  };
};

// Returns Array
util.mapDOMNodes = function(parent, recursive, callback) {
  function visit(parent, result) {
    return parent.childNodes.toArray().reduce(reducer, result);
  }

  function reducer(array, child) {
    if (callback(child)) {
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
      tag       : /^[\u0009\u000A\u000D\u0020-\uD7FF\uE000-\uFFFD\u10000-\u10FFFF]+$/,
      entity    : /^[\u0009\u000A\u000D\u0020-\uD7FF\uE000-\uFFFD\u10000-\u10FFFF]+$/,
      attribute : /^[\u0009\u000A\u000D\u0020-\uD7FF\uE000-\uFFFD\u10000-\u10FFFF]+$/,
      namespace : /^[\u0009\u000A\u000D\u0020-\uD7FF\uE000-\uFFFD\u10000-\u10FFFF]+$/
    }
  },
  'xml1.1' : {
    filters : {
      tag       : /^[\u0009\u000A\u000D\u0020-\uD7FF\uE000-\uFFFD\u10000-\u10FFFF]+$/,
      entity    : /^[\u0009\u000A\u000D\u0020-\uD7FF\uE000-\uFFFD\u10000-\u10FFFF]+$/,
      attribute : /^[\u0009\u000A\u000D\u0020-\uD7FF\uE000-\uFFFD\u10000-\u10FFFF]+$/,
      namespace : /^[\u0009\u000A\u000D\u0020-\uD7FF\uE000-\uFFFD\u10000-\u10FFFF]+$/
    }
  }
};

util.validate = function(element, type, value, mode) {
  mode = mode || 'fallback';

  var filters = util.regex[mode].filters;
  if (filters[type]) {
    return filters[type].test(value);
  }
};

module.exports = util;
