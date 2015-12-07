/**
 * resources/js/external/modernizr.js
**/
/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-borderimage-generatedcontent-cssgradients-csstransforms3d-csstransitions-sessionstorage-inlinesvg-svgclippaths-touch-shiv-mq-cssclasses-teststyles-testprop-testallprops-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function C(a){j.cssText=a}function D(a,b){return C(n.join(a+";")+(b||""))}function E(a,b){return typeof a===b}function F(a,b){return!!~(""+a).indexOf(b)}function G(a,b){for(var d in a){var e=a[d];if(!F(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function H(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:E(f,"function")?f.bind(d||b):f}return!1}function I(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+p.join(d+" ")+d).split(" ");return E(b,"string")||E(b,"undefined")?G(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),H(e,b,c))}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={svg:"http://www.w3.org/2000/svg"},s={},t={},u={},v=[],w=v.slice,x,y=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},z=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b).matches;var d;return y("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},A={}.hasOwnProperty,B;!E(A,"undefined")&&!E(A.call,"undefined")?B=function(a,b){return A.call(a,b)}:B=function(a,b){return b in a&&E(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=w.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(w.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(w.call(arguments)))};return e}),s.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:y(["@media (",n.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},s.borderimage=function(){return I("borderImage")},s.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return C((a+"-webkit- ".split(" ").join(b+a)+n.join(c+a)).slice(0,-a.length)),F(j.backgroundImage,"gradient")},s.csstransforms3d=function(){var a=!!I("perspective");return a&&"webkitPerspective"in g.style&&y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},s.csstransitions=function(){return I("transition")},s.fontface=function(){var a;return y('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&g.indexOf(d.split(" ")[0])===0}),a},s.generatedcontent=function(){var a;return y(["#",h,"{font:0/0 a}#",h,':after{content:"',l,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a},s.sessionstorage=function(){try{return sessionStorage.setItem(h,h),sessionStorage.removeItem(h),!0}catch(a){return!1}},s.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==r.svg},s.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(m.call(b.createElementNS(r.svg,"clipPath")))};for(var J in s)B(s,J)&&(x=J.toLowerCase(),e[x]=s[J](),v.push((e[x]?"":"no-")+x));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)B(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},C(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.mq=z,e.testProp=function(a){return G([a])},e.testAllProps=I,e.testStyles=y,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+v.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};


/**
 * resources/js/external/util-0.0.1.js
**/
/*global console:true*/
/*jslint browser: true */
/*jslint white: true */

/**
 * A set of common utilities, function and polyfills.
 * 0306013 AJW
 */

;(function() {
  "use strict";

  var util = {};

  /**
   * Returns the current device.
   * @return {String} Device.
   */
  util.checkDevice = function () {
    var obj, prop;
    obj = {
      'only all and (max-width: 767px)': 'Mobile',
      'only all and (max-width: 997px)': 'Tablet',
      'only all and (max-width: 1259px)': 'Standard',
      'only all and (min-width: 1260px)': 'Large'
    };
    for (prop in obj) {
      if (Modernizr.mq(prop)) { return obj[prop].toLowerCase(); }
    }
  };

  /**
   * Simple function to provide replace all functionality that works
   * with variables.
   * @param  {String} find    String to find.
   * @param  {String} replace String that replaces the find string.
   * @param  {String} str     The string on which to operate.
   * @return {String}         Processed string.
   */
  util.replaceAll = function(find, replace, str) {
    return str.replace(new RegExp(find, 'g'), replace);
  };

  /**
   * Applies a template to a data object to produce HTML. The template can be
   * either a a flat HTML structure, or a JS array.
   * @param  {Array}  template  HTML Template.
   * @param  {Object} obj       Data object.
   * @return {String}           HTML.
   */
  util.applyTemplate = function(template, obj) {
    var p, prop, param, html;
    html = util.toType(template) === 'array' ? template.join('') : template;
    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        prop = obj[p];
        param = '#{param}'.replace('param', p);
        html = util.replaceAll(param, prop, html);
      }
    }
    return html;
  };

   /**
   * Object that stores storage support values.
   * @type {Object}
   */
  util.HTMLSupport = {
    localStorage: (typeof window !== 'undefined' && 'localStorage' in window !== null) ? true : false,
    sessionStorage: (typeof window !== 'undefined' && 'sessionStorage' in window !== null) ? true : false,
    file: (typeof window !== 'undefined' && 'File' in window !== null) ? true : false
  };

  /**
   * Returns an array of object keys.
   * If using underscore or lodash this can be replaced with _.size.
   * @param  {Object} obj Object
   * @return {Array}      Array
   */
  util.keys = function(obj) {
    var arr = [], prop;
    if (Object.keys) { return Object.keys(obj); }
    if (util.toType(obj) === 'object') {
      for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          arr.push(prop);
        }
      }
    }
    return arr;
  };

  /**
   * Creates an object with supplied default properties
   * @param  {Arr} propsArr Array of properties
   * @return {Object}       Object
   */
  util.initPropsAsArrays = function(propsArr) {
    var obj, el, prop;
    obj = {};
    for (el in propsArr) {
      if (propsArr.hasOwnProperty(el)) {
        prop = propsArr[el];
        obj[prop] = [];
      }
    }
    return obj;
  };

  /**
   * Takes an object and array of properties and resets those object properties.
   * @param  {Object} obj Object.
   * @param  {Array} arr  Array of properties to be reset.
   * @return {Object}     Updated object.
   */
  util.objToDefault = function(obj, arr) {
    var index, len, prop;
    for (index = 0, len = arr.length; index < len; index++) {
      prop = arr[index];
      if (obj[prop] === undefined || obj[prop] === null) {
        obj[prop] = '';
      }
    }
  };

  /**
   * compileAssets returns a LABjs object containing arrays of scripts to be loaded.
   * @param  {Object}   options  Script root URL, current pageUID, assets object, an array of LABjs object properties.
   * @param  {Function} callback Function called after LABjs object is created.
   */
  util.compileAssets = function(options, callback) {
    var el, script, path, asset, type, appliesTo, applies, labObj;
    labObj = util.initPropsAsArrays(options.labObjProps);
    for (script in options.assets) {
      if (options.assets.hasOwnProperty(script)) {
        asset = options.assets[script];
        type = asset.type;
        appliesTo = asset.appliesTo;
        applies = (appliesTo[0] === 'all' || !!~appliesTo.indexOf(options.page)) ? true : false;
        if (applies) {
          path = options.root + asset.location + '/' + script;
          labObj[type].push(path);
        }
      }
    }
    callback(labObj);
  };

  /**
   * Builds a new namespace thru iteration when provided with a namespace string.
   * @param  {string}  A period-separated namespace (e.g. Recipe.Meat.Lamb).
   * @return {object}  A namespace object.
   */

  util.namespace = function (namespaceString) {
    var i, len, parts, parent, currentPart;
    parts = namespaceString.split('.');
    parent = window;
    currentPart = '';
    for (i = 0, len = parts.length; i < len; i++) {
      currentPart = parts[i];
      parent[currentPart] = parent[currentPart] || {};
      parent = parent[currentPart];
    }
    return parent;
  };

  /**
   * Returns a DOM object from supplied ID.
   */
  util.get = function (id) {
    return document.getElementById(id);
  };

  /**
   * Improved typeof function.
   * @param  {x}       The structure to be assessed.
   * @return {string}  The identifier.
   */
  util.toType = function(x) { return ({}).toString.call(x).match(/\s([a-zA-Z]+)/)[1].toLowerCase(); };

  /**
   * Object properties that are null are reset to emptyString.
   * @param  {object} obj Object to be checked.
   * @return {object}     Reformatted object.
   */
  util.resetNullProperties = function(obj) {
    var prop;
    for (prop in obj) {
      if (obj.hasOwnProperty(prop) && (obj[prop] === null || obj[prop] === undefined)) {
        obj[prop] = '';
      }
    }
    return obj;
  };

  /**
   * Merge two objects.
   * @param  {Object} a Object A.
   * @param  {Object} b Object B.
   * @return {Object}   Returned merged object.
   */
  util.merge = function(a, b) {
    var key;
    if (a && b) {
      for (key in b) {
        if (b.hasOwnProperty(key)) {
          a[key] = b[key];
        }
      }
    }
    return a;
  };

  /**
   * Non-jQuery ajax routine.
   * @param  {string}   url      URL.
   * @param  {function} callback Function to run on XMLHTTPrequest ok.
   * @param  {string}   postData Form data.
   */
  util.ajax = function (url, callback, postData) {
    var req, method;
    req = createXMLHTTPObject();
    if (!req) { return; }
    method = (postData) ? "POST" : "GET";
    req.open(method,url,true);
    req.onreadystatechange = function () {
      if (req.readyState !== 4) { return; }
      if (req.status !== 200 && req.status !== 304) {
        return;
      }
      callback(req);
    };
    if (req.readyState === 4) { return; }
    req.send(postData);
  };

  var XMLHttpFactories = [
    function () {return new XMLHttpRequest();},
    function () {return new ActiveXObject("Msxml2.XMLHTTP");},
    function () {return new ActiveXObject("Msxml3.XMLHTTP");},
    function () {return new ActiveXObject("Microsoft.XMLHTTP");}
  ];

  function createXMLHTTPObject() {
    var i, l, xmlhttp = false;
    for (i = 0, l = XMLHttpFactories.length; i < l; i++) {
      try {
        xmlhttp = XMLHttpFactories[i]();
      }
      catch (e) {
        continue;
      }
      break;
    }
    return xmlhttp;
  }

  /**
   * Checks whether the browser/device can process touch events.
   * @return {Boolean} True/False.
   */
  util.isTouchDevice = function() {
    if ("ontouchstart" in document.documentElement) { return true; }
    else { return false; }
  };

  /**
   * Returns an array. Most commonly used to convert nodelists to arrays for processing.
   * @param  {Array} x Item to be processed.
   * @return {Array}   Array.
   */
  util.toArray = function(x) {
    return Array.prototype.slice.call(x, 0);
  };

  /**
   * Converts a URL to an object with each parameter defined as a property.
   * @param  {String} url URL
   * @return {Object}     Object of URL parameters.
   */
  util.uritoobj = function(url){
    var obj = {},
        qloc = url.indexOf('?'),
        str = url.substring(qloc + 1),
        spl = str.split('&'),
        i, el, len;

    for (i = 0, len = spl.length; i < len; i++) {
      el = spl[i].split('=');
      obj[el[0]] = el[1];
    }

    return obj;
  };

  /**
   * Returns a specific URL parameter, or false.
   * @param  {String} url         URL.
   * @param  {[type]} param       Parameter.
   * @return {String or Boolean}  Value of parameter, or false.
   */
  util.getUrlParam = function(url, param) {
    var re = new RegExp('[?&]' + param + '=([^&]+)'), match = url.match(re);
    return match ? unescape(match[1]) : false;
  };

  /**
   * Add ECMA262-5 method binding if not supported natively
   * http://stackoverflow.com/questions/2790001/fixing-javascript-array-functions-in-internet-explorer-indexof-foreach-etc
   */
  if (!('bind' in Function.prototype)) {
    Function.prototype.bind = function(owner) {
      var that = this, args;
      if (arguments.length <= 1) {
        return function() {
          return that.apply(owner, arguments);
        };
      } else {
        args= Array.prototype.slice.call(arguments, 1);
        return function() {
          return that.apply(owner, arguments.length===0? args : args.concat(Array.prototype.slice.call(arguments)));
        };
      }
    };
  }

  /**
   * Add ECMA262-5 string trim if not supported natively.
   */
  if (!('trim' in String.prototype)) {
    String.prototype.trim = function() {
      return this.replace(/^\s+/, '').replace(/\s+$/, '');
    };
  }

  /**
   * Add ECMA262-5 Array methods if not supported natively
   */
  if (!('indexOf' in Array.prototype)) {
    Array.prototype.indexOf = function(find, i /*opt*/) {
      if (i===undefined) i = 0;
      if (i<0) i += this.length;
      if (i<0) i = 0;
      for (var n = this.length; i < n; i++) {
        if (i in this && this[i]===find) return i;
      }
      return -1;
    };
  }

  if (!('lastIndexOf' in Array.prototype)) {
    Array.prototype.lastIndexOf = function(find, i /*opt*/) {
      if (i === undefined) i= this.length - 1;
      if (i < 0) i += this.length;
      if (i > this.length-1) i = this.length - 1;
      for (i++; i --> 0;) {
        if (i in this && this[i] === find) return i;
      }
      return -1;
    };
  }

  if (!('forEach' in Array.prototype)) {
    Array.prototype.forEach = function(action, that /*opt*/) {
      for (var i = 0, n = this.length; i < n; i++) {
        if (i in this) action.call(that, this[i], i, this);
      }
    };
  }

  if (!('map' in Array.prototype)) {
    Array.prototype.map = function(mapper, that /*opt*/) {
      var other = new Array(this.length);
      for (var i = 0, n = this.length; i < n; i++) {
        if (i in this) other[i] = mapper.call(that, this[i], i, this);
      }
      return other;
    };
  }

  if (!('filter' in Array.prototype)) {
    Array.prototype.filter = function(filter, that /*opt*/) {
      var other = [], v;
      for (var i = 0, n = this.length; i < n; i++) {
        if (i in this && filter.call(that, v = this[i], i, this)) other.push(v);
      }
      return other;
    };
  }

  if (!('every' in Array.prototype)) {
    Array.prototype.every = function(tester, that /*opt*/) {
      for (var i = 0, n = this.length; i < n; i++) {
        if (i in this && !tester.call(that, this[i], i, this)) return false;
      }
      return true;
    };
  }

  if (!('some' in Array.prototype)) {
    Array.prototype.some = function(tester, that /*opt*/) {
      for (var i = 0, n = this.length; i < n; i++) {
        if (i in this && tester.call(that, this[i], i, this)) return true;
      }
      return false;
    };
  }

  if (!('contains' in Array.prototype)) {
    Array.prototype.contains = function(v) {
      for (var i = 0, n = this.length; i < n; i++) {
        if (this[i] === v) return true;
      }
      return false;
    };
  }

  /**
   * Exposes util object to either module.exports (node.js for testing with mocha/chai) or window (the browser).
   */
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = util;
  } else {
    window.util = util;
  }

}());


