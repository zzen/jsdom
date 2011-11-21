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
var xml1_0EndRegex = '\\-\\.0-9\\uB7\\u300-\\u36F\\u203F-\\u2040';
var xml1_0Regex = new RegExp('^[' + xml1_0StartRegex + '][' + xml1_0StartRegex + xml1_0EndRegex + ']*$', 'i');
var xml1_0RegexInverse = new RegExp('[^' + xml1_0StartRegex + '][' + xml1_0StartRegex + xml1_0EndRegex + ']', 'gi');

util.regex = {
  fallback : {
    filters : {
      tag       : /^[\w:\d_\.-]+$/i,
      entity    : /^[\w:\d_\.-]+$/i,
      attribute : /^[\w\d_\-&:;]+$/i,
      namespace : /^[\w:\d_\.-]+$/i
    },
    inverse : {
      tag       : /[^a-z:\d_\.-]/ig,
      entity    : /[^\w:\d_\.-]/ig,
      attribute : /[^\w\d_\-&:;]/ig,
      namespace : /[^\w:\d_\.-]/ig
    }
  },
  'xml- remove for now -1.0' : {
    filters : {
      tag       : xml1_0Regex,
      entity    : xml1_0Regex,
      attribute : xml1_0Regex,
      namespace : xml1_0Regex
    },
    inverse : {
      tag       : xml1_0RegexInverse,
      entity    : xml1_0RegexInverse,
      attribute : xml1_0RegexInverse,
      namespace : xml1_0RegexInverse
    }
  },
  'xml1.1' : {
    filters : {
      tag       : /^[\u9\uA\uD\u20-\uD7FF\uE000-\uFFFD\u10000-\u10FFFF]+$/,
      entity    : /^[\u9\uA\uD\u20-\uD7FF\uE000-\uFFFD\u10000-\u10FFFF]+$/,
      attribute : /^[\u9\uA\uD\u20-\uD7FF\uE000-\uFFFD\u10000-\u10FFFF]+$/,
      namespace : /^[\u9\uA\uD\u20-\uD7FF\uE000-\uFFFD\u10000-\u10FFFF]+$/
    },
    inverse : {
      tag       : /[^\u9\uA\uD\u20-\uD7FF\uE000-\uFFFD\u10000-\u10FFFF]/g,
      entity    : /[^\u9\uA\uD\u20-\uD7FF\uE000-\uFFFD\u10000-\u10FFFF]/g,
      attribute : /[^\u9\uA\uD\u20-\uD7FF\uE000-\uFFFD\u10000-\u10FFFF]/g,
      namespace : /[^\u9\uA\uD\u20-\uD7FF\uE000-\uFFFD\u10000-\u10FFFF]/g
    }
  }
};

util.validationFailures = function(element, type, value, mode) {
  mode = mode || 'fallback';
  if (util.regex[mode] && util.regex[mode].inverse[type]) {
    var inverse = util.regex[mode].inverse;
    var result = value.match(inverse[type]);
    return result;
  } else {
    return value.match(util.regex.fallback.inverse[type]);
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

  } else {
    return util.regex.fallback.filters[type].test(value);
  }
};

util.trim = function(str) {
  return str.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
}


util.debug = function(element) {
  var ret = [];

  if (element) {
    util.mapDOMNodes(element, true, function(node) {
      var attributes = [];
      if (node.attributes) {
        node.attributes.toArray().forEach(function(attr) {
          attributes.push(attr.nodeName + '="' + attr.nodeValue + '"');
        });
      }
      var val = '(' + node.nodeType + ') ' + (node.tagName || node.nodeName) + '[' + attributes.join(' ') + '] = "' + node.nodeValue + '"';
      ret.push(val);
    });
  }
  return ret.join('\n');
}

/**
 * Intercepts a method by replacing the prototype's implementation
 * with a wrapper that invokes the given interceptor instead.
 *
 *     utils.intercept(core.Element, 'inserBefore',
 *       function(_super, args, newChild, refChild) {
 *         console.log('insertBefore', newChild, refChild);
 *         return _super.apply(this, args);
 *       }
 *     );
 */
util.intercept = function(clazz, method, interceptor) {
  var proto = clazz.prototype,
      _super = proto[method],
      unwrapArgs = interceptor.length > 2;

  proto[method] = function() {
    if (unwrapArgs) {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(_super, arguments);
      return interceptor.apply(this, args);
    }
    else {
      return interceptor.call(this, _super, arguments);
    }
  };
};


module.exports = util;
