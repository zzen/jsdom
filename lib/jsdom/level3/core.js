var core          = require("../level2/core").dom.level2.core,
    HtmlToDom     = require('../browser/htmltodom').HtmlToDom,
    domToHtml     = require('../browser/domtohtml').domToHtml,
    htmlencoding  = require('../browser/htmlencoding'),
    HTMLEncode    = htmlencoding.HTMLEncode,
    HTMLDecode    = htmlencoding.HTMLDecode;

var util = require('../util');

(function (_validate) {
  util.validate = function (element, type, value, mode) {
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
  };
})(util.validate);

var xsi = 'http://www.w3.org/2001/XMLSchema-instance';

// ExceptionCode
core.VALIDATION_ERR                 = 16;
core.TYPE_MISMATCH_ERR              = 17;

/*
  // Introduced in DOM Level 3:
core.NameList = function () {
    DOMString          getName(in unsigned long index);
    DOMString          getNamespaceURI(in unsigned long index);
    readonly attribute unsigned long   length;
    boolean            contains(in DOMString str);
    boolean            containsNS(in DOMString namespaceURI,
                                  in DOMString name);


*/
/*
  // Introduced in DOM Level 3:
core.NameList = function () {
    DOMString          getName(in unsigned long index);
    DOMString          getNamespaceURI(in unsigned long index);
    readonly attribute unsigned long   length;
    boolean            contains(in DOMString str);
    boolean            containsNS(in DOMString namespaceURI,
                                  in DOMString name);
  };

  // Introduced in DOM Level 3:
core.DOMImplementationList = function () {
    DOMImplementation  item(in unsigned long index);
    readonly attribute unsigned long   length;
  };

  // Introduced in DOM Level 3:
core.DOMImplementationSource = function () {
    DOMImplementation  getDOMImplementation(in DOMString features);
    DOMImplementationList getDOMImplementationList(in DOMString features);
  };
*/


core.DOMImplementation.prototype.getFeature = function (feature, version, targetNode)  {
  feature = feature.replace(/[^a-z]/ig,'');

  if (!feature || !this.hasFeature(feature)) {
    return null;
  }
  return (targetNode) ? targetNode.cloneNode(false) : new core.Document();
};

/*
core.Node = function () {
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
*/

core.Node.prototype._baseURI = null;
core.Node.prototype.__defineGetter__('baseURI', function () {
  if (this.nodeType === this.ATTRIBUTE_NODE ||
      this.nodeType === this.TEXT_NODE      ||
      this.nodeType === this.COMMENT_NODE)
  {
    return null;
  }

  var ret = this._baseURI || null;

  if (!ret) {
    if (this.nodeType === this.ELEMENT_NODE) {
      ret = this.getAttributeNS('http://www.w3.org/XML/1998/namespace', 'base');
    } else if (this.nodeType === this.ENITITY_REFERENCE_NODE) {
      ret = this._entity.baseURI;
    }

    if (!ret && this.nodeType !== this.DOCUMENT_NODE && this.nodeType !== this.DOCUMENT_TYPE_NODE) {
      if (this.parentNode) {
        ret = this.parentNode.baseURI;
      } else {
        ret = this.ownerDocument.baseURI;
      }
    }
  }
  return ret;
});

// Compare Document PositiparentNode.
var DOCUMENT_POSITION_DISCONNECTED = core.Node.prototype.DOCUMENT_POSITION_DISCONNECTED = 0x01;
var DOCUMENT_POSITION_PRECEDING    = core.Node.prototype.DOCUMENT_POSITION_PRECEDING    = 0x02;
var DOCUMENT_POSITION_FOLLOWING    = core.Node.prototype.DOCUMENT_POSITION_FOLLOWING    = 0x04;
var DOCUMENT_POSITION_CONTAINS     = core.Node.prototype.DOCUMENT_POSITION_CONTAINS     = 0x08;
var DOCUMENT_POSITION_CONTAINED_BY = core.Node.prototype.DOCUMENT_POSITION_CONTAINED_BY = 0x10;
var DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = core.Node.prototype.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 0x20;
var DOCUMENT_TYPE_NODE = core.Node.prototype.DOCUMENT_TYPE_NODE;

