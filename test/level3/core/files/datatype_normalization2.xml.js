
var dom = require('../../../../lib/jsdom/level3/core').dom.level3.core;

module.exports.datatype_normalization2 =  function() {

  // <?xml version="1.0"?>
  // <?xml-stylesheet   href="doc.xsl" type="text/xsl" ?>

  var doc = new dom.Document('html');
  var entities = new dom.EntityNodeMap();

  // <!DOCTYPE html [
  var docType = new dom.DocumentType(
    doc,
    'xml',
    entities,
    new dom.NotationNodeMap(doc),
    new dom.NamedNodeMap(doc)
  );

  doc.doctype = docType;

  doc.implementation =  new dom.DOMImplementation(doc, {
    "XML" : ["1.0", "1.1"],
    "core": ["1.0", "2.0", "3.0"]
  });

  // <!DOCTYPE html [<!ATTLIST acronym title CDATA "default">]>
  var html      = doc.createElementNS("http://www.w3.org/1999/xhtml","html");

  //<head>
  var head = doc.createElement('head');

  // <title>canonicalform03</title>
  var title = doc.createElement('title');
  title.appendChild(doc.createTextNode('canonicalform03'));
  head.appendChild(title);

  //</head>
  html.appendChild(head);

  //<body onload="parent.loadComplete()">
  var body = doc.createElement('body');
  body.setAttribute('onload', 'parent.loadComplete()');


  var e = function(name, attrs, text) {
    var method = (doc['create' + name]) ?
                  'create' + name        :
                  'createElement';

    var ret = doc[method](name);

    if (attrs) {
      var keys = Object.keys(attrs);
      keys.forEach(function(v) {
        el.setAttribute(v, attrs[v]);
      });
      return el;
    }

    if (text) {
      text.split('\n').forEach(function(value) {
        ret.appendChild(doc.createTextNode(value));
      });
    }

    return ret;
  };

  var add = function(src, dest) {
    dest.appendChild(src);
    return src;
  };

  // <p>
  var p = add(e('p'), body);

  // <!--  preserve, string default  -->
  add(e('Comment', false, '  preserve, string default  '), p);

  // <em>    EMP  0001   </em>
  add(e('em', false, '    EMP  0001   '), p);

  // <!--   explicit preserve  -->
  add(e('Comment', false, '   explicit preserve  '), p);

  // <acronym>    EMP  0001   </acronym>
  add(e('acrynym', false, '    EMP  0001   '), p);

  // <!--   explicit collapse  -->
  add(e('Comment', false, '   explicit collapse  '), p);

  // <code>
  //   EMP  0001
  // </code>
  add(e('code', false, '\n  EMP  0001\n'), p);

  // <code>EMP  0001</code>
  add(e('code', false, 'EMP  0001'), p);

  // <code>EMP 0001</code>
  add(e('code', false, 'EMP 0001'), p);

  // <!--    explicit replace   -->
  add(e('Comment', false, '    explicit replace   '), p);

  // <sup>
  //     EMP  0001
  // </sup>
  add(e('sup', false, '\n  EMP  0001\n'), p);

  // <sup>EMP  0001</sup>
  add(e('sup', false, '\nEMP  0001'), p);

  // <sup>EMP 0001</sup>
  add(e('sup', false, 'EMP 0001'), p);

  // <sup>EMP
  // 0001</sup>
  add(e('sup', false, '\nEMP \n0001'), p);

  //</body>
  html.appendChild(body);

  //</html>
  doc.appendChild(html);

  return doc;
};

