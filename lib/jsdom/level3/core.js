var core          = require("../level2/core").dom.level2.core,
    HtmlToDom     = require('../browser/htmltodom').HtmlToDom,
    domToHtml     = require('../browser/domtohtml').domToHtml,
    htmlencoding  = require('../browser/htmlencoding'),
    HTMLEncode    = htmlencoding.HTMLEncode,
    HTMLDecode    = htmlencoding.HTMLDecode;

var util = require('../util');

(function(_validate) {
  util.validate = function(element, type, value, mode) {
    if (!mode                  &&
        element                &&
        element._ownerDocument &&
        element._ownerDocument._xmlVersion)
    {
      var version = element._ownerDocument._xmlVersion;
      return _validate(element, type, value, 'xml' + version);
    } else {
      return _validate(element, type, value, mode);
    }
  }
})(util.validate);

var xsi = 'http://www.w3.org/2001/XMLSchema-instance';

// ExceptionCode
core.VALIDATION_ERR                 = 16;
core.TYPE_MISMATCH_ERR              = 17;

/*
  // Introduced in DOM Level 3:
core.NameList = function() {
    DOMString          getName(in unsigned long index);
    DOMString          getNamespaceURI(in unsigned long index);
    readonly attribute unsigned long   length;
    boolean            contains(in DOMString str);
    boolean            containsNS(in DOMString namespaceURI,
                                  in DOMString name);



/*
  // Introduced in DOM Level 3:
core.NameList = function() {
    DOMString          getName(in unsigned long index);
    DOMString          getNamespaceURI(in unsigned long index);
    readonly attribute unsigned long   length;
    boolean            contains(in DOMString str);
    boolean            containsNS(in DOMString namespaceURI,
                                  in DOMString name);
  };

  // Introduced in DOM Level 3:
core.DOMImplementationList = function() {
    DOMImplementation  item(in unsigned long index);
    readonly attribute unsigned long   length;
  };

  // Introduced in DOM Level 3:
core.DOMImplementationSource = function() {
    DOMImplementation  getDOMImplementation(in DOMString features);
    DOMImplementationList getDOMImplementationList(in DOMString features);
  };
*/


core.DOMImplementation.prototype.getFeature = function(feature, version)  {

};

/*
core.Node = function() {
    // Modified in DOM Level 3:
    Node               insertBefore(in Node newChild,
                                    in Node refChild)
                                        raises(DOMException);
    // Modified in DOM Level 3:
    Node               replaceChild(in Node newChild,
                                    in Node oldChild)
                                        raises(DOMException);
    // Modified in DOM Level 3:
    Node               removeChild(in Node oldChild)
                                        raises(DOMException);
    // Modified in DOM Level 3:
    Node               appendChild(in Node newChild)
                                        raises(DOMException);
    boolean            hasChildNodes();
    Node               cloneNode(in boolean deep);
    // Modified in DOM Level 3:
    void               normalize();
    // Introduced in DOM Level 3:
    readonly attribute DOMString       baseURI;
*/

core.Node.prototype.__defineGetter__('baseURI', function() {
  return this._baseURI || '';
});

// Compare Document Position
var DOCUMENT_POSITION_DISCONNECTED = core.Node.prototype.DOCUMENT_POSITION_DISCONNECTED = 0x01;
var DOCUMENT_POSITION_PRECEDING    = core.Node.prototype.DOCUMENT_POSITION_PRECEDING    = 0x02;
var DOCUMENT_POSITION_FOLLOWING    = core.Node.prototype.DOCUMENT_POSITION_FOLLOWING    = 0x04;
var DOCUMENT_POSITION_CONTAINS     = core.Node.prototype.DOCUMENT_POSITION_CONTAINS     = 0x08;
var DOCUMENT_POSITION_CONTAINED_BY = core.Node.prototype.DOCUMENT_POSITION_CONTAINED_BY = 0x10;
var DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = core.Node.prototype.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 0x20;
var DOCUMENT_TYPE_NODE = core.Node.prototype.DOCUMENT_TYPE_NODE;