core.Node.prototype.compareDocumentPosition = function compareDocumentPosition(otherNode) {
  if (!otherNode instanceof core.Node) {
    throw Error("Comparing position against non-Node values is not allowed");
  }
  var thisOwner, otherOwner;

  if (this.nodeType === this.DOCUMENT_NODE) {
    thisOwner = this;
  } else {
    thisOwner = this.ownerDocument;
  }

  if (otherNode.nodeType === this.DOCUMENT_NODE) {
    otherOwner = otherNode;
  } else {
    otherOwner = otherNode.ownerDocument;
  }

  if (this === otherNode) {
    return 0;
  }

  if (this === otherNode.ownerDocument) {
    return DOCUMENT_POSITION_FOLLOWING + DOCUMENT_POSITION_CONTAINED_BY;
  }

  if (this.ownerDocument === otherNode) {
    return DOCUMENT_POSITION_PRECEDING + DOCUMENT_POSITION_CONTAINS;
  }

  if (thisOwner !== otherOwner) {
    return DOCUMENT_POSITION_DISCONNECTED;
  }

  // Text nodes for attributes does not have a _parentNode. So we need to find them as attribute child.
  if (this.nodeType === this.ATTRIBUTE_NODE &&
      this._childNodes                      &&
      this._childNodes.indexOf(otherNode) !== -1)
  {
    return DOCUMENT_POSITION_FOLLOWING + DOCUMENT_POSITION_CONTAINED_BY;
  }

  if (otherNode.nodeType === this.ATTRIBUTE_NODE &&
     otherNode._childNodes                      &&
     otherNode._childNodes.indexOf(this) !== -1)
  {
    return DOCUMENT_POSITION_PRECEDING + DOCUMENT_POSITION_CONTAINS;
  }

  var point = this;
  var parents = [ ];
  var previous = null;
  while (point) {
    if (point == otherNode) {
      return DOCUMENT_POSITION_PRECEDING + DOCUMENT_POSITION_CONTAINS;
    }
    parents.push(point);
    point = point._parentNode;
  }
  point = otherNode;
  previous = null;
  while (point) {
    if (point == this) {
      return DOCUMENT_POSITION_FOLLOWING + DOCUMENT_POSITION_CONTAINED_BY;
    }

    var location_index = parents.indexOf(point);
    if (location_index !== -1) {
      var smallest_common_ancestor = parents[location_index];
      var this_index = smallest_common_ancestor._childNodes.indexOf(parents[location_index - 1]);
      var other_index = smallest_common_ancestor._childNodes.indexOf(previous);
      if (this_index > other_index) {
        return DOCUMENT_POSITION_PRECEDING;
      } else {
        return DOCUMENT_POSITION_FOLLOWING;
      }
    }
    previous = point;
    point = point._parentNode;
  }
  return DOCUMENT_POSITION_DISCONNECTED;
};

core.Node.prototype.isSameNode = function (other) {
  return (other === this);
};

core.Node.prototype.__defineGetter__('textContent', function () {
  if (this.nodeType === this.TEXT_NODE || this.nodeType === this.COMMENT_NODE || this.nodeType === this.ATTRIBUTE_NODE || this.nodeType === this.CDATA_SECTION_NODE) {
    return this.nodeValue;
  } else if (this.nodeType === this.ELEMENT_NODE || this.nodeType === this.DOCUMENT_FRAGMENT_NODE || this.nodeType === this.ENTITY_NODE ) {
    var out = '';

    for (var i = 0 ; i < this.childNodes.length ; i += 1) {
      out += this.childNodes[i].textContent || '';
    }

    return out;
  } else if (this.nodeType === this.ENTITY_REFERENCE_NODE) {
    return this._entity.textContent;
  } else {
    return null;
  }
});

core.Node.prototype.__defineSetter__('textContent', function (txt) {
  if (txt) {
    var i        = this.childNodes.length - 1,
        children = this.childNodes,
        textNode = this._ownerDocument.createTextNode(txt);

    for (i; i >= 0; i--) {
      this.removeChild(this.childNodes.item(i));
    }

    this.appendChild(textNode);
  }
  return txt;
});

