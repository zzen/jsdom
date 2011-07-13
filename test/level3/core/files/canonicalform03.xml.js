

var dom = require('../../../../lib/jsdom/level3/core').dom.level3.core;

module.exports.canonicalform03 =  function() {

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


  // <br />
  body.appendChild(doc.createElement('br'));

  // <br></br>
  body.appendChild(doc.createElement('br'));

  // <div name = "elem3" id="elem3" />
  var elem3 = doc.createElement('div');
  elem3.setAttribute('name', 'elem3');
  elem3.setAttribute('id', 'elem3');
  body.appendChild(elem3);

  // <div name="elem4" id="elem4"></div>
  var elem4 = doc.createElement('div');
  elem4.setAttribute('name', 'elem3');
  elem4.setAttribute('id', 'elem3');
  elem3.appendChild(elem4);

  // <div a:attr="out" b:attr="sorted" name="all" class="I'm" xmlns:b="http://www.ietf.org" xmlns:a="http://www.w3.org" xmlns="http://example.org"/>
  var div_all = doc.createElementNS('http://example.org', 'div');
  div_all.setAttributeNS('http://www.w3.org', 'a:attr', 'out');
  div_all.setAttributeNS('http://www.ietf.org', 'b:attr', 'out');
  elem3.appendChild(div_all);

  // <div xmlns="" xmlns:a="http://www.w3.org">
  // <div xmlns="http://www.ietf.org">
  // <div xmlns="" xmlns:a="http://www.w3.org">
  // <acronym xmlns="" xmlns:a="http://www.ietf.org"/>
  // </div>
  // </div>
  // </div>


  //</body>
  html.appendChild(body);

  //</html>
  doc.appendChild(html);

  return doc;
};