/**
 * resources/js/external/SafeConsole.js
**/
/**
* Avoid `console` errors in browsers that lack a console
* From HTML Boiler Plate: https://github.com/h5bp/html5-boilerplate/blob/master/js/plugins.js
* @author Oliver Secluna <oliversecluna@venda.com>
*/
if (!(window.console && console.log)) {
    (function() {
        var noop = function() {};
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
            console[methods[length]] = noop;
        }
    }());
}

/**
 * resources/js/Venda.js*/
/**
* @fileoverview venda.js: A module for use across all Venda pages, VCP and front end/ACE.
* <p/>
* This module defines a single global symbol named "Venda".
* Venda refers to the top level namespace object used in all Venda javascript
* all utility functions are stored as properties of this namespace
* functions should generally be stored in separate files held in the Venda subdirectory.
*/

//Check that the 'Venda' global object exists, if not then create it.
if (typeof Venda == "undefined" || !Venda) {
    /**
   * @class The global Venda class.
     * @constructor
   */
    var Venda = function () { };
}

/**
 * Construct a new namespace object.
 * <p/>
 * Be careful when naming packages. Reserved words may work in some browsers
 * and not others. For instance, the following will fail in Safari:
 *
 * <pre>Venda.namespace("really.long.nested.namespace");</pre>
 *
 * This fails because "long" is a future reserved word in ECMAScript
 *
 * @type object
 * @param {string} Arguments 1-n namespaces to create
 * @returns {object} A reference to the last namespace object created
 * @author <a href="http://developer.yahoo.com/yui/docs/YAHOO.js.html">YUI</a>
 */