core.Node.prototype.lookupPrefix = function (namespaceURI) {
  return '';
};


core.Node.prototype.isDefaultNamespace = function (namespaceURI) {
  return true;
};

core.Node.prototype.lookupNamespaceURI = function (prefix) {
  return '';
};

// TDOO: make this readable
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

core.Node.prototype.getFeature = function (/* string */ feature, /* string */ version) {
  var doc = this;
  if (doc.nodeType !== this.DOCUMENT_NODE) {
    doc = this.ownerDocument;
  }

  return doc._implementation.getFeature(feature, version, this);
};

core.Node.prototype.setUserData = function (key, data, handler) {
  var r = this[key] || null;
  this[key] = data;
  if (typeof handler === 'function') {
    // WOW.. wtf is this?
    // TODO: figure it out
    // handler('
  }
  return r;
};

core.Node.prototype.getUserData = function (key) {
  var r = this[key] || null;
  return r;
};

/* TypeInfo */
core.Attr.prototype.__defineGetter__('schemaTypeInfo', function () {
  if (!this._schemaTypeInfo) {
    this._schemaTypeInfo = new core.TypeInfo(this);
  }

  return this._schemaTypeInfo;
});

core.Attr.prototype.__defineGetter__('isId', function () {
  return !!(this.name.toLowerCase() === 'id' || this._isId);
});

/* TypeInfo */
core.Element.prototype.__defineGetter__('schemaTypeInfo', function () {
  if (!this._schemaTypeInfo) {
    this._schemaTypeInfo = new core.TypeInfo(this);
  }

  return this._schemaTypeInfo;
});

// @raises DOMException
core.Element.prototype.setIdAttribute = function (name, isId) {
  var attr = this.getAttributeNode(name);
  this.setIdAttributeNode(attr, isId);
};

core.Element.prototype.setIdAttributeNode = function(attr, isId) {

  if (attr && attr.ownerElement === this) {

    if (this._readonly) {
      throw new core.DOMException(core.DOMException.NO_MODIFICATION_ALLOWED_ERR);
    }

    // Clean off existing id's for this
    var ids = this.ownerDocument._ids;
    var keys = Object.keys(ids);
    var current = keys.length;
    while (current--) {
      if (ids[keys[current]] === this) {
        delete ids[keys[current]];
      }
    }

    attr._isId = !!isId;
    if (isId) {
      this._idAttribute = attr.nodeName;
      this.ownerDocument._ids[attr.nodeValue] = this;
    } else {
      this._idAttribute = 'id';
    }
  } else {
    throw new core.DOMException(core.DOMException.NOT_FOUND_ERR);
  }
}

// @raises DOMException
core.Element.prototype.setIdAttributeNS = function (namespaceURI, localName, isId) {
  var attr = this.getAttributeNodeNS(namespaceURI, localName);
  this.setIdAttributeNode(attr, isId);
};

core.Text.prototype.__defineGetter__('isElementContentWhitespace', function () {
  return !!/^\W*$/.test(this.nodeValue);
});

core.Text.prototype.__defineGetter__('wholeText', function () {
  return this.value;
});

// @raises DOMException
// @returns Text
core.Text.prototype.replaceWholeText = function (content) {
  this._value = content;
  return this.wholeText;
};


core.TypeInfo = function (element) {
  this._typeNamespace = null;
  this._typeName = null;

  this._element = element;
  var name = element.name || element.nodeName;

  name = name.toLowerCase();

  var mapping = {
    'id'     : 'ID',
    'class'  : 'classType',
    'strong' : 'strongType',
    'em'     : 'emType'
  };



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

  if (element.type === this.ATTRIBUTE_NODE) {
    this._typeName = (mapping[name]) ? mapping[name] : 'CDATA';

    var parent = element._ownerElement;
    if (parent) {
      var xsiAttr = parent.getAttribute(
        "xsi:noNamespaceSchemaLocation"
     );

      this._typeNamespace = 'http://www.w3.org/2001/XMLSchema';
    }
  }
};

