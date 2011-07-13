
module.exports.regex = {
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
      tag       : /[^\u0009\u000A\u000D\u0020-\uD7FF\uE000-\uFFFD\u10000-\u10FFFF]/,
      entity    : /[^\u0009\u000A\u000D\u0020-\uD7FF\uE000-\uFFFD\u10000-\u10FFFF]/,
      attribute : /[^\u0009\u000A\u000D\u0020-\uD7FF\uE000-\uFFFD\u10000-\u10FFFF]/,
      namespace : /[^\u0009\u000A\u000D\u0020-\uD7FF\uE000-\uFFFD\u10000-\u10FFFF]/
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

module.exports.validate = function(element, type, value, mode) {
  mode = mode || 'fallback';

  var filters = module.exports.regex[mode].filters;
  if (filters[type]) {
    return filters[type].test(value);
  }
};