Venda.namespace = function() {
    var a=arguments, o=null, i, j, d;
    for (i=0; i<a.length; i=i+1) {
        d=a[i].split(".");
        o=Venda;

        // Venda is implied, so it is ignored if it is included
        for (j=(d[0] == "Venda") ? 1 : 0; j<d.length; j=j+1) {
            o[d[j]]=o[d[j]] || {};
            o=o[d[j]];
        }
    }
    return o;
};

//Create name spaces for Venda.Widget
Venda.namespace("Widget");

// Create name spaces for Venda.Platform
Venda.namespace("Platform");

// Extend jQuery Functions below. Move these into another file when we have better minification
//Extend getScript
jQuery.getScript = function(url, callback, cache, global){
    jQuery.ajax({
        type: "GET",
        url: url,
        success: callback,
        dataType: "script",
        cache: cache ? cache : true, //Cache scripts by default
        global: global ? global : false //Prevent scripts being tracked in Google Analytics
    });
};


/**
 * resources/js/Venda/Widget/Tracking.js
**/
/**
 * @fileoverview Venda.Widget.Tracking - Creates variables for use in tracking scripts, e.g. Google Analytics
 *
 * @requires resources/js/external/jquery-1.8.3.min.js (jQuery)
 * @requires templates/tracking/shared/tagsForJs
 * @requires templates/tracking/shared/workflowSteps
 * @requires templates/tracking/shared/orderReceipts
 * @requires templates/order/itemJSON
 * The data used to populate the variables is contained in hidden divs in the required templates stated before the functions.
 * This file must be loaded before any tracking scripts that use it's variables
 *
 * @author Oliver Secluna <oliversecluna@venda.com>
 */