core.TypeInfo.prototype = {
  get typeName() {
    return this._typeName;
  },
  set typeName(value) {
    // noop
  },

  get typeNamespace() {
    return this._typeNamespace;
  },

  set typeNamespace(value) {
    // noop
  },

  // DerivationMethods
  DERIVATION_RESTRICTION          : 0x00000001,
  DERIVATION_EXTENSION            : 0x00000002,
  DERIVATION_UNION                : 0x00000004,
  DERIVATION_LIST                 : 0x00000008,

  isDerivedFrom : function (typeNamespaceArg, typeNameArg, derivationMethod) {
    return false;
  }
};

// Introduced in DOM Level 3:
core.UserDataHandler = function () {};
core.UserDataHandler.prototype.NODE_CLONED   = 1;
core.UserDataHandler.prototype.NODE_IMPORTED = 2;
core.UserDataHandler.prototype.NODE_DELETED  = 3;
core.UserDataHandler.prototype.NODE_RENAMED  = 4;
core.UserDataHandler.prototype.NODE_ADOPTED  = 5;
core.UserDataHandler.prototype.handle = function (operation, key, data, src, dst) {};

// Introduced in DOM Level 3:
core.DOMError = function (severity, message, type, relatedException, relatedData, location) {
  this._severity         = severity;
  this._message          = message;
  this._type             = type;
  this._relatedException = relatedException;
  this._relatedData      = relatedData;
  this._location         = location || new core.DOMLocator();
};
core.DOMError.prototype = {};
core.DOMError.SEVERITY_WARNING = core.DOMError.prototype.SEVERITY_WARNING     = 1;
core.DOMError.SEVERITY_ERROR   = core.DOMError.prototype.SEVERITY_ERROR       = 2;
core.DOMError.SEVERITY_FATAL_ERROR = core.DOMError.prototype.SEVERITY_FATAL_ERROR = 3;

core.DOMError.prototype.__defineGetter__('severity', function () {
  return this._severity;
});
core.DOMError.prototype.__defineGetter__('message', function () {
  return this._message;
});
core.DOMError.prototype.__defineGetter__('type', function () {
  return this._type;
});
core.DOMError.prototype.__defineGetter__('relatedException', function () {
  return this._relatedException;
});
core.DOMError.prototype.__defineGetter__('relatedData', function () {
  return this._relatedData;
});
core.DOMError.prototype.__defineGetter__('location', function () {
  return this._location;
});


  // Introduced in DOM Level 3:
core.DOMErrorHandler = function () {};

core.DOMErrorHandler.prototype = {
  handleError : function (/* DOMError */ error) {

  }
};

  // Introduced in DOM Level 3:
core.DOMLocator = function (lineNumber,
                           columnNumber,
                           byteOffset,
                           utf16Offset,
                           relatedNode,
                           uri)
{
  this._lineNumber = lineNumber || -1;
  this._columnNumber = columnNumber || -1;
  this._byteOffset = byteOffset || -1;
  this._utf16Offset = utf16Offset || -1;
  this._relatedNode = relatedNode || null;
  this._uri = uri || null;
};

core.DOMLocator.prototype = {
  get lineNumber() {
    return this._lineNumber;
  },
  set lineNumber(value) {
    // noop
  },

  get columnNumber() {
    return this._columnNumber;
  },
  set columnNumber(value) {
    // noop
  },

  get byteOffset() {
    return this._byteOffset;
  },
  set byteOffset(value) {
    // noop
  },

  get utf16Offset() {
    return this._utf16Offset;
  },
  set utf16Offset(value) {
    // noop
  },

  get relatedNode() {
    return this._relatedNode;
  },
  set relatedNode(value) {
    // noop
  },

  get uri() {
    return this._uri;
  },
  set uri(value) {
    // noop
  }
};


// Introduced in DOM Level 3:

