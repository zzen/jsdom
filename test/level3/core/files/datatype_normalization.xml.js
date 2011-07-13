var dom = require('../../../../lib/jsdom/level3/core').dom.level3.core;

module.exports.datatype_normalization =  function() {

  // <?xml version="1.0"?>
  // <?xml-stylesheet   href="doc.xsl" type="text/xsl" ?>

  var doc = new dom.Document('html');
  var entities = new dom.EntityNodeMap();

  /*<!DOCTYPE svg [
  <!ENTITY svgunit SYSTEM "svgunit.js">
  <!ENTITY svgtest SYSTEM "svgtest.js">
  <!ELEMENT svg (rect, script, data)>
  <!ATTLIST svg
    xmlns CDATA #IMPLIED
    xmlns:xsi CDATA #IMPLIED
    xsi:schemaLocation CDATA #IMPLIED>
     <!ELEMENT rect EMPTY>
     <!ATTLIST rect
        x CDATA #REQUIRED
        y CDATA #REQUIRED
        width CDATA #REQUIRED
        height CDATA #REQUIRED>
    <!ELEMENT script (#PCDATA)>
    <!ATTLIST script type CDATA #IMPLIED>
    <!ELEMENT data (double*, boolean*, decimal*, float*, dateTime*, time*)>
    <!ATTLIST data xmlns CDATA #IMPLIED>
    <!ELEMENT double (#PCDATA)>
    <!ATTLIST double
          value CDATA #IMPLIED
          union CDATA #IMPLIED>
    <!ELEMENT boolean (#PCDATA)>
    <!ATTLIST boolean
          value CDATA #IMPLIED
          union CDATA #IMPLIED>
    <!ELEMENT decimal (#PCDATA)>
    <!ATTLIST decimal
          value CDATA #IMPLIED
          union CDATA #IMPLIED>
    <!ELEMENT float (#PCDATA)>
    <!ATTLIST float
          value CDATA #IMPLIED
          union CDATA #IMPLIED>
    <!ELEMENT dateTime (#PCDATA)>
    <!ATTLIST dateTime
          value CDATA #IMPLIED
          union CDATA #IMPLIED>
    <!ELEMENT time (#PCDATA)>
    <!ATTLIST time
          value CDATA #IMPLIED
          union CDATA #IMPLIED>

  ]>*/
  var docType = new dom.DocumentType(
    doc,
    'xml',
    entities,
    new dom.NotationNodeMap(doc),
    new dom.NamedNodeMap(doc)
  );

  doc.doctype = docType;

  var a = function(el, obj) {
    var keys = Object.keys(obj);
    keys.forEach(function(v) {
      var attr = doc.createAttribute(v)
      obj[v].split('\n').forEach(function(value) {
        ret.appendChild(doc.createTextNode(value));
      });

      el.setAttributeNode(attr);
    });
    return el;
  };


  var e = function(name, attrs, text, ns) {
    if (ns) {
      ret = doc.createElement(name)
    } else {
      ret = doc.createElementNS(ns, name);
    }

    if (attrs) {
      a(ret, attrs);
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
  };


  doc.implementation =  new dom.DOMImplementation(doc, {
    "XML" : ["1.0", "1.1"],
    "core": ["1.0", "2.0", "3.0"]
  });

  //<svg xmlns="http://www.w3.org/2000/svg"
  //  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  //  xsi:schemaLocation="http://www.w3.org/2000/svg datatype_normalization.svg.xsd">
  var svg = doc.createElementNS("http://www.w3.org/2000/svg","svg");

/*
  svg.setAttributeNS('http://www.w3.org/2000/svg',
                     'xmlns:xsi',
                     'http://www.w3.org/2001/XMLSchema-instance');

  svg.setAttributeNS('http://www.w3.org/2001/XMLSchema-instance',
                     'xsi:schemaLocation',
                     'http://www.w3.org/2000/svg datatype_normalization.svg.xsd');
*/
  // <rect x="0" y="0" width="100" height="100"/>
  svg.appendChild(e('rect'), {
    x : '0',
    y : '0',
    width : '100',
    height : '100'
  });


  // <script type="text/ecmascript">&svgtest;&svgunit;</script>
  // <data xmlns='http://www.w3.org/2001/DOM-Test-Suite/Level-3/datatype_normalization'>

  // <double value="
  //  +0003.141592600E+0000 " union="  +0003.141592600E+0000
  //  ">   -31415926.00E-7
  // 2.718</double>
  add(e('double', {
    value : '\n +0003.141592600E+0000 ',
    union : '  +0003.141592600E+0000 '
  },'   -31415926.00E-7\n2.718'), svg);


  // <double value=" NaN" union="NaN "> INF    -INF </double>
  add(e('double', {
    value : ' NaN',
    union : 'NaN '
  }, ' INF    -INF '), svg);

  // <double value="
  // 1 " union="1
  // "> -0</double>
  add(e('double', {
    value : '\n1',
    union : '1\n'
  }, ' -0'), svg);

  // <boolean value="
  //  true" union="false
  //  "> false true       false </boolean>
  add(e('boolean', {
    value : '\ntrue',
    union : 'false\n'
  }, ' false true       false '), svg);

  // <boolean value="
  //  1" union=" 0
  //  ">0 1     0 </boolean>
  add(e('boolean', {
    value : '\n1',
    union : '0\n'
  }, ' 0 1       0 '), svg);

  // <decimal value="  +0003.141592600  " union="  +0003.141592600  ">  +10 .1  </decimal>
  add(e('decimal', {
    value : '  +0003.141592600  ',
    union : '  +0003.141592600  '
  }, '  +10 .1  '), svg);

  // <decimal value=" 01 " union=" 01 "> -.001 </decimal>
  add(e('decimal', {
    value : ' 01 ',
    union : ' 01 '
  }, ' -.001 '), svg);

  // <float value=" +0003.141592600E+0000 " union=" +0003.141592600E+0000 "> -31415926.00E-7
  // 2.718</float>
  add(e('float', {
    value : ' +0003.141592600E+0000 ',
    union : ' +0003.141592600E+0000 '
  }, ' -31415926.00E-7\n2.718'), svg);

  // <float value=" NaN " union=" NaN "> INF    -INF </float>
  add(e('float', {
    value : ' NaN ',
    union : ' NaN '
  }, ' INF    -INF '), svg);

  // <float value="
  // 1 " union="1
  // ">-0</float>
  add(e('float', {
    value : '\n1',
    union : '1\n'
  }, '-0'), svg);

  // <dateTime value="
  // 2004-01-21T15:30:00-05:00" union="2004-01-21T20:30:00-05:00
  // ">2004-01-21T15:30:00
  // 2004-01-21T15:30:00Z</dateTime>
  add(e('dateTime', {
    value : '\n2004-01-21T15:30:00-05:00',
    union : '2004-01-21T15:30:00-05:00\n'
  }, '2004-01-21T15:30:00\n2004-01-21T15:30:00Z'), svg);


  // <dateTime value="
  // 2004-01-21T15:30:00.0000-05:00" union="2004-01-21T15:30:00.0000-05:00
  // ">  2004-01-21T15:30:00.0000  </dateTime>
  add(e('dateTime', {
    value : '\n2004-01-21T15:30:00.0000-05:00',
    union : '2004-01-21T15:30:00.0000-05:00\n'
  }, '  2004-01-21T15:30:00.0000  '), svg);

  // <dateTime value="2004-01-21T15:30:00.0001-05:00" union="2004-01-21T15:30:00.0001-05:00">2004-01-21T15:30:00.0001</dateTime>
  add(e('dateTime', {
    value : '2004-01-21T15:30:00.0001-05:00',
    union : '2004-01-21T15:30:00.0001-05:00'
  }, '2004-01-21T15:30:00.0001'), svg);

  // <time value="
  // 15:30:00-05:00" union="15:30:00-05:00
  // "> 15:30:00 </time>
  add(e('time', {
    value : '\n15:30:00-05:00',
    union : '15:30:00-05:00\n'
  }, ' 15:30:00 '), svg);

  // <time value="
  //  15:30:00.0000-05:00" union=" 15:30:00.0000-05:00
  //  ">15:30:00.0000</time>
  add(e('time', {
    value : '\n 15:30:00.0000-05:00',
    union : ' 15:30:00.0000-05:00\n '
  }, '15:30:00.0000'), svg);

  // <time value="
  //  15:30:00.0001-05:00" union="15:30:00.0001-05:00
  //  ">15:30:00.0001</time>
  add(e('time', {
    value : '\n 15:30:00.0001-05:00',
    union : '15:30:00.0001-05:00\n '
  }, '15:30:00.0001'), svg);

  doc.appendChild(svg);
  doc.normalize();
  return doc;

}
