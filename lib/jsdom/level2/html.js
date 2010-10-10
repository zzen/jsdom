var core = require(__dirname + "/core").dom.level2.core;

core.HTMLCollection = function() {
  this._items = [];
};
core.HTMLCollection.prototype = {
  get length() { return this._items.length; },
  item : function(index) {
  
  },
  namedItem : function(name) {
  
  }
};


core.HTMLOptionsCollection = function() {
  this._options = [];
};
core.HTMLOptionsCollection.prototype = {
  get length() { return this._options.length; },
  set length() { // raises(dom::DOMException)
  },
  item : function(index) {
  },
  namedItem : function(name) {
  }
};


core.HTMLDocument = function() {

};
core.HTMLDocument.prototype = {
  get title() { return this._title || ''; },
  set title(val) { this._title = val; },
  
  get referrer() { return this._referer || '' },
  get domain() { return this._domain || '' },
  get URL() { return this._URL || ''; },
  get body() { return this._body || '' },
  set body(val) { this._body = val },
  get images() { return this._images || []; },
  get applets() { return this._applets || []; },
  get links() { return this._links || []; },
  get forms() { return this._forms || [] },
  get anchors() { return this._anchors || ''; },
  get cookie() { return this._cookie || ''; },
  set cookie(val) { this._cookie = val; },

  open : function() {},
  close: function() {},
  write: function(text) {},
  writeln : function(text) {},
  getElementsByName : function(elementName) {}
};
core.HTMLDocument.prototype.__proto__ = core.Document.prototype;


core.HTMLElement = function() {};
core.HTMLElement.prototype = {
  get id() { return this._id || '' },
  set id(val) { this._id = val; },
  get title() { return this._title || '' },
  set title(val) { this._title = val; },
  get lang() { return this._lang || ''; },
  set lang(val) { this._lang = val; },
  get dir() { return this._dir || ''; },
  set dir(val) { this._dir = val; },
  get className() { return this._className; },
  set className(val) { return this._className; }
};
core.HTMLElement.prototype.__proto__ = core.Element.prototype;