var possibleParameterNames = {
  'canonical-form': [false, true], // extra rules for true
  'cdata-sections': [true, false],
  'check-character-normalization': [false, true],
  'comments': [true, false],
  'datatype-normalization': [false, true],
  'element-content-whitespace': [true, false],
  'entities': [true, false],
  'error-handler': true,
  'infoset': [undefined, true, false], // extra rules for true
  'namespaces': [true, false],
  'namespace-declarations': [true, false], // only checked if namespaces is true
  'normalize-characters': [false, true],
  'schema-location': true,
  'schema-type': true,
  'split-cdata-sections': [true, false],
  'validate': [false, true],
  'validate-if-schema': [false, true],
  'well-formed': [true, false]
};

core.DOMConfiguration = function () {
  this._parameters = {
    'comments' : false,
    'element-content-whitespace' : true,
    'cannonical-form' : false
  };
};

core.DOMConfiguration.prototype = {
  setBulkParameters : function (params, value) {
    for (var i = 0, l = params.length; i < l; i++) {
      this.setParameter(params[i], value);
    }
  },
  setParameter: function (name, value) {
    switch (name) {
    case 'canonical-form':
      if (value) {
        this.setBulkParameters(['entities', "normalize-characters", "cdata-sections"], false);
        this.setBulkParameters([
          "namespaces",
          "namespace-declarations",
          "well-formed",
          "element-content-whitespace"
        ], true);
      }
      break;

    case 'entities':
    case 'normalize-characters':
    case 'cdata-sections':
    case "namespaces":
    case "namespace-declarations":
    case "well-formed":
    case "element-content-whitespace":
      if (this._parameters[name] !== value) {
        this._parameters['canonical-form'] = false;
      }
      break;
    }

    this._parameters[name] = value;
  },
  getParameter: function (name) {
    return this._parameters[name] || false;
  },
  canSetParameter: function (name, value) {
    return !!(possibleParameterNames[name] === true ||
              (possibleParameterNames[name] &&
               possibleParameterNames[name].indexOf(value) > -1));
  },
  parameterNames: function () {

  }
};

//core.Document.prototype._domConfig = new core.DOMConfiguration();
core.Document.prototype.__defineGetter__('domConfig', function () {
  return this._domConfig || new core.DOMConfiguration();
});

// Introduced in DOM Level 3:
core.DOMStringList = function () {};

core.DOMStringList.prototype = {
  item: function () {},
  length: function () {},
  contains: function () {}
};

core.Entity.prototype._inputEncoding = null;
core.Entity.prototype.__defineGetter__('inputEncoding', function () {
  return this._inputEncoding;
});

core.Entity.prototype._xmlEncoding = null;
core.Entity.prototype.__defineGetter__('xmlEncoding', function () {
  return this._xmlEncoding;
});

core.Entity.prototype._xmlVersion = null;
core.Entity.prototype.__defineGetter__('xmlVersion', function () {
  return this._xmlVersion;
});

// As of level3, doctype is also a child
core.Document.prototype.__defineGetter__('doctype', function () {
  if (!this._doctype) {
    var l = this.childNodes.length;
    while (l--) {
      if (this.childNodes[l].nodeType === this.DOCUMENT_TYPE_NODE) {
        this._doctype = this.childNodes[l];
      }
    }
  }

  // TODO: recalculate on replaceChild and friends

  return this._doctype || null;
});

core.Document.prototype._inputEncoding = null;
core.Document.prototype.__defineGetter__('inputEncoding', function () {
  return this._inputEncoding;
});
core.Document.prototype._inputEncoding = null;
core.Document.prototype.__defineGetter__('inputEncoding', function () {
  return this._inputEncoding;
});
core.Document.prototype._inputEncoding = null;
core.Document.prototype.__defineGetter__('inputEncoding', function () {
  return this._inputEncoding;
});

