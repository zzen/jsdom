
module.exports.regex = {
  filter : {
    tag       : /^[\w:\d_\.-]+$/i,
    entity    : /^[\w:\d_\.-]+$/i,
    attribute : /^[\w\d_\-&:;]+$/i,
    namespace : /^[\w:\d_\.-]+$/i
  }
}

module.exports.validate = function(element, type, value) {
  if (module.exports.regex.filter[type]) {
    return module.exports.regex.filter[type].test(value);
  }
};
