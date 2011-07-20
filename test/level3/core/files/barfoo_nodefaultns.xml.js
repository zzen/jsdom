/*<!DOCTYPE html:html [
<!ENTITY ent1 'foo'>
<!ENTITY ent2 'foo<br/>'>
<!ELEMENT html:html (html:head, html:body)>
<!ATTLIST html:html xmlns:html CDATA #IMPLIED>
<!ELEMENT html:head (html:title,script*)>
<!ATTLIST html:head xmlns CDATA #IMPLIED>
<!ELEMENT html:title (#PCDATA)>
<!ELEMENT script (#PCDATA)>
<!ATTLIST script
     src CDATA #IMPLIED
     type CDATA #IMPLIED
     charset CDATA #IMPLIED>
<!ELEMENT html:body (html:p)>
<!ELEMENT html:p (#PCDATA|html:br)*>
<!ATTLIST html:p class CDATA #IMPLIED>
<!ELEMENT html:br EMPTY>
]>
<html:html xmlns:html='http://www.w3.org/1999/xhtml'>
<html:head xmlns='http://www.w3.org/1999/xhtml'>
<html:title>test file</html:title>
</html:head>
<html:body>
<html:p class="visible:false">bar</html:p>
</html:body>
</html:html>
*/

var dom = require('../../../../lib/jsdom/level3/core').dom.level3.core;

module.exports.barfoo_nodefaultns =  function () {

  var doc = new dom.Document("html");

  doc._baseURI = 'file://' + __dirname;
  doc._documentURI = doc._baseURI;


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

  // <!DOCTYPE html [
  var docType = new dom.DocumentType(
    doc,
    'xml',
    entities,
    new dom.NotationNodeMap(doc),
    new dom.NamedNodeMap(doc)
  );

  doc.documentURI = 'barfoo_base';

  doc.doctype = docType;

  doc.implementation =  new dom.DOMImplementation(doc, {
    "XML" : ["1.0", "2.0"],
    "core": ["1.0", "2.0", "3.0"]
  });

  // <html:html xmlns:html='http://www.w3.org/1999/xhtml'>
  var xmlns = 'http://www.w3.org/1999/xhtml';
  var html      = doc.createElementNS(xmlns, "html:html");
  doc.appendChild(html);

  // <html:head xmlns='http://www.w3.org/1999/xhtml'>
  var head = doc.createElementNS(xmlns, 'html:head');
  html.appendChild(head);

  // <html:title>test file</html:title>
  var title = doc.createElementNS(xmlns, 'htmltitle');
  title.appendChild(doc.createTextNode('test '))
  head.appendChild(title);

  // <html:body>
  var body = doc.createElementNS(xmlns, 'html:body');
  html.appendChild(body);

  // <html:p class="visible:false">bar</html:p>
  var p = doc.createElementNS(xmlns, 'html:p');
  p.appendChild(doc.createTextNode('bar'));
  p.setAttribute('class', 'visible:false');
  body.appendChild(p);

  return doc;
};