core.Document.prototype.adoptNode = function (node) {
  var that = this;
  if (!node) {
    return node;
  }

  if (node === this                        ||
      node.nodeType === this.DOCUMENT_NODE ||
      node.nodeType === this.DOCUMENT_TYPE_NODE)
  {
    throw new core.DOMException(core.NOT_SUPPORTED_ERR);
  }

  if (node._readonly) {
    throw new core.DOMException(core.NO_MODIFICATION_ALLOWED_ERR);
  }

  switch (node.nodeType) {
  case this.ATTRIBUTE_NODE:
    if (!node.specified) {
      node = node.cloneNode(true);
    }

    if (node.ownerElement) {
      if (node.namespaceURI && node.localName) {
        node.ownerElement.removeAttributeNS(namespaceURI, node.localName);
      } else {
        node.ownerElement.removeAttribute(node);
      }
    }
    node._specified = true;
    break;

  case this.ELEMENT_NODE:
    if (node.parentNode) {
      node.parentNode.removeChild(node);
      var nodeName = node._nodeName;
      // TODO: elements from other documents
    }
    break;
  }

  node._ownerElement = null;
  node._ownerDocument = this;


  return node;
};

core.Document.prototype._xmlVersion = '1.0';
core.Document.prototype.__defineGetter__('xmlVersion', function () {
  return this._xmlVersion;
});

// Handling xmlVersion on new documents
(function (_createDocument) {
  core.DOMImplementation.prototype.createDocument = function (/* String */       namespaceURI,
                                                             /* String */       qualifiedName,
                                                             /* DocumentType */ doctype)
  {
    var doc = _createDocument.apply(this, arguments);
    if (namespaceURI  &&
        qualifiedName &&
        this.hasFeature('XML', '1.0'))
    {
      doc._xmlVersion = '1.0';

    // TODO: this is probably wrong, but works for now.
    } else {
      doc._xmlVersion = null;
    }

    return doc;
  };

})(core.DOMImplementation.prototype.createDocument);

core.Document.prototype.__defineSetter__('xmlVersion', function (version) {
  // TODO: ensure the document has the 'XMLVersion' feature '1.1'
  this._xmlVersion = version;
});

core.Document.prototype.__defineGetter__('domConfig', function () {
  if (!this._domConfig) {
    this._domConfig = new core.DOMConfiguration();
  }
  return this._domConfig;
});