core.HTMLHtmlElement = function() {};
core.HTMLHtmlElement.prototype = {
  get version() { return this._version || '' },
  set version(val) { this._version = val; }
};
core.HTMLHtmlElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLHeadElement = function() {};
core.HTMLHeadElement.prototype = {
  get profile() { return this._profile || '' },
  set profile(val) { this._profile = val; }
};
core.HTMLHeadElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLLinkElement = function() {};
core.HTMLLinkElement.prototype = {
  get disabled() { return this._disabled || '' },
  set disabled(val) { this._disabled = val; },
  get charset() { return this._charset || '' },
  set charset(val) { this._charset = val; },
  get href() { return this._href || '' },
  set href(val) { this._href = val; },
  get hreflang() { return this._hreflang || '' },
  set hreflang(val) { this._hreflang = val; },
  get media() { return this._media || '' },
  set media(val) { this._media = val; },
  get rel() { return this._rel || '' },
  set rel(val) { this._rel = val; },
  get rev() { return this._rev || '' },
  set rev(val) { this._rev = val; },
  get target() { return this._target || '' },
  set target(val) { this._target = val; },
  get type() { return this._type || '' },
  set type(val) { this._type = val; }

};
core.HTMLLinkElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLTitleElement = function() {};
core.HTMLTitleElement.prototype = {
  get text() { return this._text || '' },
  set text(val) { this._text = val; }
};
core.HTMLTitleElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLMetaElement = function() {};
core.HTMLMetaElement.prototype = {
  get content() { return this._content || '' },
  set content(val) { this._content = val; },
  get httpEquiv() { return this._httpEquiv || '' },
  set httpEquiv(val) { this._httpEquiv = val; },
  get name() { return this._name || '' },
  set name(val) { this._name = val; },
  get scheme() { return this._scheme || '' },
  set scheme(val) { this._scheme = val; }
};
core.HTMLMetaElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLBaseElement = function() {};
core.HTMLBaseElement.prototype = {
  get href() { return this._href || '' },
  set href(val) { this._href = val; },
  get target() { return this._target || '' },
  set target(val) { this._target = val; }
};
core.HTMLBaseElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLIsIndexElement = function() {};
core.HTMLIsIndexElement.prototype = {
  get form() { return this._form || '' },
  get prompt() { return this._prompt || '' },
  set prompt(val) { this._prompt = val; }
};
core.HTMLIsIndexElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLStyleElement = function() {};
core.HTMLStyleElement.prototype = {
  get disabled() { return this._disabled || '' },
  set disabled(val) { this._disabled = val; },
  get media() { return this._media || '' },
  set media(val) { this._media = val; },
  get type() { return this._type || '' },
  set type(val) { this._type = val; }
};
core.HTMLStyleElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLBodyElement = function() {};
core.HTMLBodyElement.prototype = {
  get aLink() { return this._aLink || '' },
  set aLink(val) { this._aLink = val; },
  get background() { return this._background || '' },
  set background(val) { this._background = val; },
  get bgColor() { return this._bgColor || '' },
  set bgColor(val) { this._bgColor = val; },
  get link() { return this._link || '' },
  set link(val) { this._link = val; },
  get text() { return this._text || '' },
  set text(val) { this._text = val; },
  get vLink() { return this._vLink || '' },
  set vLink(val) { this._vLink = val; }  
};
core.HTMLBodyElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLFormElement = function() {};
core.HTMLFormElement.prototype = {
  get elements() { return this._elements || '' },
  get length() { return this._length || '' },
  get name() { return this._name || '' },
  get name() { return this._name || '' },
  get acceptCharset() { return this._acceptCharset || '' },
  get acceptCharset() { return this._acceptCharset || '' },
  get action() { return this._action || '' },
  get action() { return this._action || '' },
  get enctype() { return this._enctype || '' },
  get enctype() { return this._enctype || '' },
  get method() { return this._method || '' },
  get method() { return this._method || '' },
  get target() { return this._target || '' },
  get target() { return this._target || '' },

  submit : function() {},
  reset  : function() {}
};
core.HTMLFormElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLSelectElement = function() {};
core.HTMLSelectElement.prototype = {
  get type() { return this._text || '' },
  get form() { return this._form || '' },
  get options() { return this._options || '' },
  get selectedIndex() { return this._selectedIndex || '' },
  set selectedIndex(val) { this._selectedIndex = val; },
  get value() { return this._value || '' },
  set value(val) { this._value = val; },
  get length() { return this._length || '' },
  set length(val) { this._length = val; },
  get disabled() { return this._disabled || '' },
  set disabled(val) { this._disabled = val; },
  get multiple() { return this._multiple || '' },
  set multiple(val) { this._multiple = val; },
  get name() { return this._name || '' },
  set name(val) { this._name = val; },
  get size() { return this._size || '' },
  set size(val) { this._size = val; },
  get tabIndex() { return this._tabIndex || '' },
  set tabIndex(val) { this._tabIndex = val; },
  
  add : function(element, before) {},
  remove : function(index) {},
  blur : function() {},
  focus : function() {}
  
};
core.HTMLSelectElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLOptGroupElement = function() {};
core.HTMLOptGroupElement.prototype = {
  get disabled() { return this._disabled || '' },
  set disabled(val) { this._disabled = val; },
  get label() { return this._label || '' },
  set label(val) { this._label = val; }
};