core.Node.prototype.compareDocumentPosition = function compareDocumentPosition( otherNode ) {
  if( !(otherNode instanceof core.Node) ) {
    throw Error("Comparing position against non-Node values is not allowed")
  }
  var thisOwner, otherOwner;

  if( this.nodeType === this.DOCUMENT_NODE)
    thisOwner = this
  else
    thisOwner = this.ownerDocument

  if( otherNode.nodeType === this.DOCUMENT_NODE)
    otherOwner = otherNode
  else
    otherOwner = otherNode.ownerDocument

  if( this === otherNode ) return 0
  if( this === otherNode.ownerDocument ) return DOCUMENT_POSITION_FOLLOWING + DOCUMENT_POSITION_CONTAINED_BY
  if( this.ownerDocument === otherNode ) return DOCUMENT_POSITION_PRECEDING + DOCUMENT_POSITION_CONTAINS
  if( thisOwner !== otherOwner ) return DOCUMENT_POSITION_DISCONNECTED

  // Text nodes for attributes does not have a _parentNode. So we need to find them as attribute child.
  if( this.nodeType === this.ATTRIBUTE_NODE && this._childNodes && this._childNodes.indexOf(otherNode) !== -1)
    return DOCUMENT_POSITION_FOLLOWING + DOCUMENT_POSITION_CONTAINED_BY

  if( otherNode.nodeType === this.ATTRIBUTE_NODE && otherNode._childNodes && otherNode._childNodes.indexOf(this) !== -1)
    return DOCUMENT_POSITION_PRECEDING + DOCUMENT_POSITION_CONTAINS

  var point = this
  var parents = [ ]
  var previous = null
  while( point ) {
    if( point == otherNode ) return DOCUMENT_POSITION_PRECEDING + DOCUMENT_POSITION_CONTAINS
    parents.push( point )
    point = point._parentNode
  }
  point = otherNode
  previous = null
  while( point ) {
    if( point == this ) return DOCUMENT_POSITION_FOLLOWING + DOCUMENT_POSITION_CONTAINED_BY
    var location_index = parents.indexOf( point )
    if( location_index !== -1) {
     var smallest_common_ancestor = parents[ location_index ]
     var this_index = smallest_common_ancestor._childNodes.indexOf( parents[location_index - 1] )
     var other_index = smallest_common_ancestor._childNodes.indexOf( previous )
     if( this_index > other_index ) {
           return DOCUMENT_POSITION_PRECEDING
     }
     else {
       return DOCUMENT_POSITION_FOLLOWING
     }
    }
    previous = point
    point = point._parentNode
  }
  return DOCUMENT_POSITION_DISCONNECTED
};

core.Node.prototype.isSameNode = function(other) {
  return (other === this);
};

core.Node.prototype.__defineGetter__('textContent', function() {
  if (this.nodeType === this.TEXT_NODE || this.nodeType === this.COMMENT_NODE || this.nodeType === this.ATTRIBUTE_NODE || this.nodeType === this.CDATA_SECTION_NODE) {
    return this.nodeValue;
  } else if (this.nodeType === this.ELEMENT_NODE || this.nodeType === this.DOCUMENT_FRAGMENT_NODE) {
    var out = '';
    for (var i = 0 ; i < this.childNodes.length ; i += 1) {
      out += this.childNodes[i].textContent || '';
    }
    return out;
  } else {
    return null;
  }
});

core.Node.prototype.__defineSetter__('textContent', function(txt) {
  if (txt) {
    var i        = this.childNodes.length-1,
        children = this.childNodes,
        textNode = this._ownerDocument.createTextNode(txt);

    for (i; i>=0; i--) {
      this.removeChild(this.childNodes.item(i));
    }

    this.appendChild(textNode);
  }
  return txt;
});

core.Node.prototype.lookupPrefix = function(namespaceURI) {
  return '';
};


core.Node.prototype.isDefaultNamespace = function(namespaceURI) {
  return true;
};

core.Node.prototype.lookupNamespaceURI = function(prefix) {
  return '';
};

