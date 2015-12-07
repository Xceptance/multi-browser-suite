// Initialise namespace + container vars
var LM = new Object();
var FSM = LM;
LM.Version = "2.20.1";
LM.Utils = function() {}; //For us to add util functions to (DOM manipulation etc)
LM.DisableAutoInitialise = "false" == "true";
LM.Initialised = false;
LM.FirstComplete = true;
LM.SiteId = "481af397-d4d4-4fc2-9523-5d6ebd636e29";
LM.Domain = "http://fsm.attraqt.com";
LM.QueryPrefix = "esp_";
LM.SiteReferrer = "";
LM.UID = null;
LM.SID = null;
LM.Culture = null;
LM.Currency = null;
LM.Language = null;
LM.Sku = null;
LM.Category = null;
LM.TrackingCode = null;
LM.SearchTerm = null;
LM.RequestTime = null;
LM.FirstResponseTime = null;
LM.ResponseCompleteTime	= null;
LM.ServerTime = null;
LM.ServerRef = null;
LM.EventTime = new Date();
LM.Zones = [];
LM.BasketItems = [];
LM.OrderHeader = {};
LM.OrderItems = [];
LM.Config = {};
LM.OnComplete = null;  // deprecated
LM.OnPreInit = null;  // deprecated
LM._preInit = [];
LM._load = [];
LM._syncFacets = [];
LM._complete = [];
LM._firstComplete = [];
LM._postComplete = [];
LM._trackComplete = [];
LM._insertHtml = {};
LM.AK = null;
LM.CurrentHash = null;
LM.MonitorHashChange = true;
LM.FacetMode = "html";
LM.MergeHash = false;
LM.SearchOperator = null;
LM.ReloadWithFilters = false;
LM.FixedFacets = {};
LM.MergeDuplicateConfig = "false";
LM.ConfigJoinSeparator = ",";
LM.DataRequestReady = false;
LM.OverlayCaching = null;
LM.LazyLoadZone = null;
LM.LazyLoadPage = null;
LM.LazyLoadHits = null;
LM.LazyLoadComplete = null;
LM.OverlayPositions = {};
LM.AllowedZoneElements = [];

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Allow custom event handlers
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.preInit = function(fn) {
	LM._preInit.push(fn);
}
LM.load = function(fn) {
	LM._load.push(fn);
}
LM.syncFacets = function(fn) {
	LM._syncFacets.push(fn);
}
LM.complete = function(fn) {
	LM._complete.push(fn);
}
LM.firstComplete = function (fn) {
	LM._firstComplete.push(fn);
}
LM.postComplete = function (fn) {
	LM._postComplete.push(fn);
}
LM.config = function(name, value) {
	if (LM.MergeDuplicateConfig == "true" && LM.Config[name]) {
		LM.Config[name] = LM.Config[name] + LM.ConfigJoinSeparator + value;
	}
	else {
		LM.Config[name] = value;
	}
}
LM.trackComplete = function (fn) {
    LM._trackComplete.push(fn);
}
LM.insertHtml = function (zoneRef, fn) {
	if (LM._insertHtml[zoneRef] === undefined) {
		LM._insertHtml[zoneRef] = [];
	}

	LM._insertHtml[zoneRef].push(fn);
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Auto initialise
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM._autoInit = function (__lm_event_method) {
	if (!LM.DisableAutoInitialise) LM.init(__lm_event_method);
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Initialise .... calls when DOM has loaded
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.init = function (__lm_event_method) {
    if (LM.Initialised) return;
    LM.Initialised = true;

    // get click source
    LM.TrackingCode = LM.getCookie("LMTRACK");
    if (LM.TrackingCode != null && LM.TrackingCode != "") {
        LM.setCookie("LMTRACK", "", "S");
    }
    // get add to basket cookie
    var basketCookie = LM.getCookie("LMBASKET");
    if (basketCookie != null) {
        LM.addBasketItem({ sku: basketCookie.split(":")[0], qty: basketCookie.split(":")[1]});
        LM.removeCookie("LMBASKET");
    }

    // run any custom scripts
    for (var ii = 0; ii < LM._preInit.length; ii++) {
        try {
            if (typeof (LM._preInit[ii]) === "function") LM._preInit[ii]();
        }
        catch (e) { }
    }
    try {
        if (LM.OnPreInit != null) LM.OnPreInit(); // legacy
    }
	catch (e) { }

    // Tracking
    LM.UID = LM.syncCookie("LMUID", "P");
    LM.SID = LM.syncCookie("LMSID", "S");

	// add visit to user data
    var userData = LM.GetUserStorageData();
    if (userData != null) {
    	try {
    		if (!userData.hasOwnProperty("FSM_SID") || userData["FSM_SID"] != LM.SID) {
    			userData["FSM_SID"] = LM.SID;
    			userData["FSM_ReturnUser"] = 0;
    			if (userData.hasOwnProperty("FSM_CurrentVisit")) {
    				userData["FSM_LastVisit"] = userData["FSM_CurrentVisit"];
    				userData["FSM_ReturnUser"] = 1;
    			}
    			var date = new Date();
    			userData["FSM_CurrentVisit"] = (date.getDate() < 10 ? "0" : "") + date.getDate() + "/" + (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1) + "/" + date.getFullYear();
    			userData["FSM_VisitCount"] = parseInt(userData["FSM_VisitCount"] || 0) + 1;
    		}

    		LM.SetUserStorageData(userData);
    	}
    	catch (ex) { }
    }

	// Do we need to re-apply the hash variables once the page has loaded?
    var hash = LM.getHashFromWindowLocation();
    if (hash.indexOf(LM.QueryPrefix) != -1) LM.ReloadWithFilters = true;
    LM.CurrentHash = hash;

    // If referrer is not current site keep track of referrer
    if (document.referrer) {
        var referrerHost = document.referrer.replace("http://", "").replace("https://", "");
        if (referrerHost.indexOf("/") != -1) referrerHost = referrerHost.substring(0, referrerHost.indexOf("/"));
        if (referrerHost != window.location.hostname) {
            LM.setCookie("LMSITEREFERRER", document.referrer, "S");
        }
    }
    LM.SiteReferrer = LM.getCookie("LMSITEREFERRER") || "";

    // overlay
    LM.AK = null;
    var lmaidCk = LM.getCookie("LMAID");
    var lmkeyIdx = location.search.indexOf("_lmkey=");
    if (lmkeyIdx != -1) {
    	LM.AK = location.search.substring(lmkeyIdx + 7, lmkeyIdx + 43);
    }
    else if (lmaidCk != null && lmaidCk != "") {
        LM.AK = lmaidCk;
    }
    if (LM.AK != null) {
        LM.setCookie("LMAID", LM.AK, "S");
    }
    LM.getData();
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// The request to get data for each zone is packaged into a single
// call.
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.getData = function (args) {
    if (!LM.Initialised) return;
    var args = args || {};

    // run any custom scripts
    for (var ii = 0; ii < LM._load.length; ii++) {
        try {
            if (typeof (LM._load[ii]) === "function") LM._load[ii]();
        }
        catch (e) { }
    }
    LM.Zones = [];
    // Gather all the information we can from zones
	// and build into query string
    var divs = [];
    if (LM.AllowedZoneElements && LM.AllowedZoneElements.length > 0) {
    	for (var ii = 0; ii < LM.AllowedZoneElements.length; ii++) {
    		var elems = document.body.getElementsByTagName(LM.AllowedZoneElements[ii]);
    		if (elems.length > 0) {
    			if (divs.length == 0) {
    				divs = Array.prototype.slice.call(elems);
    			}
    			else {
    				divs = divs.concat(Array.prototype.slice.call(elems));
    			}
    		}
    	}
    }
    else {
    	divs = document.body.getElementsByTagName("div");
    }
    for (var ii = 0; ii < divs.length; ii++) {
        var div = divs[ii];
        var divAttr = (div.attributes["data-lmzone"] || div.attributes["lmzone"] || div.attributes["locayta:lmzone"]);
        if (divAttr) {
            div.locayta_lmstart = new Date(); // add date so we can monitor performance
            var __lm_meta = { "zone": divAttr.value, "element": div };
            var __add_zone = true;
            if (args["zones"]) { // additional (optional) check, if zones are specified in args then don't ignore other zones
            	try {
            		__add_zone = false;
            		var __zones = args["zones"];
            		for (var jj = 0; jj < __zones.length; jj++) {
            			if (divAttr.value == __zones[jj]["id"]) __add_zone = true;
            		}
            	}
            	catch (e) { }
            }
            if (__add_zone) LM.Zones.push(__lm_meta);
        }
    }

    var espQuery = LM.buildESPQuery();

    // Data request is now ready, so set ready flag
    LM.DataRequestReady = true;

    // Now we have all the details to send to the server
    // create script tag and append to header to initiate call
    LM.RequestTime = new Date();
    var headTag = document.getElementsByTagName("head")[0];
    var espScript = document.createElement("script");
    espScript.type = "text/javascript";

    espScript.src = LM.Domain + "/zones-js.aspx" + espQuery;
    headTag.appendChild(espScript);
};

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// The request to send tracking data
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.sendTracking = function (trackingType, params, srcObj) {
    if (!LM.Initialised) return;
    var espQuery = "?version=" + LM.Version + "&siteId=" + LM.SiteId + "&UID=" + LM.UID + "&SID=" + LM.SID + "&pageurl=" + encodeURIComponent(window.location.href) + "&trackingType=" + trackingType;
    // click tracking
    if (typeof srcObj !== undefined && srcObj != null) {
        LM.TrackingCode = null;
        if (srcObj.getAttribute && srcObj.getAttribute("data-esp-click")) {
            LM.TrackingCode = srcObj.getAttribute("data-esp-click");
            LM.setCookie("LMTRACK", LM.TrackingCode, "S");
        }
        else {
            var parent = srcObj.parentNode;
            while (parent) {
                var espTrackingCode = parent.getAttribute ? parent.getAttribute("data-esp-click") : null;
                if (espTrackingCode != null && espTrackingCode != "") {
                    LM.TrackingCode = espTrackingCode;
                    LM.setCookie("LMTRACK", espTrackingCode, "S");
                    parent = null;
                }
                else {
                    parent = parent.parentNode;
                }
            }
        }
    }
    if (LM.TrackingCode != null && LM.TrackingCode != "") {
        espQuery += "&tracking=" + LM.TrackingCode;
    }
    // Track view
    if (trackingType == 1) {
        if (LM.Sku != null) espQuery += "&sku=" + encodeURIComponent(LM.Sku);
    }
    // Track add to basket
    else if (trackingType == 2) {
        for (var espKey in params) {
            espQuery += "&basketitem_0_" + espKey.toLowerCase() + "=" + encodeURIComponent(params[espKey]);
        }
    }
    // Track purchase
    else if (trackingType == 3) {
        for (var espKey in params) {
            espQuery += "&orderitem_0_" + espKey.toLowerCase() + "=" + encodeURIComponent(params[espKey]);
        }
        LM.UpdateUserPurchaseData([params]);
    }
	// Overlay
	if (LM.AK != null) {
		espQuery += "&overlay=true";
	}

    // Now we have all the details to send to the server
    // create script tag and append to header to initiate call
    LM.RequestTime = new Date();
    var headTag = document.getElementsByTagName("head")[0];
    var espScript = document.createElement("script");
    espScript.type = "text/javascript";

    espScript.src = LM.Domain + "/tracking-js.aspx" + espQuery;
    headTag.appendChild(espScript);
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Builds formatted server query string to send back to ESP engine
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.buildESPQuery = function() {
	// Build all params as query
	var pageUrl = window.location.href;
	if (LM.LazyLoadZone != null && LM.LazyLoadPage != null) {
		LM.MergeHash = true;
		var hash = LM.getHashFromWindowLocation();
		pageUrl = pageUrl.replace(hash, "");
		if (LM.LazyLoadHits != null) {
			hash = LM.getHash([LM.QueryPrefix + "hitsperpage", LM.QueryPrefix + "viewall", LM.QueryPrefix + "pg", LM.QueryPrefix + "page"]);
			if (hash != "") hash += "&";
			hash += LM.QueryPrefix + "pg=" + LM.LazyLoadPage + "&" + LM.QueryPrefix + "hitsperpage=" + LM.LazyLoadHits;
		}
		else {
			hash = LM.getHash([LM.QueryPrefix + "pg", LM.QueryPrefix + "page"]);
			if (hash != "") hash += "&";
			hash += LM.QueryPrefix + "pg=" + LM.LazyLoadPage;
		}
		pageUrl = pageUrl + "#" + hash;
	}
	var espQuery = "?version=" + LM.Version + "&siteId=" + LM.SiteId + "&UID=" + LM.UID + "&SID=" + LM.SID + "&referrer=" + encodeURIComponent(document.referrer) + "&sitereferrer=" + encodeURIComponent(LM.SiteReferrer) + "&pageurl=" + encodeURIComponent(pageUrl);
	for (var ii = 0; ii < LM.Zones.length; ii++) {
		espQuery += "&zone" + ii + "=" + encodeURIComponent(LM.Zones[ii]["zone"]);
	}
	// click tracking
	if (LM.TrackingCode != null && LM.TrackingCode != "") {
		espQuery += "&tracking=" + LM.TrackingCode;
	}
	// Facet mode
	espQuery += "&facetmode=" + LM.FacetMode + "&mergehash=" + LM.MergeHash;
	// Search term
	if (LM.SearchTerm != null) espQuery += "&searchterm=" + encodeURIComponent(LM.SearchTerm);
	// Preserve search operator
	if (LM.SearchOperator != null) espQuery += "&searchoperator=" + encodeURIComponent(LM.SearchOperator);
	// Culture
	if (LM.Culture != null) espQuery += "&culture=" + encodeURIComponent(LM.Culture);
	// Currency
	if (LM.Currency != null) espQuery += "&currency=" + encodeURIComponent(LM.Currency);
	// Language
	if (LM.Language != null) espQuery += "&language=" + encodeURIComponent(LM.Language);
	// Sku
	if (LM.Sku != null) espQuery += "&sku=" + encodeURIComponent(LM.Sku);
	// Category
	if (LM.Category != null) espQuery += "&category=" + encodeURIComponent(LM.Category);
	// Track add to basket
	for (var ii = 0; ii < LM.BasketItems.length; ii++) {
		for (var espKey in LM.BasketItems[ii]) {
			espQuery += "&basketitem_" + ii + "_" + espKey.toLowerCase() + "=" + encodeURIComponent(LM.BasketItems[ii][espKey]);
		}
	}
	// Track order header
	for (var espKey in LM.OrderHeader) {
		espQuery += "&orderheader_" + espKey.toLowerCase() + "=" + encodeURIComponent(LM.OrderHeader[espKey]);
	}
	// Track purchases
	if (LM.OrderItems.length > 0) {
		for (var ii = 0; ii < LM.OrderItems.length; ii++) {
			for (var espKey in LM.OrderItems[ii]) {
				espQuery += "&orderitem_" + ii + "_" + espKey.toLowerCase() + "=" + encodeURIComponent(LM.OrderItems[ii][espKey]);
			}
		}
		LM.UpdateUserPurchaseData(LM.OrderItems);
	}
	// Custom vars
	if (LM.Config != null) {
		for (var espKey in LM.Config) {
			espQuery += "&config_" + espKey.toLowerCase() + "=" + encodeURIComponent(LM.Config[espKey]);
		}
	}
	var userData = LM.GetUserStorageData();
	if (userData != null) {
		try {
			for (var data in userData) {
				if (userData[data] instanceof Array) {
					espQuery += "&config_" + data.toLowerCase() + "=" + encodeURIComponent(userData[data].join());
				}
				else {
					espQuery += "&config_" + data.toLowerCase() + "=" + encodeURIComponent(userData[data]);
				}
			}
		}
		catch (ex) { }
	}
	// Overlay
	if (LM.AK != null) {
		espQuery += "&overlay=true&aid=" + LM.AK;
		var overlayCaching = LM.getCookie("LMTOOLKITCACHING");
		if (overlayCaching != null) {
			espQuery += "&caching=" + overlayCaching;
		}
	}
	// Fixed facets/overrides
	for (var fixed in LM.FixedFacets) {
		espQuery += "&bucket_" + fixed + "=" + LM.FixedFacets[fixed];
	}
	return espQuery;
};

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Allows a facet bucket to be manually overwritten
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.registerFixedFacet = function(facetName, facetValues) {
	var vals = [];
	for (var ii = 0; ii < facetValues.length; ii++) {
		vals.push(facetValues[ii].join(":"));
	}
	LM.FixedFacets[facetName] = vals.join(":");
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Gets the hash key, but with specified params removed
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.getHash = function(stripKeys) {
	//var hash = window.location.hash.replace(/^#/, "");
    var hash = LM.getHashFromWindowLocation();
    var keyValues = hash.substring(1).split("&");
	hash = "";
	for (var ii = 0; ii < keyValues.length; ii++) {
		var keyValue = keyValues[ii];
		if (keyValue != "") {
			var remove = false;
			if (!remove && stripKeys != null && stripKeys.length > 0) {
				for (var jj = 0; jj < stripKeys.length; jj++) {
					if (stripKeys[jj] != "" && keyValue.indexOf(stripKeys[jj]) == 0) {
						remove = true;
					}
				}
			}
			if (!remove) {
				if (hash != "") hash += "&";
				if (!remove) hash += keyValue;
			}
		}
	}
	return hash;
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// gets the hash key values
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.getHashKeyValues = function () {
    //var hash = window.location.hash.replace(/^#/, "");
    var hash = LM.getHashFromWindowLocation();
    var keyValues = hash.substring(1).split("&");

    return keyValues;
}

LM.getHashFromWindowLocation = function () {
    var hash = "";
    var hashPos = window.location.href.indexOf("#");
    if (hashPos != -1) {
    	hash = window.location.href.substring(hashPos).replace(/%27/g, "'");
    }

    return hash;
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Sets filters
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.setFilters = function (filters, currentField) {
    LM.FacetMode = "data";
    LM.MergeHash = true;
    var hash = LM.getHash([LM.QueryPrefix + "filter_", LM.QueryPrefix + "cf", LM.QueryPrefix + "pg", LM.QueryPrefix + "page"]);
    if (currentField != null && currentField != "") {
        if (hash != "") hash += "&";
        hash += LM.QueryPrefix + "cf=" + encodeURIComponent(currentField);
    }
    for (var field in filters) {
        var values = filters[field];
        for (var ii = 0; ii < values.length; ii++) {
            if (hash != "") hash += "&";
            hash += LM.QueryPrefix + "filter_" + encodeURIComponent(field) + "=" + encodeURIComponent(values[ii]);
        }
    }
    LM.CurrentHash = "#" + hash;
    window.location.hash = hash;
    LM.getData();
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Clear filters
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.clearFilters = function () {
    LM.FacetMode = "data";
    LM.MergeHash = true;
    var hash = LM.QueryPrefix + "cf=";
    LM.CurrentHash = "#" + LM.QueryPrefix + "cf=";
    window.location.hash = hash;
    LM.getData();
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Set sort field and sort order
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.setSortField = function(sortField, sortOrder) {
	LM.FacetMode = "data";
	LM.MergeHash = true;
	var hash = LM.getHash([LM.QueryPrefix + "sort", LM.QueryPrefix + "order", LM.QueryPrefix + "pg", LM.QueryPrefix + "page"]);
	if (hash != "") hash += "&";
	hash += LM.QueryPrefix + "sort=" + encodeURIComponent(sortField);
	hash += "&" + LM.QueryPrefix + "order=" + encodeURIComponent(sortOrder);
	LM.CurrentHash = "#" + hash;
	window.location.hash = hash;
	LM.getData();
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Set the page
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.setPage = function(page) {
	LM.FacetMode = "data";
	LM.MergeHash = true;
	var hash = LM.getHash([LM.QueryPrefix + "pg", LM.QueryPrefix + "page"]);
	if (hash != "") hash += "&";
	hash += LM.QueryPrefix + "pg=" + page;
	LM.CurrentHash = "#" + hash;
	window.location.hash = hash;
	LM.getData();
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Set the hits per page
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.setPageView = function (hits) {
    LM.FacetMode = "data";
    LM.MergeHash = true;
    var hash = LM.getHash([LM.QueryPrefix + "hitsperpage", LM.QueryPrefix + "viewall", LM.QueryPrefix + "pg", LM.QueryPrefix + "page"]);
    if (hash != "") hash += "&";
    if (hits == "viewall") {
        hash += LM.QueryPrefix + "viewall=y";
    }
    else {
        hash += LM.QueryPrefix + "hitsperpage=" + hits;
    }
    LM.CurrentHash = "#" + hash;
    window.location.hash = hash;
    LM.getData();
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Lazy load products
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.lazyLoad = function (args) {
	if (args.zone === undefined || args.zone == null) {
		if (args.src) {
			var parent = args.src.parentNode;
			while (parent) {
				var divAttr = (parent.attributes["data-lmzone"] || parent.attributes["lmzone"] || parent.attributes["locayta:lmzone"]);
				if (divAttr) {
					args.zone = divAttr.value;
					parent = null;
				}
				else {
					args.zone = null;
					parent = parent.parentNode;
				}
			}
		}
	}
	
	if (args.complete !== undefined && args.complete != null && typeof(args.complete) == "function") {
		LM.LazyLoadComplete = args.complete;
	}
	
	if (args.zone && args.zone != null) {
		LM.LazyLoadZone = args.zone;
		LM.LazyLoadPage = args.page || 2;
		if (args.hits && args.hits != null && args.hits != "") {
			LM.LazyLoadHits = args.hits;
		}
		LM.getData({ zones: [{ id: args.zone }] });
	}
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Set/get cookie value
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.syncCookie = function(cookieName, cookieType) {
	var cookieValue = LM.getCookie(cookieName);
	if (cookieValue == null || cookieValue == "") cookieValue = LM.GUID();
	LM.setCookie(cookieName, cookieValue, cookieType);	
	return cookieValue;
}
LM.getCookie = function(cookieName) {
	var match = document.cookie.match ("(^|;) ?" + cookieName + "=([^;]*)(;|$)");
	if (match) {
		return (unescape(match[2]));
	}
	else {
		return null;
	}
}
LM.setCookie = function(cookieName, cookieValue, cookieType) {
	var cookieStr	= cookieName + "=" + escape(cookieValue) + "; path=/";
	if (cookieType == "S") {
		// session cookie
		var date = new Date();
		date.setTime(date.getTime()+(60*60*1000)+(15*60*1000)); // session time of 1 hour and 15 minutes
		cookieStr += "; expires=" + date.toGMTString();
	}
	else {
		// permanent cookie
		var date = new Date();
		date.setTime(date.getTime()+(1000*24*60*60*1000)); // session time of 1000 days
		cookieStr += "; expires=" + date.toGMTString();
	}
	// always reset cookie
	document.cookie = cookieStr;
}
LM.removeCookie = function (cookieName) { //reset cookie with provided name that expires immediately
    var date = new Date();
    date.setTime(date.getTime()); //Set expiry to now
    document.cookie = cookieName + "=; path=/; expires=" + date.toGMTString();
}
LM.allCookies = function() {
	var bases = document.cookie.split("; ");
	var cookies = {};
	for (var ii = 0; ii < bases.length; ii++) {
		try {
			var keyValue = bases[ii].split("=");
			cookies[keyValue[0]] = unescape(keyValue[1]);
		}
		catch (e) { }
	}
	return cookies;
}
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Generate unique(ish) user id
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.GUID = function() {
   return (LM.Random4()+LM.Random4()+"-"+LM.Random4()+"-"+LM.Random4()+"-"+LM.Random4()+"-"+LM.Random4()+LM.Random4()+LM.Random4());
}
LM.Random4 = function() {
   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}


//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Add custom fields
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.addCustomField = function(fieldName, fieldValue) {
	LM.config(fieldName, fieldValue);
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Track item in basket
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.addBasketItem = function (params, srcObj) {
    if (LM.DataRequestReady) {
        LM.sendTracking(2, params, srcObj);
    }
    else {
        LM.BasketItems.push(params);
    }
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Track item in basket using cookie
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.addBasketItemCookie = function (params) {
    var cookieValue = params["sku"] + ":" + params["qty"];
    LM.setCookie("LMBASKET", cookieValue, "S");
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Track new order
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.addOrder = function(params) {
	LM.OrderHeader.push(params);
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Track order line purchase
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.addOrderItem = function(params, srcObj) {
	if (LM.DataRequestReady) {
		LM.sendTracking(3, params, srcObj);
    }
    else {
        LM.OrderItems.push(params);
	}
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// First call from server
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.buildStart = function() {
	LM.FirstResponseTime = new Date();
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Called by server and sets/generates the
// zone html
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.buildZone = function(params) {
	var idx = parseInt(params["idx"]);
	var zone = LM.Zones[idx]["element"];
	zone.espParams = params;
	zone.espParams["jsStart"] = new Date();
	zone.setAttribute("data-esp-click", params["tracking"]);
	// check if should lazyload
	if (LM.LazyLoadZone != null && LM.LazyLoadZone == params["zoneRef"]) {
		// get lazy load container
		var lazyLoadContainer = null;
		var children = zone.getElementsByTagName("*");
		for (var ii = 0; ii < children.length; ii++) {
			var roleAttr = children[ii].getAttribute ? children[ii].getAttribute("data-role") : null;
			if (roleAttr != null && roleAttr == "fsmlazyloadcontainer") {
				lazyLoadContainer = children[ii];
				break;
			}
		}
		if (lazyLoadContainer != null) {
			// get new lazy load html
			var newlazyLoadContainer = null;
			var newContent = document.createElement("div");
			newContent.innerHTML = params["html"];
			var newChildren = newContent.getElementsByTagName("*");
			for (var ii = 0; ii < newChildren.length; ii++) {
				var roleAttr = newChildren[ii].getAttribute ? newChildren[ii].getAttribute("data-role") : null;
				if (roleAttr != null && roleAttr == "fsmlazyloadcontainer") {
					newlazyLoadContainer = newChildren[ii];
					break;
				}
			}
			// append new lazy load html
			if (newlazyLoadContainer != null) {
				if (LM.LazyLoadComplete !== undefined && LM.LazyLoadComplete != null && typeof (LM.LazyLoadComplete) === "function") {
					LM.LazyLoadComplete(newlazyLoadContainer.children);
					LM.LazyLoadComplete = null;
				}
				else {
					while (newlazyLoadContainer.children.length > 0) {
						lazyLoadContainer.appendChild(newlazyLoadContainer.children[0]);
					}
				}
			}
		}
		if (LM.FacetMode == "data") {
			// run any custom scripts for facets UI
			if (params["facetData"]) {
				for (var ii = 0; ii < LM._syncFacets.length; ii++) {
					if (typeof (LM._syncFacets[ii]) === "function") LM._syncFacets[ii](params);
				}
			}
		}
		LM.LazyLoadZone = null;
		LM.LazyLoadPage = null;
		LM.LazyLoadHits = null;
	}
	else {
		if (LM._insertHtml[zone.zoneRef] !== undefined) {
			for (var ii = 0; ii < LM._insertHtml[zone.zoneRef].length; ii++) {
				if (typeof (LM._insertHtml[zone.zoneRef][ii]) === "function") LM._insertHtml[zone.zoneRef][ii](params);
			}

			if (LM.FacetMode == "data") {
				// run any custom scripts for facets UI
				if (params["facetData"]) {
					for (var ii = 0; ii < LM._syncFacets.length; ii++) {
						if (typeof (LM._syncFacets[ii]) === "function") LM._syncFacets[ii](params);
					}
				}
			}
		}
		else {
			if (!LM.ReloadWithFilters) {
				zone.innerHTML = params["html"];
			}
			if (LM.FacetMode == "html" || LM.FacetMode == "mixed") {
				// load up facets html
				try {
					var facetAttr = (zone.attributes["data-facetdomid"] || zone.attributes["facetdomid"] || zone.attributes["locayta:facetdomid"]);
					if (facetAttr) {
						var facet = document.getElementById(facetAttr.value);
						facet.innerHTML = params["facetHtml"] || "";
						facet.setAttribute("data-esp-click", params["tracking"]);
					}
				}
				catch (e) { }
			}
			else {
				// run any custom scripts for facets UI
				if (params["facetData"]) {
					for (var ii = 0; ii < LM._syncFacets.length; ii++) {
						if (typeof (LM._syncFacets[ii]) === "function") LM._syncFacets[ii](params);
					}
				}
			}
			// load up filters html
			try {
				var filterAttr = (zone.attributes["data-filterdomid"] || zone.attributes["filterdomid"] || zone.attributes["locayta:filterdomid"]);
				if (filterAttr) {
					var filter = document.getElementById(filterAttr.value);
					filter.innerHTML = params["filterHtml"] || "";
					filter.setAttribute("data-esp-click", params["tracking"]);
				}
			}
			catch (e) { }
		}
	}
	if (params["appliedSearchOperator"]) {
		LM.SearchOperator = params["appliedSearchOperator"];
	}
	zone.espParams["jsEnd"] = new Date();
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Special rule type, redirect to another page
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.redirect = function (params) {
	var idx = parseInt(params["idx"]);
	var zone = LM.Zones[idx]["element"];
	zone.espParams = params;
	zone.espParams["jsStart"] = new Date();
	zone.setAttribute("data-esp-click", params["tracking"]);
	if (params["targetUrl"]) {
		var isOverlay = params["overlay"] === true;
		if (!isOverlay) {
			window.location = params["targetUrl"];
		}
	}
	zone.espParams["jsEnd"] = new Date();
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Fires when all zones have been populated
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.buildComplete = function (params) {
    LM.ResponseCompleteTime = new Date();
    LM.ServerTime = params["serverTime"];
    LM.ServerRef = params["serverRef"];
    if (params["cacheSize"]) LM.CacheSize = params["cacheSize"];
    if (params["totalCachedInstances"]) LM.TotalCachedRules = params["totalCachedInstances"];
	if (params["trackedView"]) LM.TrackedView = params["trackedView"];
	if (params["trackedAddsToBasket"]) LM.TrackedAddsToBasket = params["trackedAddsToBasket"];
	if (params["trackedPurchases"]) LM.TrackedPurchases = params["trackedPurchases"];
	if (params["culture"]) LM.ServerCulture = params["culture"];
	if (params["currency"]) LM.ServerCurrency = params["currency"];
	if (params["language"]) LM.ServerLanguage = params["language"];
	if (params["overlayCaching"]) LM.OverlayCaching = params["overlayCaching"] == "true";
	if (params["serverVersion"]) LM.ServerVersion = params["serverVersion"];

	// run any custom scripts
	var zoneRefs = [];
	for (var ii = 0; ii < params["zones"].length; ii++) {
		zoneRefs.push(params["zones"][ii].id);
	}
	var completeArgs = {
		zoneRefs: zoneRefs,
		zones: params["zones"]
	}
	// first time
	if (LM.FirstComplete) {
		for (var ii = 0; ii < LM._firstComplete.length; ii++) {
			try {
				if (typeof (LM._firstComplete[ii]) === "function") LM._firstComplete[ii](completeArgs);
			}
			catch (e) { }
		}
		LM.FirstComplete = false;
	}
	// everytime
    for (var ii = 0; ii < LM._complete.length; ii++) {
        try {
        	if (typeof (LM._complete[ii]) === "function") LM._complete[ii](completeArgs);
        }
        catch (e) { }
    }
    if (LM.OnComplete) { // legacy
        try {
            LM.OnComplete();
        }
        catch (e) { }
    }
    // track link clicks
    try {
        var links = document.getElementsByTagName("a");
        for (var ii = 0; ii < links.length; ii++) {
            var link = links[ii];
            if (link.addEventListener) {
                link.addEventListener("click", LM.trackClick, false);
            }
            else if (link.attachEvent) {
                link.attachEvent("onclick", LM.trackClick);
            }
        }
    }
    catch (e) { }
    // track input clicks
    try {
        var inputs = document.getElementsByTagName("input");
        for (var ii = 0; ii < inputs.length; ii++) {
            var input = inputs[ii];
            if (input.getAttribute("type") && input.getAttribute("type") == "submit" || input.getAttribute("type") == "image") {
                if (input.addEventListener) {
                    input.addEventListener("click", LM.trackClick, false);
                }
                else if (input.attachEvent) {
                    input.attachEvent("onclick", LM.trackClick);
                }
            }
        }
    }
    catch (e) { }
    // track form submits
    try {
        var forms = document.getElementsByTagName("form");
        for (var ii = 0; ii < forms.length; ii++) {
            var form = forms[ii];
            if (form.addEventListener) {
                form.addEventListener("submit", LM.trackClick, false);
            }
            else if (form.attachEvent) {
                form.attachEvent("onsubmit", LM.trackClick);
            }
        }
    }
    catch (e) { }
	// post complete
    for (var ii = 0; ii < LM._postComplete.length; ii++) {
    	try {
    		if (typeof (LM._postComplete[ii]) === "function") LM._postComplete[ii](completeArgs);
    	}
    	catch (e) { }
    }
	// overlay
    if (LM.AK != null && params["overlay"] == true) {
        var headTag = document.getElementsByTagName("head")[0];
        var espOverlayScript = document.createElement("script");
        espOverlayScript.type = "text/javascript";

        var espQuery = LM.buildESPQuery();

        espOverlayScript.src = LM.Domain + "/zones-admin-js.aspx" + espQuery;
        headTag.appendChild(espOverlayScript);
    }
	// may need to reload with filters
    if (LM.ReloadWithFilters) {
        LM.ReloadWithFilters = false;
        LM.FacetMode = "data";
        LM.MergeHash = true;
        LM.getData();
    }
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Fires when tracking request is complete
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.trackingComplete = function (params) {
	for (var ii = 0; ii < LM._trackComplete.length; ii++) {
        try {
            if (typeof (LM._trackComplete[ii]) === "function") LM._trackComplete[ii]();
        }
        catch (e) { }
    }	
	if (params["trackedView"]) LM.TrackedView = params["trackedView"];
	if (params["trackedAddsToBasket"]) LM.TrackedAddsToBasket = params["trackedAddsToBasket"];
	if (params["trackedPurchases"]) LM.TrackedPurchases = params["trackedPurchases"];
	if (LM.AK != null) {
		if (LM.overlay !== undefined) LM.overlay();
	}
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// track click zone and rule
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.trackClick = function (evt) {
    try {
        var evt = evt || window.event;
        var src = evt.target || evt.srcElement;
        if (src != null) {
            if (src.getAttribute && src.getAttribute("data-esp-click")) {
                LM.TrackingCode = src.getAttribute("data-esp-click");
                LM.setCookie("LMTRACK", LM.TrackingCode, "S");
            }
            else {
                var parent = src.parentNode;
                while (parent) {
                    var espTrackingCode = parent.getAttribute ? parent.getAttribute("data-esp-click") : null;
                    if (espTrackingCode != null && espTrackingCode != "") {
                        LM.TrackingCode = espTrackingCode;
                        LM.setCookie("LMTRACK", espTrackingCode, "S");
                        parent = null;
                    }
                    else {
                        parent = parent.parentNode;
                    }
                }
            }
        }
    }
    catch (e) { }
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// User storage functions
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM._isLocalStorageSupported = null;
LM._isSessionStorageSupported = null;
LM.IsLocalStorageSupported = function () {
	if (LM._isLocalStorageSupported == null) {
		LM._isLocalStorageSupported = LM.supportsStorageType("localStorage");
	}

	return LM._isLocalStorageSupported;
}
LM.IsSessionStorageSupported = function () {
	if (LM._isSessionStorageSupported == null) {
		LM._isSessionStorageSupported = LM.supportsStorageType("sessionStorage");
	}

	return LM._isSessionStorageSupported;
}
LM.supportsStorageType = function (type) {
	try {
		if (type in window && window[type] !== null) {
			var storage = eval(type);
			storage.setItem("fsm_storage_test_variable", "");
			storage.removeItem("fsm_storage_test_variable");
			return true;
		}
		else {
			return false;
		}
	}
	catch (e) {
		return false;
	}
}

LM.SetUserStorage = function (key, value) {
	try {
		var data = LM.GetUserStorageData();
		data[key] = value;
		LM.SetUserStorageData(data);
	}
	catch (ex) { }
}

LM.GetUserStorage = function (key) {
	try {
		var data = LM.GetUserStorageData();

		if (data.hasOwnProperty(key)) {
			return data[key];
		}
	}
	catch (ex) { }

	return "";
}

LM.RemoveUserStorage = function (key) {
	try {
		var data = LM.GetUserStorageData();

		if (data.hasOwnProperty(key)) {
			delete data[key];
			LM.SetUserStorageData(data);
		}
	}
	catch (ex) { }
}

LM.GetUserStorageData = function () {
	if (LM.IsLocalStorageSupported()) {
		var data = LM.JSONParse(localStorage.getItem("LMDATA"));

		return (data || {});
	}
	else {
		var data = LM.JSONParse(LM.getCookie("LMDATA"));

		return (data || {});
	}
}

LM.SetUserStorageData = function (data) {
	if (LM.IsLocalStorageSupported()) {
		localStorage.removeItem("LMDATA");
		localStorage.setItem("LMDATA", LM.JSONStringify(data));
	}
	else {
		LM.setCookie("LMDATA", LM.JSONStringify(data));
	}
}

LM.UpdateUserPurchaseData = function (orderItems) {
	try {
		var data = LM.GetUserStorageData();
		var oldCount = parseInt(data["FSM_OrderCount"] || "0");
		var count = 0;
		var total = 0;
		var skus = (data["FSM_RecentSKUs"] || []);

		for (var ii = 0; ii < orderItems.length; ii++) {
			var order = orderItems[ii];
			var inSkus = false;

			for (var jj = 0; jj < skus.length; jj++) {
				if (skus[jj] === order["sku"]) {
					inSkus = true;
					break;
				}
			}

			if (!inSkus) {
				skus.push(order["sku"]);
			}

			if (order.hasOwnProperty("lineprice")) {
				count++;
				total = total + parseFloat(order["lineprice"] || "0");
			}
		}

		data["FSM_OrderCount"] = oldCount + count;

		if (data.hasOwnProperty("FSM_AvgOrderValue")) {
			data["FSM_AvgOrderValue"] = (((oldCount * parseInt(data["FSM_AvgOrderValue"] || "0")) + total) / data["FSM_OrderCount"]).toFixed(2);
		}
		else {
			data["FSM_AvgOrderValue"] = total / count;
		}

		if (skus.length > 11) { 
			skus = skus.slice(skus.length - 11);
		}

		data["FSM_RecentSKUs"] = skus;
		var date = new Date();
		data["FSM_LastOrderDate"] = (date.getDate() < 10 ? "0" : "") + date.getDate() + "/" + (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1) + "/" + date.getFullYear();
		LM.SetUserStorageData(data);
	}
	catch (ex) { }
}

LM.JSONStringify = function (json) {
	var dataStr = "";

	if (json !== undefined && json != null) {
		try {
			for (var data in json) {
				if (json[data] instanceof Array) {
					dataStr += (dataStr == "" ? data + ":" + json[data].join() : "|" + data + ":" + json[data].join());
				}
				else {
					dataStr += (dataStr == "" ? data + ":" + json[data] : "|" + data + ":" + json[data]);
				}
			}
		}
		catch (ex) { }
	}

	return dataStr;
}

LM.JSONParse = function (string) {
	var json = {};

	if (string !== undefined && string !== null && string.length > 0) {
		try {
			var dataArray = string.split("|");
			for (var ii = 0; ii < dataArray.length; ii++) {
				var data = dataArray[ii].split(":");
				if (data.length == 2) {
					var name = data[0];
					var val = data[1];
					if (val.split(",").length > 0) {
						json[name] = val.split(",");
					}
					else {
						json[name] = val;
					}
				}
			}
		}
		catch (ex) { }
	}

	return json;
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Returns ie version number.
// If you're not in IE, or IE version is less than 5 then 
// LM.ie === undefined
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.ie = (function () {
	var undef,
        v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');

	while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        all[0]
    );

	return v > 4 ? v : undef;
}());

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Trap hash change events so that we can reload content when
// history is envoked
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
try {
	if (!('onhashchange' in window) || LM.ie == 7) {
		var oldHash = LM.getHashFromWindowLocation();
		setInterval(function () {
			if (LM.MonitorHashChange) {
				var newHash = LM.getHashFromWindowLocation();
				if (oldHash !== newHash) {
					oldHash = newHash;
					if (LM.MergeHash && LM.CurrentHash != newHash) {
						LM.CurrentHash = newHash;
						LM.getData();
					}
				}
			}
		}, 100);
	}
	else if (window.addEventListener) {
		window.addEventListener("hashchange", function () {
			if (LM.MonitorHashChange) {
				var hash = LM.getHashFromWindowLocation();
				if (LM.MergeHash && LM.CurrentHash != hash) {
					LM.CurrentHash = hash;
					LM.getData();
				}
			}
		}, false);
	}
	else if (window.attachEvent) {
		window.attachEvent("onhashchange", function () {
			if (LM.MonitorHashChange) {
				var hash = LM.getHashFromWindowLocation();
				if (LM.MergeHash && LM.CurrentHash != hash) {
					LM.CurrentHash = hash;
					LM.getData();
				}
			}
		});
	}
}
catch (e) { }

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Setup "onready" event so that init fires when the DOM loads.
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// DOMContentLoaded is ideal ...
try {
    if (document.addEventListener) {
    	document.addEventListener("DOMContentLoaded", function () { LM._autoInit("DOMContentLoaded"); }, false);
    }
}
catch (e) { }
try {
	if (navigator.appName == "Microsoft Internet Explorer") {
		// For IE less than IE9
		// similar to onload (fires quite late), but better suited to iframes/frames
		document.attachEvent("onreadystatechange", function() {
			if (document.readyState === "complete") {
				document.detachEvent("onreadystatechange", arguments.callee);
				LM._autoInit("onreadystatechange");
			}
		});
		// uses doScroll event to approximate when DOM ready (only works for non frames)
		if (document.documentElement.doScroll && window == window.top) {
			(function() {
				try {
					document.documentElement.doScroll("left");
					LM._autoInit("doScroll");
				}
				catch (_lm_error) {
					setTimeout(arguments.callee, 0);
					return;
				}
			})();
		}
	}
	else {
		// ... for non IE document.readyState isn't a bad fallback for DOMContentLoaded
		if (document.readyState) {
			var espTimer = setInterval(function() {
				if (/loaded|complete/.test(document.readyState)) {
					clearInterval(espTimer);
					LM._autoInit("readyState");
				}
			}, 5);
		}
	}
}
catch (e) { }
// Fallback methods
if (window.addEventListener) {
	window.addEventListener("load", LM._autoInit, false);
}
else if (document.addEventListener) {
	document.addEventListener("load", LM._autoInit, false);
}
else if (window.attachEvent) {
	window.attachEvent("onload", LM._autoInit);
}
else if (document.attachEvent) {
	document.attachEvent("onload", LM._autoInit);
}
else {
	window.onload = LM._autoInit;
}

// Set currency
try {
	LM.preInit(function() {
		var esp_currency = esp_GetInputValueByESPType("data-esp-currency");
		if (esp_currency != "") {
			LM.Currency = esp_currency;
		}
	});
}
catch (e) { }

// Category tree
try {
	LM.preInit(function() {
		var esp_input_categoryTree = esp_GetInputValueByESPType("data-esp-category-tree");
		var esp_categoryTree = "";
		var esp_cats = esp_input_categoryTree.split("|");
		var esp_category = "";
		for (var ii = 0; ii < esp_cats.length; ii++) {
			if (esp_cats[ii] != "") {
				esp_category = esp_cats[ii];
				if (esp_categoryTree == "") {
					esp_categoryTree = esp_cats[ii];
				}
				else {
					esp_categoryTree += "/" + esp_cats[ii];
				}
			}
		}
		var esp_parentTree = "";
		var esp_parentCategory = "";
		try {
			if (esp_categoryTree != "") {
				var tmpCats = esp_categoryTree.split("/");
				tmpCats.pop();
				esp_parentTree = tmpCats.join("/");
				esp_parentCategory = tmpCats[tmpCats.length - 1];
			}
		}
		catch (e) { }
		LM.config("categorytree", esp_categoryTree);
		LM.config("category", esp_category);
		LM.config("parentcategorytree", esp_parentTree);
		LM.config("parentcategory", esp_parentCategory);
	});
}
catch (e) { }

// Custom vars
try {
	LM.preInit(function() {
		var customVars = esp_GetCustomFields();
		for (var ii = 0; ii < customVars.length; ii++) {
			LM.config(customVars[ii][0], customVars[ii][1]);
		}
	});
}
catch (e) { }

// Accessories
try {
	LM.preInit(function() {
	    var esp_skus = esp_GetAccessorySkus();
		LM.config("accessorySkus", esp_skus.join(",")); // skus are always joined with commas
	});
}
catch (e) { }

// Process add to basket requests
try {
    LM.preInit(function () {
        var esp_mode = esp_QueryValue("mode");
        if (esp_mode == "add") { // Single product add to basket
            var esp_mainSku = esp_QueryValue("ivref"); // Main product SKU
            var esp_buySku = esp_QueryValue("buy") == "" ? esp_mainSku : esp_QueryValue("buy"); // Purchased product SKU/Attribute SKU
            var esp_qty = esp_QueryValue("qty"); // Quantity
            if (esp_mode == "add" && esp_mainSku != "") {
                LM.addBasketItem({ "sku": esp_mainSku, "qty": (esp_qty == "" ? "1" : esp_qty) });
            }
        }
        else if (esp_mode == "addmul") { // Multiple product add to basket
            var esp_itemSkus = esp_QueryValues("itemlist"); // Product skus
            var esp_itemQtys = esp_QueryValues("qtylist"); // Product quantities
            for (var ii = 0; ii < esp_itemSkus.length; ii++) {
                esp_itemSku = esp_itemSkus[ii];
                esp_itemQty = esp_itemQtys[ii] || "1";
                if (esp_itemSku != "") {
                    LM.addBasketItem({ "sku": esp_itemSku, "qty": esp_itemQty });
                }
            }
        }
    });
}
catch (e) { }

// Process purchases
try {
	LM.preInit(function() {
		try {
			var esp_skus = esp_GetInputValueByESPType("data-esp-tracking", "purchase-skus").split("^");
			var esp_quantities = esp_GetInputValueByESPType("data-esp-tracking", "purchase-quantities").split("^");
			var esp_prices = esp_GetInputValueByESPType("data-esp-tracking", "purchase-lineprices").split("^");
			var esp_currencies = esp_GetInputValueByESPType("data-esp-tracking", "purchase-currencies").split("^");
			if (esp_skus.length > 0 && esp_skus[0] != "" && esp_skus.length == esp_quantities.length && esp_skus.length == esp_prices.length) {
				for (var ii = 0; ii < esp_skus.length; ii++) {
					var purchase = { "sku": esp_skus[ii], "qty": esp_quantities[ii], "lineprice": esp_prices[ii] };
					if (esp_currencies.length == esp_skus.length && esp_currencies[ii] != "") {
						purchase["currency"] = esp_currencies[ii];
					}
					else if (esp_currencies.length == 1 && esp_currencies[0] != "") {
						purchase["currency"] = esp_currencies[0];
					}
					LM.addOrderItem(purchase);
				}
			}
		}
		catch (e) { }
	});
}
catch (e) { }

// Utility function to return query string values
var esp_query = null;
function esp_QueryValue(paramName) {
	if (esp_query == null) {
		// build hash lookup of query
		esp_query = {};
		var pairs = window.location.search.substring(1).split("&");
		for (var ii = 0; ii < pairs.length; ii++) {
			var pair = pairs[ii].split("=");
			if (pair.length == 2) {
				esp_query[pair[0]] = pair[1];
			}
		}
	}
	if (esp_query[paramName]) {
		return esp_query[paramName];
	}
	else {
		return "";
	}
}

// Utility function to return multiple query string values with same name
function esp_QueryValues(paramName) {
    var values = [];
    var pairs = window.location.search.substring(1).split("&");
    for (var ii = 0; ii < pairs.length; ii++) {
        var pair = pairs[ii].split("=");
        if (pair.length == 2 && pair[0] == paramName) {
            values.push(pair[1]);
        }
    }
    return values;
}

// Utility function to list extract custom vars from hidden inputs
function esp_GetCustomFields() {
	var esp_custom_inputs = [];
	var esp_inputs = document.getElementsByTagName("input");
	for (var ii = 0; ii < esp_inputs.length; ii++) {
		var esp_input =  esp_inputs[ii];
		var esp_attr = esp_input.getAttribute("data-esp-var");
		if (esp_attr != null && esp_attr != "") {
			esp_custom_inputs.push([esp_attr, esp_input.value]);
		}
	}
	return esp_custom_inputs;
}

// Utility function to list extract custom vars from hidden inputs
function esp_GetAccessorySkus() {
	var esp_accessory_skus = [];
	var esp_inputs = document.getElementsByTagName("input");
	for (var ii = 0; ii < esp_inputs.length; ii++) {
		var esp_input = esp_inputs[ii];
		var esp_attr = esp_input.getAttribute("data-esp-accessory-sku");
		if (esp_attr == "true") {
			var esp_value = esp_input.value;
			if (LM.ConfigJoinSeparator != "," && esp_value.indexOf(LM.ConfigJoinSeparator) != -1) {
				// list of skus may be in a hidden field as a non comma separated list
				var esp_values = esp_value.split(LM.ConfigJoinSeparator);
				for (var ii = 0; ii < esp_values.length; ii++) {
					esp_accessory_skus.push(esp_values[ii]);
				}
			}
			else {
				// either contains single value or comma separated list (which doesn't need to be parsed yet)
				esp_accessory_skus.push(esp_value);
			}
		}
	}
	return esp_accessory_skus;
}

// Utility function to extract hidden field value by custom esp type
function esp_GetInputValueByESPType(espType, espValue) {
	if (espValue == null) espValue = "true";
	var esp_inputs = document.getElementsByTagName("input");
	for (var ii = 0; ii < esp_inputs.length; ii++) {
		var esp_input = esp_inputs[ii];
		var esp_attr = esp_input.getAttribute(espType);
		if (esp_attr == espValue) {
			return esp_input.value;
		}
	}
	return "";
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Multiselect javascript
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.Multi_IsInit = false;
LM.Multi_Zone = null;
LM.Multi_FacetContainer = null;
LM.Multi_FilterContainer = null;
LM.Multi_CurrentField = null;
LM.Multi_PriceField = "sys_price";
LM.Multi_FixedPriceFacet = true;
LM.Multi_PriceFields = {};
LM.Multi_PriceSliderMin = {};
LM.Multi_PriceSliderMax = {};
LM.Multi_IsSearchPage = false;
LM.Multi_LoadingMask = null;
LM.Multi_ScrollToTop = true;
LM.Multi_ScrollTo = 0;
LM.Multi_ScrollDuration = 250;
LM.Multi_ScrollContainer = null;
LM.Multi_IgnoreScroll = false;
LM.Multi_Enabled = true;
LM.Multi_ExtendUpperSearchRange = false;
LM._multi_init = [];
LM._multi_setFilters = [];
LM._multi_toggleFacetItem = [];
LM._multi_resetPriceSlider = [];
LM._multi_setPriceSlider = [];

// Allow custom event handlers for facet state toggle
LM.multi_toggleFacetItem = function (fn) {
	LM._multi_toggleFacetItem.push(fn);
};

// Allow custom event handlers for set filters
LM.multi_setFilters = function (fn) {
	LM._multi_setFilters.push(fn);
}

// Allow custom event handlers for resetting price slider
LM.multi_resetPriceSlider = function (fn) {
	LM._multi_resetPriceSlider.push(fn);
}

// Allow custom event handlers for setting price slider
LM.multi_setPriceSlider = function (fn) {
	LM._multi_setPriceSlider.push(fn);
}

// Allow custom event handlers
LM.multi_init = function (fn) {
	LM._multi_init.push(fn);
}

LM.Utils.ElementOffset = function (srcElement) {
	if (srcElement === undefined) {
		return { X: 0, Y: 0 };
	}
	
	var iXCoord = srcElement.offsetLeft;
	var iYCoord = srcElement.offsetTop;
	while (srcElement.offsetParent != null) {
		srcElement = srcElement.offsetParent;
		iXCoord += srcElement.offsetLeft;
		iYCoord += srcElement.offsetTop;
	}
	return { X: iXCoord, Y: iYCoord };
}

LM.Utils.ElementQuery = function (query, root) {
	root = root || document;
	// if browser doesn't support Selectors API, use a basic fallback
	if (root.querySelectorAll) { 
		return root.querySelectorAll(query);
	}
	else {
		var qId;
		var qClass;
		var qTag;
		var qAttributes;
		var start = query.split("[", 1)[0];
		var ch = start.slice(0, 1);
		if (ch == "#") {
			qId = start.slice(1);
			if (qId && qId.length > 0) {
				return root.getElementById(qId);
			}
		}
		else if (ch == ".") {
			qClass = start.slice(1);
		}
		else if (start.indexOf(".") !== -1) {
			qClass = start.slice(start.indexOf(".") + 1);
			qTag = start.slice(0, start.indexOf("."));
		}
		else {
			qTag = start;
		}

		if (query.indexOf("[") !== -1) {
			qAttributes = [];
			var attrQuery = query.slice(start.length + 1, query.length - 1);
			if (attrQuery && attrQuery.length) {
				var attrs = attrQuery.split("][");
				for (var ii = 0; ii < attrs.length; ii++) {
					qAttributes.push({
						att: (attrs[ii].split("=")[0] || "").replace(/[\[\]']+/g, ""),
						val: (attrs[ii].split("=")[1] || "").replace(/["']/g, "")
					});
				}
			}
		}

		var allElements = [];
		if (qClass && qClass.length > 0) {
			var els = root.getElementsByClassName(qClass);
			if (qTag && qTag.length > 0) {
				for (var ii = 0; ii < els.length; ii++) {
					if (els[ii].tagName.toLowerCase() == qTag) {
						allElements.push(els[ii]);
					}
				}
			}
			else {
				allElements = els;
			}
		}
		else if (qTag && qTag.length > 0) {
			allElements = root.getElementsByTagName(qTag);
		}
		else { 
			allElements = root.getElementsByTagName('*');
		}

		if (qAttributes && qAttributes.length > 0) {
			var matchingElements = [];
			for (var ii = 0; ii < allElements.length; ii++) {
				var match = true;
				for (var jj = 0; jj < qAttributes.length; jj++) {
					if (qAttributes[jj].att != "" && qAttributes[jj].val != "") {
						var hasAtt = allElements[ii].hasAttribute ? allElements[ii].hasAttribute(qAttributes[jj].att) : !!allElements[ii][qAttributes[jj].att];
						if (!hasAtt || allElements[ii].getAttribute(qAttributes[jj].att).toString() != qAttributes[jj].val) {
							match = false;
						}
					}
					else if (qAttributes[jj].att != "") {
						var hasAtt = allElements[ii].hasAttribute ? allElements[ii].hasAttribute(qAttributes[jj].att) : !!allElements[ii][qAttributes[jj].att];
						if (!hasAtt) {
							match = false;
						}
					}
				}
				if (match) {
					matchingElements.push(allElements[ii]);
				}
			}

			return matchingElements;
		}
		else {
			return allElements;
		}
	}
}

LM.Utils.AttachDelegateEventByAttribute = function (element, evnt, attributeName, attributeValue, fxn) {
	if (element.addEventListener) {
		element.addEventListener(evnt, function (e) {
			var evt = e || window.event;
			var target = evt.target || evt.srcElement;
			var hasAtt = target.hasAttribute ? target.hasAttribute(attributeName) : !!target[attributeName];
			if (target && hasAtt && target.getAttribute(attributeName) == attributeValue) {
				evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
				fxn(evt, target);	
			}
		}, false);
	}
	else if (element.attachEvent) {
		element.attachEvent("on" + evnt, function (e) {
			var evt = e || window.event;
			var target = evt.target || evt.srcElement;
			var hasAtt = target.hasAttribute ? target.hasAttribute(attributeName) : !!target[attributeName];
			if (target && hasAtt && target.getAttribute(attributeName) == attributeValue) {
				fxn(evt, target);
				evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
			}
		});
	}
}

LM.Multi_DelegateEventByAttribute = function (element) {	
	if (element === undefined) return;	
	var hasAtt = element.hasAttribute ? element.hasAttribute("data-role") : !!element["data-role"];
	var isLMZone = element.hasAttribute ? element.hasAttribute("lmzone") : !!element["lmzone"];
	if (!isLMZone) {
		isLMZone = element.hasAttribute ? element.hasAttribute("data-lmzone") : !!element["data-lmzone"];
	}

	while (!hasAtt && !isLMZone) {
		element = element.parentNode;
		if (element && element != null) {
			hasAtt = element.hasAttribute ? element.hasAttribute("data-role") : !!element["data-role"];
			isLMZone = element.hasAttribute ? element.hasAttribute("lmzone") : !!element["lmzone"];
			if (!isLMZone) {
				isLMZone = element.hasAttribute ? element.hasAttribute("data-lmzone") : !!element["data-lmzone"];
			}
		}
		else {
			hasAtt = false;
			break;
		}
	}

	if (!hasAtt) return false;
	
	var returnArgs = false;

	// Bind facet items click event
	if (element.getAttribute("data-role") == "fsmfacetitem" && element.tagName.toLowerCase() != "option") {
		LM.Multi_ResetFilters(element);
		if (element.tagName.toLowerCase() != "input") {
			returnArgs = { target: element, preventDefault: true };
		}
	}

	// Bind hits per page events
	if (element.getAttribute("data-role") == "fsmhitslink") {
		var hitsLinks = LM.Utils.ElementQuery("[data-role='fsmhitslink']", LM.Multi_Zone);
		LM.Multi_SetHitsPerPage(element.getAttribute("data-hits"));
		for (var ii = 0; ii < hitsLinks.length; ii++) {
			hitsLinks[ii].setAttribute("data-selected", "false");
		}
		element.setAttribute("data-selected", "true");
		returnArgs = { target: element, preventDefault: true };
	}

	// Bind paging events
	if (element.getAttribute("data-role") == "fsmpaginglink") {
		LM.Multi_SetPage(element.getAttribute("data-page"));
		returnArgs = { target: element, preventDefault: true };
	}

	// Bind lazy load events
	if (element.getAttribute("data-role") == "fsmlazyload") {
		var page = element.getAttribute("data-page");
		page = page != null ? parseInt(page) : 2;
		element.setAttribute("data-page", page + 1);
		var hits = element.getAttribute("data-hits");
		hits = hits != null ? parseInt(hits) : null;
		LM.Multi_LazyLoad(element, page, hits);
		returnArgs = { target: element, preventDefault: true };
	}

	// Bind sorting events
	if (element.getAttribute("data-role") == "fsmsortinglinks" || element.getAttribute("data-role") == "fsmsortinglink") {
		var sortingLinksOld = LM.Utils.ElementQuery("[data-role='fsmsortinglinks']", LM.Multi_Zone);
		var sortingLinks = LM.Utils.ElementQuery("[data-role='fsmsortinglink']", LM.Multi_Zone);
		var field = "";
		var order = "";
		var hasOldField = element.hasAttribute ? element.hasAttribute("data-sortfield") : !!element["data-sortfield"];
		if (hasOldField) {
			field = element.getAttribute("data-sortfield");
		}
		else {
			field = element.getAttribute("data-field");
		}
		var hasOldOrder = element.hasAttribute ? element.hasAttribute("data-sortorder") : !!element["data-sortorder"];
		if (hasOldOrder) {
			order = element.getAttribute("data-sortorder");
		}
		else {
			order = element.getAttribute("data-order");
		}
		LM.Multi_SortProducts(field, order);
		for (var ii = 0; ii < sortingLinksOld.length; ii++) {
			sortingLinksOld[ii].setAttribute("data-selected", "false");
		}
		for (var ii = 0; ii < sortingLinks.length; ii++) {
			sortingLinks[ii].setAttribute("data-selected", "false");
		}
		element.setAttribute("data-selected", "true");
		returnArgs = { target: element, preventDefault: true };
	}

	// Bind view all events
	if (element.getAttribute("data-role") == "fsmviewall") {
		LM.Multi_ViewAll();
		returnArgs = { target: element, preventDefault: true };
	}

	// Bind clear facet items event
	if (element.getAttribute("data-role") == "fsmfacetclear") {
		LM.Multi_ClearFilter(element.getAttribute("data-field"), element.getAttribute("data-value"));
		returnArgs = { target: element, preventDefault: true };
	}

	// Bind clear all event
	if (element.getAttribute("data-role") == "fsmfacetclearall") {
		LM.Multi_ClearAllFilters();
		returnArgs = { target: element, preventDefault: true };
	}
	
	return returnArgs;
}

LM.Multi_Init = function () {
	lmZones = LM.Utils.ElementQuery("[lmzone]");
	if (lmZones.length == 0) {
		lmZones = LM.Utils.ElementQuery("[data-lmzone]");
	}
	if (lmZones && lmZones.length > 0) {
		if (lmZones.length > 1) {
			for (var ii = 0; ii < lmZones.length; ii++) {
				LM.Multi_Zone = lmZones[ii];
				var facetAttr = "facetdomid";
				var hasFacetAtt = LM.Multi_Zone.hasAttribute ? LM.Multi_Zone.hasAttribute(facetAttr) : !!LM.Multi_Zone[facetAttr];
				if (!hasFacetAtt) {
					facetAttr = "data-facetdomid";
					hasFacetAtt = LM.Multi_Zone.hasAttribute ? LM.Multi_Zone.hasAttribute(facetAttr) : !!LM.Multi_Zone[facetAttr];
				}
				LM.Multi_FacetContainer = hasFacetAtt ? document.getElementById(LM.Multi_Zone.getAttribute(facetAttr)) : null;
				var filterAttr = "filterdomid";
				var hasFilterAtt = LM.Multi_Zone.hasAttribute ? LM.Multi_Zone.hasAttribute(filterAttr) : !!LM.Multi_Zone[filterAttr];
				if (!hasFilterAtt) {
					filterAttr = "data-filterdomid";
					hasFilterAtt = LM.Multi_Zone.hasAttribute ? LM.Multi_Zone.hasAttribute(filterAttr) : !!LM.Multi_Zone[filterAttr];
				}
				LM.Multi_FilterContainer = hasFilterAtt ? document.getElementById(LM.Multi_Zone.getAttribute(filterAttr)) : null;
				
				if (hasFacetAtt || hasFacetAtt) {
					break;
				}
			}
		}
		else {
			LM.Multi_Zone = lmZones[0];
			var facetAttr = "facetdomid";
			var hasFacetAtt = LM.Multi_Zone.hasAttribute ? LM.Multi_Zone.hasAttribute(facetAttr) : !!LM.Multi_Zone[facetAttr];
			if (!hasFacetAtt) {
				facetAttr = "data-facetdomid";
				hasFacetAtt = LM.Multi_Zone.hasAttribute ? LM.Multi_Zone.hasAttribute(facetAttr) : !!LM.Multi_Zone[facetAttr];
			}
			LM.Multi_FacetContainer = hasFacetAtt ? document.getElementById(LM.Multi_Zone.getAttribute(facetAttr)) : null;
			var filterAttr = "filterdomid";
			var hasFilterAtt = LM.Multi_Zone.hasAttribute ? LM.Multi_Zone.hasAttribute(filterAttr) : !!LM.Multi_Zone[filterAttr];
			if (!hasFilterAtt) {
				filterAttr = "data-filterdomid";
				hasFilterAtt = LM.Multi_Zone.hasAttribute ? LM.Multi_Zone.hasAttribute(filterAttr) : !!LM.Multi_Zone[filterAttr];
			}
			LM.Multi_FilterContainer = hasFilterAtt ? document.getElementById(LM.Multi_Zone.getAttribute(filterAttr)) : null;
		}
	}
	else {
		return;
	}

	// Add delegate event listeners
	// lmzone Content
	if (LM.Multi_Zone) {
		if (LM.Multi_Zone.addEventListener) {
			LM.Multi_Zone.addEventListener("click", function (e) {
				var evt = e || window.event;
				var target = evt.target || evt.srcElement;
				var delegateEvt = LM.Multi_DelegateEventByAttribute(target);
				if (delegateEvt !== undefined && delegateEvt != false) {
					if (delegateEvt.preventDefault) {
						evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
					}
				}
			}, false);
		}
		else if (LM.Multi_Zone.attachEvent) {
			LM.Multi_Zone.attachEvent("onclick", function (e) {
				var evt = e || window.event;
				var target = evt.target || evt.srcElement;
				var delegateEvt = LM.Multi_DelegateEventByAttribute(target);
				if (delegateEvt !== undefined && delegateEvt != false) {
					if (delegateEvt.preventDefault) {
						evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
					}
				}
			});
		}
	}
	// facets content
	if (LM.Multi_FacetContainer) {
		if (LM.Multi_FacetContainer.addEventListener) {
			LM.Multi_FacetContainer.addEventListener("click", function (e) {
				var evt = e || window.event;
				var target = evt.target || evt.srcElement;
				var delegateEvt = LM.Multi_DelegateEventByAttribute(target);
				if (delegateEvt !== undefined && delegateEvt != false) {
					if (delegateEvt.preventDefault) {
						evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
					}
				}
			}, false);
		}
		else if (LM.Multi_FacetContainer.attachEvent) {
			LM.Multi_FacetContainer.attachEvent("onclick", function (e) {
				var evt = e || window.event;
				var target = evt.target || evt.srcElement;
				var delegateEvt = LM.Multi_DelegateEventByAttribute(target);
				if (delegateEvt !== undefined && delegateEvt != false) {
					if (delegateEvt.preventDefault) {
						evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
					}
				}
			});
		}
	}
	// filters content
	if (LM.Multi_FilterContainer) {
		if (LM.Multi_FilterContainer.addEventListener) {
			LM.Multi_FilterContainer.addEventListener("click", function (e) {
				var evt = e || window.event;
				var target = evt.target || evt.srcElement;
				var delegateEvt = LM.Multi_DelegateEventByAttribute(target);
				if (delegateEvt !== undefined && delegateEvt != false) {
					if (delegateEvt.preventDefault) {
						evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
					}
				}
			}, false);
		}
		else if (LM.Multi_FilterContainer.attachEvent) {
			LM.Multi_FilterContainer.attachEvent("onclick", function (e) {
				var evt = e || window.event;
				var target = evt.target || evt.srcElement;
				var delegateEvt = LM.Multi_DelegateEventByAttribute(target);
				if (delegateEvt !== undefined && delegateEvt != false) {
					if (delegateEvt.preventDefault) {
						evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
					}
				}
			});
		}
	}

	// Hide clear links
	var clearLinks = LM.Utils.ElementQuery("[data-role='fsmfacetclear']", LM.Multi_FacetContainer);
	if (clearLinks) {
		for (var ii = 0; ii < clearLinks.length; ii++) {
			clearLinks[ii].style.visibility = "hidden";
		}
	}
	
	var clearAllLinks = LM.Utils.ElementQuery("[data-role='fsmfacetclearall']", LM.Multi_FacetContainer);
	if (clearAllLinks) {
		for (var ii = 0; ii < clearAllLinks.length; ii++) {
			clearAllLinks[ii].style.visibility = "hidden";
		}
	}

	// Run any custom scripts
	for (var ii = 0; ii < LM._multi_init.length; ii++) {
		try {
			if (typeof (LM._multi_init[ii]) === "function") LM._multi_init[ii]();
		}
		catch (e) { }
	}

	// Adds backwards compatibility to price fields
	if (typeof(LM.Multi_PriceFields[LM.Multi_PriceField]) === "undefined") {
		LM.Multi_PriceFields[LM.Multi_PriceField] = LM.Multi_FixedPriceFacet;
	}

	for (var priceField in LM.Multi_PriceFields) {
		if (LM.Multi_PriceFields[priceField] === false) {
			LM.Multi_PriceSliderMin[priceField] = null;
			LM.Multi_PriceSliderMax[priceField] = null;
		}
	}

	// Register fixed facet or set price slider values
	for (var priceField in LM.Multi_PriceFields) {
		if (LM.Multi_PriceFields[priceField] === true) {
			var vals = [];
			var priceFacets = LM.Utils.ElementQuery("[data-role='fsmfacetitem'][data-field='" + priceField + "']", LM.Multi_FacetContainer);
			for (var ii = 0; ii < priceFacets.length; ii++) {
				var value = priceFacets[ii].getAttribute("data-value");
				if (value != null) {
					vals.push(priceFacets[ii].getAttribute("data-value").split(":"));
				}
			}
			LM.registerFixedFacet(priceField, vals);
		}
		else {
			// Set price slider min and max from hash
			var hashPrices = LM.Multi_GetHashPriceValues(priceField);
			if (hashPrices != null) {
				var options = hashPrices.split(":");
				var minVal = parseInt(options[0]);
				var maxVal = parseInt(options[1]);

				LM.Multi_PriceSliderMin[priceField] = minVal;
				LM.Multi_PriceSliderMax[priceField] = maxVal;

				// Run any custom scripts
				for (var ii = 0; ii < LM._multi_setPriceSlider.length; ii++) {
					try {
						if (typeof (LM._multi_setPriceSlider[ii]) === "function") {
							filters = LM._multi_setPriceSlider[ii](minVal, maxVal, priceField);
						}
					}
					catch (e) { }
				}
			}
		}
	}

	// Add Array.indexOf for ie
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function (searchElement /*, fromIndex */) {
			"use strict";
			if (this == null) {
				throw new TypeError();
			}
			var t = Object(this);
			var len = t.length >>> 0;
			if (len === 0) {
				return -1;
			}
			var n = 0;
			if (arguments.length > 1) {
				n = Number(arguments[1]);
				if (n != n) { // shortcut for verifying if it's NaN
					n = 0;
				} else if (n != 0 && n != Infinity && n != -Infinity) {
					n = (n > 0 || -1) * Math.floor(Math.abs(n));
				}
			}
			if (n >= len) {
				return -1;
			}
			var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
			for (; k < len; k++) {
				if (k in t && t[k] === searchElement) {
					return k;
				}
			}
			return -1;
		}
	}

	LM.Multi_IsInit = true;
}

LM.Multi_BindSelectEvents = function (zoneContainer, facetContainer) {
	zoneContainer = zoneContainer || LM.Multi_Zone;
	facetContainer = facetContainer || LM.Multi_FacetContainer;

	// Bind facet events
	var facetSelects = LM.Utils.ElementQuery("[data-role='fsmfacetselect']", facetContainer);
	if (facetSelects && facetSelects.length) {
		for (var ii = 0; ii < facetSelects.length; ii++) {
			facetSelects[ii].onchange = function (e) {
				var evt = e || window.event;
				var target = evt.target || evt.srcElement;
				var option = target.options[target.selectedIndex];
				LM.Multi_ResetFilters(option);
			};
		}
	}
	
	// Bind hits per page events
	var hitsSelects = LM.Utils.ElementQuery("[data-role='fsmhitsselect']", zoneContainer);
	if (hitsSelects && hitsSelects.length > 0) {
		for (var ii = 0; ii < hitsSelects.length; ii++) {
			hitsSelects[ii].onchange = function (e) {
				var evt = e || window.event;
				var target = evt.target || evt.srcElement;
				if (target.value == "viewall") {
					LM.Multi_ViewAll();
				}
				else {
					LM.Multi_SetHitsPerPage(target.value);
				}
			};
		}
	}

	// Bind paging events
	var pagingSelects = LM.Utils.ElementQuery("[data-role='fsmpagingselect']", zoneContainer);
	if (pagingSelects && pagingSelects.length) {
		for (var ii = 0; ii < pagingSelects.length; ii++) {
			pagingSelects[ii].onchange = function (e) {
				var evt = e || window.event;
				var target = evt.target || evt.srcElement;
				LM.Multi_SetPage(target.value);
			};
		}
	}

	// Bind sorting events
	var sortingSelects = LM.Utils.ElementQuery("[data-role='fsmsortingselect']", zoneContainer);
	if (sortingSelects && sortingSelects.length) {
		for (var ii = 0; ii < sortingSelects.length; ii++) {
			sortingSelects[ii].onchange = function (e) {
				var evt = e || window.event;
				var target = evt.target || evt.srcElement;
				var field = target.value.split(":")[0];
				var order = target.value.split(":")[1];
				LM.Multi_SortProducts(field, order);
			};
		}
	}
}

// Get current field from hash, else return null
LM.Multi_GetCurrentField = function () {
	var hashKeyValues = LM.getHashKeyValues();
	for (var i = 0; i < hashKeyValues.length; i++) {
		if (hashKeyValues[i].indexOf(LM.QueryPrefix + "cf=") == 0) {
			return decodeURIComponent(hashKeyValues[i].split("=")[1]);
		}
	}
	return null;
}

// Get price field values from hash, else return null
LM.Multi_GetHashPriceValues = function (field) {
	var hashKeyValues = LM.getHashKeyValues();
	var priceValues = null;
	if (field !== undefined) {
		for (var ii = 0; ii < hashKeyValues.length; ii++) {
			if (hashKeyValues[ii].indexOf(LM.QueryPrefix + "filter_" + field + "=") == 0) {
				priceValues = decodeURIComponent(hashKeyValues[ii].split("=")[1]);
			}
		}
	}
	else {
		priceValues = [];
		for (var ii = 0; ii < hashKeyValues.length; ii++) {
			for (var priceField in LM.Multi_PriceFields) {
				if (hashKeyValues[ii].indexOf(LM.QueryPrefix + "filter_" + priceField + "=") == 0) {
					priceValues.push(decodeURIComponent(hashKeyValues[ii].split("=")[1]));
				}
			}
		}
	}
	return priceValues;
}


// check if field is price field
LM.Multi_IsPriceField = function (field) {
	var isPrice = false;
	for (var priceField in LM.Multi_PriceFields) {
		isPrice = (priceField == field);
	}
	return isPrice;
}

// Reset function called by standard multi select links
LM.Multi_ResetFilters = function (link) {
	var hasEnabledAtt = link.hasAttribute ? link.hasAttribute("data-enabled") : !!link["data-enabled"];
	var enabled = hasEnabledAtt && link.getAttribute("data-enabled").toString() == "true";
	if (!enabled) return; // the option is disabled, take no action
	LM.Multi_CurrentField = link.getAttribute("data-field");
	var hasCheckedAtt = link.hasAttribute ? link.hasAttribute("data-checked") : !!link["data-checked"];
	var checked = hasCheckedAtt && link.getAttribute("data-checked").toString() == "true";
	// Custom logic for search which can only have 1 price band at a time
	if (!checked && LM.Multi_IsSearchPage && LM.Multi_IsPriceField(LM.Multi_CurrentField)) {
		var priceFacetItems = LM.Utils.ElementQuery("[data-role='fsmfacetitem'][data-field='" + LM.Multi_CurrentField + "'][data-checked='true']", LM.Multi_FacetContainer);
		for (var ii = 0; ii < priceFacetItems.length; ii++) {
			priceFacetItems[ii].setAttribute("data-checked", "false");
			LM.Multi_ToggleFacetItem(link, "checked", false);
		}
	}
	// Custom logic end
	link.setAttribute("data-checked", !checked + "");

	LM.Multi_ToggleFacetItem(link, "checked", !checked);

	LM.Multi_SetFilters();
}

// Set filters
LM.Multi_SetFilters = function () {
	var filters = {};
	var checkedFacets = LM.Utils.ElementQuery("[data-role='fsmfacetitem'][data-checked='true']", LM.Multi_FacetContainer);
	for (var ii = 0; ii < checkedFacets.length; ii++) {
		var field = checkedFacets[ii].getAttribute("data-field");
		var value = checkedFacets[ii].getAttribute("data-value");
		if (field && value) {
			if (!filters[field]) filters[field] = [];
			filters[field].push(value);
		}
	}
	for (var priceField in LM.Multi_PriceFields) {
		// If using price slider
		if (LM.Multi_PriceFields[priceField] === false) {
			if (LM.Multi_PriceSliderMin[priceField] != null && LM.Multi_PriceSliderMax[priceField] != null) {
				if (!filters[priceField]) filters[priceField] = [];
				filters[priceField].push(LM.Multi_PriceSliderMin[priceField] + ":" + LM.Multi_PriceSliderMax[priceField] + (LM.Multi_IsSearchPage && LM.Multi_ExtendUpperSearchRange ? ".01" : ""));
			}
		}
	}
	// Run any custom scripts
	for (var ii = 0; ii < LM._multi_setFilters.length; ii++) {
		try {
			if (typeof (LM._multi_setFilters[ii]) === "function") {
				filters = LM._multi_setFilters[ii](filters);
			}
		}
		catch (e) { }
	}
	LM.setFilters(filters, LM.Multi_CurrentField);
}

// Set sort
LM.Multi_SortProducts = function(field, order) {
	if (field && order) {
		LM.setSortField(field, order);
	}
	else {
		LM.FacetMode = "data";
		LM.MergeHash = true;
		var hash = LM.getHash([LM.QueryPrefix + "sort", LM.QueryPrefix + "order", LM.QueryPrefix + "page", LM.QueryPrefix + "pg"]);
		LM.CurrentHash = "#" + hash;
		window.location.hash = hash;
		LM.getData();
	}
}

// Set page
LM.Multi_SetPage = function (page) {
	LM.setPage(page);
}

// Lazy load
LM.Multi_LazyLoad = function (src, page, hits, complete) {
	LM.Multi_IgnoreScroll = true;
	LM.FacetMode = "data";
	var lmzone = null;
	if (LM.Multi_Zone.hasAttribute ? LM.Multi_Zone.hasAttribute("lmzone") : !!LM.Multi_Zone["lmzone"]) {
		lmzone = LM.Multi_Zone.getAttribute ? LM.Multi_Zone.getAttribute("lmzone") : null;
	}
	else {
		lmzone = LM.Multi_Zone.getAttribute ? LM.Multi_Zone.getAttribute("data-lmzone") : null
	}
	LM.lazyLoad({
		src: src,
		page: page,
		hits: hits,
		zone: lmzone,
		complete: complete
	});
}

// Set hits per page
LM.Multi_SetHitsPerPage = function(hits) {
	LM.setPageView(hits);
}

// Set view all
LM.Multi_ViewAll = function () {
	var hash = LM.getHash([LM.QueryPrefix + "page", LM.QueryPrefix + "pg"]);
	LM.CurrentHash = "#" + hash;
	window.location.hash = hash;
	LM.setPageView("viewall");
}

// Clear all filters
LM.Multi_ClearAllFilters = function () {
	var checkedFacets = LM.Utils.ElementQuery("[data-role='fsmfacetitem'][data-checked='true']", LM.Multi_FacetContainer);
	for (var ii = 0; ii < checkedFacets.length; ii++) {
		LM.Multi_ToggleFacetItem(checkedFacets[ii], "checked", false);
	}
	var selectFacets = LM.Utils.ElementQuery("[data-role='fsmfacetselect']", LM.Multi_FacetContainer);
	for (var ii = 0; ii < selectFacets.length; ii++) {
		selectFacets[ii].selectedIndex = 0;
	}
	LM.clearFilters();
	for (var priceField in LM.Multi_PriceFields) {
		if (LM.Multi_PriceFields[priceField] === false) {
			LM.Multi_PriceSliderMin[priceField] = null;
			LM.Multi_PriceSliderMax[priceField] = null;
			// Run any custom scripts for price slider
			for (var ii = 0; ii < LM._multi_resetPriceSlider.length; ii++) {
				try {
					if (typeof (LM._multi_resetPriceSlider[ii]) === "function") {
						LM._multi_resetPriceSlider[ii](priceField);
					}
				}
				catch (e) { }
			}
		}
	}
}

// Clear individual filter
LM.Multi_ClearFilter = function (field, value) {
	var checkedFacets = null;
	if (value !== undefined && value != null && value != "") {
		checkedFacets = LM.Utils.ElementQuery("[data-role='fsmfacetitem'][data-checked='true'][data-field='" + field + "'][data-value='" + value.replace(/'/g, "\\'").replace(/"/g, "\"") + "']", LM.Multi_FacetContainer);
	}
	else {
		checkedFacets = LM.Utils.ElementQuery("[data-role='fsmfacetitem'][data-checked='true'][data-field='" + field + "']", LM.Multi_FacetContainer);
	}

	if (checkedFacets != null) {
		for (var ii = 0; ii < checkedFacets.length; ii++) {
			LM.Multi_ToggleFacetItem(checkedFacets[ii], "checked", false);
		}

		if (LM.Multi_IsPriceField(field)) {
			// If price field and using price slider
			if (LM.Multi_PriceFields[field] === false) {
				LM.Multi_PriceSliderMin[field] = null;
				LM.Multi_PriceSliderMax[field] = null;
				// Run any custom scripts
				for (var ii = 0; ii < LM._multi_resetPriceSlider.length; ii++) {
					try {
						if (typeof (LM._multi_resetPriceSlider[ii]) === "function") {
							LM._multi_resetPriceSlider[ii](field);
						}
					}
					catch (e) { }
				}
			}
		}
	}

	LM.Multi_SetFilters();
}

// Should be triggered on price change
// when using a price slider
LM.Multi_PriceSliderChange = function (min, max, field) {
	if (field !== undefined && LM.Multi_IsPriceField(field) && LN.Multi_PriceFields[field] === false) {
		LM.Multi_CurrentField = field;
		LM.Multi_PriceSliderMin[field] = parseInt(min);
		LM.Multi_PriceSliderMax[field] = parseInt(max);
		LM.Multi_SetFilters();
	}
	else {
		var sliderField = null;
		for (var priceField in LM.Multi_PriceFields) {
			if (LM.Multi_PriceFields[priceField] === false) {
				sliderField = priceField;
				break;
			}
		}
		if (sliderField != null) {
			LM.Multi_CurrentField = sliderField;
			LM.Multi_PriceSliderMin[sliderField] = parseInt(min);
			LM.Multi_PriceSliderMax[sliderField] = parseInt(max);
			LM.Multi_SetFilters();
		}
	}
}

// Toggle facet item state
LM.Multi_ToggleFacetItem = function (facetItem, state, isState) {
	if (facetItem.tagName.toLowerCase() == "input") {
		if (state == "enabled") {
			facetItem.setAttribute("data-enabled", isState);
			if (isState) {
				facetItem.removeAttribute("disabled");
			}
			else {
				facetItem.setAttribute("disabled", "disabled");
			}
		}
		else if (state == "checked") {
			facetItem.setAttribute("data-checked", isState);
			facetItem.checked = isState;
		}
	}
	else if (facetItem.tagName.toLowerCase() == "option") {
		if (state == "enabled") {
			facetItem.setAttribute("data-enabled", isState);
			if (isState) {
				facetItem.removeAttribute("disabled");
			}
			else {
				facetItem.setAttribute("disabled", "disabled");
			}
		}
		else if (state == "checked") {
			facetItem.setAttribute("data-checked", isState);
			if (isState) {
				facetItem.setAttribute("selected", "selected");
			}
			else {
				facetItem.removeAttribute("selected");
			}
		}
	}
	else {
		if (state == "enabled") {
			facetItem.setAttribute("data-enabled", isState);
		}
		else if (state == "checked") {
			facetItem.setAttribute("data-checked", isState);
		}
	}

	// Run any custom scripts
	for (var ii = 0; ii < LM._multi_toggleFacetItem.length; ii++) {
		try {
			if (typeof (LM._multi_toggleFacetItem[ii]) === "function") LM._multi_toggleFacetItem[ii](facetItem, state, isState);
		}
		catch (e) { }
	}
}

LM.Multi_GetScrollTop = function () {
	var B = document.body; // IE 'quirks'
	var D = document.documentElement; // IE with doctype
	D = LM.Multi_ScrollContainer == null ? ((D.clientHeight) ? D : B) : LM.Multi_ScrollContainer;

	if (D.scrollTop) {
		return D.scrollTop;
	}
	if (typeof pageYOffset != 'undefined') {
		// Most browsers
		return pageYOffset;
	}

	return 0;
}

LM.Multi_AnimateScroll = function (element, to, duration) {
	if (duration < 0) return;
	var difference = to - element.scrollTop;
	var perTick = difference < 0 ? (difference / duration * 10) : 0;

	setTimeout(function () {
		element.scrollTop = element.scrollTop + perTick;
		LM.Multi_AnimateScroll(element, to, duration - 10);
	}, 10);
}

LM.load(function () {
	if (LM.Multi_Enabled && LM.Multi_IsInit) {
		// Show loading mask
		if (LM.Multi_LoadingMask != null) {
			LM.Multi_LoadingMask.style.display = "block";
		}

		// Get hash key values
		var hashKeyValues = LM.getHashKeyValues();

		LM.Multi_CurrentField = decodeURIComponent(LM.Multi_GetCurrentField());
		var hashField = "";
		var hashCount = 0;
		var hashPriceValues = LM.Multi_GetHashPriceValues();

		var facetItems = LM.Utils.ElementQuery("[data-role='fsmfacetitem']", LM.Multi_FacetContainer);
		for (var ii = 0; ii < facetItems.length; ii++) {
			var facetItem = facetItems[ii];
			if (facetItem.getAttribute("data-field") != LM.Multi_CurrentField && facetItem.getAttribute("data-checked").toString() != "true") {
				LM.Multi_ToggleFacetItem(facetItem, "enabled", false);
			}
			if (hashKeyValues.indexOf(LM.QueryPrefix + "filter_" + facetItem.getAttribute("data-field") + "=" + facetItem.getAttribute("data-value")) == -1 && hashKeyValues.indexOf(LM.QueryPrefix + "filter_" + encodeURIComponent(facetItem.getAttribute("data-field")) + "=" + encodeURIComponent(facetItem.getAttribute("data-value"))) == -1) {
				LM.Multi_ToggleFacetItem(facetItem, "checked", false);
			}
			else {
				LM.Multi_ToggleFacetItem(facetItem, "checked", true);
				LM.Multi_ToggleFacetItem(facetItem, "enabled", true);
				if (facetItem.getAttribute("data-field") != hashField) {
					hashField = facetItem.getAttribute("data-field");
					hashCount++;
				}
			}
		}

		// If only one facet field selected, enable all options and reset counts
		if (hashField != "" && hashCount == 1 && hashPriceValues == null && hashPriceValues.length > 0) {
			var hashFacets = LM.Utils.ElementQuery("[data-role='fsmfacetitem'][data-field='" + hashField + "']", LM.Multi_FacetContainer);
			for (var ii = 0; ii < hashFacets.length; ii++) {
				hashFacets[ii].setAttribute("data-count", hashFacets[ii].getAttribute("data-count-orig"));
				LM.Multi_ToggleFacetItem(hashFacets[ii], "enabled", true);
			}
		}

		// Show individual clear and clear all links if facets selected
		var clearLinks = LM.Utils.ElementQuery("[data-role='fsmfacetclear']", LM.Multi_FacetContainer);
		for (var ii = 0; ii < clearLinks.length; ii++) {
			var clearField = clearLinks[ii].getAttribute("data-field");
			if (LM.Multi_IsPriceField(clearField) && LM.Multi_PriceFields[clearField] === false) { // price slider
				if (LM.Multi_PriceSliderMin[clearField] != null && LM.Multi_PriceSliderMax[clearField] != null) {
					clearLinks[ii].style.visibility = "visible";
				}
				else {
					clearLinks[ii].style.visibility = "hidden";
				}
			}
			else {
				var checked = LM.Utils.ElementQuery("[data-role='fsmfacetitem'][data-field='" + clearField + "'][data-checked='true']");
				if (LM.Utils.ElementQuery("[data-role='fsmfacetitem'][data-field='" + clearField + "'][data-checked='true']").length > 0) {
					clearLinks[ii].style.visibility = "visible";
				}
				else {
					clearLinks[ii].style.visibility = "hidden";
				}
			}
		}

		var clearAllLinks = LM.Utils.ElementQuery("[data-role='fsmfacetclearall']", LM.Multi_FacetContainer);
		var checkedFacets = LM.Utils.ElementQuery("[data-role='fsmfacetitem'][data-checked='true']");
		if (checkedFacets.length > 0 || (hashPriceValues != null && hashPriceValues.length > 0)) {
			for (var ii = 0; ii < clearAllLinks.length; ii++) {
				clearAllLinks[ii].style.visibility = "visible";
			}
		}
		else {
			for (var ii = 0; ii < clearAllLinks.length; ii++) {
				clearAllLinks[ii].style.visibility = "hidden";
			}
		}
	}
});

LM.complete(function () {
	if (LM.Multi_Enabled) {
		if (!LM.Multi_IsInit) {
			LM.Multi_Init();

			var facetItems = LM.Utils.ElementQuery("[data-role='fsmfacetitem']", LM.Multi_FacetContainer);
			for (var ii = 0; ii < facetItems.length; ii++) {
				var facetItem = facetItems[ii];
				facetItem.setAttribute("data-count-orig", facetItem.getAttribute("data-count"));
			}
		}

		// Bind select events
		LM.Multi_BindSelectEvents();

		// Hide loading mask
		if (LM.Multi_LoadingMask != null) {
			LM.Multi_LoadingMask.style.display = "none";
		}

		// Scroll to top
		if (LM.Multi_ScrollToTop && !LM.Multi_IgnoreScroll) {
			var offset = LM.Utils.ElementOffset(LM.Multi_Zone);
			if (LM.Multi_GetScrollTop() > offset.Y) {
				var container = LM.Multi_ScrollContainer == null ? (document.body.scrollTop == 0 ? document.body.parentNode : document.body) : LM.Multi_ScrollContainer;
				LM.Multi_AnimateScroll(container, LM.Multi_ScrollTo, LM.Multi_ScrollDuration);
			}
		}
		LM.Multi_IgnoreScroll = false;
	}
});

LM.syncFacets(function (args) {
	if (LM.Multi_Enabled) {
		// Get facet data and enable facets
		var facets = args["facetData"];
		for (var field in facets) {
			var options = facets[field];
			for (var ii = 0; ii < options.length; ii++) {
				var option = options[ii];
				var count = 0;
				var value = null;
				if (option.length == 2) {
					count = option[0];
					value = option[1];
				}
				else if (option.length == 3) {
					count = option[0];
					value = option[1] + ":" + option[2];
				}
				if (value != null && count > 0) {
					for (var priceField in LM.Multi_PriceFields) {
						if (field == priceField + "_" + LM.Currency) {
							field = priceField;
						}
					}
					var facetItem = LM.Utils.ElementQuery("[data-role='fsmfacetitem'][data-field='" + field + "'][data-value='" + value.replace(/'/g, "\\'").replace(/"/g, "\"") + "']", LM.Multi_FacetContainer);
					if (facetItem && facetItem.length > 0) {
						facetItem[0].setAttribute("data-count", count);
						LM.Multi_ToggleFacetItem(facetItem[0], "enabled", true);
					}
				}
			}
		}
	}
});

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Definitions
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
var fsm_search = /page\/search/g.test(document.location.pathname);
var fsm_search_blog_tab = fsm_search && window.location.href.indexOf("&blog=y") != -1;
var fsm_category = /icat/g.test(document.location.pathname);
var fsm_product =/invt/g.test(document.location.pathname);
var fsm_initialised = false;
var fsm_trigger_distance = 200;
var fsm_data_full = true;
var fsm_is_lazy_loading_request = false;
var fsm_breadcrumb = null;
var fsm_no_image_url = "http://s7d5.scene7.com/is/image/Katespade/noimage?$s7productgrid$";

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Some functions linked to window size
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
jQuery(window).resize(function() {
	if ((fsm_search || fsm_category) && fsm_initialised) {
		fsmReinitialiseSwatches();
	}
});

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Pre-initialise event, fires just before FSM requests data
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.preInit(function() {
	// If searching the blog then flip the zone
	if (fsm_search_blog_tab) {
		jQuery("div[lmzone=search]").each(function() {
			jQuery(this).attr("lmzone", "blog");
		});
	}

	// ###################### START TEMP FIX ######################
	if (fsm_category) {
		// temp fix
		if (jQuery("#collate").length == 0 && jQuery("#sidebar").length == 1) {
			jQuery("div[lmzone='category']").attr("facetdomid", "sidebar");
		}
	}
	else if (fsm_search) {
		// temp fix
		if (jQuery("#collate").length == 0 && jQuery("#sidebar").length == 1) {
			jQuery("div[lmzone='search']").attr("facetdomid", "sidebar");
			jQuery("div[lmzone='blog']").attr("facetdomid", "sidebar");
		}
	}
	// ###################### END TEMP FIX ######################

	// Set page type as custom var
	if (fsm_search) {
		LM.config("PageType", "search");
	}
	else if (fsm_category) {
		LM.config("PageType", "category");
	}
	else if (fsm_product) {
		LM.config("PageType", "product");
	}
	else {
		LM.config("PageType", "unknown");
	}

	// Track add to baskets
	if (fsm_product) {
		jQuery(".js-addproduct").click(function() {
			// Validate selection (colour + size required)
			var colourSelected = jQuery(".js-colourSwatch.js-selected").length > 0;
			var $sizes = jQuery(".js-attribute-size").find("li");
			var sizeSelected = $sizes.length == 1 || $sizes.hasClass("js-selected");
			if (colourSelected && sizeSelected) {
				var sku = jQuery("input[name=ivref]").val();
				var qty = 1;
				if (jQuery("#qty").length > 0) {
					qty = jQuery("#qty").val();
				}
				if (qty == "") {
					qty = 1;
				}
				if (sku != "") {
					LM.addBasketItem({ sku: sku, qty: qty });
				}
			}
		});
	}
});

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Multi select initialiser
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.multi_init(function() {
	//*************************************************//
	// Search / category pages
	//*************************************************//
	if (fsm_search || fsm_category) {
		// Required
		LM.Multi_PriceField = "sys_price"; // no price facets, is this needed?
		LM.Multi_IsSearchPage = fsm_search;

		// Create loading mask
		jQuery(document.body).append("<div id=\"FSM_Loading_Mask\" style=\"position: fixed; left: 0; right: 0; top: 0; bottom: 0; background: #fff; background: rgba(255, 255, 255, 0.7) url(/content/ebiz/shop/resources/images/loading.gif) no-repeat center center; display: none\"></div>");
		LM.Multi_LoadingMask = $("#FSM_Loading_Mask")[0];

		// Optional
		LM.Multi_FixedPriceFacet = true; //false when using a price slider ... is this needed?
		LM.Multi_ScrollToTop = true;
		LM.Multi_ScrollTo = 0;
		LM.Multi_ScrollDuration = 250;

		// Hook into toggle item event
		LM.multi_toggleFacetItem(function(obj) {
			var style = jQuery(obj).attr("data-style");
			var $parent = jQuery(obj).parent();

			// All facets share core logic for showing active elements
			if (jQuery(obj).attr("data-enabled") == "false") {
				$parent.addClass("hideRefinement");
				$parent.removeClass("active");
			}
			else if (jQuery(obj).attr("data-checked") == "true") {
				$parent.removeClass("hideRefinement");
				$parent.addClass("active");
			}
			else {
				$parent.removeClass("hideRefinement");
				$parent.removeClass("active");
			}

			if (style == "checkbox") {
				// Checkbox style facets have some additional classes
				var $prev = jQuery(obj).prev();
				if (jQuery(obj).attr("data-checked") == "true") {
					$prev.attr("class", "icon-box-select left");
				}
				else {
					$prev.attr("class", "icon-box-not-select left");
				}

			}
		});
	}
});

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Data has been loaded into page
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
LM.complete(function() {
	//*************************************************//
	// Search / category pages
	//*************************************************//
	if (fsm_search || fsm_category) {
		// Quick check for redirects (edge case)
		var $redirect = jQuery("#FSM_Redirect_To_Url");
		if ($redirect.length > 0) {
			window.location = $redirect.val();
			return;
		}

		// Common vars
		var hits = 0; // will get initialised later if lazy loading
		var $items = jQuery(".prod-search-results,.stories-search-results");
		var $lazyContainer = jQuery("ul[data-role=fsmlazyloadcontainer]");
		var $sidebar = jQuery("#sidebar");

		// Swatches
		fsmInitialiseSwatches();

		// On category & search pages keep track of skus on the page for use by Venda
		if ((fsm_category || fsm_search) && !fsm_search_blog_tab) {
			var skus = [];
			$items.each(function() {
				skus.push(jQuery(this).attr("data-url"));
			});
			LM.setCookie("FSM_SKUS", skus.join(","), "S");
		}

		// Sync the sorting drop down label
		var val = jQuery("#sortby").val();
		if (val && val != "") {
			// sync text to label
			var text = jQuery("#sortby option:selected").text();
			var $label = jQuery("#sortby").next();
			jQuery("span.js-selected", $label).text(text);
		}
		else {
			// if default drop down then we need to pick value depending
			// on screen size
			var desktopSelector = fsmDeviceType() == "desktop" ? "show-for-desktop" : "hide-for-desktop";
			var text = jQuery("#sortby option." + desktopSelector).text();
			var $label = jQuery("#sortby").next();
			jQuery("span.js-selected", $label).text(text);
		}

		// Capture data for use by lazy loading
		if ($lazyContainer.length > 0) {
			hits = parseInt($lazyContainer.attr("data-hits") || "0");
			fsm_data_full = $items.length >= hits;
			// one final just in case check, also use current page * page size to test limit
			if (!fsm_data_full) {
				var page = parseInt($lazyContainer.attr("data-page") || "1");
				if (page > 1) {
					var pageSize = parseInt($lazyContainer.attr("data-page-size") || "16");
					var limit = page * pageSize;
					if (limit >= hits) fsm_data_full = true;
				}
			}
		}
		
		// Lazy loading
			if (hits > 0 && $items.length > 0 && $lazyContainer.length > 0 && !fsm_data_full) {
				//$lazyContainer.attr("data-page-size", $items.length); // initialise the page size flag
				jQuery(document).scroll(function() {
					if (!fsm_data_full && !LM.Multi_IgnoreScroll) {
						var totalHeight = document.documentElement.scrollHeight;
						var distanceScrolled = LM.Multi_GetScrollTop() + jQuery(window).height();
						if (totalHeight - distanceScrolled < fsm_trigger_distance) {
							var $lazy = jQuery("ul[data-role=fsmlazyloadcontainer]");
							var page = $lazy.attr("data-page");
							var pageSize = parseInt($lazy.attr("data-page-size"));
							page = page != null ? parseInt(page) + 1 : 2;
							$lazy.attr("data-page", page);
							fsm_is_lazy_loading_request = true;
							LM.Multi_LazyLoad(null, page, pageSize);
						}
					}
				});
			}

		// Equal heights
		fsmEqualHeightProducts();

		// Image functions, including mouseover and pre-caching
		$items.mouseover(function() {
			// On first mousover pre-cache all images associated
			// with swatches
			var $this = jQuery(this);
			var imagesCached = $this.attr("data-swatch-images-loaded");
			if (imagesCached != "true") {
				jQuery("li.swatchcolor a", this).each(function() {
					var src1 = jQuery(this).attr("data-altimg");
					fsmPreCacheImage(src1);
				});
			}
			$this.attr("data-swatch-images-loaded", "true");
		}).each(function() {
			// mouseover for alternative view images plus some more pre-caching
			var $this = jQuery(this);
			var initialised = $this.attr("data-js-initialised");
			if (initialised != "true") {
				// Pre-cache every alt image to make initial mouseovers responsive
				// Bind mouseover events
				jQuery(".prod-image", this).find("img").bind("touchstart", function() {
					// If mobile device then all subsequent events will be cancelled
					jQuery(this).attr("data-is-touch", "true");
				}).each(function() {
					// For each product image load the meta data
					//fsmQueryImageMeta(this);
					// Pre-cache the alt view of the main image so any mouseovers are quick
				}).mouseover(function() {
					// Show alt image
					if (jQuery(this).attr("data-is-touch") != "true") {
						var $img = jQuery(this);
						$img.attr("src", fsmToAltImgSrc(this));
					}
				}).mouseout(function() {
					// And back again
					if (jQuery(this).attr("data-is-touch") != "true") {
						var $img = jQuery(this);
						$img.attr("src", fsmToMainImgSrc(this));
					}
				});
			}
			$this.attr("data-js-initialised", "true");
		});


		if (fsm_initialised) {
			// When not lazy loading request then some UI elements need to
			// get processed again (lazy loading only changes the list part
			// of the content so leaves most other content intact)
			if (!fsm_is_lazy_loading_request) {
				// Make filters for mobile devices
				fsmSyncMobileFacets();
				// Breadcrumb needs re-generating
				if (fsm_breadcrumb) jQuery("#i-crumbtrail").html(fsm_breadcrumb);
			}
		}
		else {
			// First time data loaded, some specific initialisation
			// is required for first time
			fsm_initialised = true;

			// Get secondary hit count so that subsequent searches can use this
			// count rather than re-searching each time
			if (fsm_search) {
				var secondaryHitCount = jQuery("span[data-secondary-hit-count]").attr("data-secondary-hit-count");
				LM.config("SecondaryHitCount", secondaryHitCount);
			}

			// Call App initialisers, can only be called once
			if ($items.length == 0 && fsm_search) {
				// No products
				postSearchNoResult();
			}
			else {
				// Inserts free shipping cell into results, builds breadcrumb, adds category navigation, plus other things
				// Edge case for postSearch() first...
				if (fsm_category && jQuery("#sidebar").children().length == 0) {
					// if sidebar has no elements then add a base HTML to allow postSearch to be able add cat nav correctly
					jQuery("#sidebar").html("<div id=\"refinelist\" class=\"hide-for-small js-refinelist\"><div id=\"collate\" class=\"search-collate\"></div></div>");
				}
				postSearch();

				// ###################### START TEMP FIX ######################
				$sidebar.find(".type_list").removeClass("type_list").removeClass("js-collateheading").css("display", "none");
				// ###################### END TEMP FIX ######################

				// Keep track and re-insert on subsequent "complete" events
				fsm_breadcrumb = jQuery("#i-crumbtrail").html();
				// Make filters for mobile devices
				fsmSyncMobileFacets();
			}

			// Add facet collapse/expand events to left hand menu (only need to do once for left menu)
			// Do this after postSearch which adds an additional facet
			fsmBindFacetEvents($sidebar, true);

			// Some facets are hidden by postSearch, keep track of which are initially visible
			// and which are initially hidden
			jQuery(".boxRefinement").each(function() {
				var $this = jQuery(this);
				if ($this.is(":visible")) {
					$this.attr("data-init-visible", "true");
				}
				else {
					$this.attr("data-init-visible", "false");
				}
			});

			// First facet should be open by default, but only in desktop view
			$sidebar.find(".box-header").first().click();
		}
			
		

		// Sync clear filter links
		jQuery(".search-clear-refinement").each(function() {
			try {
				var $this = jQuery(this);
				var field = $this.attr("data-custom-field");
				var anySelected = jQuery(".updatesearch[data-field='" + field + "'][data-checked='true']").length > 0;
				$this.css("display", anySelected ? "block" : "none");
			}
			catch (e) { }
		});

		// Hide any facets that contain only 1 item
		// But first we need to be careful as some facets are created but NEVER get shown
		jQuery(".boxRefinement,.boxRefinementTM").each(function() {
			var $container = jQuery(this);
			if ($container.attr("data-init-visible") == "true" && $container.attr("data-behaviour") == "toggle") {
				var enabledCount = jQuery(".updatesearch[data-enabled=true]", $container).length;
				var selectedCount = jQuery(".updatesearch[data-checked=true]", $container).length;
				var field = jQuery(".search-clear-refinement", $container).attr("data-custom-field");
				var isSearchCategoryFacet = field == "CategoryTitle" && fsm_search;
				if (isSearchCategoryFacet) {
					// do nothing
				}
				else if (enabledCount > 1 || selectedCount > 0) {
					$container.addClass("showRefinement").removeClass("hideRefinement");
				}
				else {
					$container.removeClass("showRefinement").addClass("hideRefinement");
				}
			}
		});

		// Some final tidying up
		fsm_is_lazy_loading_request = false;
	}
});

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Run equal heights against products
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
function fsmEqualHeightProducts() {
	try {
		//Venda.Platform.EqualHeight.init([".prod-name", ".prod-details"]);
		Venda.Platform.EqualHeight.init([".prod-name", ".prod-pricedetails"]);
	}
	catch (e) { }
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Device type from width
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
function fsmDeviceType() {
	var width = jQuery(window).width();
	if (width < 768) {
		return "mobile";
	}
	else if (width < 998) {
		return "tablet";
	}
	else {
		return "desktop";
	}
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Functions to support mouse over images
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
function fsmImgError(img) {
	img.onerror = null;
	img.src = fsm_no_image_url;
	jQuery(img).attr("data-error", "true");
	return true;
}

var imgRegex = new RegExp("(.*/KateSpade/)(.*)(\\?.*&defaultImage=)(.*)$");
function fsmToAltImgSrc(img) {
	var imgSrc2 = jQuery(img).attr("data-img-src2");
	if (imgSrc2 && imgSrc2 != "*") {
		return imgSrc2;
	}
	else {
		return img.src;
	}
}
function fsmToMainImgSrc(img) {
	var $img = jQuery(img);
	var imgSrc1 = $img.attr("data-img-src1");
	var imgSrc2 = $img.attr("data-img-src2");
	if (imgSrc2 == "*" && img.src == fsm_no_image_url) {
		return img.src;
	}
	else if (imgSrc1 && imgSrc1 != "*") {
		return imgSrc1;
	}
	else {
		return img.src;
	}
}
function fsmPreCacheImage(src) {
	var img = new Image();
	img.src = src;
}

// For a given image query the image service to get valid mouse over
// images
var imgAltRegex = new RegExp("(.*/)(KateSpade/)(.*)(_R*)(\\?.*&defaultImage=)(.*)$");
function fsmQueryImageMeta(img) {
	try {
		var imgSrc1 = jQuery(img).attr("data-img-src1");
		var imgSrc2 = jQuery(img).attr("data-img-src2");
		if (imgSrc1 && !imgSrc2 && imgSrc2 != "*") {
			jQuery(img).attr("data-img-src2", "*"); // loading...
			if (imgAltRegex.test(imgSrc1)) {
				var baseSrc = imgSrc1.replace(imgAltRegex, "$1$2$3");
				var listUrl = baseSrc + "_is?req=set,json&handler=fsmParseImageMeta";
				var headTag = document.getElementsByTagName("head")[0];
				var jscript = document.createElement("script");
				jscript.type = "text/javascript";

				jscript.src = listUrl
				headTag.appendChild(jscript);
			}
		}
	}
	catch (e) { }
}

// Fires if problem loading image set
function s7jsonError(error, msg) {
}

// Toggle between alternative view of a product image
var scene7Regex = new RegExp("KateSpade/(.*)_is");
function fsmParseImageMeta(data) {
	try {
		var jset = data["set"];
		var items = jset["item"];
		var key = jset["n"].replace(scene7Regex, "$1");
		var $img = jQuery("[data-img-key='" + key + "']");
		if ($img.length == 0) return;

		// build list of all valid img urls
		var srcList = {};
		for (var ii = 0; ii < items.length; ii++) {
			var src = items[ii]["i"]["n"].replace("KateSpade/", "");
			srcList[src] = true;
		}
		// check in reverse order to find most desirable alt src
		var altBase = null;
		if (srcList[key]) altBase = key;
		if (srcList[key + "_R"]) altBase = key + "_R";
		if (srcList[key + "_1"]) altBase = key + "_1";
		if (srcList[key + "_1_R"]) altBase = key + "_1_R";

		if (altBase) {
			// found best mouse over image, now assign back to img element
			var altSrc = "//katespade.scene7.com/is/image/KateSpade/" + altBase + "?$s7productgrid$";
			$img.attr("data-img-src2", altSrc);
			// ... and pre-cache ready for mouse over
			fsmPreCacheImage(altSrc);
			// final check, if default image has error then replace with mouseover image
			if ($img.attr("data-error") == "true") {
				$img.attr("src", altSrc).attr("data-img-src1", altSrc);
			}
		}
	}
	catch (e) { }
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Support functions for facets
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
function fsmBindFacetEvents(parent, isSideBar) {
	// Add facet collapse/expand events
	jQuery(".box-header", parent).click(function() {
		var $header = jQuery(this);
		var $container = $header.parent();
		var allowToggle = isSideBar ? !fsm_search_blog_tab : true;
		if (allowToggle) {
			var $list = jQuery(".box-body", $container);
			if ($list.is(":visible")) {
				$list.slideUp();
				jQuery("i", this).attr("class", "icon-plus right");
				if (fsm_search_blog_tab) {
					$list.removeClass("expanded");
					$header.removeClass("expanded");
				}
			}
			else {
				$list.slideDown();
				jQuery("i", this).attr("class", "icon-minus right");
				if (fsm_search_blog_tab) {
					$list.addClass("expanded");
					$header.addClass("expanded");
				}

				// Sizes facets need aligning
				/*
				if ($container.hasClass("boxSize")) {
				Venda.Platform.EqualHeight.init([
				"div.boxSize div.search-facet", "div.boxSize div.search-facet a", "div.boxSize div.search-facet span"
				]);
				}
				else if ($container.hasClass("boxSizeTM")) {
				Venda.Platform.EqualHeight.init([
				"div.boxSizeTM div.search-facet", "div.boxSizeTM div.search-facet a", "div.boxSizeTM div.search-facet span"
				]);
				}
				*/
			}
		}
	});
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Support functions for creating mobile navigation
// Copy facets into main body (required by Venda) and then
// modify the HTML
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
function fsmSyncMobileFacets() {
	try {
		var $mobileFilters = jQuery("#js-filtersresults");
		if ($mobileFilters.attr("data-init") != "true") {
			// Only run once, paging requests don't overwrite this
			// content so in that case can be left
			$mobileFilters.attr("data-init", "true");
			var html = jQuery("#collate")
				.html()
				.replace(/data-role="fsmfacetclear"/g, " onclick=\"fsmSyncClearClick(this); return false;\"")
				.replace(/data-role=/g, " onclick=\"fsmSyncFilterClick(this); return false;\" data-ignore-role=")
				.replace(/boxRefinement/g, "boxRefinementTM")
				.replace(/boxSize/g, "boxSizeTM")
				.replace(/boxColor/g, "boxColorTM")
				.replace(/boxType/g, "boxTypeTM")
			$mobileFilters.html(html);

			// view by column facets need adjusting when adding into mobile view
			if (fsm_search_blog_tab) {
				$mobileFilters.addClass("viewbycolumn").find(".boxTypeTM[data-behaviour=open]").each(function() {
					var $this = $(this);
					$this.find(".box-header").addClass("column-header").find("h3").append("<i class=\"icon-plus right\"></i>");
					$this.find(".box-body").addClass("column-detail").css("display", "none");
				});
			}

			// Add facet collapse/expand events
			fsmBindFacetEvents($mobileFilters, false);
			// Bind "filters" expand/collapse and initialise as collapsed
			if (!fsm_search_blog_tab) {
				jQuery("#js-filtersresults").css("display", "none");
				var $filterTab = jQuery("#filtersResult");
				$filterTab.removeClass("expanded").find(".icon-minus").removeClass("icon-minus").addClass("icon-plus");
				$filterTab.click(function() {
					var $this = jQuery(this);
					var $filters = jQuery("#js-filtersresults");
					if ($filters.is(":visible")) {
						$filters.slideUp();
						$this.removeClass("expanded").find("i.right").removeClass("icon-minus").addClass("icon-plus");
					}
					else {
						$filters.slideDown();
						$this.addClass("expanded").find("i.right").removeClass("icon-plus").addClass("icon-minus");
					}
				});
			}
		}
	}
	catch (e) {}
}

// Filter & clear clicks on mobile part are delegated back to master / original links
function fsmSyncFilterClick(obj) {
	try {
		var $obj = jQuery(obj);
		var field = $obj.attr("data-field");
		var value = $obj.attr("data-value");
		var $original = jQuery(LM.Multi_FacetContainer).find("a[data-field='" + field + "'][data-value='" + value + "']");
		LM.Multi_ResetFilters($original.get(0));
	}
	catch (e) {}
}

function fsmSyncClearClick(obj) {
	try {
		var $obj = jQuery(obj);
		var field = $obj.attr("data-field");
		var $original = jQuery(LM.Multi_FacetContainer).find("a[data-role='fsmfacetclear'][data-field='" + field + "']");
		LM.Multi_ClearFilter($original.get(0).getAttribute("data-field"));
	}
	catch (e) { }
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Support functions for swatches
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
var fsmSwatchesTimer = null;
var fsmCurrentSwatchCaller = null;
var fsmDefaultSwatchContainerHeight = 61;

function fsmReinitialiseSwatches() {
	jQuery(".colorSwatch").attr("data-swatches-initialised", "false").css("height", fsmDefaultSwatchContainerHeight);
	jQuery(".swatchHidden").removeClass("swatchHidden");
	jQuery(".swatchMore").remove();
	fsmInitialiseSwatches();
	fsmEqualHeightProducts();
}
function fsmInitialiseSwatches() {
	// If too many swatches, then we need to show a minified view for tablet/desktop
	// Note: We used fixed heights on this item as workaround for equalHeight bug
	// so we may also need to adjust the fixed height of this container
	// and run our equivalent of equalHeight if any one container is outside the norm
	var $swatchContainers = jQuery(".colorSwatch");
	var deviceType = fsmDeviceType();

	if ($swatchContainers.length > 0) {
		// First of all we work out dimensions using the first product as a template
		var textWidth = 130;
		var width = $swatchContainers.width();
		var swatchesPerRow = Math.floor(width / 32);
		var maxSizeWhenOverTheshold = Math.floor((width - textWidth) / 32);

		// Keep track of any oversized swatches
		var maxRows = 1;

		$swatchContainers.each(function(idx) {
			// Make sure we only apply initialisers once
			var $swatchContainer = jQuery(this);
			var $swatches = jQuery(".swatchcolor", this);
			var initialised = $swatchContainer.attr("data-swatches-initialised");
			var bound = $swatchContainer.attr("data-swatches-events-bound");

			// Bind events
			if (bound != "true") {
				$swatchContainer.attr("data-swatches-events-bound", "true");

				// Swatch mousever and click events
				jQuery(".js-sw-image", $swatchContainer).bind("touchstart", function() {
					// If mobile device then all subsequent events will be cancelled
					jQuery(this).attr("data-is-touch", "true");
				}).mouseover(function() {
					// Set main product image plus change link
					if (jQuery(this).attr("data-is-touch") != "true") {
						fsmLoadSwatchMainImage(this);
					}
				}).click(function() {
					// Set main product image plus change link
					if (jQuery(this).attr("data-is-touch") == "true") {
						fsmLoadSwatchMainImage(this);
					}
					return false;
				});

				// If there are swatches then there is the chance that we might need to hide popups
				if ($swatches.length > 0) {
					$swatchContainer.mouseover(function() {
						fsmCheckSwatches();
					}).mouseout(function() {
						fsmHideSwatches();
					});
				}
			}

			// Initialise UI			
			if (initialised != "true") {
				$swatchContainer.attr("data-swatches-initialised", "true");

				if ($swatches.length > 0) {
					if (deviceType == "mobile") {
						// mobile show all swatches, but we may need to up the container sizes if any products
						// have too many swatches, keep track of max as we go along
						var rows = Math.ceil($swatches.length / swatchesPerRow);
						if (rows > maxRows) maxRows = rows;
					}
					else {
						// If there are swatches then we need to be able to toggle between
						// 2 different displays depending on how much space in available
						// The popup display is activated by a click and hidden with a mouseout for desktop
						if ($swatches.length > swatchesPerRow) {
							// Not enough space to show all swatches, show the "view all colours" link
							// Note span is technically not a valid element to insert inside a UL element, but no choice in this case
							jQuery("ul", this).prepend("<span class=\"swatchMore\" onclick=\"fsmExpandSwatches(this); return false;\">view all colours (" + $swatches.length + ")</span>");
							$swatches.each(function(ii) {
								if (ii >= maxSizeWhenOverTheshold) {
									jQuery(this).addClass("swatchHidden");
								}
							});
						}
					}
				}
			}
		});
		// Final check, equalHeights if any swatches have forced up the max container size
		if (maxRows > 2) {
			var newHeight = maxRows * 31;
			jQuery(".colorSwatch").css("height", newHeight);
		}
	}
}
function fsmExpandSwatches(link) {
	fsmCurrentSwatchCaller = link;
	window.clearTimeout(fsmSwatchesTimer);
	var $ul = jQuery(link).parent();
	$ul.attr("class", "swatchesExpanded");
	$ul.append("<li class=\"swatch-close\" onclick=\"jQuery(this).parents('.swatchesExpanded:first').removeClass('swatchesExpanded').addClass('swatchesContracted'); jQuery(this).remove();\" style=\"float:right;position:relative; bottom:35px;\">x</li>");
}
function fsmLoadSwatchMainImage(obj) {
	// Set main product image to src defined in swatch
	var $this = jQuery(obj);
	var key = $this.attr("data-altkey");
	var src = $this.attr("data-altimg");
	var $parent = $this.parents("li.prod-search-results").first();
	var $prodImg = $parent.find(".prod-image img");
	$prodImg.attr("src", src).attr("data-img-key", key).attr("data-img-src1", src).attr("data-img-src2", null);
	var href = $this.attr("href");
	$parent.find("a:not(.js-sw-image)").attr("href", href);
	fsmQueryImageMeta($prodImg); // reload image meta for new image to get best mouse over
}
function fsmCheckSwatches() {
	if (fsmCurrentSwatchCaller != null) {
		window.clearTimeout(fsmSwatchesTimer);
	}
}
function fsmHideSwatches() {
	if (fsmCurrentSwatchCaller != null) {
		fsmSwatchesTimer = window.setTimeout(function() {
			fsmCurrentSwatchCaller = null;
			jQuery(".swatchesExpanded").attr("class", "swatchesContracted").find(".swatch-close").remove();
		}, 1000);
	}
}

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Override methods
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
var fsmFilterUITimer = null;
var fsmFilterUIOpen = false;
if (LM.Domain.indexOf("-uat.") != -1 || LM.Domain.indexOf("-wip.") != -1) {
	LM.preInit(function() {
		// Filters
		var xforce = LM.getCookie("xforce") == "true";
		LM.config("xforce", xforce ? "true" : "false");
		var html = "<div id=\"FSMFilterOptionsContainer\" style=\"position: fixed; left: -150px; top: 0; box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4); z-index: 1000; opacity: 0.95;\" onmouseover=\"fsmExpandFilterOptions(); return false;\" onmouseout=\"fsmCollapseFilterOptions(); return false;\">";
		html += "<div><span style=\"display: inline-block; width: 150px; background: #f6fff6; color: #000; padding: 5px; font-size: 11px; border-bottom: 1px solid #ccc;\">Show Web Approved</span><span style=\"display: inline-block; background: #090; color: #fff; padding: 5px; width: 20px; xborder-radius: 0 0 3px 0; font-size: 11px;\">&#10004;</span></div>";
		if (xforce) {
			html += "<div onclick=\"fsmFilterOff(); return false;\" style=\"cursor: pointer\"><span style=\"display: inline-block; width: 150px; background: #eee; color: #000; padding: 5px; font-size: 11px;\">Show <b>NOT</b> Approved</span><span style=\"display: inline-block; width: 20px; background: #900; color: #fff; padding: 5px; xborder-radius: 0 0 3px 0; font-size: 11px;\">&#10004;</span></div>";
		}
		else {
			html += "<div onclick=\"fsmFilterOn(); return false;\" style=\"cursor: pointer\"><span style=\"display: inline-block; width: 150px; background: #eee; color: #000; padding: 5px; font-size: 11px;\">Show <b>NOT</b> Approved</span><span style=\"display: inline-block; width: 20px; background: #900; color: #fff; padding: 5px; xborder-radius: 0 0 5px 0; font-size: 11px;\">&#10006;</span></div>";
		}
		html += "</div>";
		jQuery(document.body).append(html);
	});
	function fsmExpandFilterOptions() {
		window.clearTimeout(fsmFilterUITimer);
		if (!fsmFilterUIOpen) {
			jQuery("#FSMFilterOptionsContainer").animate({ "left": 0 }, 150);
		}
		fsmFilterUIOpen = true;
	}
	function fsmCollapseFilterOptions() {
		fsmFilterUITimer = window.setTimeout(function() {
			fsmFilterUIOpen = false;
			jQuery("#FSMFilterOptionsContainer").animate({ "left": -150 }, 600);
		}, 500);
	}
	function fsmFilterOn() {
		LM.setCookie("xforce", "true", "S");
		fsmReloadPage();
	}
	function fsmFilterOff() {
		LM.removeCookie("xforce");
		fsmReloadPage();
	}
	function fsmReloadPage() {
		window.location = window.location;
	}
}