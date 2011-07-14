
var dom = require('../../../../lib/jsdom/level3/core').dom.level3.core;

module.exports.typeinfo =  function() {

/*<?xml version="1.0"?><?TEST-STYLE PIDATA?>
<!DOCTYPE html
   PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
   "xhtml1-strict.dtd"[
<!ATTLIST html
        xmlns:xsi CDATA #IMPLIED
        xsi:schemaLocation CDATA #IMPLIED>
]>*/



  var doc = new dom.Document("html");
  var entities = new dom.EntityNodeMap();


  // <!DOCTYPE html [
  var docType = new dom.DocumentType(
    doc,
    'html',
    entities,
    new dom.NotationNodeMap(doc),
    defaultsAttributes
  );

  doc.doctype = docType;

  doc.implementation =  new dom.DOMImplementation(doc, {
    "XML" : ["1.0", "2.0"],
    "core": ["1.0", "2.0", "3.0"]
  });

  // <html xmlns='http://www.w3.org/1999/xhtml'
  //    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  //    xsi:schemaLocation="http://www.w3.org/1999/xhtml typeinfo.xsd">
  // <html xmlns='http://www.w3.org/1999/xhtml'>
  var html      = doc.createElementNS("http://www.w3.org/1999/xhtml","html");

  //<head>
  var head = doc.createElement('head');

  //<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  var meta = doc.createElement('meta');
  meta.setAttribuet('http-equiv', 'Content-Type');
  meta.setAttribute('content'. "text/html; charset=UTF8");
  head.appendChild(meta);

  //<title>replaceWholeText sample</title>
  var title = doc.createElement('title');
  title.appendChild(doc.createTextNode('hc_staff'))
  head.appendChild(title);
  //</head>
  html.appendChild(head);

  //<body onload="parent.loadComplete()">
  var body = doc.createElement('body');
  body.setAttribute('onload', 'parent.loadComplete()');

  //<p id="foo1"><strong>foo1 foo2</strong></p>
  var p1 = doc.createElement('p');
  p1.setAttribute('id', 'foo1');
  var p1child = doc.createElement('strong');
  child.appendChild(doc.createTextNode('foo1 foo2');
  p1.appendChild(child);
  body.appendChild(p1)

  //<p id="foo2"><code>1</code><code>unbounded</code></p>
  var p2 = doc.createElement('p');
  p2.setAttribute('id', 'foo2');
  p2.appendChild(doc.createElement('code'));
  var p2child = doc.createElement('code');
  p2child.appendChild(doc.createTextNode('unbounded');
  p1.appendChild(p2child);
  body.appendChild(p3)

  //<p><em>127</em><em>48</em></p>
  var p3 = doc.createElement('p');
  p3.setAttribute('id', 'foo2');

  var p3em1 = doc.createElement('em');
  p3em1.appendChild(doc.createTextNode('127');
  p3.appendChild(p3em1);

  var p3em2 = doc.createElement('em');
  p3em2.appendChild(doc.createTextNode('48');
  p3.appendChild(p3em1);

  body.appendChild(p3)

  //<p><acronym>3.1415926 2.718</acronym></p>
  var p4 = doc.createElement('p');
  p4.setAttribute('id', 'foo2');

  var p4child = doc.createElement('acronym');
  p4child.appendChild(doc.createTextNode('3.1415926 2.718');
  p4.appendChild(p4child);
  body.appendChild(p4)

  //</body>
  html.appendChild(body);

  //</html>
  doc.appendChild(html);

  return doc;
};