core.Node.prototype.isEqualNode = function(other) {
  var self = this;
  var diffValues = function() {
    for (var i=0;i<arguments.length;i++) {
      var k = arguments[i];
      if (self[k] != other[k]) return(true);
    }
    return(false);
  };
  var diffNamedNodeMaps = function(snnm, onnm) {
    if ((snnm == null) && (onnm == null)) return(false);
    if ((snnm == null) || (onnm == null)) return(true);
    if (snnm.length != onnm.length) return(true);
    var js = [];
    for (var j=0;j<onnm.length;j++) { js[j] = j }
    for (var i=0;i<snnm.length;i++) {
      var found=false;
      for (var j=0;j<js.length;j++) {
        if (snnm.item(i).isEqualNode(onnm.item(js[j]))) {
          found = true;
          // in order to be 100% accurate, we remove index values from consideration once they've matched
          js.splice(j,1);
          break;
        }
      }
      if (!found) return(true);
    }
    return(false);
  };
  var diffNodeLists = function(snl, onl) {
    if ((snl == null) && (onl == null)) return(false);
    if ((snl == null) || (onl == null)) return(true);
    if (snl.length != onl.length) return(true);
    for (var i=0;i<snl.length;i++) {
      if (!snl.item(i).isEqualNode(onl.item(i))) return(true);
    }
    return(false);
  };
  if (!other) return(false);
  if (this.isSameNode(other)) return(true);
  if (this.nodeType != other.nodeType) return(false);
  if (diffValues('nodeName', 'localName', 'namespaceURI', 'prefix', 'nodeValue')) return(false);
  if (diffNamedNodeMaps(this.attributes, other.attributes)) return(false);
  if (diffNodeLists(this.childNodes, other.childNodes)) return(false);
  if (this.nodeType == DOCUMENT_TYPE_NODE) {
    if (diffValues('publicId', 'systemId', 'internalSubset')) return(false);
    if (diffNamedNodeMaps(this.entities, other.entities)) return(false);
    if (diffNamedNodeMaps(this.notations, other.notations)) return(false);
  }
  return (true);
};
/*
    // Introduced in DOM Level 3:
    DOMObject          getFeature(in DOMString feature,
                                  in DOMString version);
*/
// Introduced in DOM Level 3:
core.Node.prototype.setUserData = function(key, data, handler) {
  var r = this[key] || null;
  this[key] = data;
  return(r);
};

// Introduced in DOM Level 3:
core.Node.prototype.getUserData = function(key) {
  var r = this[key] || null;
  return(r);
};
/*
core.NodeList = function() {
    Node               item(in unsigned long index);
    readonly attribute unsigned long   length;
  };

core.NamedNodeMap = function() {
    Node               getNamedItem(in DOMString name);
    Node               setNamedItem(in Node arg)
                                        raises(DOMException);
    Node               removeNamedItem(in DOMString name)
                                        raises(DOMException);
    Node               item(in unsigned long index);
    readonly attribute unsigned long   length;
    // Introduced in DOM Level 2:
    Node               getNamedItemNS(in DOMString namespaceURI,
                                      in DOMString localName)
                                        raises(DOMException);
    // Introduced in DOM Level 2:
    Node               setNamedItemNS(in Node arg)
                                        raises(DOMException);
    // Introduced in DOM Level 2:
    Node               removeNamedItemNS(in DOMString namespaceURI,
                                         in DOMString localName)
                                        raises(DOMException);
  };

core.CharacterData : Node = function() {
             attribute DOMString       data;
                                        // raises(DOMException) on setting
                                        // raises(DOMException) on retrieval

    readonly attribute unsigned long   length;
    DOMString          substringData(in unsigned long offset,
                                     in unsigned long count)
                                        raises(DOMException);
    void               appendData(in DOMString arg)
                                        raises(DOMException);
    void               insertData(in unsigned long offset,
                                  in DOMString arg)
                                        raises(DOMException);
    void               deleteData(in unsigned long offset,
                                  in unsigned long count)
                                        raises(DOMException);
    void               replaceData(in unsigned long offset,
                                   in unsigned long count,
                                   in DOMString arg)
                                        raises(DOMException);
  };

core.Attr : Node = function() {
    readonly attribute DOMString       name;
    readonly attribute boolean         specified;
             attribute DOMString       value;
                                        // raises(DOMException) on setting

    // Introduced in DOM Level 2:
    readonly attribute Element         ownerElement;
*/

/* TypeInfo */
core.Attr.prototype.__defineGetter__('schemaTypeInfo', function() {
  if (!this._schemaTypeInfo) {
    this._schemaTypeInfo = new core.TypeInfo(this);
  }

  return this._schemaTypeInfo;
});

core.Attr.prototype.__defineGetter__('isId', function() {
  return !!(this.name.toLowerCase() === 'id' || this._isId);
});

