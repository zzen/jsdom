var dom = require("../../../../lib/jsdom/level3/core").dom.level3.core;
var util = require("../../../../lib/jsdom/util");
exports.hc_staff = function() {

  var doc = new dom.Document("html");
  doc.documentURI = 'hc_staff';
  doc._xmlVersion = '1.0';
  var implementation = new dom.DOMImplementation(doc, {
    "XML" : ["1.0", "2.0"],
    "core": ["1.0", "2.0", "3.0"]
  });

  var notations = new dom.NotationNodeMap(
    doc,
    doc.createNotationNode("notation1","notation1File", null),
    doc.createNotationNode("notation2",null, "notation2File")
  );

  // <!ENTITY ent4 "<span xmlns='http://www.w3.org/1999/xhtml'>Element data</span><?PItarget PIdata?>">
  var ent4 = doc.createEntityNode('ent4');
  var ent4_span = doc.createElement('span');
  ent4_span.setAttributeNS("http://www.w3.org/2000/xmlns/", 'xmlns', 'http://www.w3.org/1999/xhtml');
  ent4_span.appendChild(doc.createTextNode('Element data'));
  var ent4_pi = doc.createProcessingInstruction('PItarget', 'PIdata');

  ent4._readonly = false;
  ent4.appendChild(ent4_span);
  ent4.appendChild(ent4_pi);
  util.markTreeReadonly(ent4);

  // TODO: consider importing the master list of entities
  //       http://www.w3schools.com/tags/ref_symbols.asp
  var entities = new dom.EntityNodeMap(
    doc,
    doc.createEntityNode("alpha", doc.createTextNode("α")),
    doc.createEntityNode("beta", doc.createTextNode("β")),
    doc.createEntityNode("gamma", doc.createTextNode("&#947;")),
    doc.createEntityNode("delta", doc.createTextNode("δ")),
    doc.createEntityNode("epsilon", doc.createTextNode("&#949;")),
    ent4
  );

  // <!ATTLIST acronym dir CDATA "ltr">

  var defaultAttributes = new dom.NamedNodeMap(doc);
  var acronym = doc.createElementNS("http://www.w3.org/2000/xmlns/","p");
  acronym.setAttribute("dir", "rtl");
  defaultAttributes.setNamedItem(acronym);



  var doctype = new dom.DocumentType(doc, "xml", entities, notations, defaultAttributes);

  doc._inputEncoding = 'UTF-8';

  doc.doctype = doctype;
  doc.implementation = implementation;

  doc.appendChild(doc.createComment(" This is comment number 1."));


  var html      = doc.createElementNS("http://www.w3.org/2000/xmlns/","html");

/*

Pending schemaInfo implementation
  html.setAttributeNS(
    'http://www.w3.org/1999/xhtml',
    'xmlns:xsi',
    'http://www.w3.org/2001/XMLSchema-instance'
  );

  html.setAttributeNS(
    'http://www.w3.org/2001/XMLSchema-instance',
    'xsi:schemaLocation',
    'http://www.w3.org/1999/xhtml hc_staff.xsd'
  );
*/
  doc.appendChild(html);

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

  var employees = [];
  var addresses = [];
  var names     = [];
  var positions = [];
  var genders   = [];
  var ids       = [];
  var salaries  = [];

  // create 5 employees
  for (var i=0; i<5; i++)
  {
    var employee = doc.createElementNS("http://www.w3.org/2000/xmlns/","p");
    var address  = doc.createElementNS("http://www.w3.org/2000/xmlns/","acronym");
    var name     = doc.createElementNS("http://www.w3.org/2000/xmlns/","strong");
    var position = doc.createElementNS("http://www.w3.org/2000/xmlns/","code");
    var gender   = doc.createElementNS("http://www.w3.org/2000/xmlns/","var");
    var id       = doc.createElementNS("http://www.w3.org/2000/xmlns/","em");
    var salary   = doc.createElementNS("http://www.w3.org/2000/xmlns/","sup");

    employee.appendChild(doc.createTextNode("\n  "));
    employee.appendChild(id);
    employee.appendChild(doc.createTextNode("\n  "));
    employee.appendChild(name);
    employee.appendChild(doc.createTextNode("\n  "));
    employee.appendChild(position);
    employee.appendChild(doc.createTextNode("\n  "));
    employee.appendChild(salary);
    employee.appendChild(doc.createTextNode("\n  "));
    employee.appendChild(gender);
    employee.appendChild(doc.createTextNode("\n  "));
    employee.appendChild(address);
    employee.appendChild(doc.createTextNode("\n "));
    staff.appendChild(employee);

    names.push(name);
    employees.push(employee);
    addresses.push(address);
    genders.push(gender);
    positions.push(position);
    ids.push(id);
    salaries.push(salary);
  }

  employees[0].setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:dmstc", "http://www.usa.com")
  ids[0].appendChild(doc.createTextNode("EMP0001"));
  salaries[0].appendChild(doc.createTextNode("56,000"));
  addresses[0].setAttribute("title", "Yes");
  addresses[0].setAttributeNS("http://www.w3.org/2001/XMLSchema-instance", "xsi:noNamespaceSchemaLocation", "Yes");
  addresses[0].appendChild(doc.createTextNode('1230 North Ave. Dallas, Texas 98551'));
  names[0].appendChild(doc.createTextNode("Margaret Martin"));
  genders[0].appendChild(doc.createTextNode("Female"));
  positions[0].appendChild(doc.createTextNode("Accountant"));

  employees[1].setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:dmstc", "http://www.usa.com")
  ids[1].appendChild(doc.createTextNode("EMP0002"));
  salaries[1].appendChild(doc.createTextNode("35,000"));
  addresses[1].setAttribute("title", "Yes");
  addresses[1].setAttribute("class", "Yes");
  addresses[1].appendChild(doc.createTextNode("β Dallas, γ\n 98554"));
  addresses[1].setAttributeNS("http://www.w3.org/2001/XMLSchema-instance", "xsi:noNamespaceSchemaLocation", "Yes");
  names[1].appendChild(doc.createTextNode("Martha Raynolds"));
  names[1].appendChild(doc.createTextNode('\n'));
  names[1].appendChild(doc.createCDATASection("This is a CDATASection with EntityReference number 2 &ent2;"));
  names[1].appendChild(doc.createTextNode('\n'));
  names[1].appendChild(doc.createCDATASection("This is an adjacent CDATASection with a reference to a tab &tab;"));
  genders[1].appendChild(doc.createTextNode("Female"));
  positions[1].appendChild(doc.createTextNode("Secretary"));

  employees[2].setAttributeNS('http://www.w3.org/2000/xmlns/','xmlns:dmstc', 'http://www.netzero.com')
  ids[2].appendChild(doc.createTextNode("EMP0003"));
  salaries[2].appendChild(doc.createTextNode("100,000"));
  addresses[2].setAttribute("title", "Yes");
  addresses[2].setAttribute("class", "No");
  addresses[2].setAttributeNS("http://www.w3.org/2001/XMLSchema-instance", "xsi:noNamespaceSchemaLocation", "Yes");
  addresses[2].appendChild(doc.createTextNode("PO Box 27 Irving, texas 98553"));
  names[2].appendChild(doc.createTextNode("Roger\n Jones"));
  genders[2].appendChild(doc.createEntityReference("ent4"));//Text("&delta;"));
  positions[2].appendChild(doc.createTextNode("Department Manager"));

  employees[3].setAttributeNS('http://www.w3.org/2000/xmlns/','xmlns:nm', "http://www.altavista.com")
  ids[3].appendChild(doc.createTextNode("EMP0004"));
  salaries[3].appendChild(doc.createTextNode("95,000"));
  addresses[3].setAttribute("title", "Yes");
  addresses[3].setAttribute("class", "Yα");
  addresses[3].setAttribute("id", "emp4_addr");
  addresses[3].setAttributeNS("http://www.w3.org/2001/XMLSchema-instance", "xsi:noNamespaceSchemaLocation", "Yes");
  addresses[3].appendChild(doc.createTextNode("27 South Road. Dallas, Texas 98556"));
  names[3].appendChild(doc.createTextNode("Jeny Oconnor"));
  genders[3].appendChild(doc.createTextNode("Female"));
  positions[3].appendChild(doc.createTextNode("Personal Director"));

  ids[4].appendChild(doc.createTextNode("EMP0005"));
  salaries[4].appendChild(doc.createTextNode("90,000"));
  addresses[4].setAttribute("title", "Yes");
  addresses[4].setAttribute("class", "Yes");
  addresses[4].appendChild(doc.createTextNode("1821 Nordic. Road, Irving Texas 98558"));
  names[4].appendChild(doc.createTextNode("Robert Myers"));
  genders[4].appendChild(doc.createTextNode("male"));
  positions[4].appendChild(doc.createTextNode("Computer Specialist"));

  doc.appendChild(doc.createProcessingInstruction("TEST-STYLE", "PIDATA"));

  doc.normalize();
  return doc;
};