// Initiate namespacing

Venda.namespace('Widget.Tracking');

/**
 * Function used to pass current workflow step to tracking javascript
  * Requires templates/tracking/shared/workflowSteps
 */
Venda.Widget.Tracking.Step = function () {
    if (jQuery("#tag-workflow").length > 0){

        var workflowStep = jQuery("#tag-workflow").html() + "/",
            curstep = jQuery("#tag-curstep").html().replace(/^\s+|\s+$/g, "");

        workflowStep += curstep;

        if (jQuery("#tag-emptytemplate").length > 0){
            workflowStep += "/empty";
        }

        if (jQuery("#tag-errorsboolean").length > 0){
            workflowStep += "/error";
        }

        return workflowStep;
    }
    return false;
};

/**
 * Create object to pass session-level variables to tracking javascipt
 * Requires templates/mainIncludes/tagsForJs
 */

Venda.Widget.Tracking.Ses = function () {
    var obj = {
        lang : jQuery("#tag-sessionlanguage").html(),
        locn : jQuery("#tag-sessionlocation").html(),
        usid : jQuery("#tag-usrfnbr").html(),
        ustype : jQuery("#tag-ustype").html(),
        group : jQuery("#tag-usgrref").html()
    };
    switch (obj.ustype) {
    case 'R':
        obj.ustype = 'Registered';
        break;
    case 'P':
        obj.ustype = 'Partially Registered';
        break;
    case 'E':
        obj.ustype = 'Email-Only';
        break;
    default:
        obj.ustype = 'Guest';
    }
    return obj;
};

