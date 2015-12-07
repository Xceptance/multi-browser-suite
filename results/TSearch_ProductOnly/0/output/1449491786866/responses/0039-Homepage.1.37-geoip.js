//SET COOKIE FUNCTION
function setCookie(name,value) {
	var exdays 	= 1;
	var d 		= new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = name+"="+value+"; "+expires;
}

//DELETE COOKIE
function deleteCookie(name) {
  var cookie_date = new Date ( );  // current date & time
  cookie_date.setTime ( cookie_date.getTime() - 1 );
  document.cookie = name += "=; expires=" + cookie_date.toGMTString();
}

//READ COOKIE
function getCookie(name) {
	var name = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++){
	  var c = ca[i].trim();
	  if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	}
	return "";
}

//MAIN GEOIP FUNCTION
function GEOIP() {
	
	//CHECK IF GEOIP CALL WAS MADE IF NOT RUN POLICY
	//PRODUCTION
	var geoip_set		= getCookie('GEOIP_set');
	var geoip_redirect	= getCookie('GEOIP_redirect');
	//DEVELOPMENT
	//var geoip_set		= '';
	//var geoip_redirect  = '';
	
	//IF REDIRECT IS ALREADY STORED
	if(geoip_redirect) {
		window.location.replace(geoip_redirect);
	}
	
	if(geoip_set) {		
		
		//DO NOTHING
		
	} else {
	
		//USER AGENT
		var source		 = navigator.userAgent;
			
		//LOAD UAPARSER
		(function(e,t){"use strict";var n="",r="?",i="function",s="undefined",o="object",u="major",a="model",f="name",l="type",c="vendor",h="version",p="console",d="mobile",v="tablet",m={has:function(e,t){return t.toLowerCase().indexOf(e.toLowerCase())!==-1}},g={rgx:function(){for(var e,n=0,r,u,a,f,l,c,h=arguments;n<h.length;n+=2){var p=h[n],d=h[n+1];if(typeof e===s){e={};for(a in d)f=d[a],typeof f===o?e[f[0]]=t:e[f]=t}for(r=u=0;r<p.length;r++){l=p[r].exec(this.getUA());if(!!l){for(a in d)c=l[++u],f=d[a],typeof f===o&&f.length>0?f.length==2?e[f[0]]=f[1]:f.length==3&&(typeof f[1]===i&&(!f[1].exec||!f[1].test)?e[f[0]]=c?f[1].call(this,c,f[2]):t:e[f[0]]=c?c.replace(f[1],f[2]):t):e[f]=c?c:t;break}}if(!!l)break}return e},str:function(e,n){for(var i in n)if(typeof n[i]===o&&n[i].length>0){for(var s in n[i])if(m.has(n[i][s],e))return i===r?t:i}else if(m.has(n[i],e))return i===r?t:i;return e}},y={browser:{oldsafari:{major:{1:["/8","/1","/3"],2:"/4","?":"/"},version:{"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}}},device:{sprint:{model:{"Evo Shift 4G":"7373KT"},vendor:{HTC:"APA",Sprint:"Sprint"}}},os:{windows:{version:{ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",RT:"ARM"}}}},b={browser:[[/(opera\smini)\/((\d+)?[\w\.-]+)/i,/(opera\s[mobiletab]+).+version\/((\d+)?[\w\.-]+)/i,/(opera).+version\/((\d+)?[\w\.]+)/i,/(opera)[\/\s]+((\d+)?[\w\.]+)/i],[f,h,u],[/\s(opr)\/((\d+)?[\w\.]+)/i],[[f,"Opera"],h,u],[/(kindle)\/((\d+)?[\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?((\d+)?[\w\.]+)*/i,/(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?((\d+)?[\w\.]*)/i,/(?:ms|\()(ie)\s((\d+)?[\w\.]+)/i,/(rekonq)((?:\/)[\w\.]+)*/i,/(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt)\/((\d+)?[\w\.-]+)/i],[f,h,u],[/(yabrowser)\/((\d+)?[\w\.]+)/i],[[f,"Yandex"],h,u],[/(comodo_dragon)\/((\d+)?[\w\.]+)/i],[[f,/_/g," "],h,u],[/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?((\d+)?[\w\.]+)/i],[f,h,u],[/(dolfin)\/((\d+)?[\w\.]+)/i],[[f,"Dolphin"],h,u],[/((?:android.+)crmo|crios)\/((\d+)?[\w\.]+)/i],[[f,"Chrome"],h,u],[/version\/((\d+)?[\w\.]+).+?mobile\/\w+\s(safari)/i],[h,u,[f,"Mobile Safari"]],[/version\/((\d+)?[\w\.]+).+?(mobile\s?safari|safari)/i],[h,u,f],[/webkit.+?(mobile\s?safari|safari)((\/[\w\.]+))/i],[f,[u,g.str,y.browser.oldsafari.major],[h,g.str,y.browser.oldsafari.version]],[/(konqueror)\/((\d+)?[\w\.]+)/i,/(webkit|khtml)\/((\d+)?[\w\.]+)/i],[f,h,u],[/(navigator|netscape)\/((\d+)?[\w\.-]+)/i],[[f,"Netscape"],h,u],[/(swiftfox)/i,/(iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?((\d+)?[\w\.\+]+)/i,/(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/((\d+)?[\w\.-]+)/i,/(mozilla)\/((\d+)?[\w\.]+).+rv\:.+gecko\/\d+/i,/(uc\s?browser|polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf)[\/\s]?((\d+)?[\w\.]+)/i,/(links)\s\(((\d+)?[\w\.]+)/i,/(gobrowser)\/?((\d+)?[\w\.]+)*/i,/(ice\s?browser)\/v?((\d+)?[\w\._]+)/i,/(mosaic)[\/\s]((\d+)?[\w\.]+)/i],[f,h,u]],device:[[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i],[a,c,[l,v]],[/(hp).+(touchpad)/i,/(kindle)\/([\w\.]+)/i,/\s(nook)[\w\s]+build\/(\w+)/i,/(dell)\s(strea[kpr\s\d]*[\dko])/i],[c,a,[l,v]],[/\((ip[honed]+);.+(apple)/i],[a,c,[l,d]],[/(blackberry)[\s-]?(\w+)/i,/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola)[\s_-]?([\w-]+)*/i,/(hp)\s([\w\s]+\w)/i,/(asus)-?(\w+)/i],[c,a,[l,d]],[/\((bb10);\s(\w+)/i],[[c,"BlackBerry"],a,[l,d]],[/android.+((transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+))/i],[[c,"Asus"],a,[l,v]],[/(sony)\s(tablet\s[ps])/i],[c,a,[l,v]],[/(nintendo)\s([wids3u]+)/i],[c,a,[l,p]],[/((playstation)\s[3portablevi]+)/i],[[c,"Sony"],a,[l,p]],[/(sprint\s(\w+))/i],[[c,g.str,y.device.sprint.vendor],[a,g.str,y.device.sprint.model],[l,d]],[/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i,/(zte)-(\w+)*/i,/(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i],[c,[a,/_/g," "],[l,d]],[/\s((milestone|droid[2x]?))[globa\s]*\sbuild\//i,/(mot)[\s-]?(\w+)*/i],[[c,"Motorola"],a,[l,d]],[/android.+\s((mz60\d|xoom[\s2]{0,2}))\sbuild\//i],[[c,"Motorola"],a,[l,v]],[/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n8000|sgh-t8[56]9))/i],[[c,"Samsung"],a,[l,v]],[/((s[cgp]h-\w+|gt-\w+|galaxy\snexus))/i,/(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i,/sec-((sgh\w+))/i],[[c,"Samsung"],a,[l,d]],[/(sie)-(\w+)*/i],[[c,"Siemens"],a,[l,d]],[/(maemo|nokia).*(n900|lumia\s\d+)/i,/(nokia)[\s_-]?([\w-]+)*/i],[[c,"Nokia"],a,[l,d]],[/android\s3\.[\s\w-;]{10}((a\d{3}))/i],[[c,"Acer"],a,[l,v]],[/android\s3\.[\s\w-;]{10}(lg?)-([06cv9]{3,4})/i],[[c,"LG"],a,[l,v]],[/((nexus\s4))/i,/(lg)[e;\s-\/]+(\w+)*/i],[[c,"LG"],a,[l,d]],[/(mobile|tablet);.+rv\:.+gecko\//i],[l,c,a]],engine:[[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,/(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,/(icab)[\/\s]([23]\.[\d\.]+)/i],[f,h],[/rv\:([\w\.]+).*(gecko)/i],[h,f]],os:[[/(windows)\snt\s6\.2;\s(arm)/i,/(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],[f,[h,g.str,y.os.windows.version]],[/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],[[f,"Windows"],[h,g.str,y.os.windows.version]],[/\((bb)(10);/i],[[f,"BlackBerry"],h],[/(blackberry)\w*\/?([\w\.]+)*/i,/(tizen)\/([\w\.]+)/i,/(android|webos|palm\os|qnx|bada|rim\stablet\sos|meego)[\/\s-]?([\w\.]+)*/i],[f,h],[/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i],[[f,"Symbian"],h],[/mozilla.+\(mobile;.+gecko.+firefox/i],[[f,"Firefox OS"],h],[/(nintendo|playstation)\s([wids3portablevu]+)/i,/(mint)[\/\s\(]?(\w+)*/i,/(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk)[\/\s-]?([\w\.-]+)*/i,/(hurd|linux)\s?([\w\.]+)*/i,/(gnu)\s?([\w\.]+)*/i],[f,h],[/(cros)\s[\w]+\s([\w\.]+\w)/i],[[f,"Chromium OS"],h],[/(sunos)\s?([\w\.]+\d)*/i],[[f,"Solaris"],h],[/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i],[f,h],[/(ip[honead]+)(?:.*os\s*([\w]+)*\slike\smac|;\sopera)/i],[[f,"iOS"],[h,/_/g,"."]],[/(mac\sos\sx)\s?([\w\s\.]+\w)*/i],[f,[h,/_/g,"."]],[/(haiku)\s(\w+)/i,/(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i,/(macintosh|mac(?=_powerpc)|plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos)/i,/(unix)\s?([\w\.]+)*/i],[f,h]]},w=function(t){var r=t||(e&&e.navigator&&e.navigator.userAgent?e.navigator.userAgent:n);if(!(this instanceof w))return(new w(t)).getResult();this.getBrowser=function(){return g.rgx.apply(this,b.browser)},this.getDevice=function(){return g.rgx.apply(this,b.device)},this.getEngine=function(){return g.rgx.apply(this,b.engine)},this.getOS=function(){return g.rgx.apply(this,b.os)},this.getResult=function(){return{browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice()}},this.getUA=function(){return r},this.setUA=function(e){return r=e,this},this.setUA(r)};if(typeof exports!==s)typeof module!==s&&module.exports&&(exports=module.exports=w),exports.UAParser=w;else{e.UAParser=w,typeof define===i&&define.amd&&define(function(){return w});if(typeof e.jQuery!==s){var E=e.jQuery,S=new w;E.ua=S.getResult(),E.ua.get=function(){return S.getUA()},E.ua.set=function(e){S.setUA(e);var t=S.getResult();for(var n in t)E.ua[n]=t[n]}}}})(this);
		var parser = new UAParser();
		parser.setUA(source);

		//PARSE USER AGENT
		var result 	= parser.getResult();
		var url		= document.domain;
		var source  = url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
		
		//SETUP GET STRING
		var gstring	= 	'source='+escape(source)+
						'&dtype='+escape(result.device.type)+
						'&dmodel='+escape(result.device.model)+
						'&bname='+escape(result.browser.name)+
						'&bversion='+escape(result.browser.version)+
						'&oname='+escape(result.os.name)+
						'&oversion='+escape(result.os.version)+
						'&rwidth='+escape(screen.width)+
						'&rheight='+escape(screen.height);
						//console.log(gstring);
		
		//CALL GEOIP API
		var xmlhttp;    
		if (window.XMLHttpRequest) { 
			xmlhttp=new XMLHttpRequest();	//IE7+, Firefox, Chrome, Opera, Safari
		} else  {
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP"); // IE6, IE5
		}
		xmlhttp.onreadystatechange=function() {
			if (xmlhttp.readyState==4 && xmlhttp.status==200) {
				var x = eval('(' + xmlhttp.responseText + ')');
				
				if(x.GEOIP_error) { console.log('GEOIP ERROR: ' + x.GEOIP_error);}
				
				//document.write(x.GEOIP_redirect);
				
				//SETUP COOKIES
				setCookie('GEOIP_set',		true);
				setCookie('GEOIP_ip', 		x.GEOIP_ip);
				setCookie('GEOIP_ccode',	x.GEOIP_ccode);
				setCookie('GEOIP_ccode3', 	x.GEOIP_ccode3);
				setCookie('GEOIP_cname',	x.GEOIP_cname);
				setCookie('GEOIP_region',	x.GEOIP_region);
				setCookie('GEOIP_city',		x.GEOIP_city);
				setCookie('GEOIP_postal',	x.GEOIP_postal);
				setCookie('GEOIP_redirect',	x.GEOIP_redirect);
				
				//CHECK IF REDIRECT
				if(x.GEOIP_redirect) {
					window.location.replace(x.GEOIP_redirect);
				}
			}
		}
		xmlhttp.open("GET","https://geoip.katespade.com/GEOIPv2/geoip.php?"+gstring,true); //AWS SERVER
		xmlhttp.send();
	}
}

GEOIP();