/*
  };

core.Element : Node = function() {
    readonly attribute DOMString       tagName;
    DOMString          getAttribute(in DOMString name);
    void               setAttribute(in DOMString name,
                                    in DOMString value)
                                        raises(DOMException);
    void               removeAttribute(in DOMString name)
                                        raises(DOMException);
    Attr               getAttributeNode(in DOMString name);
    Attr               setAttributeNode(in Attr newAttr)
                                        raises(DOMException);
    Attr               removeAttributeNode(in Attr oldAttr)
                                        raises(DOMException);
    NodeList           getElementsByTagName(in DOMString name);
    // Introduced in DOM Level 2:
    DOMString          getAttributeNS(in DOMString namespaceURI,
                                      in DOMString localName)
                                        raises(DOMException);
    // Introduced in DOM Level 2:
    void               setAttributeNS(in DOMString namespaceURI,
                                      in DOMString qualifiedName,
                                      in DOMString value)
                                        raises(DOMException);
    // Introduced in DOM Level 2:
    void               removeAttributeNS(in DOMString namespaceURI,
                                         in DOMString localName)
                                        raises(DOMException);
    // Introduced in DOM Level 2:
    Attr               getAttributeNodeNS(in DOMString namespaceURI,
                                          in DOMString localName)
                                        raises(DOMException);
    // Introduced in DOM Level 2:
    Attr               setAttributeNodeNS(in Attr newAttr)
                                        raises(DOMException);
    // Introduced in DOM Level 2:
    NodeList           getElementsByTagNameNS(in DOMString namespaceURI,
                                              in DOMString localName)
                                        raises(DOMException);
    // Introduced in DOM Level 2:
    boolean            hasAttribute(in DOMString name);
    // Introduced in DOM Level 2:
    boolean            hasAttributeNS(in DOMString namespaceURI,
                                      in DOMString localName)
                                        raises(DOMException);
  };
*/


/* TypeInfo */
core.Element.prototype.__defineGetter__('schemaTypeInfo', function() {
  if (!this._schemaTypeInfo) {
    this._schemaTypeInfo = new core.TypeInfo(this);
  }

  return this._schemaTypeInfo;
});

// @raises DOMException
core.Element.prototype.setIdAttribute = function(name, isId) {
  var attr = this.getAttributeNode(name);
  attr._isId = isId || false;
};

// @raises DOMException
core.Element.prototype.setIdAttributeNS = function(namespaceURI, localName, isId) {
  var attr = this.getAttributeNodeNS(namespaceURI, localName);
  attr._isId = isId || false;
};

core.Text.prototype.__defineGetter__('isElementContentWhitespace', function() {
  return !!/^\W*$/.test(this.value);
});

core.Text.prototype.__defineGetter__('wholeText', function() {
  return this.value;
});

// @raises DOMException
// @returns Text
core.Text.prototype.replaceWholeText = function(content) {
  this._value = content;
  return this.wholeText;
};


core.TypeInfo = function(element) {
  this._element = element;
  var name = element.name || element.nodeName;

  name = name.toLowerCase();

  var mapping = {
    'id'    : 'ID',
    'class' : 'classType'
  }

  this._typeName = (mapping[name]) ? mapping[name] : 'CDATA';

  var namespace = 'http://www.w3.org/TR/REC-xml';

  /*
    For each attribute information item in the element information item's
    [attributes] excepting those whose [namespace name] is identical to
    http://www.w3.org/2001/XMLSchema-instance and whose [local name] is one
    of type, nil, schemaLocation or noNamespaceSchemaLocation, the
    appropriate case among the following is true:

    2.1 If there is among the {attribute uses} an attribute use with an
    {attribute declaration} whose {name} matches the attribute information
    item's [local name] and whose {target namespace} is identical to the
    attribute information item's [namespace name] (where an ·absent·
    {target namespace} is taken to be identical to a [namespace name]
    with no value), then the attribute information is ·valid· with respect
    to that attribute use as per Attribute Locally Valid (Use) (§3.5.4).
    In this case the {attribute declaration} of that attribute use is the
    context-determined declaration· for the attribute information item with
    respect to Schema-Validity Assessment (Attribute) (§3.2.4) and
    Assessment Outcome (Attribute) (§3.2.5).
  */

  if (element._ownerDocument && element._ownerDocument._documentElement) {

    var locateNamespace = element.getAttributeNS(xsi, 'xsi:noNamespaceSchemaLocation');
    if (locateNamespace.toLowerCase() === 'no') {

    }


    namespace = element._ownerDocument.documentElement.namespaceURI || namespace;
  }

  this._typeNamespace = namespace;
};