core.HTMLOptionElement = function() {};
core.HTMLOptionElement.prototype = {
  get form() { return this._form || null },
  get text() { return this._text || '' },
  get index() { return this._index || -1 },
  get defaultSelected() { return this._defaultSelected || '' },
  set defaultSelected(val) { this._defaultSelected = val; },
  get disabled() { return this._disabled || '' },
  set disabled(val) { this._disabled = val; },
  get label() { return this._label || '' },
  set label(val) { this._label = val; },
  get selected() { return this._selected || '' },
  set selected(val) { this._selected = val; },
  get value() { return this._value || '' },
  set value(val) { this._value = val; }
};
core.HTMLOptionElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLInputElement = function() {};
core.HTMLInputElement.prototype = {
  get form() { return this._form || null },
  get defaultValue() { return this._defaultValue || '' },
  set defaultValue(val) { this._defaultValue = val; },
  get defaultChecked() { return this._defaultChecked || '' },
  set defaultChecked(val) { this._defaultChecked = val; },
  get accessKey() { return this._accessKey || '' },
  set accessKey(val) { this._accessKey = val; },
  get align() { return this._align || '' },
  set align(val) { this._align = val; },
  get alt() { return this._alt || '' },
  set alt(val) { this._alt = val; },
  get checked() { return this._text || '' },
  set checked(val) { this._checked = val; },
  get disabled() { return this._disabled || '' },
  set disabled(val) { this._disabled = val; },
  get maxLength() { return this._maxLength || '' },
  set maxLength(val) { this._maxLength = val; },
  get readOnly() { return this._readOnly || '' },
  set readOnly(val) { this._readOnly = val; },
  get size() { return this._size || '' },
  set size(val) { this._size = val; },
  get src() { return this._src || '' },
  set src(val) { this._src = val; },
  get tabIndex() { return this._tabIndex || '' },
  set tabIndex(val) { this._tabIndex = val; },
  get type() { return this._type || '' },
  set type(val) { this._type = val; },
  get useMap() { return this._useMap || '' },
  set useMap(val) { this._useMap = val; },
  get value() { return this._value || '' },
  set value(val) { this._value = val; },

  blur : function() {},
  focus : function() {},
  select : function() {},
  click : function() {}
  
};
core.HTMLInputElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLInputElement = function() {};
core.HTMLInputElement.prototype = {
  get form() { return this._form || null },
  get type() { return this._type || '' },  
  get defaultValue() { return this._defaultValue || '' },
  set defaultValue(val) { this._defaultValue = val; },
  get accessKey() { return this._accessKey || '' },
  set accessKey(val) { this._accessKey = val; },
  get cols() { return this._cols || '' },
  set cols(val) { this._cols = val; },
  get disabled() { return this._disabled || '' },
  set disabled(val) { this._disabled = val; },
  get checked() { return this._text || '' },
  set checked(val) { this._checked = val; },
  get name() { return this._name || '' },
  set name(val) { this._name = val; },
  get readOnly() { return this._readOnly || '' },
  set readOnly(val) { this._readOnly = val; },
  get rows() { return this._rows || '' },
  set rows(val) { this._rows = val; },
  get tabIndex() { return this._tabIndex || '' },
  set tabIndex(val) { this._tabIndex = val; },
  get value() { return this._value || '' },
  set value(val) { this._value = val; },

  blur : function() {},
  focus : function() {},
  select : function() {},
  click : function() {}
  
};


core.HTMLButtonElement = function() {};
core.HTMLButtonElement.prototype = {
  get form() { return this._form || null },
  get type() { return this._type || '' },
  get accessKey() { return this._accessKey || '' },
  set accessKey(val) { this._accessKey = val; },
  get disabled() { return this._disabled || '' },
  set disabled(val) { this._disabled = val; },
  get name() { return this._name || '' },
  set name(val) { this._name = val; },
  get tabIndex() { return this._tabIndex || '' },
  set tabIndex(val) { this._tabIndex = val; },
  get value() { return this._value || '' },
  set value(val) { this._value = val; },
};


core.HTMLLabelElement = function() {};
core.HTMLLabelElement.prototype = {
  get form() { return this._form || null },
  get accessKey() { return this._accessKey || '' },
  set accessKey(val) { this._accessKey = val; },
  get htmlFor() { return this._htmlFor || '' },
  set htmlFor(val) { this._htmlFor = val; }
};
core.HTMLLabelElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLFieldSetElement = function() {};
core.HTMLFieldSetElement.prototype = {
  get form() { return this._form || null }
};
core.HTMLFieldSetElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLLegendElement = function() {};
core.HTMLLegendElement.prototype = {
  get form() { return this._form || '' },
  get accessKey() { return this._accessKey || '' },
  set accessKey(val) { this._accessKey = val; },
  get align() { return this._align || '' },
  set align(val) { this._align = val; }
};
core.HTMLTitleElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLUListElement = function() {};
core.HTMLUListElement.prototype = {
  get compact() { return this._compact || '' },
  set compact(val) { this._compact = val; },
  get type() { return this._type || '' },
  set type(val) { this._type = val; }
};
core.HTMLUListElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLOListElement = function() {};
core.HTMLOListElement.prototype = {
  get compact() { return this._compact || '' },
  set compact(val) { this._compact = val; },
  get start() { return this._start || '' },
  set start(val) { this._start = val; },
  get type() { return this._type || '' },
  set type(val) { this._type = val; }
};
core.HTMLOListElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLDListElement = function() {};
core.HTMLDListElement.prototype = {
  get compact() { return this._compact || '' },
  set compact(val) { this._compact = val; }
};
core.HTMLDListElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLDirectoryElement = function() {};
core.HTMLDirectoryElement.prototype = {
  get compact() { return this._compact || '' },
  set compact(val) { this._compact = val; }
};
core.HTMLDirectoryElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLMenuElement = function() {};
core.HTMLMenuElement.prototype = {
  get compact() { return this._compact || '' },
  set compact(val) { this._compact = val; }
};
core.HTMLMenuElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLLIElement = function() {};
core.HTMLLIElement.prototype = {
  get type() { return this._type || '' },
  set type(val) { this._type = val; },
  get value() { return this._value || '' },
  set value(val) { this._value = val; }
};
core.HTMLLIElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLDivElement = function() {};
core.HTMLDivElement.prototype = {
  get align() { return this._align || '' },
  set align(val) { this._align = val; }
};
core.HTMLDivElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLParagraphElement = function() {};
core.HTMLParagraphElement.prototype = {
  get align() { return this._align || '' },
  set align(val) { this._text = align; }
};
core.HTMLParagraphElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLHeadingElement = function() {};
core.HTMLHeadingElement.prototype = {
  get align() { return this._align || '' },
  set align(val) { this._align = val; }
};
core.HTMLHeadingElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLQuoteElement = function() {};
core.HTMLQuoteElement.prototype = {
  get cite() { return this._cite || '' },
  set cite(val) { this._cite = val; }
};