core.Document.prototype.normalizeOperations = {
  'canonical-form' : function (doc, els, val, error) {
    if (!val) {
      return;
    }
    var index = doc.childNodes.length;
    while (index--) {
      var e = doc.childNodes[index];
      if (e.nodeType === e.TEXT_NODE) {
        doc.removeChild(e);
      }
    }
  },
  'cdata-sections' : function (doc, els, val, error) {
    if (val) {
      return;
    }

    var index = els.length, element;
    var CDATA = doc.CDATA_SECTION_NODE;
    var textNode;
    while (index--) {
      element = els[index];

      if (element.nodeType == CDATA) {

        textNode = doc.createTextNode(element.nodeValue);
        // remove all of the cdata node's children
        var children = element.childNodes.length;
        while (children--) {
          textNode.appendChild(element.removeChild(element.childNodes[children]));
        }

        // replace the cdata node with a text node
        element.parentNode.replaceChild(textNode, element);
        textNode.parentNode.normalize();
      }
    }
  },
  'comments' : function (doc, els, val, error) {
    if (val) {
      return;
    }
    var index = els.length, element;
    var COMMENT = doc.COMMENT_NODE;
    var textNode;
    while (index--) {
      element = els[index];
      if (element.nodeType == COMMENT) {
        element.parentNode.removeChild(element);
      }
    }
    doc.normalize();
  },
  'entities' : function (doc, els, val, error) {
    if (val) {
      return;
    }

    var index = els.length, element;
    var ENTITY_REFERENCE = doc.ENTITY_REFERENCE_NODE;
    var textNode;
    while (index--) {
      element = els[index];

      if (element.nodeType == ENTITY_REFERENCE) {
        textNode = doc.createTextNode();
        var entity = element._entity;
        switch (entity.firstChild.nodeType) {

        case doc.TEXT_NODE:
          textNode = doc.createTextNode(entity.firstChild.nodeValue);
          break;
        case doc.ELEMENT_NODE:
          break;
        }

        // replace the cdata node with a text node
        element.parentNode.replaceChild(textNode, element);
      }
    }
  },
  'element-content-whitespace' : function (doc, els, val, error) {
    if (val) {
      return;
    }
    var index = els.length, el;
    while (index--) {
      el = els[index];
      if (el.nodeType === el.TEXT_NODE) {
        if (el.isElementContentWhitespace) {
          el.parentNode.removeChild(el);
        }
      }
    }

  },
  'namespaces' : function (doc, els, val, error) {

    var index = els.length, element;
    var COMMENT = doc.COMMENT_NODE;
    var namespaces;
    while (index--) {
      element = els[index];

      if (!element.nodeType ||
          element.nodeType !== element.ELEMENT_NODE)
      {
        continue;
      }
      var namespaceDefinitions = {};
      if (element.attributes) {
        var attributes = element.attributes.toArray();
        var attributeIndex = attributes.length;
        while (attributeIndex--) {
          var attribute = attributes[attributeIndex];
          if (attribute.nodeName === 'xmlns') {
            error(new core.DOMError(
                                    core.DOMError.SEVERITY_ERROR,
                                    'attempt to redefine xmlns',
                                    'TODO',
                                    'relatedException',
                                    'relatedData',
                                    new core.DOMLocator(
                                      -1, -1, -1, -1, element
                                    )
                                   )
                );

          } else if (attribute.prefix === 'xmlns') {
            namespaceDefinitions[attribute.localName] = attribute.value;
          }
        }
      }

      // validate the element's name via the doc.xmlVersion
      var validated = util.validate(element, 'tag', element.tagName);
      if (!validated) {
        error(new core.DOMError(
                core.DOMError.SEVERITY_ERROR,
                'invalid character',
                'wf-invalid-character-in-node-name',
                'relatedException',
                'relatedData',
                new core.DOMLocator(
                  -1, -1, -1, -1, element
                )
              )
        );
      // Check the element's namespace
      } else if (element.namespaceURI) {
        if (!element.prefix) {
          element.setAttribute('xmlns', element.namespaceURI);
        }
      } else {
        // level1 node
        if (!element.localName) {
          // if in process of validation against a namespace aware schema
          // (i.e XML Schema) report a fatal error: the processor can not recover
          //  in this situation.
          // Otherwise, report an error: no namespace fixup will be performed on this node.

          if (doc.domConfig.getParameter('validate')) {
            error(new core.DOMError(
                    core.DOMError.SEVERITY_FATAL_ERROR,
                    'some message',
                    'level 1 node',
                    'relatedException',
                    'relatedData',
                    new core.DOMLocator(
                      -1, -1, -1, -1, element
                    )
                  )
            );
          } else {
            error(new core.DOMError(
                    core.DOMError.SEVERITY_ERROR,
                    'some message',
                    'level1 node',
                    'relatedException',
                    'relatedData',
                    new core.DOMLocator(
                      -1, -1, -1, -1, element
                    )
                 )
            );
          }
        }
      }
    }
/*  // Pick up local namespace declarations
    //
    for (all DOM Level 2 valid local namespace declaration attributes of Element)
    {
        if (the namespace declaration is invalid)
        {
            // Note: The prefix xmlns is used only to declare namespace bindings and
            // is by definition bound to the namespace name http://www.w3.org/2000/xmlns/.
            // It must not be declared. No other prefix may be bound to this namespace name.

            ==> Report an error.

        }
        else
        {
            ==>  Record the namespace declaration
        }
    }


    // Fixup element's namespace
    //
    if (Element's namespaceURI != null)
    {
      if (Element's prefix/namespace pair (or default namespace,
           if no prefix) are within the scope of a binding)
      {
        ==> do nothing, declaration in scope is inherited

        See section "B.1.1: Scope of a binding" for an example

      }
      else
      {
        ==> Create a local namespace declaration attr for this namespace,
            with Element's current prefix (or a default namespace, if
            no prefix). If there's a conflicting local declaration
            already present, change its value to use this namespace.

            See section "B.1.2: Conflicting namespace declaration" for an example

            // NOTE that this may break other nodes within this Element's
            // subtree, if they're already using this prefix.
            // They will be repaired when we reach them.
      }
    }
    else
    {
      // Element has no namespace URI:
      if (Element's localName is null)
      {
         // DOM Level 1 node
      }
      else
      {
        // Element has no pseudo-prefix
        if (there's a conflicting local default namespace declaration
             already present)
        {
          ==> change its value to use this empty namespace.

        }
        // NOTE that this may break other nodes within this Element's
        // subtree, if they're already using the default namespaces.
        // They will be repaired when we reach them.
      }
    }


    // Examine and polish the attributes
    //
    for (all non-namespace Attrs of Element)
    {
       if (Attr[i] has a namespace URI)
       {
          if (attribute has no prefix (default namespace decl does not apply to attributes)
               OR
               attribute prefix is not declared
               OR
               conflict: attribute has a prefix that conflicts with a binding
                         already active in scope)
          {
             if (namespaceURI matches an in scope declaration of one or more prefixes)
             {
                 // pick the most local binding available;
                 // if there is more than one pick one arbitrarily

                 ==> change attribute's prefix.
             }
             else
             {
                 if (the current prefix is not null and it has no in scope declaration)
                 {
                     ==> declare this prefix
                 }
                 else
                 {
                     // find a prefix following the pattern "NS" +index (starting at 1)
                     // make sure this prefix is not declared in the current scope.
                     // create a local namespace declaration attribute

                     ==> change attribute's prefix.
                 }
             }
          }
       }
       else
       {
          // Attr[i] has no namespace URI

          if (Attr[i] has no localName)
          {
             // DOM Level 1 node
             ==> if in process of validation against a namespace aware schema
                 (i.e XML Schema) report a fatal error: the processor can not recover
                  in this situation.
                  Otherwise, report an error: no namespace fixup will be performed on this node.
          }
          else
          {
             // attr has no namespace URI and no prefix
             // no action is required, since attrs don't use default
             ==> do nothing
          }
       }
    } // end for-all-Attrs
    */
  }
};