/**
 * Create object to pass search information to tracking javascipt
 * Requires templates/search/defaultResults
 */

Venda.Widget.Tracking.Search = function () {
    return {
        term : jQuery("#tag-primarysearchtext").html(),
        results : jQuery("#tag-totalresults").html()
    };
};

/**
 * Create array to store order item objects
 * Requires templates/tracking/shared/orderReceipt & templates/order/itemJSON
 */
Venda.Widget.Tracking.orditemsArray = []; //Create array to store order item objects

/* Function to push order item objects to array */
Venda.Widget.Tracking.orditemJSON = function(orditemObj) {
    this.orditemsArray.push(orditemObj);
};

/**
 *  resources/js/external/jquery.cookie.js
**/
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {

  var pluses = /\+/g;

  function encode(s) {
    return config.raw ? s : encodeURIComponent(s);
  }

  function decode(s) {
    return config.raw ? s : decodeURIComponent(s);
  }

  function stringifyCookieValue(value) {
    return encode(config.json ? JSON.stringify(value) : String(value));
  }

  function parseCookieValue(s) {
    if (s.indexOf('"') === 0) {
      // This is a quoted cookie as according to RFC2068, unescape...
      s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }

    try {
      // Replace server-side written pluses with spaces.
      // If we can't decode the cookie, ignore it, it's unusable.
      // If we can't parse the cookie, ignore it, it's unusable.
      s = decodeURIComponent(s.replace(pluses, ' '));
      return config.json ? JSON.parse(s) : s;
    } catch(e) {}
  }

  function read(s, converter) {
    var value = config.raw ? s : parseCookieValue(s);
    return $.isFunction(converter) ? converter(value) : value;
  }

  var config = $.cookie = function (key, value, options) {

    // Write

    if (value !== undefined && !$.isFunction(value)) {
      options = $.extend({}, config.defaults, options);

      if (typeof options.expires === 'number') {
        var days = options.expires, t = options.expires = new Date();
        t.setTime(+t + days * 864e+5);
      }

      return (document.cookie = [
        encode(key), '=', stringifyCookieValue(value),
        options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
        options.path    ? '; path=' + options.path : '',
        options.domain  ? '; domain=' + options.domain : '',
        options.secure  ? '; secure' : ''
      ].join(''));
    }

    // Read

    var result = key ? undefined : {};

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all. Also prevents odd result when
    // calling $.cookie().
    var cookies = document.cookie ? document.cookie.split('; ') : [];

    for (var i = 0, l = cookies.length; i < l; i++) {
      var parts = cookies[i].split('=');
      var name = decode(parts.shift());
      var cookie = parts.join('=');

      if (key && key === name) {
        // If second argument (value) is a function it's a converter...
        result = read(cookie, value);
        break;
      }

      // Prevent storing a cookie that we couldn't decode.
      if (!key && (cookie = read(cookie)) !== undefined) {
        result[name] = cookie;
      }
    }

    return result;
  };

  config.defaults = {};

  $.removeCookie = function (key, options) {
    if ($.cookie(key) === undefined) {
      return false;
    }

    // Must not alter options, thus extending a fresh object...
    $.cookie(key, '', $.extend({}, options, { expires: -1 }));
    return !$.cookie(key);
  };

}));

/**
 * Copyright (C) 2012 Chris Wharton (chris@weare2ndfloor.com)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * THIS SOFTWARE AND DOCUMENTATION IS PROVIDED "AS IS," AND COPYRIGHT
 * HOLDERS MAKE NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY OR
 * FITNESS FOR ANY PARTICULAR PURPOSE OR THAT THE USE OF THE SOFTWARE
 * OR DOCUMENTATION WILL NOT INFRINGE ANY THIRD PARTY PATENTS,
 * COPYRIGHTS, TRADEMARKS OR OTHER RIGHTS.COPYRIGHT HOLDERS WILL NOT
 * BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL OR CONSEQUENTIAL
 * DAMAGES ARISING OUT OF ANY USE OF THE SOFTWARE OR DOCUMENTATION.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://gnu.org/licenses/>.

 Documentation available at http://cookiecuttr.com

 */