core.HTMLPreElement = function() {};
core.HTMLPreElement.prototype = {
  get width() { return this._width || '' },
  set width(val) { this._width = val; }
};
core.HTMLPreElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLBRElement = function() {};
core.HTMLBRElement.prototype = {
  get clear() { return this._clear || '' },
  set clear(val) { this._clear = val; }
};
core.HTMLBRElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLBaseFontElement = function() {};
core.HTMLBaseFontElement.prototype = {
  get color() { return this._color || '' },
  set color(val) { this._color = val; },
  get face() { return this._face || '' },
  set face(val) { this._face = val; },
  get size() { return this._size || '' },
  set size(val) { this._size = val; }
};
core.HTMLBaseFontElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLFontElement = function() {};
core.HTMLFontElement.prototype = {
  get color() { return this._color || '' },
  set color(val) { this._color = val; },
  get face() { return this._face || '' },
  set face(val) { this._face = val; },
  get size() { return this._size || '' },
  set size(val) { this._size = val; }
};
core.HTMLFontElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLHRElement = function() {};
core.HTMLHRElement.prototype = {
  get align() { return this._align || '' },
  set align(val) { this._align = val; },
  get noShade() { return this._noShade || '' },
  set noShade(val) { this._noShade = val; },
  get size() { return this._size || '' },
  set size(val) { this._size = val; },
  get width() { return this._width || '' },
  set width(val) { this._width = val; }
};