core.TypeInfo.prototype = {
  get typeName() { return this._typeName; },
  get typeNamespace() { return this._typeNamespace; },

  // DerivationMethods
  DERIVATION_RESTRICTION          : 0x00000001,
  DERIVATION_EXTENSION            : 0x00000002,
  DERIVATION_UNION                : 0x00000004,
  DERIVATION_LIST                 : 0x00000008,

  isDerivedFrom : function(typeNamespaceArg, typeNameArg, derivationMethod) {
    return false;
  }
};

// Introduced in DOM Level 3:
core.UserDataHandler = function() {};
core.UserDataHandler.prototype.NODE_CLONED   = 1;
core.UserDataHandler.prototype.NODE_IMPORTED = 2;
core.UserDataHandler.prototype.NODE_DELETED  = 3;
core.UserDataHandler.prototype.NODE_RENAMED  = 4;
core.UserDataHandler.prototype.NODE_ADOPTED  = 5;
core.UserDataHandler.prototype.handle = function(operation, key, data, src, dst) {};

// Introduced in DOM Level 3:
core.DOMError = function(severity, message, type, relatedException, relatedData, location) {
  this._severity         = severity;
  this._message          = message;
  this._type             = type;
  this._relatedException = relatedException;
  this._relatedData      = relatedData;
  this._location         = location;
};
core.DOMError.prototype = {};
core.DOMError.prototype.SEVERITY_WARNING     = 1;
core.DOMError.prototype.SEVERITY_ERROR       = 2;
core.DOMError.prototype.SEVERITY_FATAL_ERROR = 3;
core.DOMError.prototype.__defineGetter__('severity', function() {
  return this._severity;
});
core.DOMError.prototype.__defineGetter__('message', function() {
  return this._message;
});
core.DOMError.prototype.__defineGetter__('type', function() {
  return this._type;
});
core.DOMError.prototype.__defineGetter__('relatedException', function() {
  return this._relatedException;
});
core.DOMError.prototype.__defineGetter__('relatedData', function() {
  return this._relatedData;
});
core.DOMError.prototype.__defineGetter__('location', function() {
  return this._location;
});

/*
  // Introduced in DOM Level 3:
core.DOMErrorHandler = function() {
    boolean            handleError(in DOMError error);
  };

  // Introduced in DOM Level 3:
core.DOMLocator = function() {
    readonly attribute long            lineNumber;
    readonly attribute long            columnNumber;
    readonly attribute long            byteOffset;
    readonly attribute long            utf16Offset;
    readonly attribute Node            relatedNode;
    readonly attribute DOMString       uri;
  };
*/

// Introduced in DOM Level 3:
core.DOMConfiguration = function(){
  var possibleParameterNames = {
    'canonical-form': [false, true], // extra rules for true
    'cdata-sections': [true, false],
    'check-character-normalization': [false, true],
    'comments': [true, false],
    'datatype-normalization': [false, true],
    'element-content-whitespace': [true, false],
    'entities': [true, false],
    // 'error-handler': [],
    'infoset': [undefined, true, false], // extra rules for true
    'namespaces': [true, false],
    'namespace-declarations': [true, false], // only checked if namespaces is true
    'normalize-characters': [false, true],
    // 'schema-location': [],
    // 'schema-type': [],
    'split-cdata-sections': [true, false],
    'validate': [false, true],
    'validate-if-schema': [false, true],
    'well-formed': [true, false]
  }
};

core.DOMConfiguration.prototype = {
  setParameter: function(name, value) {},
  getParameter: function(name) {},
  canSetParameter: function(name, value) {},
  parameterNames: function() {}
};

//core.Document.prototype._domConfig = new core.DOMConfiguration();
core.Document.prototype.__defineGetter__('domConfig', function() {
  return this._domConfig || new core.DOMConfiguration();;
});

// Introduced in DOM Level 3:
core.DOMStringList = function() {};

core.DOMStringList.prototype = {
  item: function() {},
  length: function() {},
  contains: function() {}
};


/*
core.CDATASection : Text = function() {

};

core.DocumentType : Node = function() {
    readonly attribute DOMString       name;
    readonly attribute NamedNodeMap    entities;
    readonly attribute NamedNodeMap    notations;
    // Introduced in DOM Level 2:
    readonly attribute DOMString       publicId;
    // Introduced in DOM Level 2:
    readonly attribute DOMString       systemId;
    // Introduced in DOM Level 2:
    readonly attribute DOMString       internalSubset;
  };

core.Notation : Node = function() {
    readonly attribute DOMString       publicId;
    readonly attribute DOMString       systemId;
  };
*/

