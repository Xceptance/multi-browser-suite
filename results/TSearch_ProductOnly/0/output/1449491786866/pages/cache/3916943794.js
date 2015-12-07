/**
* @fileoverview Venda.Attributes
 * Venda's Attributes functionality incorporates a standardized way of interfacing Attribute Products with the front-end as to make
 * the modification and creation of selection methods easier.
 *
 * The files below will be included dynamicly when required:
 * @requires js/Venda/Attributes/attributeAsset-Dropdown.js
 * @requires js/Venda/Attributes/attributeAsset-Swatch.js
 * @requires js/Venda/Attributes/dropdown.js
 * @requires js/Venda/Attributes/grid.js
 * @requires js/Venda/Attributes/halfswatch.js
 * @requires js/Venda/Attributes/multiAdd2.js
 * @requires js/Venda/Attributes/swatch.js
 *
 * @author Alby Barber <abarber@venda.com>
 * @author Donatas Cereska <DonatasCereska@venda.com>
*/

Venda.namespace('Attributes');
Venda.Attributes = function () {};

/**
* Declares global vars
*/
Venda.Attributes.dataObj = {"atronhand": "","stockstatus": "","stockstatus": "","atrreleaseyr": "","atrmsrp": "","atrsku": "","atrwas": "","atrsell": "","atrsuplsku": "","atrreleasemn": "","atretayr": "","atrreleasedy": "","atretady": "","atretamn": "","atrpublish": "","atrcost": "", "invtuuid": ""};
Venda.Attributes.firstObj 		= 	[];
Venda.Attributes.attsArray 		= 	[];
Venda.Attributes.SwatchURL 		= 	[];
Venda.Attributes.productArr 	= 	[];
Venda.Attributes.minicartData = 	false;

Venda.Attributes.unicodeToHTML = function(obj) {
 var txt, regex;
 txt = JSON.stringify(obj);
 regex = /&[^\s]*;/g;
 txt = txt.replace(regex, function(r) {
  return Venda.Attributes.unicodeHTMLcodes.hasOwnProperty(r) ? unescape(Venda.Attributes.unicodeHTMLcodes[r]) : r;
 });
 obj = JSON.parse(txt);
 return obj;
};

Venda.Attributes.unicodeHTMLcodes = {
	'&Agrave;': '%C0',
	'&Aacute;': '%C1',
	'&Acirc;': '%C2',
	'&Atilde;': '%C3',
	'&Auml;': '%C4',
	'&Aring;': '%C5',
	'&AElig;': '%C6',
	'&Ccedil;': '%C7',
	'&Egrave;': '%C8',
	'&Eacute;': '%C9',
	'&Ecirc;': '%CA',
	'&Euml;': '%CB',
	'&Igrave;': '%CC',
	'&Iacute;': '%CD',
	'&Icirc;': '%CE',
	'&Iuml;': '%CF',
	'&ETH;': '%D0',
	'&Ntilde;': '%D1',
	'&Ograve;': '%D2',
	'&Oacute;': '%D3',
	'&Ocirc;': '%D4',
	'&Otilde;': '%D5',
	'&Ouml;': '%D6',
	'&times;': '%D7',
	'&Oslash;': '%D8',
	'&Ugrave;': '%D9',
	'&Uacute;': '%DA',
	'&Ucirc;': '%DB',
	'&Uuml;': '%DC',
	'&Yacute;': '%DD',
	'&THORN;': '%DE',
	'&szlig;': '%DF',
	'&agrave;': '%E0',
	'&aacute;': '%E1',
	'&acirc;': '%E2',
	'&atilde;': '%E3',
	'&auml;': '%E4',
	'&aring;': '%E5',
	'&aelig;': '%E6',
	'&ccedil;': '%E7',
	'&egrave;': '%E8',
	'&eacute;': '%E9',
	'&ecirc;': '%EA',
	'&euml;': '%EB',
	'&igrave;': '%EC',
	'&iacute;': '%ED',
	'&icirc;': '%EE',
	'&iuml;': '%EF',
	'&eth;': '%F0',
	'&ntilde;': '%F1',
	'&ograve;': '%F2',
	'&oacute;': '%F3',
	'&ocirc;': '%F4',
	'&otilde;': '%F5',
	'&ouml;': '%F6',
	'&divide;': '%F7',
	'&oslash;': '%F8',
	'&ugrave;': '%F9',
	'&uacute;': '%FA',
	'&ucirc;': '%FB',
	'&uuml;': '%FC',
	'&yacute;': '%FD',
	'&thorn;': '%FE',
	'&yuml;': '%FF',
	'&quot;': '%22',
	'&amp;': '%26',
	'&lt;': '%3C',
	'&gt;': '%3E',
	'&nbsp;': '%A0',
	'&iexcl;': '%A1',
	'&cent;': '%A2',
	'&pound;': '%A3',
	'&curren;': '%A4',
	'&yen;': '%A5',
	'&brvbar;': '%A6',
	'&sect;': '%A7',
	'&uml;': '%A8',
	'&copy;': '%A9',
	'&ordf;': '%AA',
	'&laquo;': '%AB',
	'&not;': '%AC',
	'&shy;': '%AD',
	'&reg;': '%AE',
	'&macr;': '%AF',
	'&deg;': '%B0',
	'&plusmn;': '%B1',
	'&sup2;': '%B2',
	'&sup3;': '%B3',
	'&acute;': '%B4',
	'&micro;': '%B5',
	'&para;': '%B6',
	'&middot;': '%B7',
	'&cedil;': '%B8',
	'&sup1;': '%B9',
	'&ordm;': '%BA',
	'&raquo;': '%BB',
	'&frac14;': '%BC',
	'&frac12;': '%BD',
	'&frac34;': '%BE',
	'&iquest;': '%BF',
	'&fnof;': '%u0192',
	'&circ;': '%u02C6',
	'&tilde;': '%u02DC',
	'&ensp;': '%u2002',
	'&emsp;': '%u2003',
	'&thinsp;': '%u2009',
	'&zwnj;': '%u200C',
	'&zwj;': '%u200D',
	'&lrm;': '%u200E',
	'&rlm;': '%u200F',
	'&ndash;': '%u2013',
	'&mdash;': '%u2014',
	'&lsquo;': '%u2018',
	'&rsquo;': '%u2019',
	'&sbquo;': '%u201A',
	'&ldquo;': '%u201C',
	'&rdquo;': '%u201D',
	'&bdquo;': '%u201E',
	'&dagger;': '%u2020',
	'&Dagger;': '%u2021',
	'&bull;': '%u2022',
	'&hellip;': '%u2026',
	'&permil;': '%u2030',
	'&prime;': '%u2032',
	'&Prime;': '%u2033',
	'&lsaquo;': '%u2039',
	'&rsaquo;': '%u203A',
	'&oline;': '%u203E',
	'&frasl;': '%u2044',
	'&euro;': '%u20AC',
	'&image;': '%u2111',
	'&weierp;': '%u2118',
	'&real;': '%u211C',
	'&trade;': '%u2122',
	'&alefsym;': '%u2135',
	'&larr;': '%u2190',
	'&uarr;': '%u2191',
	'&rarr;': '%u2192',
	'&darr;': '%u2193',
	'&harr;': '%u2194',
	'&crarr;': '%u21B5',
	'&lArr;': '%u21D0',
	'&uArr;': '%u21D1',
	'&rArr;': '%u21D2',
	'&dArr;': '%u21D3',
	'&hArr;': '%u21D4',
	'&forall;': '%u2200',
	'&part;': '%u2202',
	'&exist;': '%u2203',
	'&empty;': '%u2205',
	'&nabla;': '%u2207',
	'&isin;': '%u2208',
	'&notin;': '%u2209',
	'&ni;': '%u220B',
	'&prod;': '%u220F',
	'&sum;': '%u2211',
	'&minus;': '%u2212',
	'&lowast;': '%u2217',
	'&radic;': '%u221A',
	'&prop;': '%u221D',
	'&infin;': '%u221E',
	'&ang;': '%u2220',
	'&and;': '%u2227',
	'&or;': '%u2228',
	'&cap;': '%u2229',
	'&cup;': '%u222A',
	'&int;': '%u222B',
	'&there4;': '%u2234',
	'&sim;': '%u223C',
	'&cong;': '%u2245',
	'&asymp;': '%u2248',
	'&ne;': '%u2260',
	'&equiv;': '%u2261',
	'&le;': '%u2264',
	'&ge;': '%u2265',
	'&sub;': '%u2282',
	'&sup;': '%u2283',
	'&nsub;': '%u2284',
	'&sube;': '%u2286',
	'&supe;': '%u2287',
	'&oplus;': '%u2295',
	'&otimes;': '%u2297',
	'&perp;': '%u22A5',
	'&sdot;': '%u22C5',
	'&lceil;': '%u2308',
	'&rceil;': '%u2309',
	'&lfloor;': '%u230A',
	'&rfloor;': '%u230B',
	'&lang;': '%u2329',
	'&rang;': '%u232A',
	'&loz;': '%u25CA',
	'&spades;': '%u2660',
	'&clubs;': '%u2663',
	'&hearts;': '%u2665',
	'&diams;': '%u2666'
};

Venda.Attributes.swapAttrDisplay = function() {
	if(Modernizr.mq('only all and (max-width: 767px)')){
		jQuery('.js-oneProduct').each(function(){
			var uID = this.id.substr(11);
			if(jQuery(this).find('.js-attribute-size').next().is('.js-attribute-color')){
				jQuery(this).find('.js-attribute-size').insertAfter(jQuery(this).find('.js-attribute-color'));
			}
		});
	} else {
		jQuery('.js-oneProduct').each(function(){
			var uID = this.id.substr(11);
			if(jQuery(this).find('.js-attribute-size').prev().is('.js-attribute-color')){
				jQuery(this).find('.js-attribute-size').insertBefore(jQuery(this).find('.js-attribute-color'));
			}
		});
	}
};

Venda.Attributes.Initialize = function() {
	/* init scene7 */

	if(Venda.Attributes.attsArray.length > 0) {
		Venda.Attributes.Declare();
		Venda.Attributes.swapAttrDisplay();
		$(window).on('resize', function(){
			Venda.Attributes.swapAttrDisplay();
		});

		var hiddenInputs = '<input type="hidden" value="" id="hiddenInput_att1"><input type="hidden" value="" id="hiddenInput_att2"><input type="hidden" value="" id="hiddenInput_att3"><input type="hidden" value="" id="hiddenInput_att4">';
		jQuery('#addproductform').append(hiddenInputs);

		var attributesUI = jQuery(".js-attributesForm").text();
		switch(attributesUI) {
			case "dropdown":
			case "halfswatch":
			case "swatch":
			case "grid":
			case "multiAdd1":
			case "multiAdd2":
			break;
			default:
			attributesUI = 'dropdown';
		}

		var url = '/content/ebiz/' + jQuery("#tag-ebizref").text() + '/resources/js/Venda/Attributes/' + attributesUI + '.js';
    	jQuery.getScript(url, function(Status){
				Venda.Attributes.Scene7.init();
    		if (!Status){console.warn('Whoops! Your interface type script did not load');}
    	});
		//if(jQuery("#OutOfStockThreshold").text() > Venda.Attributes.Settings.lowStockThreshold) alert("Error: OutOfStockThreshold is higher than lowStockThreshold");
	}else{
		Venda.Attributes.Scene7.init();
	}

	jQuery('.js-oneProduct').css({"background":"none"});
	jQuery('.js-oneProductContent').fadeIn('slow');
}

