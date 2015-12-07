/**
* @fileoverview Venda.Attributes
 * Venda's Attributes functionality incorporates a standardized way of interfacing Attribute Products with the front-end as to make
 * the modification and creation of selection methods easier.
 *
 * These are the swatch assets required for intefaces that use swatches
 *
 * @author Alby Barber <abarber@venda.com>
 * @author Donatas Cereska <DonatasCereska@venda.com>
*/

Venda.Attributes.UpdateSwatch = function (attName, uID) {
	var atrsuplsku, hasUsSize ='';
 	for(var i = 0; i < Venda.Attributes.productArr.length; i++) {
		if (Venda.Attributes.productArr[i].attSet.id == uID) {

			var swatchList = '';
			var att1 = Venda.Attributes.productArr[i].attSet.att1.selected,
				att2 = Venda.Attributes.productArr[i].attSet.att2.selected,
				att3 = Venda.Attributes.productArr[i].attSet.att3.selected,
				att4 = Venda.Attributes.productArr[i].attSet.att4.selected;

			for (var t = 0; t < Venda.Attributes.productArr[i].attSet[attName].options.length; t++) {

				var attOption 	= Venda.Attributes.productArr[i].attSet[attName].options[t],
					attOptionVal = attOption;


				if((/\([^\(\)]+\)$/i).test(attOptionVal)){
					var usSize =  attOptionVal.match((/\([^\(\)]+\)$/i));
					if(usSize){
						attOptionVal = attOptionVal.replace(usSize, '');
						attOptionVal = attOptionVal+'<span class="us-size">'+usSize+'</span>';
						hasUsSize ='hasUsSize';
					}
				}
				var stockstatus = "";
				if (attName == 'att1'){
					att3 = Venda.Attributes.findAttr3(Venda.Attributes.productArr[i].attSet.att1.options[t], att2, uID);
					stockstatus = Venda.Attributes.GetAll(Venda.Attributes.productArr[i].attSet.att1.options[t], att2, att3, att4, 'stockstatus').replace(/ /g,"_");
				}
				if (attName == 'att2'){
					att3 = Venda.Attributes.findAttr3(att1, Venda.Attributes.productArr[i].attSet.att2.options[t], uID);
					stockstatus = Venda.Attributes.GetAll(att1, Venda.Attributes.productArr[i].attSet.att2.options[t], att3, att4, 'stockstatus').replace(/ /g,"_");
				}
				if (attName == 'att3'){
					stockstatus = Venda.Attributes.GetAll(att1, att2, Venda.Attributes.productArr[i].attSet.att3.options[t], att4, 'stockstatus').replace(/ /g,"_");
				}
				if (attName == 'att4'){
					stockstatus = Venda.Attributes.GetAll(att1, att2, att3, Venda.Attributes.productArr[i].attSet.att4.options[t], 'stockstatus').replace(/ /g,"_");
				}

				atrsuplsku = Venda.Attributes.GetAll(Venda.Attributes.productArr[i].attSet.att1.options[t], "", "", "", 'atrsuplsku', uID);
				if (attName === 'att1') {
					swatchList += '<li class="js-'+ Venda.Ebiz.clearText(attOption) + ' js-attributeSwatch js-' + stockstatus + ' js-' + attName + stockstatus + '" id="attributeSwatch_' + uID + '" data-attName="'+ attName +'" data-attValue="'+ attOption + '" data-atrsuplsku="'+atrsuplsku+'" title="' + attOption.toLowerCase()+ '"><span class="js-swatchText">' + attOptionVal + '</span><div class="js-swatch-background"></div></li>';
				} else {
					swatchList += '<li class="js-'+ Venda.Ebiz.clearText(attOption) + ' js-attributeSwatch js-' + stockstatus + ' js-' + attName + stockstatus + '" id="attributeSwatch_' + uID + '" data-attName="'+ attName +'" data-attValue="'+ attOption + '" data-atrsuplsku="'+atrsuplsku+'" title="' + attOption.toLowerCase()+ '"><div class="js-swatch-background"><span class="js-swatchText">' + attOptionVal + '</span></div></li>';
				}


			}

			var selectName = "#oneProduct_" + uID + " #swatchList_" + attName;
			jQuery(selectName).replaceWith("<ul id='swatchList_" + attName + "' class='" + hasUsSize +"'>" + swatchList + "</ul>");
			if(attName === 'att2'){
				if(jQuery('#swatchList_' + attName).find('li').length === 1){
					jQuery('#swatchList_' + attName).addClass('one-size');
				}else{
					jQuery('#swatchList_' + attName).removeClass('one-size');
				}
			}
		}
	}
};

Venda.Attributes.findAttr3 = function (att1, att2, uuID) {
	for(var j = 0; j < Venda.Attributes.attsArray.length; j++) {
		if (Venda.Attributes.attsArray[j]['att1'] === att1 && Venda.Attributes.attsArray[j]['att2'] === att2 && Venda.Attributes.attsArray[j]['invtuuid'] === uuID ) {
			return Venda.Attributes.attsArray[j]['att3'];
		}
	}
	return '';
};

Venda.Attributes.setSelectedClass = function (uID){
	for(var i = 0; i < Venda.Attributes.productArr.length; i++) {
		if (Venda.Attributes.productArr[i].attSet.id == uID) {
			for (var t = 1; t <= Venda.Attributes.HowManyAtts(uID); t++) {
				var att = 'att' + t;

				if (typeof Venda.Attributes.productArr[i].attSet[att].selected=="undefined"){
					return false;
				}
				if (Venda.Attributes.productArr[i].attSet[att].selected.length != 0){
					jQuery('#oneProduct_' + uID + ' #swatchList_'+att).find('.js-attributeSwatch[data-attvalue="' + Venda.Attributes.productArr[i].attSet[att].selected + '"]').addClass("js-selected");
					if(jQuery("#attributesForm").length > 0) {
						if(document.getElementById("attributesForm").innerHTML == "halfswatch") {
							document.getElementById("hiddenInput_" + att).name = att;
							document.getElementById("hiddenInput_" + att).value = Venda.Attributes.productArr[i].attSet[att].selectedValue;
						}
					if(document.getElementById("attributesForm").innerHTML == "swatch") {
							document.getElementById("hiddenInput_" + att).name = att;
							document.getElementById("hiddenInput_" + att).value = Venda.Attributes.productArr[i].attSet[att].selectedValue;
						}
					}

				}
			}
		}
	}
	Venda.Attributes.arrangeOrder();
};

Venda.Attributes.productDetail = $('#productdetail').text();
Venda.Attributes.arrangeOrder = function () {
	if (Venda.Attributes.productDetail  === 'swatch') {
		for (var n = 0; n < Venda.Attributes.generatedOptions.length; n++) {
			if (Venda.Attributes.generatedOptions[n][0] === "") {
				Venda.Attributes.generatedOptions[n].splice(0, 1);
			}
		}

		$('[id^="swatchList_att"]').each(function(select) {
			var _this = this;
			for(var i = 0; i < Venda.Attributes.generatedOptions[select].length; i++) {
				if (Venda.Attributes.generatedOptions[select][i] !== "") {
					$(_this).find('li').each(function(listItemIndex) {
						if (listItemIndex >= i) {
							if (Venda.Attributes.generatedOptions[select][i] === $(this).find('span').text()) {
								if (i !== listItemIndex) {

									$(this).insertBefore($(_this).find('li').eq(i));
								}
								return false;
							}
						}
					});
				}
			}
		});

	}
}
Venda.Attributes.arrangeOrder();