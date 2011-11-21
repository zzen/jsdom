var dom = require("../../../../lib/jsdom/level2/core").dom.level2.core;

/*<html xmlns="http://www.w3.org/1999/xhtml"><head><title>hc_nodtdstaff</title></head><body onload="parent.loadComplete()">

</body></html>*/

exports.hc_nodtdstaff = function() {

  var doc = new dom.Document("html");
  var implementation = new dom.DOMImplementation(doc, {
    "XML" : ["1.0", "2.0"],
    "core": ["1.0", "2.0", "3.0"]
  });

  var notations = new dom.NotationNodeMap(
    doc,
    doc.createNotationNode("notation1","notation1File", null),
    doc.createNotationNode("notation2",null, "notation2File")
  );

  // TODO: consider importing the master list of entities
  //       http://www.w3schools.com/tags/ref_symbols.asp
  var entities = new dom.EntityNodeMap(
    doc,
    doc.createEntityNode("alpha", doc.createTextNode("α")),
    doc.createEntityNode("beta", doc.createTextNode("&#946;")),
    doc.createEntityNode("gamma", doc.createTextNode("&#947;")),
    doc.createEntityNode("delta", doc.createTextNode("&#948;")),
    doc.createEntityNode("epsilon", doc.createTextNode("&#949;"))
  );

  // <!ATTLIST acronym dir CDATA "ltr">

  var defaultAttributes = new dom.NamedNodeMap(doc);
  var acronym = doc.createElementNS("http://www.w3.org/2000/xmlns/","acronym");
  acronym.setAttribute("dir", "ltr");
  defaultAttributes.setNamedItem(acronym);



  var doctype = new dom.DocumentType(doc, "xml", entities, notations, defaultAttributes);
  doc.doctype = doctype;
  doc.implementation = implementation;

  doc.appendChild(doc.createComment(" This is comment number 1."));

  var html      = doc.createElementNS("http://www.w3.org/2000/xmlns/","html");
  var html      = doc.appendChild(html);

  var head      = doc.createElementNS("http://www.w3.org/2000/xmlns/","head");
  var head      = html.appendChild(head);

	var meta      = doc.createElementNS("http://www.w3.org/2000/xmlns/","meta");
	meta.setAttribute("http-equiv", "Content-Type");
	meta.setAttribute("content", "text/html; charset=UTF-8");
  head.appendChild(meta);

  var title     = doc.createElementNS("http://www.w3.org/2000/xmlns/","title")
  title.appendChild(doc.createTextNode("hc_staff"));
  var title     = head.appendChild(title);

  // make the tests work....
  head.appendChild(doc.createElementNS("http://www.w3.org/2000/xmlns/","script"));
  head.appendChild(doc.createElementNS("http://www.w3.org/2000/xmlns/","script"));
  head.appendChild(doc.createElementNS("http://www.w3.org/2000/xmlns/","script"));

  var body      = doc.createElementNS("http://www.w3.org/2000/xmlns/","body");
  var staff     = html.appendChild(body);


  var employee = doc.createElementNS("http://www.w3.org/2000/xmlns/","p");
  var address  = doc.createElementNS("http://www.w3.org/2000/xmlns/","acronym");
  var name     = doc.createElementNS("http://www.w3.org/2000/xmlns/","strong");
  var position = doc.createElementNS("http://www.w3.org/2000/xmlns/","code");
  var gender   = doc.createElementNS("http://www.w3.org/2000/xmlns/","var");
  var id       = doc.createElementNS("http://www.w3.org/2000/xmlns/","em");
  var salary   = doc.createElementNS("http://www.w3.org/2000/xmlns/","sup");


  employee.appendChild(id);
  employee.appendChild(doc.createTextNode("\n"));
  employee.appendChild(name);
  employee.appendChild(doc.createTextNode("\n"));
  employee.appendChild(position);
  employee.appendChild(doc.createTextNode("\n"));
  employee.appendChild(salary);
  employee.appendChild(doc.createTextNode("\n"));
  employee.appendChild(gender);
  employee.appendChild(doc.createTextNode("\n"));
  employee.appendChild(address);
  employee.appendChild(doc.createTextNode("\n"));
  staff.appendChild(employee);

  /*<p>
    <em>EMP0001</em>
    <strong>Margaret Martin</strong>
    <code>Accountant</code>
    <sup>56,000</sup>
    <var>Female</var>
    <acronym title="Yes">1230 North Ave. Dallas, Texas 98551</acronym>
   </p>*/

  id.appendChild(doc.createTextNode("EMP0001"));
  salary.appendChild(doc.createTextNode("56,000"));
  address.setAttribute("title", "Yes");
  address.appendChild(doc.createTextNode('1230 North Ave. Dallas, Texas 98551'));
  name.appendChild(doc.createTextNode("Margaret Martin"));
  gender.appendChild(doc.createTextNode("Female"));
  position.appendChild(doc.createTextNode("Accountant"));

  doc.normalize();
  return doc;
};