/**
* Sets default values for attributes, these values can be changed base
* on your needs
*/
Venda.Attributes.Declare = function() {
	Venda.Attributes.Settings = {
		lowStockThreshold:			jQuery('#invtOutOfStockThreshold').text(),
		emailWhenOutOfStock:		false,
		sourceFromAPI:				false,
		priceRangeFormat:			"range", // "range" = from - to; "from" = from only; "to" = to only;
		preOrderParent:				false,
		gridSwap:					false,
		useSelectedArrow:			true,
		useToolTip:					true,
		sort: 						true,
		hideNotAvailable:			true,
		isMobile:  					Modernizr.mq('only all and (max-width: 767px)')
	};

};


// Merges two objects into one and stores data within an array
Venda.Attributes.StoreJSON = function(attrObj, attrValObj) {
	for(var prop in attrObj) {
		if (attrObj[prop] === null) {
			attrObj[prop] = "";
		}
	}
	for(var prop in attrValObj) {
		if (attrValObj[prop] === null) {
			attrValObj[prop] = "";
		}
	}
	attrObj = Venda.Attributes.unicodeToHTML(attrObj);
	attrValObj = Venda.Attributes.unicodeToHTML(attrValObj);
	var newAttrObj = jQuery.extend({}, attrObj);
	Venda.Attributes.firstObj.push(newAttrObj);
	Venda.Attributes.attsJSON = jQuery.extend(attrObj, attrValObj);
	Venda.Attributes.attsArray.push(Venda.Attributes.attsJSON);
};


// Sets the attributes and returns the values for them in an object literal format
Venda.Attributes.Set = function(att1, att2, att3, att4, uID) {

	var att1 = att1 || "";	var att2 = att2 || "";	var att3 = att3 || "";	var att4 = att4 || "";
 	if (Venda.Attributes.IsAllSelected(att1, att2, att3, att4, uID)) {
		var index = Venda.Attributes.SearchObj(att1, att2, att3, att4, uID);
		var atrsell = parseInt(Venda.Attributes.attsArray[index].atrsell);
 		if(typeof index != "undefined" && atrsell !== 0 && !isNaN(atrsell)) {
			Venda.Attributes.dataObj = {
				"atronhand": Venda.Attributes.attsArray[index].atronhand - Venda.Attributes.Settings.lowStockThreshold,
				"stockstatus": Venda.Attributes.StockStatus(Venda.Attributes.attsArray[index].atronhand,index),
				"atrreleaseyr": Venda.Attributes.attsArray[index].atrreleaseyr,
				"atrmsrp": Venda.Attributes.attsArray[index].atrmsrp,
				"atrsku": Venda.Attributes.attsArray[index].atrsku,
				"atrwas": Venda.Attributes.attsArray[index].atrwas,
				"atrsell": Venda.Attributes.attsArray[index].atrsell,
				"atrsuplsku": Venda.Attributes.attsArray[index].atrsuplsku,
				"atrreleasemn": Venda.Attributes.attsArray[index].atrreleasemn,
				"atretayr": Venda.Attributes.attsArray[index].atretayr,
				"atrreleasedy": Venda.Attributes.attsArray[index].atrreleasedy,
				"atretady": Venda.Attributes.attsArray[index].atretady,
				"atretamn": Venda.Attributes.attsArray[index].atretamn,
				"atrpublish": Venda.Attributes.attsArray[index].atrpublish,
				"atrcost": Venda.Attributes.attsArray[index].atrcost
			};

			if(jQuery('.js-attributesForm').attr('id') != 'productdetailMulti') {
				if(document.getElementById("addproductform").itemlist) {
					jQuery("#oneProduct_" + uID + " [name=itemlist]").val(Venda.Attributes.dataObj.atrsku);
				}
			}

		} else {
			for(var p in Venda.Attributes.dataObj) { Venda.Attributes.dataObj[p] = " "; };
			Venda.Attributes.dataObj.stockstatus = "this item is currently not available.";
		}
	} else {

		for(var p in Venda.Attributes.dataObj) { Venda.Attributes.dataObj[p] = " "; };
		Venda.Attributes.dataObj.stockstatus = "";

		if(jQuery('.js-attributesForm').attr('id') != 'productdetailMulti') {
			if(document.getElementById("addproductform").itemlist) {
				jQuery("#oneProduct_" + uID + " [name=itemlist]").val('');
			}
		}

	}

	Venda.Attributes.drawOutputs(index, uID);
};


// Sets the attributes and returns the values for them in an object literal format
Venda.Attributes.Get = function(what) {
	return Venda.Attributes.dataObj[what];
};

// Compares current number of selections to an existing ones and returns true if number matches
Venda.Attributes.IsAllSelected = function(att1, att2, att3, att4, uID) {
	var att1 = att1 || "";	var att2 = att2 || "";	var att3 = att3 || "";	var att4 = att4 || "";
	var howManySelected = 0;
	if(att1 != "") howManySelected+=1;
	if(att2 != "") howManySelected+=1;
	if(att3 != "") howManySelected+=1;
	if(att4 != "") howManySelected+=1;
	if(howManySelected == Venda.Attributes.HowManyAtts(uID)) return true;
};

// Returns the number of attributes used from JSON data
Venda.Attributes.HowManyAtts = function(uID) {
	for(var i = 0; i < Venda.Attributes.productArr.length; i++) {
		if (Venda.Attributes.productArr[i].attSet.id == uID) {
			var howManyAtts = 0;
			if((Venda.Attributes.productArr[i].attSet.att1.optionValues.length >= 1) && (Venda.Attributes.productArr[i].attSet.att1.optionValues[0] != "")) howManyAtts+=1;
			if((Venda.Attributes.productArr[i].attSet.att2.optionValues.length >= 1) && (Venda.Attributes.productArr[i].attSet.att2.optionValues[0] != "")) howManyAtts+=1;
			if((Venda.Attributes.productArr[i].attSet.att3.optionValues.length >= 1) && (Venda.Attributes.productArr[i].attSet.att3.optionValues[0] != "")) howManyAtts+=1;
			if((Venda.Attributes.productArr[i].attSet.att4.optionValues.length >= 1) && (Venda.Attributes.productArr[i].attSet.att4.optionValues[0] != "")) howManyAtts+=1;
			return howManyAtts;
		}
	}
};

// Checks for stock value and returns the availability status
Venda.Attributes.StockStatus = function(stockAmount,theIndex) {

	var HasEtaDate     = Venda.Attributes.HasEtaDate(theIndex);
	var HasReleaseDate = Venda.Attributes.HasReleaseDate(theIndex);

	if(stockAmount > Venda.Attributes.Settings.lowStockThreshold && !HasReleaseDate){
		return "In stock";
	}
	if(stockAmount > Venda.Attributes.Settings.lowStockThreshold && HasReleaseDate) return "Pre-order";
 	if(stockAmount <= Venda.Attributes.Settings.lowStockThreshold && stockAmount > jQuery("#OutOfStockThreshold").text()) return "Stock is low";
	if(stockAmount <= jQuery("#OutOfStockThreshold").text() && (jQuery("#DoNotBackorder").text() == 1) || (jQuery("#DoNotBackorder").text() != 1 && !HasEtaDate) ) return "Out of stock";

 	if (jQuery('#stockchecking_basket').text() == 1 || jQuery('#stockchecking_orderconfirm').text() == 1){
		if(stockAmount <= jQuery("#OutOfStockThreshold").text() && (jQuery("#DoNotBackorder").text() != 1 && HasEtaDate)) return "Not Available";
	}

	if(stockAmount <= jQuery("#OutOfStockThreshold").text() && (jQuery("#DoNotBackorder").text() != 1 && HasEtaDate)) return "Backorder";

};

// Search for a given value combination within array of objects, returns true if combination matches
Venda.Attributes.SearchObj = function(att1, att2, att3, att4, uID) {
	for(var i=0; i<Venda.Attributes.attsArray.length; i++)
		if (Venda.Attributes.attsArray[i].att1 == att1 && Venda.Attributes.attsArray[i].att2 == att2)
			if(Venda.Attributes.attsArray[i].att3 == att3 && Venda.Attributes.attsArray[i].att4 == att4)
				if(Venda.Attributes.attsArray[i].invtuuid == uID)
					return i;
};

// This function will return a stock status message for all stock with only one specified parameter
Venda.Attributes.GetAll = function(att1, att2, att3, att4, what, uID) {
	var att1 = att1 || "";	var att2 = att2 || "";	var att3 = att3 || "";	var att4 = att4 || "";
	switch(what) {
		case "stockstatus":
			var initOnce = true;
			for(var i=0; i<Venda.Attributes.attsArray.length; i++) {
				var compareObj = {att1: att1, att3: att3, att2: att2, att4: att4, invtuuid: uID};
				var newfirstObj = jQuery.extend({}, Venda.Attributes.firstObj[i]);
				newfirstObj.invtuuid = uID;
 				if(att1 == "") { delete compareObj.att1; delete newfirstObj.att1; }
				if(att2 == "") { delete compareObj.att2; delete newfirstObj.att2; }
				if(att3 == "") { delete compareObj.att3; delete newfirstObj.att3; }
				if(att4 == "") { delete compareObj.att4; delete newfirstObj.att4; }
				if(compareObject(compareObj, newfirstObj)) { 
					if(initOnce) { 
						var totalStock = 0, atrsellprice = 0; initOnce = false; 
					}; 
					totalStock += Venda.Attributes.attsArray[i].atronhand; 
					atrsellprice = parseInt(Venda.Attributes.attsArray[i].atrsell);
					var theIndex = i; 
				}
			};
			if(typeof totalStock != "undefined" && atrsellprice != 0 && !isNaN(atrsellprice)){
				return Venda.Attributes.StockStatus(totalStock,theIndex);
			}
			else	return "Not Available";
		break;
		case "atrsuplsku":
			for(var i=0; i<Venda.Attributes.attsArray.length; i++) {
				if(Venda.Attributes.attsArray[i].att1 === att1 && Venda.Attributes.attsArray[i].invtuuid === uID){
					return Venda.Attributes.attsArray[i].atrsuplsku;
				}
			};
			return "";
		break;
		case "all":
			for(var i=0; i<Venda.Attributes.attsArray.length; i++) {
				if(Venda.Attributes.attsArray[i].att1 === att1 && Venda.Attributes.attsArray[i].att2 === att2 && Venda.Attributes.attsArray[i].att3 === att3 && Venda.Attributes.attsArray[i].att4 === att4 && Venda.Attributes.attsArray[i].invtuuid === uID){
					return Venda.Attributes.attsArray[i];
				}
			};
			return [];
		break;
	}
};

var compareObject = function(o1, o2){
	for(var p in o1){if(o1[p] !== o2[p]){return false;}}
	for(var p in o2){if(o1[p] !== o2[p]){return false;}}
	return true;
};

