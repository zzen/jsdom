/*<?xml version="1.0" encoding="UTF-8"?>

<html xmlns='http://www.w3.org/1999/xhtml'>
<head>
<title>external entity encoding sample</title>
</head>
<body onload="parent.loadComplete()">
<p>bar&ent2;&ent1;</p>

&ent3;
</body>
</html>*/


var dom = require('../../../../lib/jsdom/level3/core').dom.level3.core;
var util = require('../../../../lib/jsdom/util');

module.exports.external_barfoo =  function () {

  var doc = new dom.Document("html");
  doc._inputEncoding = 'UTF-8';
  doc._xmlEncoding = 'UTF-8';
  doc.documentURI = 'external_barfoo';

  // <!ENTITY ent1 SYSTEM 'external_foo.ent'> // <?xml version="1.0" encoding="uTf-16"?>foo
  var ent1 = doc.createEntityNode('ent1');
  var ent1_pi = doc.createProcessingInstruction('xml');
  ent1_pi._xmlVersion = '1.0';
  ent1_pi._xmlEncoding = 'uTf-16';
  ent1._readonly = false;
  ent1.appendChild(ent1_pi);
  ent1.appendChild(doc.createTextNode("foo"));
  util.markTreeReadonly(ent1);

  // <!ENTITY ent2 SYSTEM 'external_foobr.ent'> // <br/>foo
  var ent2 = doc.createEntityNode('ent2');
  ent2._readonly = false;
  ent2.appendChild(doc.createElement('br'));
  ent2.appendChild(doc.createTextNode("foo"));
  util.markTreeReadonly(ent2);

  // <!ENTITY ent3 SYSTEM 'external_widget.ent'> // <p xmlns='http://www.w3.org/1999/xhtml'>widget</p>
  var ent3 = doc.createEntityNode('ent3');
  ent3._readonly = false;
  var ent3_p = doc.createElementNS('http://www.w3.org/1999/xhtml', 'p');

  // set the baseURL to external_widget
  ent3._baseURI = 'external_widget';
  ent3_p.appendChild(doc.createTextNode('widget'));
  ent3.appendChild(ent3_p);

  util.markTreeReadonly(ent3);

  // <!ENTITY ent5 PUBLIC "entityURI" "entityFile" NDATA notation1>
  var ent5 = doc.createEntityNode('ent5');

  var entities = new dom.EntityNodeMap(
    doc,
    ent1,
    ent2,
    ent3,
    ent5
  );

  /*
   <!ATTLIST p
      dir CDATA 'rtl'
      xmlns:dmstc CDATA #IMPLIED
      xmlns:nm CDATA #IMPLIED
      xmlns:emp2 CDATA #IMPLIED>
  */
  var defaultsAttributes = new dom.NamedNodeMap(doc);
  var defaultP = doc.createElement('p');
  defaultP.setAttribute('dir', 'rtl');
  defaultsAttributes.setNamedItem(defaultP);

  // <!DOCTYPE html [
  var docType = new dom.DocumentType(
    doc,
    'xml',
    entities,
    new dom.NotationNodeMap(doc),
    defaultsAttributes
  );

  doc.doctype = docType;

  doc.implementation =  new dom.DOMImplementation(doc, {
    "XML" : ["1.0", "2.0"],
    "core": ["1.0", "2.0", "3.0"]
  });

  // <html xmlns='http://www.w3.org/1999/xhtml'>
  var xmlns = 'http://www.w3.org/1999/xhtml';
  var html      = doc.createElementNS(xmlns,"html");

  //<head>
  var head = doc.createElementNS(xmlns, 'head');
  //<title>replaceWholeText sample</title>
  var title = doc.createElementNS(xmlns, 'title');
  title.appendChild(doc.createTextNode('external entity encoding sample'))
  head.appendChild(title);
  //</head>
  html.appendChild(head);

  //<body onload="parent.loadComplete()">
  var body = doc.createElementNS(xmlns, 'body');
  body.setAttribute('onload', 'parent.loadComplete()');

  // <p>bar&ent2;&ent1;</p>
  p = doc.createElementNS(xmlns, 'p');
  p.appendChild(doc.createTextNode('bar'));
  p.appendChild(doc.createEntityReference('ent2'));
  p.appendChild(doc.createEntityReference('ent1'));
  body.appendChild(p);

  // <p xml:base="http://www.example.com/bogus_base">bar&ent2;&ent1;</p>
  var p = doc.createElementNS(xmlns, 'p');
  p.setAttributeNS('http://www.w3.org/XML/namespace', 'base', 'http://www.example.com/bogus_base');
  p.appendChild(doc.createTextNode('bar'));
  p.appendChild(doc.createEntityReference('ent2'));
  p.appendChild(doc.createEntityReference('ent1'));
  body.appendChild(p);
  body.appendChild(doc.createEntityReference('ent3'));

  //</body>
  html.appendChild(body);

  //</html>
  doc.appendChild(html);

  return doc;
};
