s7sdk.pkg("s7sdk.common");s7sdk.Util.require("s7sdk.event.Event");if(!s7sdk.common.ContainerControl){s7sdk.common.ContainerControl=function(a){arguments.callee.superclass.apply(this,[null,null,null,null,null]);this.component=a;this.parentId=a.pid;this.compId=a.getId();this.storedStyles={};this.dynamicModifiers=null;this.listenerProxy={};s7sdk.Util.borrowMethods(this.component,this,s7sdk.common.ContainerControl.NS);a.settings.registerComponent(this)};s7sdk.common.ContainerControl.NS="s7sdk.common.ContainerControl";s7sdk.common.ContainerControl.prototype.setCSS=function(c,b,a){if(this.component){this.component.setCSS(c,b,a);this.dispatchEvent(new s7sdk.event.ControlComponentEvent(s7sdk.event.ControlComponentEvent.NOTF_CONTROLCOMPONENT_CSSUPDATED,{classname:c,property:b,value:a},false))}};s7sdk.common.ContainerControl.prototype.setModifier=function(b,e){if(this.component){if(b==="stagesize"){var a,c,f;var f=this.component.settings.get("stagesize");var d=e.split(",");if(d&&d.length){a=parseInt(d[0]);c=parseInt(d[1]);this.component.resize(a,c)}else{this.component.setModifier(b,e)}this.dispatchEvent(new s7sdk.event.ControlComponentEvent(s7sdk.event.ControlComponentEvent.NOTF_CONTROLCOMPONENT_MODIFIERUPDATED,{oldvalue:f,newvalue:a+","+c,property:b},false))}else{if(b==="aspect"){var f=this.component.settings.get("aspect");if(e){this.component.setAspect(e)}else{this.component.setModifier(b,e)}this.dispatchEvent(new s7sdk.event.ControlComponentEvent(s7sdk.event.ControlComponentEvent.NOTF_CONTROLCOMPONENT_MODIFIERUPDATED,{oldvalue:f,newvalue:e,property:b},false))}}}};s7sdk.common.ContainerControl.prototype.unload=function(){};s7sdk.common.ContainerControl.prototype.rebuild=function(){}}s7sdk.Class.inherits(s7sdk.common.ContainerControl.NS,"s7sdk.UIComponent");if(!s7sdk.common.Container){s7sdk.common.Container=function Container(g,c,j){var f=!!arguments[3];s7sdk.Logger.log(s7sdk.Logger.CONFIG,"s7sdk.common.Container constructor - containerId: %0, settings: %1 , compId: %2",g,c,j);arguments.callee.superclass.apply(this,[j,g,"div","s7container",c,!f]);var f=!!arguments[3];this.settings=c;this.hasCustomSize_=true;this.container=s7sdk.Util.byId(g);this.isPopup_=false;function h(l){var i=new RegExp("^\\s*$","gi").test(l);return !i}if(!this.container||this.container.parentNode==document.body){var b=document.body.childNodes;var k=false;for(var d=0;d<b.length;d++){if(this.container&&this.container==b[d]){continue}switch(b[d].nodeType){case 1:if(b[d].tagName&&b[d].getAttribute&&(b[d].tagName.toLowerCase()=="script"||b[d].tagName.toLowerCase()=="style"||(b[d].getAttribute("data-description")=="Scene7ComponentHolder"&&b[d].tagName.toLowerCase()=="span"))){continue}else{k=true}break;case 3:if(h(b[d].nodeValue)){k=true}break}if(k){break}}this.isPopup_=!k}this.wid=this.stagesize.width;this.hei=this.stagesize.height;this.vendorPrefix=this.getVendorPrefix();this.storedPosition=null;if(this.wid==0||this.hei==0){this.wid=this.size.width;this.hei=this.size.height}this.isFixedSize_=false;this.responsive_wh=this.checkRelativeCssWH("s7container s7supressminsize",this.id,null,this.container);this.responsive={};this.responsive.aspect=this.aspect;this.responsive.freeRatio=this.aspect==0;this.responsive.fixedSize=false;if(this.wid!=0||this.hei!=0){this.responsive.fixedSize=true;this.responsive.freeRatio=true}if((this.wid!=0&&this.hei!=0)||(!this.responsive_wh.w&&!this.responsive_wh.h)){this.isFixedSize_=true}if(!this.responsive.freeRatio&&!this.responsive_wh.w){this.isFixedSize_=true}s7sdk.Logger.log(s7sdk.Logger.FINE,"s7sdk.common.Container responsive enabled: %0, freeRatio: %1",this.responsive.enabled,this.responsive.freeRatio);var e=this;var a=setInterval(function(){e.onCheckSize()},50);this.storedWidth=this.wid;this.storedHeight=this.hei;this.inFullScreen=false;this.fullScreenRequested=false;this.init();if(this.responsive.fixedSize){this.obj.style.width=this.wid+"px";this.obj.style.height=this.hei+"px"}this.obj.style.boxSizing="content-box";if((s7sdk.browser.name=="ie")&&(s7sdk.browser.version.minor<=8)&&!this.responsive.freeRatio){this.obj.style.height=1+"px"}this.onCheckSize();this.obj.style.boxSizing="";if(!f){return new s7sdk.common.ContainerControl(this)}else{return this}};s7sdk.Class.inherits("s7sdk.common.Container","s7sdk.UIComponent");s7sdk.common.Container.prototype.getComponent=function(){return this};s7sdk.common.Container.prototype.setCSS=function(c,b,a){this.superproto.setCSS.apply(this,[c,b,a])};s7sdk.common.Container.prototype.setModifier=function(a){throw new Error("Trying to use setModifier on the Core class (Container) is unsupported! Please refer to SDK documentation on using setModifier.")};s7sdk.common.Container.prototype.modifiers={stagesize:{params:["width","height"],defaults:[0,0],ranges:["0:","0:"]},aspect:{params:["ratio"],defaults:[0],ranges:["0:"]},size:{params:["width","height"],defaults:[0,0],ranges:["0:","0:"],deprecated:true}};s7sdk.common.Container.prototype.getWH=function(c,a){var b=s7sdk.Util.getStyle(c,a);if(b.indexOf("%")!=-1||b=="auto"){var e,d;if(a=="height"){e=c.offsetHeight;c.style.height=e+"px";d=c.offsetHeight}else{e=c.offsetWidth;c.style.width=e+"px";d=c.offsetWidth}b=2*e-d}return b.toString().indexOf("px")!=-1?b:b+"px"};s7sdk.common.Container.prototype.getCssWH=function(d,a,h,e,b,c){var g="";if(s7sdk.browser.name==="ie"&&s7sdk.browser.version.major<9){var f=s7sdk.Util.createElement("div",c);b=(b&&s7sdk.Util.isElement(b))?b:document.body;f.className=d;if(h&&h.length>0){f.setAttribute("id",h)}b.appendChild(f);g=this.getWH(f,a,g);b.removeChild(f)}else{g=s7sdk.Util.css.getCss(d,a,h,e,b,c)}return g};s7sdk.common.Container.prototype.checkRelativeCssWH=function(i,d,b,c,f){var k,g;var e={};if(s7sdk.browser.name==="ie"&&s7sdk.browser.version.major<9){k=s7sdk.Util.css.getCss(i,"width",d,b,c,f);e.w=k.indexOf("%")!=-1;g=s7sdk.Util.css.getCss(i,"height",d,b,c,f);e.h=g.indexOf("%")!=-1}else{var j=s7sdk.Util.createElement("div",f);c=(c&&s7sdk.Util.isElement(c))?c:document.body;j.className=i;if(d&&d.length>0){j.setAttribute("id",d)}var a=document.createElement("div");a.style.position="absolute";e.origW=this.getWH(c,"width");e.origH=this.getWH(c,"height");a.style.width="100px";a.style.height="100px";a.style.backgroundColor="#ff6060";c.appendChild(a);a.appendChild(j);k=this.getWH(j,"width");a.style.width="200px";e.w=k!=this.getWH(j,"width");k=this.getWH(j,"height");a.style.height="200px";e.h=k!=this.getWH(j,"height");a.removeChild(j);c.removeChild(a)}return e};s7sdk.common.Container.prototype.invalidate=function(a){this.ssb=null;this.prewW=this.resH=this.resW=-1;this.onCheckSize(a)};s7sdk.common.Container.prototype.onCheckSize=function(d){var f=this.obj.clientWidth;var b=this.obj.clientHeight;if(this.prewW!=f){if(!this.inFullScreen){if(!this.responsive.freeRatio){var g=this.hasVerticalScroll().vScrollbar;if(this.ssb&&this.ssb.min){if(this.ssb.min<=f&&f<=this.ssb.max&&Math.abs(this.prewW-f)<=this.ssb.w){if(this.resW!=f||this.resH!=b){this.resW=f;this.resH=b;if(!d){this.dispatchEvent(new s7sdk.event.ResizeEvent(s7sdk.event.ResizeEvent.COMPONENT_RESIZE,f,b,false))}}return}}b=Math.round(f/this.responsive.aspect);if(b<this.minhei){if(this.obj.style.height!=(this.minhei+"px")){this.obj.style.height=this.minhei+"px"}b=this.minhei}this.obj.style.height=b+"px";var j=this.obj.offsetHeight;this.obj.style.maxHeight="none";var c=this.obj.offsetHeight;this.obj.style.maxHeight="";if(j!=c){f=Math.round(j*this.responsive.aspect);this.obj.style.maxWidth=f+"px";f=this.obj.clientWidth}var i=this.hasVerticalScroll().vScrollbar;if(!this.ssb&&i){this.ssb={};var e=(s7sdk.browser.name==="ie"&&s7sdk.browser.version.major<9)?document.body:document.documentElement;var a=e.offsetWidth;e.style.overflow="hidden";this.ssb.w=e.offsetWidth-a+2;e.style.overflow=""}if(this.ssb&&g!=i){this.ssb.max=f+this.ssb.w;this.ssb.min=f-this.ssb.w}}this.prewW=f=this.obj.clientWidth;b=this.obj.clientHeight}}if(this.resW!=f||this.resH!=b){this.resW=f;this.resH=b;if(!d){this.dispatchEvent(new s7sdk.event.ResizeEvent(s7sdk.event.ResizeEvent.COMPONENT_RESIZE,f,b,false))}}};s7sdk.common.Container.prototype.hasVerticalScroll=function(){var a={vScrollbar:true,hScrollbar:true};try{var b=document.compatMode=="BackCompat"?document.body:document.documentElement;a.vScrollbar=b.scrollHeight>b.clientHeight;a.hScrollbar=b.scrollWidth>b.clientWidth}catch(c){}return a};s7sdk.common.Container.prototype.init=function(){var a=this.getParent();this.createElement();if(typeof this.obj!="undefined"){this.obj.style.position="relative";a.appendChild(this.obj);this.resize(this.wid,this.hei);s7sdk.Window.attach(this,"resizeByWindow")}};s7sdk.common.Container.prototype.resizeByWindow=function(a,b){if(!this.inFullScreen){this.dispatchEvent(new s7sdk.event.ResizeEvent(s7sdk.event.ResizeEvent.WINDOW_RESIZE,a,b,false));return}if(!this.hasCustomSize_){window.scrollTo(0,1);this.resize(a,b)}else{if(this.inFullScreen){this.commonresize(a,b,false);this.moveToTopLeft()}}this.dispatchEvent(new s7sdk.event.ResizeEvent(s7sdk.event.ResizeEvent.WINDOW_RESIZE,a,b,false));if((s7sdk.browser.name=="ie")&&(s7sdk.browser.version.minor>5.5)&&(s7sdk.browser.version.minor<=8)){s7sdk.Window.ignoreNextResize=true}};s7sdk.common.Container.prototype.resize=function(a,b){if(this.wid!=a||this.hei!=b){this.responsive.fixedSize=true;this.responsive.freeRatio=true;this.wid=a;this.hei=b;this.obj.style.width=this.wid+"px";this.obj.style.height=this.hei+"px";this.commonresize(a,b)}};s7sdk.common.Container.prototype.commonresize=function(a,c,b){s7sdk.Logger.log(s7sdk.Logger.FINE,"s7sdk.common.Container.commonresize - w: %0, h: %1",a,c);if(s7sdk.Util.isNumber(a)&&s7sdk.Util.isNumber(c)){this.storedWidth=a;this.storedHeight=c;this.wid=a;this.hei=c;if(b){this.obj.style.width="";this.obj.style.height="";if((s7sdk.browser.name=="ie")&&(s7sdk.browser.version.minor<=8)&&!this.responsive.freeRatio){this.obj.style.height=1+"px"}}else{this.obj.style.width=a+"px";this.obj.style.height=c+"px"}this.ssb=null;this.prewW=this.resH=this.resW=-1;if(!b){this.dispatchEvent(new s7sdk.event.ResizeEvent(s7sdk.event.ResizeEvent.COMPONENT_RESIZE,a,c,false))}if((s7sdk.browser.name=="ie")&&(s7sdk.browser.version.minor>5.5)&&(s7sdk.browser.version.minor<=8)){s7sdk.Window.ignoreNextResize=true}}s7sdk.UIComponent.prototype.resize.apply(this,[a,c])};s7sdk.common.Container.prototype.getVendorPrefix=function(){var b=/^(Moz|Webkit|Khtml|O|ms)(?=[A-Z])/;var a=document.getElementsByTagName("script")[0];for(var c in a.style){if(b.test(c)){return c.match(b)[0]}}if("WebkitOpacity" in a.style){return"Webkit"}if("KhtmlOpacity" in a.style){return"Khtml"}return""};s7sdk.common.Container.prototype.supportsNativeFullScreen=function(){var a=false;if(typeof document.cancelFullScreen!="undefined"){a=true}else{if(typeof document[this.vendorPrefix.toLowerCase()+"CancelFullScreen"]!="undefined"){a=true}}return a};s7sdk.common.Container.prototype.requestFullScreen=function(){if(!this.fullScreenRequested&&!this.isFullScreen()){s7sdk.Logger.log(s7sdk.Logger.FINE,"s7sdk.common.Container.requestFullScreen");var a,d;this.fullScreenRequested=true;this.storedPosition=new Object();if(this.supportsNativeFullScreen()){var b=this;function c(f){if(b.isFullScreen()){b.inFullScreen=true;b.storedPosition.top=b.obj.style.top;b.storedPosition.left=b.obj.style.left;b.storedPosition.width=Number(b.obj.style.width.replace(/[^-\d\.]/g,""));b.storedPosition.height=Number(b.obj.style.height.replace(/[^-\d\.]/g,""));b.obj.style.top="0px";b.obj.style.left="0px";b.obj.style.width="100%";b.obj.style.height="100%";b.obj.style.maxHeight="none";b.obj.style.maxWidth="none";a=b.obj.offsetWidth;d=b.obj.offsetHeight;b.dispatchEvent(new s7sdk.event.ResizeEvent(s7sdk.event.ResizeEvent.COMPONENT_RESIZE,a,d,false));b.dispatchEvent(new s7sdk.event.ResizeEvent(s7sdk.event.ResizeEvent.FULLSCREEN_RESIZE,a,d,false))}else{b.inFullScreen=false;b.fullScreenRequested=false;b.obj.style.maxHeight="";b.obj.style.maxWidth="";b.obj.style.top="";b.obj.style.left="";b.ssb=undefined;if(b.responsive.fixedSize){b.obj.style.width=b.storedPosition.width+"px";b.obj.style.height=b.storedPosition.height+"px";b.responsive.freeRatio=true}else{b.obj.style.width="";b.obj.style.height=""}s7sdk.Util.css.setCSSAttributeSelector(b.obj,"mode","normal");s7sdk.Event.removeDOMListener(document,b.vendorPrefix.toLowerCase()+"fullscreenchange",c,true);b.invalidate(false);b.dispatchEvent(new s7sdk.event.ResizeEvent(s7sdk.event.ResizeEvent.FULLSCREEN_RESIZE,b.getWidth(),b.getHeight(),false))}}s7sdk.Event.addDOMListener(document,this.vendorPrefix.toLowerCase()+"fullscreenchange",c,true);this.vendorPrefix===""?this.obj.requestFullScreen():this.obj[this.vendorPrefix.toLowerCase()+"RequestFullScreen"]()}else{this.inFullScreen=true;if("ontouchstart" in window){s7sdk.Event.addDOMListener(document.body,"touchmove",this.preventScroll,false)}this.storedPosition.scrollBody=document.body.style.overflow;this.storedPosition.scrollBodyX=document.body.style.overflowX;this.storedPosition.scrollBodyY=document.body.style.overflowY;this.storedPosition.position=this.obj.style.position;this.storedPosition.left=this.obj.style.left;this.storedPosition.top=this.obj.style.top;this.obj.style.maxHeight="none";this.obj.style.maxWidth="none";this.storedPosition.width=Number(this.getWH(this.obj,"width").replace("px",""));this.storedPosition.height=Number(this.getWH(this.obj,"height").replace("px",""));var e=s7sdk.browser.device;a=s7sdk.browser.detectScreen().w;d=s7sdk.browser.detectScreen().h;document.body.style.overflow="hidden";this.moveToTopLeft();if((e.name=="ipad"||e.name=="iphone")&&s7sdk.browser.detectScreen().w==981){a-=1}this.commonresize(a,d,false);this.dispatchEvent(new s7sdk.event.ResizeEvent(s7sdk.event.ResizeEvent.FULLSCREEN_RESIZE,a,d,false))}}};s7sdk.common.Container.prototype.preventScroll=function(a){var a=a||window.event;s7sdk.Event.preventDefault(a)};s7sdk.common.Container.prototype.isMobile=function(){var a=navigator.userAgent.toLowerCase();return(a.match(/(iphone|ipod|ipad|android)/))};s7sdk.common.Container.prototype.moveToTopLeft=function(){s7sdk.Util.css.setCSSAttributeSelector(this.obj,"mode","fullscreen");var b=parseInt(s7sdk.Util.getStyle(this.obj,"left"));var e=parseInt(s7sdk.Util.getStyle(this.obj,"top"));b=s7sdk.Util.isNumber(b)?b:-parseInt(s7sdk.Util.getStyle(this.obj,"right"));e=s7sdk.Util.isNumber(e)?e:-parseInt(s7sdk.Util.getStyle(this.obj,"bottom"));b=s7sdk.Util.isNumber(b)?b:0;e=s7sdk.Util.isNumber(e)?e:0;var c=this.obj.getBoundingClientRect();var a=c.left-b;var d=c.top-e;this.obj.style.left=-a+"px";this.obj.style.top=-d+"px"};s7sdk.common.Container.prototype.cancelFullScreen=function(){this.fullScreenRequested=false;if(this.isFullScreen()){s7sdk.Logger.log(s7sdk.Logger.FINE,"s7sdk.common.Container.cancelFullScreen");this.inFullScreen=false;if(this.supportsNativeFullScreen()){this.vendorPrefix===""?document.cancelFullScreen():document[this.vendorPrefix.toLowerCase()+"CancelFullScreen"]()}else{if("ontouchstart" in window){s7sdk.Event.removeDOMListener(document.body,"touchmove",this.preventScroll,false)}document.body.style.overflow=this.storedPosition.scrollBody;document.body.style.overflowX=this.storedPosition.scrollBodyX;document.body.style.overflowY=this.storedPosition.scrollBodyY;s7sdk.Util.css.setCSSAttributeSelector(this.obj,"mode","normal");this.obj.style.position=this.storedPosition.position;this.obj.style.left=this.storedPosition.left;this.obj.style.top=this.storedPosition.top;if(this.responsive.fixedSize){this.responsive.freeRatio=true}this.obj.style.maxHeight="";this.obj.style.maxWidth="";this.commonresize(this.storedPosition.width,this.storedPosition.height,this.responsive.fixedSize?false:true);this.invalidate(false);this.dispatchEvent(new s7sdk.event.ResizeEvent(s7sdk.event.ResizeEvent.FULLSCREEN_RESIZE,this.getWidth(),this.getHeight(),false))}}};s7sdk.common.Container.prototype.isFullScreen=function(){s7sdk.Logger.log(s7sdk.Logger.FINE,"s7sdk.common.Container.isFullScreen");var a;switch(this.vendorPrefix.toLowerCase()){case"":a=document.fullScreen;break;case"webkit":a=document.webkitIsFullScreen;break;default:a=document[this.vendorPrefix.toLowerCase()+"FullScreen"]}return(typeof a!="undefined"?a:this.inFullScreen)};s7sdk.common.Container.prototype.addEventListener=function(c,b,a){s7sdk.Logger.log(s7sdk.Logger.FINE,"s7sdk.common.Container.addEventListener - type: %0, handler: %1, useCapture: %2",c,b.toString().substring(0,b.toString().indexOf("(")),a);s7sdk.Base.prototype.addEventListener.apply(this,[c,b,a])};s7sdk.common.Container.prototype.getWidth=function(){if(this.resW<=0){this.onCheckSize(true)}return this.resW};s7sdk.common.Container.prototype.getHeight=function(){if(this.resH<=0){this.onCheckSize(true)}return this.resH};s7sdk.common.Container.prototype.hasCustomSize=function(){return this.hasCustomSize_};s7sdk.common.Container.prototype.isFixedSize=function(){return this.isFixedSize_};s7sdk.common.Container.prototype.isPopup=function(){return this.isPopup_};s7sdk.common.Container.prototype.setAspect=function(a){this.responsive.aspect=a;this.responsive.freeRatio=a==0;this.invalidate(false)};s7sdk.Container=s7sdk.common.Container;(function addDefaultCSS(){var a=s7sdk.Util.css.createCssRuleText(".s7container",{width:"100%",height:"100%"})+s7sdk.Util.css.createCssRuleText(".s7supressminsize",{padding:"0px !important",border:"0px !important","min-width":"0px !important","min-height":"0px !important"})+s7sdk.Util.css.createCssRuleText(".s7container[mode='fullscreen']",{"z-index":"9900",border:"0px !important",margin:"0px !important",padding:"0px !important"});s7sdk.Util.css.addDefaultCSS(a,"Container")})()};