Venda.Attributes.GetPriceRange = function(uID) {
		var currsym = jQuery('#tag-currsym').text();
		var priceRangeArr = [];
		var min, max;
		for(var i=0; i<Venda.Attributes.attsArray.length; i++) {
			if(Venda.Attributes.attsArray[i].invtuuid == uID) {
				priceRangeArr.push(Venda.Attributes.attsArray[i].atrsell);
			}
		}
		if(Venda.Attributes.Settings.priceRangeFormat == "from") return currsym + Math.min.apply(Math, priceRangeArr);
		if(Venda.Attributes.Settings.priceRangeFormat == "to") return currsym + Math.max.apply(Math, priceRangeArr);
		if((Venda.Attributes.Settings.priceRangeFormat == "range") && (Math.min.apply(Math, priceRangeArr)) != (Math.max.apply(Math, priceRangeArr))) {
			min =  Math.min.apply(Math, priceRangeArr);
			max = Math.max.apply(Math, priceRangeArr);
			return currsym + min.toFixed(2) + " - " + currsym + max.toFixed(2);
		}
		else {
			return currsym + Venda.Attributes.attsArray[0].atrsell;
		}
};

Venda.Attributes.GetCustomData = function(att1, att2, att3, att4, what) {
	var att1 = att1 || "";	var att2 = att2 || "";	var att3 = att3 || "";	var att4 = att4 || "";

	if (Venda.Attributes.IsAllSelected(att1, att2, att3, att4)) {
		var index = Venda.Attributes.SearchObj(att1, att2, att3, att4);
		if(typeof index != "undefined") {

			switch(what) {
				case "savemsrp":
					if(Venda.Attributes.attsArray[index].atrmsrp != "") {
						return Venda.Attributes.attsArray[index].atrmsrp - Venda.Attributes.attsArray[index].atrsell;
					} else { return " "; }
				break;

				case "savewas":
					if(Venda.Attributes.attsArray[index].atrwas != "") {
						return Venda.Attributes.attsArray[index].atrwas - Venda.Attributes.attsArray[index].atrsell;
					} else { return " "; }
				break;

				case "etadate":
					if(Venda.Attributes.HasEtaDate(index)) {
						return Venda.Attributes.attsArray[index].atretady + "/" + Venda.Attributes.attsArray[index].atretamn + "/" + Venda.Attributes.attsArray[index].atretayr;
					} else { return " "; }
				break;

				case "releasedate":
					if(Venda.Attributes.HasReleaseDate(index)) {
						return Venda.Attributes.attsArray[index].atrreleasedy + "/" + Venda.Attributes.attsArray[index].atrreleasemn + "/" + Venda.Attributes.attsArray[index].atrreleaseyr;
					} else { return " "; }
				break;

				case "nofweta":
 					if(Venda.Attributes.HasEtaDate(index)) {
						return Venda.Attributes.TimeTillRelease(Venda.Attributes.attsArray[index].atretady, "0" + parseInt(Venda.Attributes.attsArray[index].atretamn - 1), Venda.Attributes.attsArray[index].atretayr, "weeks");
					} else { return " "; }
				break;

				case "nofwrelease":
 					if(Venda.Attributes.HasReleaseDate(index)) {
						return Venda.Attributes.TimeTillRelease(Venda.Attributes.attsArray[index].atrreleasedy, "0" + parseInt(Venda.Attributes.attsArray[index].atrreleasemn - 1), Venda.Attributes.attsArray[index].atrreleaseyr, "weeks");
					} else { return ""; }
				break;

				case "savepercentmsrp":
					if(Venda.Attributes.attsArray[index].atrmsrp != "") {
						return Math.round(100 - (Venda.Attributes.attsArray[index].atrsell / (Venda.Attributes.attsArray[index].atrmsrp / 100)));
					} else { return " "; }
				break;

				case "savepercentwas":
					if(Venda.Attributes.attsArray[index].atrwas != "") {
						return Math.round(100 - (Venda.Attributes.attsArray[index].atrsell / (Venda.Attributes.attsArray[index].atrwas / 100)));
					} else { return " "; }
				break;
			};

		} else { return " "; };
	} else { return " "; };

};

Venda.Attributes.HasEtaDate = function(index) {
	if(Venda.Attributes.attsArray[index].atretayr != "")
		if(Venda.Attributes.attsArray[index].atretamn != "")
			if(Venda.Attributes.attsArray[index].atretady != "")
				if(Venda.Attributes.TimeTillRelease(Venda.Attributes.attsArray[index].atretady, "0" + parseInt(Venda.Attributes.attsArray[index].atretamn - 1), Venda.Attributes.attsArray[index].atretayr, "exact") >= 0)
					return true;
};

Venda.Attributes.HasReleaseDate = function(index) {
	Venda.Attributes.ReleaseDateParent(index);
	if(Venda.Attributes.attsArray[index].atrreleaseyr != "")
		if(Venda.Attributes.attsArray[index].atrreleasemn != "")
			if(Venda.Attributes.attsArray[index].atrreleasedy != "")
				if(Venda.Attributes.TimeTillRelease(Venda.Attributes.attsArray[index].atrreleasedy, "0" + parseInt(Venda.Attributes.attsArray[index].atrreleasemn - 1), Venda.Attributes.attsArray[index].atrreleaseyr, "exact") >= 0)
					return true;
};

Venda.Attributes.TimeTillRelease = function(dd, mm, yy, what) {
	var oneWeek = 24*60*60*1000*7;
	var firstDate = new Date();
	var secondDate = new Date(yy, mm, dd);
	switch(what) {
		case "weeks":
			var exactTime = (secondDate.getTime() - firstDate.getTime())/(oneWeek);
			if(exactTime>=0) {
				var timeLeft = Math.round((secondDate.getTime() - firstDate.getTime())/(oneWeek));
				if(timeLeft == 0) timeLeft = 1;
			} else { timeLeft = ""; }
		break;
		case "exact":
			var timeLeft = (secondDate.getTime() - firstDate.getTime())/(oneWeek);
		break;
	}
	return timeLeft;
}

Venda.Attributes.ReleaseDateParent = function(index) {
	var parentDate = jQuery('#invtrelease').text();
	if(Venda.Attributes.Settings.preOrderParent && parentDate !== ""){
		var parentDateArr = parentDate.split("-");
		if(Venda.Attributes.TimeTillRelease(parentDateArr[2], "0" + parseInt(parentDateArr[1] - 1), parentDateArr[0], "exact") >= 0) {
			Venda.Attributes.attsArray[index].atrreleasedy = parentDateArr[2];
			Venda.Attributes.attsArray[index].atrreleasemn = parentDateArr[1];
			Venda.Attributes.attsArray[index].atrreleaseyr = parentDateArr[0];
		}
	}
};


/**
* Shows or hides the correct input buttons and feedback based on attribute selection 'stockstatus'
* @param{string} index this is the current array index of the instance of attribute display
* @param{string} uID this is the unique ID for attribute display in the DOM
* @author Alby Barber <abarber@venda.com>
*/
Venda.Attributes.drawOutputs = function(index, uID) {

	// Cache jQuery selector and values
	var addproductID, EmwbisID, stockFeedbackBox, addToBasketLinks, addToBasketButton, emwbisType, stockstatus, stockFeedback;
	addproductID = jQuery('#oneProduct_' + uID + ' #addproductbox');
	EmwbisID = jQuery('#oneProduct_' + uID + ' #emwbis_link');
	stockFeedbackBox = jQuery('#oneProduct_' + uID + ' .js-stockFeedbackBox');
	addToBasketLinks = jQuery('#oneProduct_' + uID + ' .js-addproduct, #oneProduct_' + uID + ' .js-buynow, #oneProduct_' + uID + ' .js-buynow, #oneProduct_' + uID + ' .js-bag-addproduct');
	addToBasketButton = jQuery('#oneProduct_' + uID + ' .js-addproduct');
	emwbisType = jQuery("#emwbisType").text();
	stockstatus = Venda.Attributes.Get('stockstatus');
	stockFeedback = stockstatus;

	// Reset the UI.
	EmwbisID.addClass("js-Re-paint-out");
	stockFeedbackBox.removeClass("js-In_stock_box js-Out_of_stock_box");
	addToBasketLinks.css("opacity","1");
	addToBasketButton.css("opacity","1");
	addproductID.find('#productselected, #stockstatus').removeClass('warnUnavail');

	switch(stockstatus) {

		case "In stock":
			stockFeedbackBox.addClass("js-In_stock_box");
			addproductID.addClass("js-Re-paint");
			addToBasketButton.text(jQuery('.js-addtobasket').text());
			stockFeedback  = jQuery('#text-instock').text();
		break;

		case "Stock is low":
			stockFeedbackBox.addClass("js-In_stock_box");
			addproductID.addClass("js-Re-paint");

			var stockFeedback = jQuery('#text-lowstock').text() + jQuery('#attributes-only').text() + Venda.Attributes.Get('atronhand') + jQuery('#attributes-left').text();

		break;

		case "Pre-order":
			stockFeedbackBox.addClass("js-In_stock_box js-Pre-order_box");
			addproductID.addClass("js-Re-paint");
			addToBasketButton.text(jQuery('.js-preorder').text());

			var stockFeedback = jQuery('#attributes-preorder').text() + Venda.Attributes.attsArray[index].atrreleasedy + "/" + Venda.Attributes.attsArray[index].atrreleasemn + "/" + Venda.Attributes.attsArray[index].atrreleaseyr;

		break;

		case "Out of stock":

			stockFeedbackBox.addClass("js-Out_of_stock_box");

				if (emwbisType == 'none'){
					EmwbisID.addClass("js-Re-paint");
				}
				else{
					if (emwbisType == 'etarelease' && Venda.Attributes.HasReleaseDate(index) && Venda.Attributes.HasEtaDate(index)){
						EmwbisID.addClass("js-Re-paint");
					}
					if (emwbisType == 'eta' && Venda.Attributes.HasEtaDate(index)){
						EmwbisID.addClass("js-Re-paint");
					}
					if (emwbisType == 'release' && Venda.Attributes.HasReleaseDate(index)){
						EmwbisID.addClass("js-Re-paint");
					}
					else{
						addproductID.addClass("js-Re-paint");
						addToBasketLinks.css("opacity","0.5");
					}
				}
				addproductID.addClass("js-Re-paint");
				addToBasketButton.css("opacity","0.5");
				stockFeedback = jQuery('#text-outofstock').text();
		break;

		case "Backorder":

			stockFeedbackBox.addClass("js-In_stock_box js-Backorder_box");
			addproductID.addClass("js-Re-paint");
			addToBasketButton.text(jQuery('.js-backorder').text());

			var stockFeedback = jQuery('#attributes-backorder').text() + Venda.Attributes.attsArray[index].atretady + "/" + Venda.Attributes.attsArray[index].atretamn + "/" + Venda.Attributes.attsArray[index].atretayr;

		break;

		case "this item is currently not available.":

			addproductID.find('#productselected, #stockstatus').addClass('warnUnavail');
			stockFeedback = jQuery('#text-notavailable').text();

		break;

		default:
			// Not Available
			addproductID.addClass("js-Re-paint");
			addToBasketLinks.css("opacity","0.5");
			stockFeedback = '';
	}

	jQuery('#oneProduct_' + uID + ' .js-attrFeedback #stockstatus').hide().text(stockFeedback).addClass("js-Re-paint");

};