core.Entity.prototype._inputEncoding = null;
core.Entity.prototype.__defineGetter__('inputEncoding', function() {
  return this._inputEncoding;
});

core.Entity.prototype._xmlEncoding = null;
core.Entity.prototype.__defineGetter__('xmlEncoding', function() {
  return this._xmlEncoding;
});

core.Entity.prototype._xmlVersion = '1.0';
core.Entity.prototype.__defineGetter__('xmlVersion', function() {
  return this._xmlVersion;
});
/*
core.ProcessingInstruction : Node = function() {
    readonly attribute DOMString       target;
             attribute DOMString       data;
                                        // raises(DOMException) on setting

};

core.DocumentFragment : Node = function() {

};

core.Document : Node = function() {
    // Modified in DOM Level 3:
    readonly attribute DocumentType    doctype;
    readonly attribute DOMImplementation implementation;
    readonly attribute Element         documentElement;
    Element            createElement(in DOMString tagName)
                                        raises(DOMException);
    DocumentFragment   createDocumentFragment();
    Text               createTextNode(in DOMString data);
    Comment            createComment(in DOMString data);
    CDATASection       createCDATASection(in DOMString data)
                                        raises(DOMException);
    ProcessingInstruction createProcessingInstruction(in DOMString target,
                                                      in DOMString data)
                                        raises(DOMException);
    Attr               createAttribute(in DOMString name)
                                        raises(DOMException);
    EntityReference    createEntityReference(in DOMString name)
                                        raises(DOMException);
    NodeList           getElementsByTagName(in DOMString tagname);
    // Introduced in DOM Level 2:
    Node               importNode(in Node importedNode,
                                  in boolean deep)
                                        raises(DOMException);
    // Introduced in DOM Level 2:
    Element            createElementNS(in DOMString namespaceURI,
                                       in DOMString qualifiedName)
                                        raises(DOMException);
    // Introduced in DOM Level 2:
    Attr               createAttributeNS(in DOMString namespaceURI,
                                         in DOMString qualifiedName)
                                        raises(DOMException);
    // Introduced in DOM Level 2:
    NodeList           getElementsByTagNameNS(in DOMString namespaceURI,
                                              in DOMString localName);
    // Introduced in DOM Level 2:
    Element            getElementById(in DOMString elementId);
*/

// Introduced in DOM Level 3:
core.Document.prototype._inputEncoding = null;
core.Document.prototype.__defineGetter__('inputEncoding', function() {
  return this._inputEncoding;
});
core.Document.prototype._inputEncoding = null;
core.Document.prototype.__defineGetter__('inputEncoding', function() {
  return this._inputEncoding;
});
core.Document.prototype._inputEncoding = null;
core.Document.prototype.__defineGetter__('inputEncoding', function() {
  return this._inputEncoding;
});

core.Document.xmlVersion = '1.0';
core.Document.prototype.__defineGetter__('xmlVersion', function() {
  return this._xmlVersion;
});

core.Document.prototype.__defineSetter__('xmlVersion', function(version) {
  // TODO: ensure the document has the 'XMLVersion' feature '1.1'
  this._xmlVersion = version;
});


core.Document.prototype.__defineGetter__('domConfig', function() {
  if (!this._domConfig) {
    this._domConfig = new core.DOMConfiguration();
  }
  return this._domConfig;
});

core.Document.prototype.normalizeDocument = function() {
  this.normalize();
};

/*
    // Introduced in DOM Level 3:
    readonly attribute DOMString       xmlEncoding;
    // Introduced in DOM Level 3:
             attribute boolean         xmlStandalone;
                                        // raises(DOMException) on setting

    // Introduced in DOM Level 3:
             attribute DOMString       xmlVersion;
                                        // raises(DOMException) on setting

    // Introduced in DOM Level 3:
             attribute boolean         strictErrorChecking;
    // Introduced in DOM Level 3:
             attribute DOMString       documentURI;
    // Introduced in DOM Level 3:
    Node               adoptNode(in Node source)
                                        raises(DOMException);
    // Introduced in DOM Level 3:
    readonly attribute DOMConfiguration domConfig;
    // Introduced in DOM Level 3:
    void               normalizeDocument();
    // Introduced in DOM Level 3:
    Node               renameNode(in Node n,
                                  in DOMString namespaceURI,
                                  in DOMString qualifiedName)
                                        raises(DOMException);
  };
};

#endif // _DOM_IDL_
*/

exports.dom = {
  level3 : {
    core: core
  }
};
