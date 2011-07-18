var dom = require('../../../../lib/jsdom/level3/core').dom.level3.core;

module.exports.canonicalform01 =  function() {
  var doc = new dom.Document();

  // <?xml version="1.0"?>

  // <?xml-stylesheet   href="doc.xsl" type="text/xsl" ?>
  // <?xml-stylesheet   href="doc.xsl"
  //   type="text/xsl" ?>
  var stylesheet = doc.createProcessingInstruction('xml-stylesheet', '   href="doc.xsl"\n  type="text/xsl  ');
  doc.appendChild(stylesheet);
  doc.appendChild(doc.createTextNode(' '));

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
    "XML" : ["1.0", "2.0"],
    "core": ["1.0", "2.0", "3.0"]
  });

  // <!DOCTYPE html SYSTEM "xhtml1-strict.dtd">
  var html      = doc.createElementNS("http://www.w3.org/1999/xhtml","html");

  //<head>
  var head = doc.createElement('head');
  // <title>canonicalform01</title>
  var title = doc.createElement('title');
  title.appendChild(doc.createTextNode('canonicalform01'));
  head.appendChild(title);
  //</head>
  html.appendChild(head);

  //<body onload="parent.loadComplete()">
  var body = doc.createElement('body');
  body.setAttribute('onload', 'parent.loadComplete()');

  //<p>Hello, world!<!-- Comment 1 --></p>
  var p = doc.createElement('p');
  p.appendChild(doc.createTextNode('Hello, world!'));
  p.appendChild(doc.createComment(' Comment 1 '));
  body.appendChild(p);

  //</body>
  html.appendChild(body);

  //</html>
  doc.appendChild(html);
  doc.appendChild(doc.createTextNode(' \n '));

  // <?pi-without-data     ?>
  doc.appendChild(doc.createProcessingInstruction('pi-without-data', ''));
  doc.appendChild(doc.createTextNode(' \n '));

  // <!-- Comment 2 -->
  doc.appendChild(doc.createComment(' Comment 2 '))
  doc.appendChild(doc.createTextNode(' \n '));

  // <!-- Comment 3 -->
  doc.appendChild(doc.createComment(' Comment 3 '))


  return doc;
};