(function ($) {
    $.cookieCuttr = function (options) {
        var defaults = {
            cookieCutter: false, // you'd like to enable the div/section/span etc. hide feature? change this to true
            cookieCutterDeclineOnly: false, // you'd like the CookieCutter to only hide when someone has clicked declined set this to true
            cookieAnalytics: true, // just using a simple analytics package? change this to true
            cookieDeclineButton: false, // this will disable non essential cookies
            cookieAcceptButton: true, // this will disable non essential cookies
            cookieResetButton: false,
            cookieOverlayEnabled: false, // don't want a discreet toolbar? Fine, set this to true
            cookiePolicyLink: '/privacy-policy/', // if applicable, enter the link to your privacy policy here...
            cookieMessage: 'We use cookies on this website, you can <a href="{{cookiePolicyLink}}" title="read about our cookies">read about them here</a>. To use the website as intended please...',
            cookieAnalyticsMessage: 'We use cookies, just to track visits to our website, we store no personal details.',
            cookieErrorMessage: "We\'re sorry, this feature places cookies in your browser and has been disabled. <br>To continue using this functionality, please",
            cookieWhatAreTheyLink: "http://www.allaboutcookies.org/",
            cookieDisable: '',
            cookieExpires: 365,
            cookieAcceptButtonText: "ACCEPT COOKIES",
            cookieDeclineButtonText: "DECLINE COOKIES",
            cookieResetButtonText: "RESET COOKIES FOR THIS WEBSITE",
            cookieWhatAreLinkText: "What are cookies?",
            cookieNotificationLocationBottom: false, // top or bottom - they are your only options, so true for bottom, false for top
            cookiePolicyPage: false,
            cookiePolicyPageMessage: 'Please read the information below and then choose from the following options',
            cookieDiscreetLink: false,
            cookieDiscreetReset: false,
            cookieDiscreetLinkText: "Cookies?",
            cookieDiscreetPosition: "topleft", //options: topleft, topright, bottomleft, bottomright
            cookieNoMessage: false, // change to true hide message from all pages apart from your policy page
            cookieDomain: ""
        };
        var options = $.extend(defaults, options);
        var message = defaults.cookieMessage.replace('{{cookiePolicyLink}}', defaults.cookiePolicyLink);
        defaults.cookieMessage = 'We use cookies on this website, you can <a href="' + defaults.cookiePolicyLink + '" title="read about our cookies">read about them here</a>. To use the website as intended please...';
        //convert options
        var cookiePolicyLinkIn = options.cookiePolicyLink;
        var cookieCutter = options.cookieCutter;
        var cookieCutterDeclineOnly = options.cookieCutterDeclineOnly;
        var cookieAnalytics = options.cookieAnalytics;
        var cookieDeclineButton = options.cookieDeclineButton;
        var cookieAcceptButton = options.cookieAcceptButton;
        var cookieResetButton = options.cookieResetButton;
        var cookieOverlayEnabled = options.cookieOverlayEnabled;
        var cookiePolicyLink = options.cookiePolicyLink;
        var cookieMessage = message;
        var cookieAnalyticsMessage = options.cookieAnalyticsMessage;
        var cookieErrorMessage = options.cookieErrorMessage;
        var cookieDisable = options.cookieDisable;
        var cookieWhatAreTheyLink = options.cookieWhatAreTheyLink;
        var cookieExpires = options.cookieExpires;
        var cookieAcceptButtonText = options.cookieAcceptButtonText;
        var cookieDeclineButtonText = options.cookieDeclineButtonText;
        var cookieResetButtonText = options.cookieResetButtonText;
        var cookieWhatAreLinkText = options.cookieWhatAreLinkText;
        var cookieNotificationLocationBottom = options.cookieNotificationLocationBottom;
        var cookiePolicyPage = options.cookiePolicyPage;
        var cookiePolicyPageMessage = options.cookiePolicyPageMessage;
        var cookieDiscreetLink = options.cookieDiscreetLink;
        var cookieDiscreetReset = options.cookieDiscreetReset;
        var cookieDiscreetLinkText = options.cookieDiscreetLinkText;
        var cookieDiscreetPosition = options.cookieDiscreetPosition;
        var cookieNoMessage = options.cookieNoMessage;
        // cookie identifier
        var $cookieAccepted = $.cookie('cc_cookie_accept') == "cc_cookie_accept";
        $.cookieAccepted = function () {
            return $cookieAccepted;
        };
        var $cookieDeclined = $.cookie('cc_cookie_decline') == "cc_cookie_decline";
        $.cookieDeclined = function () {
            return $cookieDeclined;
        };
        // write cookie accept button
        if (cookieAcceptButton) {
            var cookieAccept = ' <a href="#accept" class="cc-cookie-accept">' + cookieAcceptButtonText + '</a> ';
        } else {
            var cookieAccept = "";
        }
        // write cookie decline button
        if (cookieDeclineButton) {
            var cookieDecline = ' <a href="#decline" class="cc-cookie-decline">' + cookieDeclineButtonText + '</a> ';
        } else {
            var cookieDecline = "";
        }
        // write extra class for overlay
        if (cookieOverlayEnabled) {
            var cookieOverlay = 'cc-overlay';
        } else {
            var cookieOverlay = "";
        }
        // to prepend or append, that is the question?
        if ((cookieNotificationLocationBottom) || (cookieDiscreetPosition == "bottomright") || (cookieDiscreetPosition == "bottomleft")) {
            var appOrPre = true;
        } else {
            var appOrPre = false;
        }
        if (($cookieAccepted) || ($cookieDeclined)) {
            // write cookie reset button
            if ((cookieResetButton) && (cookieDiscreetReset)) {
                if (appOrPre) {
                    $('body').append('<div class="cc-cookies cc-discreet"><div class="notices mobile-padding tablet-padding thickpad-topbottom"><a class="cc-cookie-reset" href="#" title="' + cookieResetButtonText + '">' + cookieResetButtonText + '</a></div></div>');
                } else {
                    $('body').prepend('<div class="cc-cookies cc-discreet"><div class="notices mobile-padding tablet-padding thickpad-topbottom"><a class="cc-cookie-reset" href="#" title="' + cookieResetButtonText + '">' + cookieResetButtonText + '</a></div></div>');
                }
                //add appropriate CSS depending on position chosen
                if (cookieDiscreetPosition == "topleft") {
                    $('div.cc-cookies').css("top", "0");
                    $('div.cc-cookies').css("left", "0");
                }
                if (cookieDiscreetPosition == "topright") {
                    $('div.cc-cookies').css("top", "0");
                    $('div.cc-cookies').css("right", "0");
                }
                if (cookieDiscreetPosition == "bottomleft") {
                    $('div.cc-cookies').css("bottom", "0");
                    $('div.cc-cookies').css("left", "0");
                }
                if (cookieDiscreetPosition == "bottomright") {
                    $('div.cc-cookies').css("bottom", "0");
                    $('div.cc-cookies').css("right", "0");
                }
            } else if (cookieResetButton) {
                if (appOrPre) {
                    $('body').append('<div class="cc-cookies"><div class="notices mobile-padding tablet-padding thickpad-topbottom"><a href="#" class="cc-cookie-reset">' + cookieResetButtonText + '</a></div></div>');
                } else {
                    $('body').prepend('<div class="cc-cookies"><div class="notices mobile-padding tablet-padding thickpad-topbottom"><a href="#" class="cc-cookie-reset">' + cookieResetButtonText + '</a></div></div>');
                }
            } else {
                var cookieResetButton = "";
            }
        } else {
            // add message to just after opening body tag
            if ((cookieNoMessage) && (!cookiePolicyPage)) {
                // show no link on any pages APART from the policy page
            } else if ((cookieDiscreetLink) && (!cookiePolicyPage)) { // show discreet link
                if (appOrPre) {
                    $('body').append('<div class="cc-cookies cc-discreet"><div class="notices mobile-padding tablet-padding thickpad-topbottom"><a href="' + cookiePolicyLinkIn + '" title="' + cookieDiscreetLinkText + '">' + cookieDiscreetLinkText + '</a></div></div>');
                } else {
                    $('body').prepend('<div class="cc-cookies cc-discreet"><div class="notices mobile-padding tablet-padding thickpad-topbottom"><a href="' + cookiePolicyLinkIn + '" title="' + cookieDiscreetLinkText + '">' + cookieDiscreetLinkText + '</a></div></div>');
                }
                //add appropriate CSS depending on position chosen
                if (cookieDiscreetPosition == "topleft") {
                    $('div.cc-cookies').css("top", "0");
                    $('div.cc-cookies').css("left", "0");
                }
                if (cookieDiscreetPosition == "topright") {
                    $('div.cc-cookies').css("top", "0");
                    $('div.cc-cookies').css("right", "0");
                }
                if (cookieDiscreetPosition == "bottomleft") {
                    $('div.cc-cookies').css("bottom", "0");
                    $('div.cc-cookies').css("left", "0");
                }
                if (cookieDiscreetPosition == "bottomright") {
                    $('div.cc-cookies').css("bottom", "0");
                    $('div.cc-cookies').css("right", "0");
                }
            } else if (cookieAnalytics) { // show analytics overlay
                if (appOrPre) {
                    $('body').append('<div class="cc-cookies ' + cookieOverlay + '"><div class="notices mobile-padding tablet-padding thickpad-topbottom">' + cookieAnalyticsMessage + cookieAccept + cookieDecline + '<a href="' + cookieWhatAreTheyLink + '" title="Visit All about cookies (External link)">' + cookieWhatAreLinkText + '</a></div></div>');
                } else {
                    $('body').prepend('<div class="cc-cookies ' + cookieOverlay + '"><div class="notices mobile-padding tablet-padding thickpad-topbottom">' + cookieAnalyticsMessage + cookieAccept + cookieDecline + '<a href="' + cookieWhatAreTheyLink + '" title="Visit All about cookies (External link)">' + cookieWhatAreLinkText + '</a></div></div>');
                }
            }
            if (cookiePolicyPage) { // show policy page overlay
                if (appOrPre) {
                    $('body').append('<div class="cc-cookies ' + cookieOverlay + '"><div class="notices mobile-padding tablet-padding thickpad-topbottom">' + cookiePolicyPageMessage + " " + ' <a href="#accept" class="cc-cookie-accept">' + cookieAcceptButtonText + '</a> ' + ' <a href="#decline" class="cc-cookie-decline">' + cookieDeclineButtonText + '</a> ' + '</div></div>');
                } else {
                    $('body').prepend('<div class="cc-cookies ' + cookieOverlay + '"><div class="notices mobile-padding tablet-padding thickpad-topbottom">' + cookiePolicyPageMessage + " " + ' <a href="#accept" class="cc-cookie-accept">' + cookieAcceptButtonText + '</a> ' + ' <a href="#decline" class="cc-cookie-decline">' + cookieDeclineButtonText + '</a> ' + '</div></div>');
                }
            } else if ((!cookieAnalytics) && (!cookieDiscreetLink)) { // show privacy policy option
                if (appOrPre) {
                    $('body').append('<div class="cc-cookies ' + cookieOverlay + '"><div class="notices mobile-padding tablet-padding thickpad-topbottom">' + cookieMessage + cookieAccept + cookieDecline + '</div></div>');
                } else {
                    $('body').prepend('<div class="cc-cookies ' + cookieOverlay + '"><div class="notices mobile-padding tablet-padding thickpad-topbottom">' + cookieMessage + cookieAccept + cookieDecline + '</div></div>');
                }
            }
        }
        if ((cookieCutter) && (!cookieCutterDeclineOnly) && (($cookieDeclined) || (!$cookieAccepted))) {
            $(cookieDisable).html('<div class="cc-cookies-error"><div class="notices mobile-padding tablet-padding thickpad-topbottom">' + cookieErrorMessage + ' <a href="#accept" class="cc-cookie-accept">' + cookieAcceptButtonText + '</a> ' + '</div></div>');
        }
        if ((cookieCutter) && (cookieCutterDeclineOnly) && ($cookieDeclined)) {
            $(cookieDisable).html('<div class="cc-cookies-error"><div class="notices mobile-padding tablet-padding thickpad-topbottom">' + cookieErrorMessage + ' <a href="#accept" class="cc-cookie-accept">' + cookieAcceptButtonText + '</a> ' + '</div></div>');
        }
        // if bottom is true, switch div to bottom if not in discreet mode
        if ((cookieNotificationLocationBottom) && (!cookieDiscreetLink)) {
            $('div.cc-cookies').css("top", "auto");
            $('div.cc-cookies').css("bottom", "0");
        }
        if ((cookieNotificationLocationBottom) && (cookieDiscreetLink) && (cookiePolicyPage)) {
            $('div.cc-cookies').css("top", "auto");
            $('div.cc-cookies').css("bottom", "0");
        }
        // setting the cookies

        // for top bar
        $('.cc-cookie-accept, .cc-cookie-decline').click(function (e) {
            e.preventDefault();
            if ($(this).is('[href$=#decline]')) {
                $.cookie("cc_cookie_accept", null, {
                    path: '/'
                });
                $.cookie("cc_cookie_decline", "cc_cookie_decline", {
                    expires: cookieExpires,
                    path: '/'
                });
                if (options.cookieDomain) {
                    // kill google analytics cookies
                    $.cookie("__utma", null, {
                        domain: '.' + options.cookieDomain,
                        path: '/'
                    });
                    $.cookie("__utmb", null, {
                        domain: '.' + options.cookieDomain,
                        path: '/'
                    });
                    $.cookie("__utmc", null, {
                        domain: '.' + options.cookieDomain,
                        path: '/'
                    });
                    $.cookie("__utmz", null, {
                        domain: '.' + options.cookieDomain,
                        path: '/'
                    });
                }
            } else {
                $.cookie("cc_cookie_decline", null, {
                    path: '/'
                });
                $.cookie("cc_cookie_accept", "cc_cookie_accept", {
                    expires: cookieExpires,
                    path: '/'
                });
            }
            $(".cc-cookies").fadeOut(function () {
                // reload page to activate cookies
                //location.reload();
            });
        });
        //reset cookies
        $('a.cc-cookie-reset').click(function (f) {
            f.preventDefault();
            $.cookie("cc_cookie_accept", null, {
                path: '/'
            });
            $.cookie("cc_cookie_decline", null, {
                path: '/'
            });
            $(".cc-cookies").fadeOut(function () {
                // reload page to activate cookies
                //location.reload();
            });
        });
        //cookie error accept
        $('.cc-cookies-error a.cc-cookie-accept').click(function (g) {
            g.preventDefault();
            $.cookie("cc_cookie_accept", "cc_cookie_accept", {
                expires: cookieExpires,
                path: '/'
            });
            $.cookie("cc_cookie_decline", null, {
                path: '/'
            });
            // reload page to activate cookies
            //location.reload();
        });
        function checkCookieCuttrActive() {
            if(jQuery('.cc-cookies').length){
                jQuery('.cc-cookies').fadeOut(5000);
            }
        }
        setTimeout(checkCookieCuttrActive, 10000);
    };
})(jQuery);