core.Document.prototype.normalizeDocument = function () {
  var doc = this;
  var config = this.domConfig;
  var ops = this.normalizeOperations;
  var els = util.mapDOMNodes(this, true, true);
  var errorHandler = config.getParameter('error-handler') || function () {};
  Object.keys(this.normalizeOperations).forEach(function (v) {
    var val = config.getParameter(v);
    ops[v](doc, els, val, errorHandler);
  });
  this.normalize();
};

core.Document.prototype._xmlEncoding = null;
core.Document.prototype.__defineGetter__('xmlEncoding', function () {
  return this._xmlEncoding;
});

core.Document.prototype._xmlStandalone = false;
core.Document.prototype.__defineGetter__('xmlStandalone', function () {
  return this._xmlStandalone;
});

core.Document.prototype.renameNode = function (node, namespaceURI, qualifiedName) {

  if (node.nodeType !== this.ELEMENT_NODE && node.nodeType !== this.ATTRIBUTE_NODE) {
    throw new core.DOMException(core.NOT_SUPPORTED_ERR);
  } else {
    var validated = true;
    try {
      core.namespace.validate(node, qualifiedName, namespaceURI);
    } catch (e) {
      if (e.code !== core.INVALID_CHARACTER_ERR) {
        // Convert INVALID_CHARACTER_ERRs into NAMESPACE_ERRs
        throw new core.DOMException(core.NAMESPACE_ERR);
      }
    }

    if (node.documentElement === this) {
      throw new core.DOMException(ENTITY_NOT_SUPPORTED_ERR);
    } else if (!util.validate(node, 'tag', qualifiedName)) {
      throw new core.DOMException(core.INVALID_CHARACTER_ERR);
    }
  }

  if (node.ownerDocument !== this) {
    throw new core.DOMException(core.DOMException.WRONG_DOCUMENT_ERR);
  }

  var created = node._created;
  node._namespaceURI = namespaceURI;
  node._created = false;
  node.qualifiedName = qualifiedName;
  node._created = created;

  return node;
};

core.Document.prototype.__defineGetter__('documentURI', function() {
  return this._baseURI;
});

core.Document.prototype.__defineSetter__('documentURI', function(value) {
  this._baseURI = value;
});

core.Document.prototype.strictErrorChecking = true;

exports.dom = {
  level3 : {
    core: core
  }
};