// case insensitive, digits to number interpolation
Venda.Attributes.NatSort = function(as, bs){
  var a, b, a1, b1, i= 0, L, rx= /(\d+)|(\D+)/g, rd= /\d/;
  if(isFinite(as) && isFinite(bs)) return as - bs;
  a= String(as).toLowerCase();
  b= String(bs).toLowerCase();
  if(a=== b) return 0;
  if(!(rd.test(a) && rd.test(b))) return a> b? 1: -1;
  a= a.match(rx);
  b= b.match(rx);
  L= a.length> b.length? b.length: a.length;
  while(i < L){
    a1= a[i];
    b1= b[i++];
    if(a1!== b1){
      if(isFinite(a1) && isFinite(b1)){
        if(a1.charAt(0)=== "0") a1= "." + a1;
        if(b1.charAt(0)=== "0") b1= "." + b1;
        return a1 - b1;
      }
      else return a1> b1? 1: -1;
    }
  }
  return a.length - b.length;
}

Venda.Attributes.sizeDef = ["XXS", "TTP", "XS", "TP", "S", "P", "M", "L", "G", "XL", "TG", "1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "10", "11", "12", "14", "16", "18", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "36", "38", "40", "J1/2", "K1/2", "L1/2", "M1/2", "N1/2", "O1/2", "P1/2", "Q1/2", "XS/S", "TP/P", "S/M", "P/M", "M/L", "M/G", "L/XL", "G/TG", "double", "dbl/qn", "cking", "king", "queen", "one size", "+1", "+1.5", "+2", "+2.5", "+3", "+3.5"];

Venda.Attributes.cleanAttr2 = function(attOptionVal){
	if((/\([^\(\)]+\)$/i).test(attOptionVal)){
		attOptionVal =  attOptionVal.replace((/\([^\(\)]+\)$/i), '');
		attOptionVal = jQuery.trim(attOptionVal);
	}

	return attOptionVal;
};

Venda.Attributes.SizeSort = function(as, bs){
	var byA = Venda.Attributes.cleanAttr2(as.toUpperCase());
	var byB = Venda.Attributes.cleanAttr2(bs.toUpperCase());
	var iA = jQuery.inArray(byA, Venda.Attributes.sizeDef);
	var iB = jQuery.inArray(byB, Venda.Attributes.sizeDef);

	/* fallback case */
	if(iA<0 && iB<0){return as > bs;}else if(iA<0){return 1;}else if(iB<0){return -1;}
	/* best match! */
	return (iA < iB)?-1:1;
};

Venda.Attributes.getColorDef = function(uID){
	var orderDef = jQuery.trim((jQuery('#oneProduct_' + uID).find('#invt-colorsortorder').text() || "").toUpperCase());
	if(orderDef != ""){
		return orderDef.split(',');
	}

	return [];
};

Venda.Attributes.ColorSort = function(as, bs){
	var byA = as.toUpperCase();
	var byB = bs.toUpperCase();
	var iA = jQuery.inArray(byA, Venda.Attributes.colorDef);
	var iB = jQuery.inArray(byB, Venda.Attributes.colorDef);

	/* fallback case */
	if(iA<0 && iB<0){return as > bs;}else if(iA<0){return 1;}else if(iB<0){return -1;}
	/* best match! */
	return (iA < iB)?-1:1;
};

/**
* This is an object that is built up and used for each instance of attribute display and stores the values of
* the attributes and there current states.
* @param{string} index this is the current array index of the instance of attribute display
* @param{string} uID this is the unique ID for attribute display in the DOM
* @return the value of newattributes, this is done for each instance
* @author Alby Barber <abarber@venda.com>
*/
Venda.Attributes.GenerateOptionsJSON = function (index, uID) {

	var attributes = {
		attSet: {
			att1:	{
				name:	'',
				options:	[],
				optionValues:	[],
				selected:	'',
				selectedValue:	'',
				imageRef:	''
			},
			att2:	{
				name:	'',
				options:	[],
				optionValues:	[],
				selected:	'',
				selectedValue:	'',
				imageRef:	''
			},
			att3:	{
				name:	'',
				options:	[],
				optionValues:	[],
				selected:	'',
				selectedValue:	'',
				imageRef:	''
			},
			att4:	{
				name:	'',
				options:	[],
				optionValues:	[],
				selected:	'',
				selectedValue:	'',
				imageRef:	''
			},
			id: ''
		}
	};

	var newattributes = jQuery.extend({}, attributes);

	newattributes.attSet.att1.name = jQuery('#oneProduct_' + uID + ' #attributeNames #att1').text();
	newattributes.attSet.att2.name = jQuery('#oneProduct_' + uID + ' #attributeNames #att2').text();
	newattributes.attSet.att3.name = jQuery('#oneProduct_' + uID + ' #attributeNames #att3').text();
	newattributes.attSet.att4.name = jQuery('#oneProduct_' + uID + ' #attributeNames #att4').text();
	newattributes.attSet.id = uID;

	/**
	* This is a function sorts attribute values in the page and puts them in the attributes object.
	* @param{string} attributeNumber is the specified attribute e.g. att1. This is a value 1-4
	* @param{string} i is an index used to pass the current value from the jQuery each function that passes it.
	* @author Alby Barber <abarber@venda.com>
	*/
 	var checkAndPush = function (attributeNumber,attributeValue ,i) {
		for(var i = 0; i < Venda.Attributes.attsArray.length; i++) {
			if(Venda.Attributes.attsArray[i].invtuuid == uID) {
				if (jQuery.inArray(Venda.Attributes.attsArray[i][attributeNumber], newattributes.attSet[attributeNumber].optionValues) == -1){
					newattributes.attSet[attributeNumber].options.push(Venda.Attributes.attsArray[i][attributeNumber]);
					newattributes.attSet[attributeNumber].optionValues.push(Venda.Attributes.attsArray[i][attributeValue]); // Push on the Values
				}
			}
		}
	};

	jQuery.each(Venda.Attributes.attsArray, function(i, val) {
		for (var j = 1 ;j<=4;j++){
			checkAndPush('att' + j ,'atr' + j , i);
		}
	});

	if (Venda.Attributes.Settings.sort){

		// This sorts by number
		Venda.Attributes.colorDef = Venda.Attributes.getColorDef(uID);

		for (var i = 1; i < 4; i++){
			if (attributes.attSet['att' + i].optionValues.length > 1){
				// Test to see if the attribute array contains numbers
				if(/^[0-9]+$/.test(attributes.attSet['att' + i].optionValues)){
					attributes.attSet['att' + i].optionValues.sort(Venda.Attributes.NatSort);
					attributes.attSet['att' + i].options.sort(Venda.Attributes.NatSort);
				}else{
					/* this for string sort alphabet asc */
					if(i == 2){
						attributes.attSet['att' + i].optionValues.sort(Venda.Attributes.SizeSort);
						attributes.attSet['att' + i].options.sort(Venda.Attributes.SizeSort);
					}else{
						if(i === 1 && Venda.Attributes.colorDef.length > 0){
							attributes.attSet['att' + i].optionValues.sort(Venda.Attributes.ColorSort);
							attributes.attSet['att' + i].options.sort(Venda.Attributes.ColorSort);
						}else{
							attributes.attSet['att' + i].optionValues.sort();
							attributes.attSet['att' + i].options.sort();
						}
					}
				}
			}
		}
	}

	return newattributes;
}

/**
* This is a function updates the attribute object with the current attribute value
* @param{string} attName is the current attribute name e.g. att1
* @param{string} attValue is the current attribute value e.g. white
* @param{string} uID is the unique id of the attribute selection area
* @author Alby Barber <abarber@venda.com>
*/
Venda.Attributes.setSelectedJSON = function (attName,attValue, uID){

	for(var i = 0; i < Venda.Attributes.productArr.length; i++) {
		if(Venda.Attributes.productArr[i].attSet.id == uID) {
			if (Venda.Attributes.productArr[i].attSet[attName].selected == attValue){
				/* disabled reselect to clear value */

				/*
				   Venda.Attributes.productArr[i].attSet[attName].selected = '';
				   Venda.Attributes.productArr[i].attSet[attName].selectedValue = '';
				*/
			} else {
				Venda.Attributes.productArr[i].attSet[attName].selected = attValue;
				Venda.Attributes.productArr[i].attSet[attName].selectedValue = attValue;
			}
		}
	}

	Venda.Attributes.productArr[0].attSet[attName].imageRef = Venda.Attributes.getValueRef(attName,attValue) || '';
};

/**
* This is a function that shows / updates the price
* @param{string} uID this is the unique ID for attribute display in the DOM
* @author Alby Barber <abarber@venda.com>
*/
Venda.Attributes.Price = function (uID){
	var textValue;
	if (Venda.Attributes.Get('atrsell') !== " ") {
		textValue = jQuery('#tag-currsym').text() + Venda.Attributes.Get('atrsell');
		jQuery('#oneProduct_' + uID + ' #price').hide().text(textValue).addClass('js-Re-paint js-prod-price').data('price', textValue);
	}
	else {
		jQuery('#oneProduct_' + uID + ' #price').hide().text(Venda.Attributes.GetPriceRange(uID)).addClass('js-Re-paint js-prod-price');
	}
};

/**
* This is a function that shows / updates the price
* @author Alby Barber <abarber@venda.com>
*/
Venda.Attributes.Paint = function (){
	jQuery(".js-Re-paint-out").hide().removeClass("js-Re-paint-out");
	jQuery(".js-Re-paint").show().removeClass("js-Re-paint");
};

/**
* This is a function updates the selected values stored in the 'Venda.Attributes.productAr' object and displays this on
* the front-end to the user
* @param{string} att1 this is the current selected value for att1
* @param{string} att2 this is the current selected value for att2
* @param{string} att3 this is the current selected value for att3
* @param{string} att4 this is the current selected value for att4
* @param{string} uID this is the unique ID for attribute display in the DOM
* @author Alby Barber <abarber@venda.com>
*/
Venda.Attributes.SelectedValues = function (att1,att2,att3,att4, uID){

	var productselected = "",
			productstatus		= jQuery('#attributes-productstatus').text(),
			pleaseselect		= jQuery('#attributes-pleaseselect').text(),
			$single 				=	jQuery('#oneProduct_' + uID),
			startQTY				= 1,
			attronhandvalue = 0,
			onBasket 				= 0,
			attrskuvalue 		= '',
			maxorder 				= parseInt($single.find('#invt-maxorder').text(), 10) || 5,
			maxorder_tmp    = maxorder,
			isMulti         = jQuery('.js-prodMulti').length > 0,
			isShopcart      = ((jQuery('#tag-curstep').text() || "") === "shopcart"),
			atrData         = [];

	if(jQuery('.shop-the-look').length > 0){ startQTY = 1; }


	for(var j = 0; j < Venda.Attributes.productArr.length; j++) {
		if(Venda.Attributes.productArr[j].attSet.id === uID) {
			for(var i = Venda.Attributes.HowManyAtts(uID); i >=1; i--) {
				var attNumber = 'att'+i;

				if (Venda.Attributes.productArr[j].attSet[attNumber].selected){
					if (attNumber!="att3"){
						if (attNumber=="att2"){productselected += '<span>' + Venda.Attributes.productArr[j].attSet[attNumber].selected + '</span>, ';}
						if (attNumber!="att2"){productselected += Venda.Attributes.productArr[j].attSet[attNumber].selected + ', ';}
					}
					if ($single.find('#atronhand').text()!=""){
						var k =startQTY, m = (attronhandvalue > maxorder )? maxorder : attronhandvalue;
						attronhandvalue = parseInt($single.find('#atronhand').text(), 10) || 0;
						atrData  = Venda.Attributes.GetAll (att1, att2, att3, att4, 'all', uID);

						if(typeof(atrData.atrsku) !== "undefined" && !isShopcart){
							attrskuvalue = atrData.atrsku;
							onBasket  = (Venda.Attributes.minicartData[attrskuvalue] || 0);
							m = (m <= onBasket)?1:m-onBasket;
						}

						$single.find('.js-qty').empty();

						for(k =startQTY; k <= m; k++){
							$single.find('.js-qty').append('<option value="'+k+'">'+k+'</option>');
						}
						var urlQty = Venda.Platform.getUrlParam($('.modal-load-url').text(), 'qty');
						if(urlQty!="") {
							$single.find('.js-qty option[value="'+urlQty+'"]').prop('selected', true);
						}
						if(attronhandvalue === 0){
							$single.find('.js-qty').append('<option value="'+startQTY+'">'+startQTY+'</option>');
							$single.find('.js-qty').prop('disabled', true);
						}else{
							$single.find('.js-qty').prop('disabled', false);
						}
						// update dropdown option
						var val = $single.find('.js-qty option:selected').text() || $single.find('.js-qty').val();
						$single.find('.js-qty').next().find('.js-selected').text(val);
					}
				}
				else{
					if(attNumber === "att3"){
						attNumber = "att1";
					}
					productstatus += Venda.Attributes.productArr[j].attSet[attNumber].name + ' and ';
				}
			}
			productstatus = productstatus.toLowerCase();
			if(isMulti){
				jQuery('#oneProduct_' + uID).find('.js-addproduct-single').prop('disabled', false).removeClass('disabled reached-limit');
			}else{
				jQuery('#oneProduct_' + uID).find('.js-addproduct').prop('disabled', false).removeClass('disabled reached-limit');
			}

			if (productstatus == jQuery('#attributes-productstatus').text()){ /* selected all attr */
				jQuery('#oneProduct_' + uID + ' .js-attrFeedback #productselected').hide().html(productselected).addClass("js-Re-paint");
				jQuery('#oneProduct_' + uID + ' .js-attrFeedback #productstatus').removeClass('js-Re-paint').addClass("js-Re-paint-out");
			}
			else {
				jQuery('#oneProduct_' + uID + ' .js-attrFeedback #productselected').addClass("js-Re-paint-out");
				jQuery('#oneProduct_' + uID + ' .js-attrFeedback #productstatus').hide().text(productstatus.substring(0, productstatus.length-5)).addClass("js-Re-paint");
			}
		}
	}
	if ($('.warnUnavail').length) {
	    jQuery('#oneProduct_' + uID + ' .js-addproduct').prop('disabled', true).addClass('disabled');
	} else {
	    jQuery('#oneProduct_' + uID + ' .js-addproduct').prop('disabled', false).removeClass('disabled');
	}
	Venda.Ebiz.select2.refresh('.prod-quantity');
	Venda.Ebiz.fixEuroSign();
	// Updating the class for calculated values
};


/**
* This is a function updates the element on the page that has the passed ID
* @param{string} id this is the id of the page element that you want updated
* @param{string} uID this is the unique ID for attribute display in the DOM
* @author Alby Barber <abarber@venda.com>
*/
Venda.Attributes.updateItem = function (id, uID) {
	jQuery('#oneProduct_' + uID + ' .js-attrFeedback #' + id).hide().text(Venda.Attributes.Get(id)).addClass("js-Re-paint");
};

/**
* This is a function updates price type element on the page that has the passed ID
* @param{string} id this is the id of the page element that you want updated
* @param{string} uID this is the unique ID for attribute display in the DOM
* @author Alby Barber <abarber@venda.com>
*/
Venda.Attributes.updateItemPrice = function (id, uID) {
	var textValue = '';
	if (Venda.Attributes.Get(id).length > 2) {
		textValue = jQuery('#tag-currsym').text() + Venda.Attributes.Get(id);
	} else {
	 	textValue = '';
	}
	jQuery('#oneProduct_' + uID + ' .js-attrFeedback #' + id).hide().text(textValue).addClass("js-Re-paint js-prod-price").data('price', textValue);
};

/**
* This is a function updates calculated type elements on the page that has the passed ID
* @param{string} id this is the id of the page element that you want updated
* @param{string} textValue this is the text or name of the element to be displayed
* @param{string} uID this is the unique ID for attribute display in the DOM
* @author Alby Barber <abarber@venda.com>
*/
Venda.Attributes.updateCalcItem = function (id, textValue, uID){
		jQuery('#oneProduct_' + uID + ' .js-attrFeedback ' + id).hide().text(textValue).addClass("js-Re-paint");
}

/**
* This is a function updates calculated price type elements on the page that has the passed ID
* @param{string} id this is the id of the page element that you want updated
* @param{string} textValue this is the text or name of the element to be displayed
* @param{string} uID this is the unique ID for attribute display in the DOM
* @author Alby Barber <abarber@venda.com>
*/
Venda.Attributes.updateCalcItemPrice = function (id, textValue, uID){

	var currsym = jQuery('#tag-currsym').text();

	if (textValue.length > 2) {
		textValue = currsym + textValue;
	}

	jQuery('#oneProduct_' + uID + ' .js-attrFeedback ' + id).hide().text(textValue).addClass("js-Re-paint");
};


///// SWATCH Functions /////
/**
* This is a function generates the swatch interface
* @param{string} attributeNumber is the specified attribute e.g. att1. This is a value 1-4
* @param{string} uID this is the unique ID for attribute display in the DOM
* @author Alby Barber <abarber@venda.com>
*/
Venda.Attributes.generateSwatch = function(attributeNumber, uID){
	var atrsuplsku;
	for(var i = 0; i < Venda.Attributes.productArr.length; i++) {
		if (Venda.Attributes.productArr[i].attSet.id == uID) {

		var swatchList = '';
		for (var t = 0; t < Venda.Attributes.productArr[i].attSet[attributeNumber].optionValues.length; t++) {
			var attOption 	= Venda.Attributes.productArr[i].attSet[attributeNumber].optionValues[t],
				attOptionVal = attOption;

			if((/\([^\(\)]+\)$/i).test(attOptionVal)){
				var usSize =  attOptionVal.match((/\([^\(\)]+\)$/i));
				if(usSize){
					attOptionVal = attOptionVal.replace(usSize, '');
					attOptionVal = attOptionVal+'<span class="us-size">'+usSize+'</span>';
				}
			}
			atrsuplsku = Venda.Attributes.GetAll(attOption, "", "", "", 'atrsuplsku', uID);
			if (attributeNumber === 'att1') {
				swatchList += '<li class="js-'+ attOption +' js-attributeSwatch" id="attributeSwatch_' + uID + '" data-attName="'+ attributeNumber +'" data-attValue="'+ attOption +'" data-atrsuplsku="'+atrsuplsku+'"><span class="js-swatchText">' + attOptionVal + '</span><div class="js-swatch-background"></div></li>';
			} else {
				swatchList += '<li class="js-'+ attOption +' js-attributeSwatch" id="attributeSwatch_' + uID + '" data-attName="'+ attributeNumber +'" data-attValue="'+ attOption +'" data-atrsuplsku="'+atrsuplsku+'"><div class="js-swatch-background"><span class="js-swatchText">' + attOptionVal + '</span></div></li>';
			}
		}

		var selectName = "#oneProduct_" + uID + " select[name='" + attributeNumber + "']";
		jQuery(selectName).replaceWith("<ul id='swatchList_" + attributeNumber + "'>" + swatchList + "</ul>");

		}
	}
};


/**
* This is a function gets the swatch image and associates on the correct swatch
* @param{string} attributeNumber is the specified attribute e.g. att1. This is a value 1-4
* @param{string} uID this is the unique ID for attribute display in the DOM
* @author Alby Barber <abarber@venda.com>
*/
Venda.Attributes.swatchImage = function(attnumber, uID){
	jQuery('#oneProduct_' + uID + ' #swatchList_'+attnumber+' li').each(function(index) {
		jQuery(this).addClass('js-colourSwatch');

		var swatchdata = this.getAttribute('data-attvalue'),
			swatchname = this.getAttribute('data-attname'),
			imageRef = Venda.Attributes.getValueRef(swatchname,swatchdata);

		if (Venda.Attributes.SwatchURL[imageRef]){
			jQuery(this).find('.js-swatch-background').attr('style', "background-image: url('" + Venda.Attributes.SwatchURL[imageRef] + "');");
		}else {
			jQuery(this).find('.js-swatch-background').css("background-image", "url('" + Venda.Attributes.noImage.imgSwatch   + "'')");
		}
	});
};

///// DROPDOWN Functions /////
/**
* This is a function generates the dropdown interface
* @param{string} attributeNumber is the specified attribute e.g. att1. This is a value 1-4
* @param{string} uID this is the unique ID for attribute display in the DOM
* @author Alby Barber <abarber@venda.com>
*/
Venda.Attributes.generateDropDowns = function(attributeNumber, uID) {
	var optionDefault = (Venda.Attributes.Settings.isMobile) ? jQuery('#attributes-optionDefault-small').text() : jQuery('#attributes-optionDefault').text();
	for(var i = 0; i < Venda.Attributes.productArr.length; i++) {
		if (Venda.Attributes.productArr[i].attSet.id == uID) {
			var options = '';
			if(attributeNumber == "att2" && Venda.Attributes.productArr[i].attSet[attributeNumber].optionValues.length == 1){
				options += '<option data-attText="' + Venda.Attributes.productArr[i].attSet[attributeNumber].options[0] + '" data-atrsuplsku="" value="'+ Venda.Attributes.productArr[i].attSet[attributeNumber].optionValues[0] +'">' + Venda.Attributes.productArr[i].attSet[attributeNumber].options[0] + '</option>';
			}else{
				for (var t = 0; t < Venda.Attributes.productArr[i].attSet[attributeNumber].optionValues.length; t++) {

					if(attributeNumber == "att1"){
						atrsuplsku = Venda.Attributes.GetAll(Venda.Attributes.productArr[i].attSet['att1'].optionValues[t], "", "", "", 'atrsuplsku', uID);
					}else{
						atrsuplsku = '';
					}
					options += '<option data-attText="' + Venda.Attributes.productArr[i].attSet[attributeNumber].options[t] + '" data-atrsuplsku="'+atrsuplsku+'" value="'+ Venda.Attributes.productArr[i].attSet[attributeNumber].optionValues[t] +'">' + Venda.Attributes.productArr[i].attSet[attributeNumber].options[t] + '</option>';
				}
			}
			var selectName = "select[name='" + attributeNumber + "']";
			jQuery("#oneProduct_" + uID + " " + selectName).html(options);
		}
	}
};

Venda.Attributes.PresetAtt = function(index, uID) {
	var allAttsOne = 0;
	for(var e = 1; e <= Venda.Attributes.HowManyAtts(uID); e++) {
		if(Venda.Attributes.productArr[index].attSet["att" + e].optionValues.length == 1) {
			allAttsOne+=1;
		}
	}
	if(allAttsOne >= Venda.Attributes.HowManyAtts(uID)) {
		for(var o = 1; o <= Venda.Attributes.HowManyAtts(uID); o++) {

		// If there is only one value for an attribute, then pre select it
			//jQuery("select[id='att"+ o +"_" + uID + "'] option[value='" + Venda.Attributes.productArr[index].attSet["att" + o].options[0] + "']").attr('selected', 'selected');
			//Venda.Attributes.setSelectedJSON("att" + o,Venda.Attributes.productArr[index].attSet["att" + o].options[0], uID);

		}
	}
};

///// EVENTS /////
/**
* Shows a tooltip for out of stock elements if the useToolTip config option is 'true'
* This will not work with the product grid
*/
jQuery('.js-Out_of_stock:not(.js-gridBlock, #key li)').on('mouseenter', function(){

	if (Venda.Attributes.Settings.useToolTip){
		var attName 	= this.getAttribute('data-attName');
		var attValue 	= this.getAttribute('data-attValue');
		var thisname	= 'This';
		var uID = this.id.substr(16);

		for(var j = 0; j < Venda.Attributes.productArr.length; j++) {
			if(Venda.Attributes.productArr[j].attSet.id === uID) {
				thisname = Venda.Attributes.productArr[j].attSet[attName].name
			}
		}

		var message 	= thisname + ' ' + attValue + ' ' + jQuery('#attributes-tooltip').text();

		jQuery(this).prepend('<div class="js-toolTip-wrap"><div class="js-toolTip">' + message + '<div class="js-toolTip-shadow"></div><div class="js-toolTip-arrow"></div></div></div>');
		jQuery('.js-toolTip').hide().fadeIn('slow');
	}

});

/**
* Hides a tooltip for out of stock elements if the useToolTip config option is 'true'
* This will not work with the product grid
*/
jQuery('.js-Out_of_stock:not(.js-gridBlock, #key li)').on('mouseleave', function(){

	if (Venda.Attributes.Settings.useToolTip){
		jQuery('.js-toolTip-wrap').remove();
	}
});

/**
* This is a function that updates all the display elements of the attributes display
* This is called once on the page load and whenever the attribute combination is changed .
* @param{string} uID this is the unique ID for attribute display in the DOM
* @param{string} what is the 'this' property of a grid block clicked
* @param{string} param is a property of an attribute passed from a product page swatch.
* @author Alby Barber <abarber@venda.com>, Donatas Cereska <dcereska@venda.com>
*/

Venda.Attributes.updateAttributes = function (uID, what, param) {
	var selectedAtr1 = '';
	for(var i = 0; i < Venda.Attributes.productArr.length; i++) {
		if (Venda.Attributes.productArr[i].attSet.id == uID) {

			var attributesUI 		= jQuery(".js-attributesForm").text(),
				hiddenInput_att1 	= document.getElementById("hiddenInput_att1"),
				hiddenInput_att2 	= document.getElementById("hiddenInput_att2"),
				hiddenInput_att3 	= document.getElementById("hiddenInput_att3"),
				hiddenInput_att4 	= document.getElementById("hiddenInput_att4");

			switch(attributesUI) {
				case "dropdown":

				break;

				case "halfswatch":
					hiddenInput_att1.name = "att1";
					hiddenInput_att1.value = Venda.Attributes.productArr[i].attSet['att1'].selectedValue;
					hiddenInput_att2.name = "att2";
					hiddenInput_att2.value = Venda.Attributes.productArr[i].attSet['att2'].selectedValue;
					hiddenInput_att3.name = "att3";
					hiddenInput_att3.value = Venda.Attributes.productArr[i].attSet['att3'].selectedValue;
				break;

				case "swatch":
					hiddenInput_att1.name = "att1";
					hiddenInput_att1.value = Venda.Attributes.productArr[i].attSet['att1'].selectedValue;
					hiddenInput_att2.name = "att2";
					hiddenInput_att2.value = Venda.Attributes.productArr[i].attSet['att2'].selectedValue;
					hiddenInput_att3.name = "att3";
					hiddenInput_att3.value = Venda.Attributes.productArr[i].attSet['att3'].selectedValue;
					hiddenInput_att4.name = "att4";
					hiddenInput_att4.value = Venda.Attributes.productArr[i].attSet['att4'].selectedValue;
				break;

				case "grid":
					if(what != null) {
						Venda.Attributes.productArr[i].attSet['att1'].selected = what.getAttribute('data-attValue1');
						Venda.Attributes.productArr[i].attSet['att2'].selected = what.getAttribute('data-attValue2');
						Venda.Attributes.productArr[i].attSet['att1'].selectedValue = Venda.Attributes.getValueRef('att1',what.getAttribute('data-attValue1'));
						Venda.Attributes.productArr[i].attSet['att2'].selectedValue = Venda.Attributes.getValueRef('att2',what.getAttribute('data-attValue2'));
					}
					if(param != null) {
						Venda.Attributes.productArr[0].attSet['att1'].selected = param;
					}

					hiddenInput_att1.name = "att1";
					hiddenInput_att1.value = Venda.Attributes.productArr[i].attSet['att1'].selectedValue;
					hiddenInput_att2.name = "att2";
					hiddenInput_att2.value = Venda.Attributes.productArr[i].attSet['att2'].selectedValue;

					Venda.Attributes.productArr[0].attSet['att1'].imageRef = Venda.Attributes.getValueRef('att1',Venda.Attributes.productArr[0].attSet['att1'].selected);

				break;
			}

			Venda.Attributes.Set(Venda.Attributes.productArr[i].attSet.att1.selected, Venda.Attributes.productArr[i].attSet.att2.selected, Venda.Attributes.productArr[i].attSet.att3.selected, Venda.Attributes.productArr[i].attSet.att4.selected, uID);

			if (Venda.Attributes.IsAllSelected(Venda.Attributes.productArr[i].attSet.att1.selected, Venda.Attributes.productArr[i].attSet.att2.selected, Venda.Attributes.productArr[i].attSet.att3.selected, Venda.Attributes.productArr[i].attSet.att4.selected, uID)) {

				Venda.Attributes.updateItemPrice('atrmsrp', uID);
				Venda.Attributes.updateItemPrice('atrwas', uID);
				Venda.Attributes.updateItemPrice('atrsell', uID);
				Venda.Attributes.updateItemPrice('atrcost', uID);

				Venda.Attributes.updateItem('atrsku', uID);
				Venda.Attributes.updateItem('atrsuplsku', uID);
				Venda.Attributes.updateItem('atrpublish', uID);
				Venda.Attributes.updateItem('atronhand', uID);
				Venda.Attributes.updateItem('atrreleasedy', uID);
				Venda.Attributes.updateItem('atrreleasemn', uID);
				Venda.Attributes.updateItem('atrreleaseyr', uID);
				Venda.Attributes.updateItem('atretady', uID);
				Venda.Attributes.updateItem('atretamn', uID);
				Venda.Attributes.updateItem('atretayr', uID);

				// Updates all calculated data item values
				Venda.Attributes.updateCalcItem('#savemsrp',Venda.Attributes.GetCustomData(Venda.Attributes.productArr[i].attSet.att1.selected, Venda.Attributes.productArr[i].attSet.att2.selected, Venda.Attributes.productArr[i].attSet.att3.selected, Venda.Attributes.productArr[i].attSet.att4.selected, "savemsrp"), uID);
				Venda.Attributes.updateCalcItem('#savewas',Venda.Attributes.GetCustomData(Venda.Attributes.productArr[i].attSet.att1.selected, Venda.Attributes.productArr[i].attSet.att2.selected, Venda.Attributes.productArr[i].attSet.att3.selected, Venda.Attributes.productArr[i].attSet.att4.selected, "savewas"), uID);
				Venda.Attributes.updateCalcItem('#etadate',Venda.Attributes.GetCustomData(Venda.Attributes.productArr[i].attSet.att1.selected, Venda.Attributes.productArr[i].attSet.att2.selected, Venda.Attributes.productArr[i].attSet.att3.selected, Venda.Attributes.productArr[i].attSet.att4.selected, "etadate"), uID);
				Venda.Attributes.updateCalcItem('#releasedate',Venda.Attributes.GetCustomData(Venda.Attributes.productArr[i].attSet.att1.selected, Venda.Attributes.productArr[i].attSet.att2.selected, Venda.Attributes.productArr[i].attSet.att3.selected, Venda.Attributes.productArr[i].attSet.att4.selected, "releasedate"), uID);
				Venda.Attributes.updateCalcItem('#nofweta',Venda.Attributes.GetCustomData(Venda.Attributes.productArr[i].attSet.att1.selected, Venda.Attributes.productArr[i].attSet.att2.selected, Venda.Attributes.productArr[i].attSet.att3.selected, Venda.Attributes.productArr[i].attSet.att4.selected, "nofweta"), uID);
				Venda.Attributes.updateCalcItem('#nofwrelease',Venda.Attributes.GetCustomData(Venda.Attributes.productArr[i].attSet.att1.selected, Venda.Attributes.productArr[i].attSet.att2.selected, Venda.Attributes.productArr[i].attSet.att3.selected, Venda.Attributes.productArr[i].attSet.att4.selected, "nofwrelease"), uID);
				Venda.Attributes.updateCalcItem('#savepercentmsrp', Venda.Attributes.GetCustomData(Venda.Attributes.productArr[i].attSet.att1.selected, Venda.Attributes.productArr[i].attSet.att2.selected, Venda.Attributes.productArr[i].attSet.att3.selected, Venda.Attributes.productArr[i].attSet.att4.selected, "savepercentmsrp"), uID);
				Venda.Attributes.updateCalcItem('#savepercentwas', Venda.Attributes.GetCustomData(Venda.Attributes.productArr[i].attSet.att1.selected, Venda.Attributes.productArr[i].attSet.att2.selected, Venda.Attributes.productArr[i].attSet.att3.selected, Venda.Attributes.productArr[i].attSet.att4.selected, "savepercentwas"), uID);

				// Update The Price (change between pricerange/price)
				Venda.Attributes.Price(uID);
				jQuery("#oneProduct_" + uID).find('.js-qty').data('sku', Venda.Attributes.Get('atrsku'));
				// Add image path
				objParentSku = jQuery('#oneProduct_' + uID).find('#supplier-sku').text();
				oixtVal = objParentSku + '_' + Venda.Attributes.Get('atrsuplsku');
				jQuery("#oneProduct_" + uID).find('.oixtfield').attr('value', oixtVal);
				// Returnabel days
				sellPrice = parseFloat(Venda.Attributes.Get('atrsell')|| '0.00');
				wasPrice = parseFloat(Venda.Attributes.Get('atrwas') || '0.00');
				if (wasPrice > sellPrice){
					jQuery("#oneProduct_" + uID).find('.oixtfield_price').attr('value', '14');
				} else {
					jQuery("#oneProduct_" + uID).find('.oixtfield_price').attr('value', '30');
					// remove was price if less than sell price
					jQuery('#oneProduct_' + uID + ' .js-attrFeedback #atrwas').text('');
				}

				if (jQuery('.productdetail.oneItem').length > 0) {
					Venda.Attributes.displayPriceNormalItem();
					Venda.Attributes.lookButtonNormalItem();
				}
				if (jQuery('.productdetail.shop-the-look').length > 0) { Venda.Attributes.displayPriceShopthelook(); }

			}

			// Update selected Feedback display
			Venda.Attributes.SelectedValues(Venda.Attributes.productArr[i].attSet.att1.selected,Venda.Attributes.productArr[i].attSet.att2.selected,Venda.Attributes.productArr[i].attSet.att3.selected,Venda.Attributes.productArr[i].attSet.att4.selected, uID);

			// Show all elements with "js-Re-paint" class
			Venda.Attributes.Paint();
			selectedAtr1 = Venda.Attributes.productArr[i].attSet['att1'].selectedValue;
		}
	}
	if(selectedAtr1 !== "") {
		Venda.Attributes.ImageSwap(selectedAtr1, uID);
	}

};

Venda.Attributes.displayPriceNormalItem = function(){
	// Price
	if (jQuery(".prod-pricefield").find("#atrwas").text() == ""){
	  jQuery(".prod-pricefield").find(".prod-price-now-range,.prod-pricenow").removeClass("hasWas");
	  jQuery(".prod-pricefield").find(".prod-price-sale").hide();

	} else {
	  jQuery(".prod-pricefield").find(".prod-price-now-range,.prod-pricenow").addClass("hasWas");
	  jQuery(".prod-pricefield").find(".prod-price-sale").show();
	}
};

Venda.Attributes.displayPriceShopthelook = function(){
	jQuery('.js-oneProduct.js-prodMulti').each(function(){
	  var $this = $(this);
	     // Price
		if ($this.find("#atrwas").text() == ""){
		  $this.find(".prod-price-now-range,.prod-pricenow").removeClass("hasWas");
		  $this.find(".prod-price-sale").hide();

		} else {
		  $this.find(".prod-price-now-range,.prod-pricenow").addClass("hasWas");
		  $this.find(".prod-price-sale").show();
		}
	});
};

Venda.Attributes.lookButtonNormalItem = function(){
	var $this = jQuery('.js-oneProduct'),
			qty       = parseInt($this.find('.js-qty').val()),
			$att1     = jQuery('#addproductform').find("[name=att1]"),
			$att2     = jQuery('#addproductform').find("[name=att2]"),
			$att3     = jQuery('#addproductform').find("[name=att3]"),
			$att4     = jQuery('#addproductform').find("[name=att4]"),
			checkAttr = true;

	if(qty < 1){checkAttr = false;}
	if($att1 && $att1.val() === ""){checkAttr = false;}
	if($att2 && $att2.val() === ""){checkAttr = false;}
	if($att3 && $att3.val() === ""){checkAttr = false;}
	if($att4 && $att4.val() === ""){checkAttr = false;}

	if(checkAttr){
		$this.find('.js-addproduct').prop('disabled', false).removeClass('disabled');
	}else{
		$this.find('.js-addproduct').prop('disabled', true).addClass('disabled');
	}
};
/**
* This is a function gets the attribute object value reference
* @param{string} attName is the current attribute name e.g. att1
* @param{string} attValue is the current attribute value e.g. white
* @return{string} The value referance of the attName and attValue
* @author Alby Barber <abarber@venda.com>
*/
Venda.Attributes.getValueRef = function(attName,attValue){
	var atrNumber = 'atr' + attName.replace(/[a-z]/g,'');
	for(var j = 0; j < Venda.Attributes.attsArray.length; j++) {
		if(Venda.Attributes.attsArray[j][attName] == attValue) {
			return Venda.Attributes.attsArray[j][atrNumber];
		}
	}
}


/* PRODUCT IMAGE SWAP */


Venda.Attributes.ImageSwapReset = function() {}
Venda.Attributes.ViewLargeImg = function(param, imgNo) {};
Venda.Attributes.StoreImageSwaps = function(obj) {};

Venda.Attributes.getAtrData = function(attName,attValue, init, uID){
	var atrNumber     = "atr" + attName.replace(/[a-z]/g,""),
		firstcolor    = "",
		firstcolornum = "";
	if(Venda.Attributes.attsArray.length > 0){
		for(var i = 0; i < Venda.Attributes.productArr.length; i++) {
			if (Venda.Attributes.productArr[i].attSet.id == uID) {
				firstcolor = Venda.Attributes.productArr[i].attSet.att1.optionValues[0] || "";
			}
		}
		for(var j = 0; j < Venda.Attributes.attsArray.length; j++) {
			if(firstcolornum === "" && Venda.Attributes.attsArray[j][attName] === firstcolor){
				firstcolornum = j;
			}
			if(Venda.Attributes.attsArray[j][attName] === attValue) {
				return Venda.Attributes.attsArray[j];
			}
		}
		return Venda.Attributes.attsArray[firstcolornum || 0];
	}else{
		return false;
	}
};

Venda.Attributes.ImageSwap = function(att, uID) {
	var attrData = Venda.Attributes.getAtrData("atr1", att, false, uID),
		colorUID = attrData.atrsuplsku || "",
		$share   = false;
	if(colorUID !== ""){
		var settings = Venda.Attributes.Scene7.settings,
			project = settings.project,
			keyimage = jQuery('#oneProduct_' + uID).find('#supplier-sku').text();
		if(jQuery('#oneProduct_' + uID).is('.js-prodMulti')){
			jQuery('#oneProduct_' + uID).find('.prod-image img').attr('src', Venda.Attributes.Scene7.buildAssetURL(project+"/"+keyimage+"_"+colorUID + '?$productThumbnail$&wid=400&hei=400&defaultImage=noimage'));
		}else{
			if(Venda.Attributes.Scene7.settings.mediaSet){
				Venda.Attributes.Scene7.settings.mediaSet.setAsset(project+"/"+keyimage+"_"+colorUID+"_is?defaultImage=KateSpade/noimage");
			}
		}
		if(jQuery('.productdetail.shop-the-look').length > 0){
			$share = jQuery('#oneProduct_' + uID);

		}else{
			$share = jQuery('.productdetail-wrap');
		}
		$share.find('.social-buttons').each(function(){
			var $this = $(this);
			$this.data('media', Venda.Attributes.Scene7.buildAssetURL(project+"/"+keyimage+"_"+colorUID + '?wid=400&hei=400&defaultImage=noimage'));
		});
		if(typeof(Venda.Ebiz.generateShareURL) != "undefined"){
			Venda.Ebiz.generateShareURL();
		}
	}

};

Venda.Attributes.attrCount = function(uID, attName){
	for(var i = 0; i < Venda.Attributes.productArr.length; i++) {
		if (Venda.Attributes.productArr[i].attSet.id == uID){
			return Venda.Attributes.productArr[i].attSet[attName].optionValues.length;
		}
	}
	return 0;
};

Venda.Attributes.hideEmptyAltImage = function (container, ele) {
 var $container = jQuery(container);
 $container.find('img').each(function () {
   if (jQuery(this).attr('src') === '') jQuery(this).parent(ele).hide();
 });
};

Venda.Attributes.generatedOptions = [];
$(function() {
		$( "select[name^='att']" ).each(function(select) {
				Venda.Attributes.generatedOptions[select] = [];
				$(this).find('option').each(function() {
				  Venda.Attributes.generatedOptions[select].push( $(this).attr('value') );
				});
		})
});


Venda.namespace('Attributes.Scene7');
Venda.Attributes.Scene7 = function () {};
Venda.Attributes.Scene7.initDefaultSeetings = function () {
	Venda.Attributes.Scene7.settings = {
		imageWrap: 		'product-detail-image-wrap',
		imageContainer: 'product-detail-image-container',
		imageCanvas:    'productdetail-image',
		imageItem:      'productdetail-image-item',
		imageThumb: 	'productdetail-altview',
		imageThumbList: 'productdetail-altview-list',
		spinview: 		'productdetail-spinview',
		s7Libs:  		['common.Container', 'image.ZoomView', 'set.MediaSet', 'set.SpinView', 'set.Swatches', 'common.Button'],
		project:        "KateSpade",
		keyimage:       "",
		s7Params: 		null,
		lastAssetType: 	null,
		s7Params: 		null,
		container: 		null,
		zoomView: 		null,
		spinView: 		null,
		mediaSet: 		null,
		swatches: 		null,
		setAsset: 		null,
		zoomInButton: 	null,
		zoomOutButton:  null,
		videoPlayer: 	null,
		serverURL: 		'https://katespade.scene7.com',
		imgwidth:  		431,
		imgheight:  	575
	};
};
Venda.Attributes.Scene7.initDefaultSeetings();
Venda.Attributes.Scene7.init = function(){
	var settings 	   = Venda.Attributes.Scene7.settings,
		imageWrap = jQuery(document.getElementById(settings.imageWrap)),
		thumbContainer = jQuery(document.getElementById(settings.imageThumb));

	Venda.Attributes.Scene7.settings.keyimage = imageWrap.data('keyimage') || "";
	jQuery.getScript(settings.serverURL+"/s7sdk/2.7/js/s7sdk/utils/Utils.js", Venda.Attributes.Scene7.s7LoadHandler);

	if(thumbContainer.length > 0){
		thumbContainer.on('click', 'a', function(e){
			e.preventDefault();
			var assetData = jQuery(this).data('s7asset');

			e.s7event = {"asset": assetData};
			jQuery(e.target).closest("li").addClass("selected").siblings().removeClass("selected");
			Venda.Attributes.Scene7.setActiveView(e);
		});
	}
};

Venda.Attributes.Scene7.s7LoadHandler = function(){
	var settings = Venda.Attributes.Scene7.settings;

	for (var i=0, l=settings.s7Libs.length; i<l; i++) {
		s7sdk.Util.lib.include('s7sdk.'+settings.s7Libs[i]);
	}

	s7sdk.Util.init();
	Venda.Attributes.Scene7.settings.s7Params = Venda.Attributes.Scene7.getS7ParameterMgr();
	Venda.Attributes.Scene7.settings.s7Params.addEventListener(s7sdk.Event.SDK_READY, Venda.Attributes.Scene7.initViewers, false);
	Venda.Attributes.Scene7.settings.s7Params.init();
};

Venda.Attributes.Scene7.getS7ParameterMgr = function(noAsset) {
	var settings = Venda.Attributes.Scene7.settings,
		pMgr     = new s7sdk.ParameterManager();

	pMgr.push("serverurl", settings.serverURL+"/is/image/");

	if (noAsset!==true) {
		var colorUID = Venda.Attributes.Scene7.getDefaultColor(),
			settings = Venda.Attributes.Scene7.settings,
					project = settings.project,
					keyimage = settings.keyimage;

				pMgr.push("asset", project+"/"+keyimage+"_"+colorUID+"_is?defaultImage=KateSpade/noimage");
	}
	return pMgr;
};

Venda.Attributes.Scene7.getDefaultColor = function(){
	var defcolor   = jQuery('#invt-defcolor').text() || "DEFAULT",
			uID        = jQuery(".js-oneProduct").attr('id').substr(11);
			urlParam   = Venda.Platform.getUrlParam(location.href, 'color'),
			urlParam3   = Venda.Platform.getUrlParam(location.href, 'colorid'),
			attrData   = "",
			atrsuplsku = defcolor;
		if($('.modal-load-url').text()!="") urlParam = Venda.Platform.getUrlParam($('.modal-load-url').text(), 'color');

		if(jQuery('.shop-the-look').length === 0 ){
			if(defcolor === "DEFAULT" && !urlParam){
				urlParam = defcolor;
			}else{
				if(!urlParam){
					urlParam = '';
				}
			}

			/* check valid color */
			if(atrsuplsku !== "" && $('#oneProduct_' + uID).find('[data-atrsuplsku="' + atrsuplsku + '"]').length == 0){
				urlParam = $('#oneProduct_' + uID).find('.js-colourSwatch:first').data('attvalue');
			}
		}else{
			urlParam = '';
		}

		if(urlParam != ""){
			attrData = Venda.Attributes.getAtrData("atr1", urlParam, true, uID);
			if(attrData && attrData.atrsuplsku !== ""){
				atrsuplsku = attrData.atrsuplsku;
			}
		}
		if(urlParam3 != '')
			atrsuplsku = urlParam3;
		return atrsuplsku;

};

Venda.Attributes.Scene7.initViewers = function(){
	var settings = Venda.Attributes.Scene7.settings;

	Venda.Attributes.Scene7.settings.container = new s7sdk.common.Container(settings.imageCanvas, settings.s7Params, settings.imageContainer);
	Venda.Attributes.Scene7.settings.container.addEventListener(s7sdk.event.ResizeEvent.COMPONENT_RESIZE, Venda.Attributes.Scene7.resizeViewer, false);

	Venda.Attributes.Scene7.settings.mediaSet  = new s7sdk.MediaSet(settings.imageContainer, settings.s7Params);
	Venda.Attributes.Scene7.settings.mediaSet.addEventListener(s7sdk.AssetEvent.NOTF_SET_PARSED, Venda.Attributes.Scene7.onMediaSetParsed);
	};

Venda.Attributes.Scene7.onMediaSetParsed = function(e){
	var s7mediasetDesc = e.s7event.asset;
	var compAsset = new s7sdk.MediaSetDesc(
							s7mediasetDesc.parent,
							s7mediasetDesc.level,
							s7mediasetDesc.type,
							s7mediasetDesc.name,
							s7mediasetDesc.swatch);

	for (var i = 0; i < s7mediasetDesc.items.length; i++) {
		if (s7mediasetDesc.items[i].type == s7sdk.ItemDescType.IMAGE_SET) {
			for (var j = 0; j < s7mediasetDesc.items[i].items.length; j++) {
				compAsset.items.push(s7mediasetDesc.items[i].items[j]);
			}
		} else {
			compAsset.items.push(s7mediasetDesc.items[i]);
		}
	}
	Venda.Attributes.Scene7.buildThumbs(compAsset);
	if (navigator.userAgent.match(/iPad/i) != null) {
		$('#zoomIn,#zoomOut').remove();
	}
};

Venda.Attributes.Scene7.buildAssetURL = function(asset) {
	return [Venda.Attributes.Scene7.settings.serverURL + "/is/image/", asset].join('');
};
Venda.Attributes.Scene7.initCarousel = function (el, prev, next, vertical) {
	if($(el).length>0){
		$(el).jcarousel({
			vertical: vertical
		});
		$(document).on("click", prev, function(){
			$(el).jcarousel('scroll', '-=1');
		});
		$(document).on("click", next, function(){
			$(el).jcarousel('scroll', '+=1');
		});
		$(prev).hide();
		$(next).hide();

		items = $(el).find('li').length || 1;
		maxitems = (Modernizr.mq('only all and (max-width: 767px)'))?3:2;

		if(items>maxitems) {
			$(prev).show();
			$(next).show();
		}
	}
};
Venda.Attributes.Scene7.buildCarousel = function(){
	vertical = (Modernizr.mq('only all and (max-width: 767px)'))?true:false;
	Venda.Attributes.Scene7.initCarousel('.quickViewModal #productdetail-altview', '.quickViewModal .productdetail-altview-prev', '.quickViewModal .productdetail-altview-next', vertical);
};
Venda.Attributes.Scene7.buildThumbs = function(setData){
	var settings 	   = Venda.Attributes.Scene7.settings,
		outerContainer = jQuery(document.getElementById(settings.imageThumb)),
		thumbContainer = jQuery('<ul id="'+settings.imageThumbList+'"></ul>');

	if (jQuery.isArray(setData.items)){
		jQuery.each(setData.items, function(index, item) {
			var assetData    = item, imageurl, thumburl, thumb, img;

			imageurl = Venda.Attributes.Scene7.buildAssetURL(assetData.name);
			if(assetData.swatch){
				thumburl = Venda.Attributes.Scene7.buildAssetURL(assetData.swatch.image + '?$productThumbnail$&defaultImage=noimage');
			}else{
				thumburl = Venda.Attributes.Scene7.buildAssetURL(assetData.name + '?$productThumbnail$&defaultImage=noimage');
			}
			thumb = jQuery("<a/>").attr({ href: imageurl, class: 'thumbnail-link' })
										 .data({ s7asset: assetData, big: imageurl });
			img = jQuery('<img/>').attr({ src: thumburl, alt: ''});
			thumbContainer.append(jQuery('<li class="thumb"></li>').append(thumb.append(img)));
		});
	}
	outerContainer.html(thumbContainer);
	thumbContainer.find("a:first").trigger('click');
	Venda.Attributes.Scene7.buildCarousel();
	$(window).on("resize", function(){
		Venda.Attributes.Scene7.buildCarousel();
	});
};

Venda.Attributes.Scene7.setActiveView = function(e) {
	var asset    = e.s7event.asset,
	    settings = Venda.Attributes.Scene7.settings;

	var removeZoomView = function() {
		if (settings.zoomView && settings.zoomView.obj) {
			jQuery(settings.zoomView.obj).fadeOut("normal", function(){
				jQuery([settings.zoomView.obj, settings.zoomInButton.obj, settings.zoomOutButton.obj]).remove();
			});
		}
	};
	var removeSpinView = function () {
		if (settings.spinView && settings.spinView.obj) {
			jQuery(settings.spinView.obj).fadeOut("normal", function(){jQuery(settings.spinView.obj).remove();});
		}
	};
	var removeVideoPlayer = function () {
		if (settings.videoPlayer !== null) { /*  */ }
	};
	switch (asset.type) {
		case 1:
			if (settings.lastAssetType != 1) {
				removeSpinView();
				Venda.Attributes.Scene7.createImageSetViewer(asset);
			}
			settings.zoomView.setAsset(asset.name);
		break;
		case 4:
			if (settings.lastAssetType != 4) {
				removeSpinView();
				Venda.Attributes.Scene7.createImageSetViewer(asset);
			}
			settings.zoomView.setAsset(asset.name);
		break;
		case 8:
			if (settings.lastAssetType != 8) {
				removeZoomView();
				Venda.Attributes.Scene7.createSpinViewer();
			}
			settings.spinView.setMediaSet(asset);
		break;
		case 128:
			if(settings.lastAssetType != 128) {
				removeZoomView();
				removeSpinView();
				/*  createVideoPlayer(asset); */
			}
		break;
		default:
			console.log("Unhandled media type: " + asset.type);
	}
	Venda.Attributes.Scene7.settings.lastAssetType = asset.type;
};

Venda.Attributes.Scene7.createSpinViewer = function() {
	var settings = Venda.Attributes.Scene7.settings,
		pMgr     = Venda.Attributes.Scene7.getS7ParameterMgr(true);

	Venda.Attributes.Scene7.settings.spinView = new s7sdk.SpinView(settings.imageContainer, pMgr, settings.spinview);
	Venda.Attributes.Scene7.settings.spinView.setDragToSpin(true);
};
Venda.Attributes.Scene7.resizeViewer = function(e){
	if(Venda.Attributes.Scene7.settings.zoomView) Venda.Attributes.Scene7.settings.zoomView.resize(e.s7event.w, e.s7event.h);
};


Venda.Attributes.Scene7.createImageSetViewer = function(assetData) {
	var settings = Venda.Attributes.Scene7.settings,
		pMgr     		= Venda.Attributes.Scene7.getS7ParameterMgr(true),
		$imageContainer = jQuery(document.getElementById(settings.imageContainer));

	pMgr.push("ZoomView.iscommand", encodeURI("op_sharpen=1&resMode=sharp2&op_usm=1,1,6,0"));

	Venda.Attributes.Scene7.settings.zoomView = new s7sdk.ZoomView(settings.imageContainer, pMgr, "image-zoom-layout");

	Venda.Attributes.Scene7.settings.zoomInButton = new s7sdk.ZoomInButton('productdetail-zoom-tool', pMgr, "zoomIn");
	Venda.Attributes.Scene7.settings.zoomOutButton = new s7sdk.ZoomOutButton('productdetail-zoom-tool', pMgr, "zoomOut");

	Venda.Attributes.Scene7.settings.zoomInButton.toolTip_.setContent($('#tag-zoomin').text());
	Venda.Attributes.Scene7.settings.zoomOutButton.toolTip_.setContent($('#tag-zoomout').text());

	$imageContainer.append('<img src="'+Venda.Attributes.Scene7.buildAssetURL(assetData.name+"?op_sharpen=1&resMode=sharp2&wid=490&fmt=jpg")+'" class="baseimg">');

	Venda.Attributes.Scene7.settings.zoomInButton.addEventListener("click", function() {
		Venda.Attributes.Scene7.settings.zoomView.zoomIn();
	});
	Venda.Attributes.Scene7.settings.zoomOutButton.addEventListener("click", function() {
		Venda.Attributes.Scene7.settings.zoomView.zoomOut();
	});
};

/**
* Runs when the page is ready
* Sets the page up and loads in the set interface type e.g. swatch if there is no type set it will default to dropdown.
*/

jQuery(function() {
	/* prefetch minicart */
	jQuery(document).trigger('fetch-minicart');
	if(jQuery(".js-oneProduct").length>0) Venda.Attributes.Initialize();
	// Add to bag button
  if (jQuery('.productdetail.oneItem').length > 0) {
		Venda.Attributes.displayPriceNormalItem();
		Venda.Attributes.lookButtonNormalItem();
	}
});
