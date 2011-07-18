var dom = require('../../../../lib/jsdom/level3/core').dom.level3.core;

module.exports.barfoo_base =  function () {

  var doc = new dom.Document("html");

  doc._baseURI = 'file://' + __dirname;
  doc._documentURI = doc._baseURI;

  /*
  <!ATTLIST script
       src CDATA #IMPLIED
       type CDATA #IMPLIED
       charset CDATA #IMPLIED>
  <!ELEMENT body (p)>
  <!ATTLIST body xml:base CDATA #IMPLIED
                 id ID #IMPLIED
                 onload CDATA #IMPLIED>
  <!ELEMENT p (#PCDATA|br)*>
  <!ELEMENT br EMPTY>
  ]>*/


  //<!ENTITY ent1 'foo'>
  var ent1 = doc.createEntityNode('ent1', doc.createTextNode('foo'));

  //<!ENTITY ent2 'foo<br/>'>
  var ent2Element = doc.createElement('ent2');
  ent2Element.appendChild(doc.createTextNode("foo"));
  ent2Element.appendChild(doc.createElement('br'));

  var entities = new dom.EntityNodeMap(
    doc,
    ent1,
    ent2Element
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

  doc._baseURI = 'file://' + __filename;
  doc.documentURI = 'file://' + __filename;

  doc.doctype = docType;

  doc.implementation =  new dom.DOMImplementation(doc, {
    "XML" : ["1.0", "2.0"],
    "core": ["1.0", "2.0", "3.0"]
  });

  // <html xmlns='http://www.w3.org/1999/xhtml' xml:base="http://www.w3.org/DOM/L3Test">
  var xmlns = 'http://www.w3.org/1999/xhtml';
  var html      = doc.createElementNS(xmlns,"html");
  html.setAttributeNS('http://www.w3.org/DOM/L3Test', 'xml:base');

  //<head>
  var head = doc.createElementNS(xmlns, 'head');

  //<title>replaceWholeText sample</title>
  var title = doc.createElementNS(xmlns, 'title');
  title.appendChild(doc.createTextNode('XML Base sample'))
  head.appendChild(title);
  //</head>
  html.appendChild(head);

  // <body xml:base="http://www.w3.org/DOM/EmployeeID" id="body">
  var body = doc.createElementNS(xmlns, 'body');
  body.setAttributeNS(null, 'xml:base', 'http://www.w3.org/DOM/EmployeeID')
  body.setAttributeNS(null, 'id')
  body.setAttribute('onload', 'parent.loadComplete()');

  //<p>bar</p><!-- keep comment adjacent to p  -->
  var p = doc.createElementNS(xmlns, 'p');
  p.appendChild(doc.createTextNode('bar'));
  body.appendChild(p);
  body.appendChild(doc.createComment(' keep comment adjacent to p  '));

  //</body>
  html.appendChild(body);

  //</html>
  doc.appendChild(html);

  return doc;
};