core.HTMLHRElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLModElement = function() {};
core.HTMLModElement.prototype = {
  get cite() { return this._cite || '' },
  set cite(val) { this._cite = val; },
  get dateTime() { return this._dateTime || '' },
  set dateTime(val) { this._dateTime = val; }
};
core.HTMLModElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLAnchorElement = function() {};
core.HTMLAnchorElement.prototype = {
  get accessKey() { return this._accessKey || '' },
  set accessKey(val) { this._accessKey = val; },
  get charset() { return this._charset || '' },
  set charset(val) { this._charset = val; },
  get coords() { return this._coords || '' },
  set coords(val) { this._coords = val; },
  get href() { return this._href || '' },
  set href(val) { this._href = val; },
  get hreflang() { return this._hreflang || '' },
  set hreflang(val) { this._hreflang = val; },
  get name() { return this._name || '' },
  set name(val) { this._name = val; },
  get rel() { return this._rel || '' },
  set rel(val) { this._rel = val; },
  get rev() { return this._rev || '' },
  set rev(val) { this._rev = val; },
  get shape() { return this._shape || '' },
  set shape(val) { this._shape = val; },
  get tabIndex() { return this._tabIndex || '' },
  set tabIndex(val) { this._tabIndex = val; },
  get target() { return this._target || '' },
  set target(val) { this._target = val; },
  get type() { return this._type || '' },
  set type(val) { this._type = val; },

  blur : function() {},
  focus : function() {}
};
core.HTMLAnchorElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLImageElement = function() {};
core.HTMLImageElement.prototype = {
  get name() { return this._name || '' },
  set name(val) { this._name = val; },
  get align() { return this._align || '' },
  set align(val) { this._align = val; },
  get alt() { return this._alt || '' },
  set alt(val) { this._alt = val; },
  get border() { return this._border || '' },
  set border(val) { this._border = val; },
  get height() { return this._height || '' },
  set height(val) { this._height = val; },
  get hspace() { return this._hspace || '' },
  set hspace(val) { this._hspace = val; },
  get isMap() { return this._isMap || '' },
  set isMap(val) { this._isMap = val; },
  get longDesc() { return this._longDesc || '' },
  set longDesc(val) { this._longDesc = val; },
  get src() { return this._src || '' },
  set src(val) { this._src = val; },
  get useMap() { return this._useMap || '' },
  set useMap(val) { this._useMap = val; },
  get vspace() { return this._vspace || '' },
  set vspace(val) { this._vspace = val; },
  get vspace() { return this._vspace || '' },
  set vspace(val) { this._vspace = val; }
};
core.HTMLImageElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLObjectElement = function() {};
core.HTMLObjectElement.prototype = {
  get form() { return this._form || '' },
  get contentDocument() { return this._contentDocument || '' },
  get code() { return this._code || '' },
  set code(val) { this._code = val; },
  get align() { return this._align || '' },
  set align(val) { this._align = val; },
  get archive() { return this._archive || '' },
  set archive(val) { this._archive = val; },
  get border() { return this._border || '' },
  set border(val) { this._border = val; },
  get codeBase() { return this._codeBase || '' },
  set codeBase(val) { this._codeBase = val; },
  get codeType() { return this._codeType || '' },
  set codeType(val) { this._codeType = val; },
  get data() { return this._data || '' },
  set data(val) { this._data = val; },
  get declare() { return this._declare || '' },
  set declare(val) { this._declare = val; },
  get height() { return this._height || '' },
  set height(val) { this._height = val; },
  get hspace() { return this._hspace || '' },
  set hspace(val) { this._hspace = val; },
  get name() { return this._name || '' },
  set name(val) { this._name = val; },
  get standby() { return this._standby || '' },
  set standby(val) { this._standby = val; },
  get tabIndex() { return this._tabIndex || '' },
  set tabIndex(val) { this._tabIndex = val; },
  get type() { return this._type || '' },
  set type(val) { this._type = val; },
  get useMap() { return this._useMap || '' },
  set useMap(val) { this._useMap = val; },
  get vspace() { return this._vspace || '' },
  set vspace(val) { this._vspace = val; },
  get width() { return this._width || '' },
  set width(val) { this._width = val; }
};
core.HTMLObjectElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLParamElement = function() {};
core.HTMLParamElement.prototype = {
  get name() { return this._name || '' },
  set name(val) { this._name = val; },
  get type() { return this._type || '' },
  set type(val) { this._type = val; },
  get value() { return this._value || '' },
  set value(val) { this._value = val; },
  get valueType() { return this._valueType || '' },
  set valueType(val) { this._valueType = val; }
};
core.HTMLParamElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLAppletElement = function() {};
core.HTMLAppletElement.prototype = {
  get align() { return this._align || '' },
  set align(val) { this._align = val; },
  get alt() { return this._alt || '' },
  set alt(val) { this._alt = val; },
  get archive() { return this._archive || '' },
  set archive(val) { this._archive = val; },
  get code() { return this._code || '' },
  set code(val) { this._code = val; },
  get codeBase() { return this._codeBase || '' },
  set codeBase(val) { this._codeBase = val; },
  get height() { return this._height || '' },
  set height(val) { this._height = val; },
  get hspace() { return this._hspace || '' },
  set hspace(val) { this._hspace = val; },
  get name() { return this._name || '' },
  set name(val) { this._name = val; },
  get object() { return this._object || '' },
  set object(val) { this._object = val; },
  get vspace() { return this._vspace || '' },
  set vspace(val) { this._vspace = val; },
  get width() { return this._width || '' },
  set width(val) { this._width = val; }
};
core.HTMLAppletElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLMapElement = function() {};
core.HTMLMapElement.prototype = {
  get name() { return this._name || '' },
  set name(val) { this._name = val; }
};
core.HTMLMapElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLAreaElement = function() {};
core.HTMLAreaElement.prototype = {
  get accessKey() { return this._accessKey || '' },
  set accessKey(val) { this._accessKey = val; },
  get alt() { return this._alt || '' },
  set alt(val) { this._alt = val; },
  get coords() { return this._coords || '' },
  set coords(val) { this._coords = val; },
  get href() { return this._href || '' },
  set href(val) { this._href = val; },
  get noHref() { return this._noHref || '' },
  set noHref(val) { this._noHref = val; },
  get shape() { return this._shape || '' },
  set shape(val) { this._shape = val; },
  get tabIndex() { return this._tabIndex || '' },
  set tabIndex(val) { this._tabIndex = val; },
  get target() { return this._target || '' },
  set target(val) { this._target = val; }
};
core.HTMLAreaElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLScriptElement = function() {};
core.HTMLScriptElement.prototype = {
  get text() { return this._text || '' },
  set text(val) { this._text = val; },
  get htmlFor() { return this._htmlFor || '' },
  set htmlFor(val) { this._htmlFor = val; },
  get event() { return this._event || '' },
  set event(val) { this._event = val; },
  get charset() { return this._charset || '' },
  set charset(val) { this._charset = val; },
  get defer() { return this._defer || '' },
  set defer(val) { this._defer = val; },
  get src() { return this._src || '' },
  set src(val) { this._src = val; },
  get type() { return this._type || '' },
  set type(val) { this._type = val; }
};
core.HTMLScriptElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLTableElement = function() {};
core.HTMLTableElement.prototype = {
  get rows() { return this._rows || '' },
  get tBodies() { return this._tBodies || '' },
  get caption() { return this._caption || '' },
  set caption(val) { this._caption = val; },
  get tHead() { return this._tHead || '' },
  set tHead(val) { this._tHead = val; },
  get tFoot() { return this._tFoot || '' },
  set tFoot(val) { this._tFoot = val; },
  get align() { return this._align || '' },
  set align(val) { this._align = val; },
  get bgColor() { return this._bgColor || '' },
  set bgColor(val) { this._bgColor = val; },
  get border() { return this._border || '' },
  set border(val) { this._border = val; },
  get cellPadding() { return this._cellPadding || '' },
  set cellPadding(val) { this._cellPadding = val; },
  get cellSpacing() { return this._cellSpacing || '' },
  set cellSpacing(val) { this._cellSpacing = val; },
  get frame() { return this._frame || '' },
  set frame(val) { this._frame = val; },
  get rules() { return this._rules || '' },
  set rules(val) { this._rules = val; },
  get summary() { return this._summary || '' },
  set summary(val) { this._summary = val; },
  get width() { return this._width || '' },
  set width(val) { this._width = val; },

  createTHead : function() {},
  deleteTHead : function() {},
  createTFoot : function() {},
  deleteTFoot : function() {},
  createCaption : function() {},
  deleteCaption : function() {},
  insertRow : function(index) {},
  deleteRow : function(index) {}
};
core.HTMLTableElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLTableCaptionElement = function() {};
core.HTMLTableCaptionElement.prototype = {
  get align() { return this._align || '' },
  set align(val) { this._align = val; }
};
core.HTMLTableCaptionElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLTableColElement = function() {};
core.HTMLTableColElement.prototype = {
  get align() { return this._align || '' },
  set align(val) { this._align = val; },
  get ch() { return this._ch || '' },
  set ch(val) { this._ch = val; },
  get chOff() { return this._chOff || '' },
  set chOff(val) { this._chOff = val; },
  get span() { return this._span || '' },
  set span(val) { this._span = val; },
  get vAlign() { return this._vAlign || '' },
  set vAlign(val) { this._vAlign = val; },
  get width() { return this._width || '' },
  set width(val) { this._width = val; }
};
core.HTMLTableColElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLTableSectionElement = function() {};
core.HTMLTableSectionElement.prototype = {
  get rows() { return this._text || '' },
  get align() { return this._align || '' },
  set align(val) { this._align = val; },
  get ch() { return this._ch || '' },
  set ch(val) { this._ch = val; },
  get chOff() { return this._chOff || '' },
  set chOff(val) { this._chOff = val; },
  get vAlign() { return this._vAlign || '' },
  set vAlign(val) { this._vAlign = val; },

  insertRow : function(index) {},
  deleteRow : function(index) {}
};
core.HTMLTableSectionElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLTableRowElement = function() {};
core.HTMLTableRowElement.prototype = {
  get rowIndex() { return this._rowIndex || '' },
  get sectionRowIndex() { return this._sectionRowIndex || '' },
  get cells() { return this._cells || '' },
  get align() { return this._align || '' },
  set align(val) { this._align = val; },
  get bgColor() { return this._bgColor || '' },
  set bgColor(val) { this._bgColor = val; },
  get ch() { return this._ch || '' },
  set ch(val) { this._ch = val; },
  get chOff() { return this._chOff || '' },
  set chOff(val) { this._chOff = val; },
  get vAlign() { return this._vAlign || '' },
  set vAlign(val) { this._vAlign = val; },

  insertCell : function(index) {},
  deleteCell : function(index) {}

};
core.HTMLTableRowElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLTableCellElement = function() {};
core.HTMLTableCellElement.prototype = {
  get cellIndex() { return this._cellIndex || '' },
  get abbr() { return this._abbr || '' },
  set abbr(val) { this._abbr = val; },
  get align() { return this._align || '' },
  set align(val) { this._align = val; },
  get axis() { return this._axis || '' },
  set axis(val) { this._axis = val; },
  get bgColor() { return this._bgColor || '' },
  set bgColor(val) { this._bgColor = val; },
  get ch() { return this._ch || '' },
  set ch(val) { this._ch = val; },
  get chOff() { return this._chOff || '' },
  set chOff(val) { this._chOff = val; },
  get colSpan() { return this._colSpan || '' },
  set colSpan(val) { this._colSpan = val; },
  get headers() { return this._headers || '' },
  set headers(val) { this._headers = val; },
  get height() { return this._height || '' },
  set height(val) { this._height = val; },
  get noWrap() { return this._noWrap || '' },
  set noWrap(val) { this._noWrap = val; },
  get rowSpan() { return this._rowSpan || '' },
  set rowSpan(val) { this._rowSpan = val; },
  get scope() { return this._scope || '' },
  set scope(val) { this._scope = val; },
  get vAlign() { return this._vAlign || '' },
  set vAlign(val) { this._vAlign = val; },
  get width() { return this._width || '' },
  set width(val) { this._width = val; }
};
core.HTMLTableCellElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLFrameSetElement = function() {};
core.HTMLFrameSetElement.prototype = {
  get cols() { return this._cols || '' },
  set cols(val) { this._cols = val; },
  get rows() { return this._rows || '' },
  set rows(val) { this._rows = val; }
};
core.HTMLFrameSetElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLFrameElement = function() {};
core.HTMLFrameElement.prototype = {
  get contentDocument() { return this._contentDocument || '' },
  get frameBorder() { return this._frameBorder || '' },
  set frameBorder(val) { this._frameBorder = val; },
  get longDesc() { return this._longDesc || '' },
  set longDesc(val) { this._longDesc = val; },
  get marginHeight() { return this._marginHeight || '' },
  set marginHeight(val) { this._marginHeight = val; },
  get marginWidth() { return this._marginWidth || '' },
  set marginWidth(val) { this._marginWidth = val; },
  get name() { return this._name || '' },
  set name(val) { this._name = val; },
  get noResize() { return this._noResize || '' },
  set noResize(val) { this._noResize = val; },
  get scrolling() { return this._scrolling || '' },
  set scrolling(val) { this._scrolling = val; },
  get src() { return this._src || '' },
  set src(val) { this._src = val; },
};
core.HTMLFrameElement.prototype.__proto__ = core.HTMLElement.prototype;


core.HTMLIFrameElement = function() {};
core.HTMLIFrameElement.prototype = {
  get contentDocument() { return this._contentDocument || '' },
  get align() { return this._align || '' },
  set align(val) { this._align = val; },
  get frameBorder() { return this._frameBorder || '' },
  set frameBorder(val) { this._frameBorder = val; },
  get height() { return this._height || '' },
  set height(val) { this._height = val; },
  get longDesc() { return this._longDesc || '' },
  set longDesc(val) { this._longDesc = val; },
  get marginHeight() { return this._marginHeight || '' },
  set marginHeight(val) { this._marginHeight = val; },
  get marginWidth() { return this._marginWidth || '' },
  set marginWidth(val) { this._marginWidth = val; },
  get name() { return this._name || '' },
  set name(val) { this._name = val; },
  get scrolling() { return this._scrolling || '' },
  set scrolling(val) { this._scrolling = val; },
  get src() { return this._src || '' },
  set src(val) { this._src = val; },
  get width() { return this._width || '' },
  set width(val) { this._width = val; }
};
core.HTMLIFrameElement.prototype.__proto__ = core.HTMLElement.prototype;


exports.dom = {
  level2 : {
    html : core
  }
}
