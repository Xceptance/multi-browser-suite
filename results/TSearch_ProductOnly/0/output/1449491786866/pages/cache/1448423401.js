/**
 * @fileoverview Venda.Attributes
 * Venda's Attributes functionality incorporates a standardized way of interfacing Attribute Products with the front-end as to make
 * the modification and creation of selection methods easier.
 *
 * This is the halfswatch interface used to display a swatch for the first attribute and select dropdown boxes for each additional attribute
 *
 * The files below will be included dynamicly when required:
 * @requires js/Venda/Attributes/attributeAsset-Dropdown.js
 * @requires js/Venda/Attributes/attributeAsset-Swatch.js
 *
 * @author Alby Barber <abarber@venda.com>
 * @author Donatas Cereska <DonatasCereska@venda.com>
 */

Venda.Attributes.HalfSwatch = function() {
  var scene7Settings = Venda.Attributes.Scene7.settings;
  jQuery(".js-oneProduct").each(function(index) {
    var uID = this.id.substr(11);
    Venda.Attributes.productArr[index] = new Venda.Attributes.GenerateOptionsJSON(index, uID);

    for(var color in Venda.Attributes.productArr[index].attSet['att1'].optionValues){
       var colorValue = Venda.Attributes.productArr[index].attSet['att1'].optionValues[color],
           keyimage   = jQuery('#product-detail-image-wrap').data('keyimage'),
           atrData    = Venda.Attributes.getAtrData('atr1', colorValue, "", uID),
           colorKey   = atrData.atrsuplsku || "DEFAULT";

       if(typeof(colorValue) === "string" && colorKey != ""){
          Venda.Attributes.SwatchURL[colorValue] = scene7Settings.serverURL + '/is/image/' + scene7Settings.project + '/S_' + keyimage + '_' + colorKey + '?$colorSwatch$&defaultImage=no-swatch';
       }
    }
    //if($('.modal-load-url').text()!="")

    if (jQuery("#oneProduct_" + uID + " #attributeInputs").length) {
      jQuery("#oneProduct_" + uID + " #attributeInputs").addClass("js-type-halfswatch");
      Venda.Attributes.generateSwatch('att1', uID);
      if (Venda.Attributes.Settings.isMobile) {
        Venda.Attributes.generateDropDowns('att2', uID);
        jQuery('.js-customselect').addClass('js-custom');
        Venda.Ebiz.customSelect();
      } else{
        Venda.Attributes.generateSwatch('att2', uID);
      }
      Venda.Attributes.generateDropDowns('att3', uID);
      Venda.Attributes.generateDropDowns('att4', uID);
      Venda.Attributes.PresetAtt(index, uID);

      jQuery('#oneProduct_' + uID + ' #pricerange').text(Venda.Attributes.GetPriceRange(uID));
			jQuery('#oneProduct_' + uID + ' #price').text(Venda.Attributes.GetPriceRange(uID));
			Venda.Attributes.updateAttributes(uID);
    }
    Venda.Attributes.swatchImage('att1', uID);
  });

  // This is getting all the assets that can be loaded after the Onload
  var url1 = '/content/ebiz/' + jQuery("#tag-ebizref").text() + '/resources/js/Venda/Attributes/attributeAsset-Swatch.js';
  jQuery.getScript(url1, function(Status) {
    if (!Status) {
      console.warn('Whoops! attributeAsset-Swatch.js did not load');
    } else {
      var url2 = '/content/ebiz/' + jQuery("#tag-ebizref").text() + '/resources/js/Venda/Attributes/attributeAsset-Dropdown.js';
      jQuery.getScript(url2, function(Status) {
        if (!Status) {
          console.warn('Whoops! attributeAsset-Dropdown.js did not load');
        } else {
          //All loaded

          //ColourSwatch and size selection
          var singleuID = jQuery(".js-oneProduct").attr("id").substr(11);
          var defcolor = jQuery(".js-oneProduct").find('#attributeInputs').data('defcolor') || "";
          var urlParam = Venda.Platform.getUrlParam(location.href, 'color');
          var urlParam2 = Venda.Platform.getUrlParam(location.href, 'size');
          var urlParam3 = Venda.Platform.getUrlParam(location.href, 'colorid');
          if($('.modal-load-url').text()!="") {
            urlParam = Venda.Platform.getUrlParam($('.modal-load-url').text(), 'color');
            urlParam2 = Venda.Platform.getUrlParam($('.modal-load-url').text(), 'size');
          }

          if(urlParam != ""){
            urlParam = Venda.Attributes.GetAll(urlParam, ((urlParam2!="")?urlParam2:""), "", "", 'atrsuplsku', singleuID);
          }
          if(urlParam3 != '' && !urlParam) {
            urlParam = urlParam3;
          }

          if(urlParam == ""){urlParam = defcolor;}
          if(jQuery(".js-oneProduct").length === 1) {
            if(urlParam == "" || jQuery("#oneProduct_" + singleuID + " #attributeInputs").find('.js-colourSwatch[data-atrsuplsku="'+urlParam+'"]').length == 0){
                urlParam = jQuery("#oneProduct_" + singleuID + " #attributeInputs").find('.js-colourSwatch:first').data('atrsuplsku');
            }
            if(urlParam != ""){
              for(var i = 0; i < Venda.Attributes.attsArray.length; i++) {
                if(Venda.Attributes.attsArray[i].atrsuplsku == urlParam) {
                  Venda.Attributes.HalfswatchBehaviour('att1', Venda.Attributes.attsArray[i].att1, singleuID);
                  break;
                }
              }
            }
            if(urlParam2 != ""){
              for(var i = 0; i < Venda.Attributes.attsArray.length; i++) {
                if(Venda.Attributes.attsArray[i].att2 == urlParam2) {
                  Venda.Attributes.HalfswatchBehaviour('att2', Venda.Attributes.attsArray[i].att2, singleuID);
                  break;
                }
              }
            }
          }else{
            jQuery(".js-oneProduct").each(function(){
              var singleuID = jQuery(this).attr("id").substr(11);
              var defcolor = jQuery(this).find('#attributeInputs').data('defcolor') || "";

              if(defcolor == "" || jQuery(this).find('.js-colourSwatch[data-attvalue="'+defcolor+'"]').length == 0){
                defcolor = jQuery(this).find('.js-colourSwatch:first').data('attvalue');
              }
              if(jQuery(this).find('.js-colourSwatch[data-attvalue="'+defcolor+'"]').length > 0){

                for(var i = 0; i < Venda.Attributes.attsArray.length; i++) {
                  if(Venda.Attributes.attsArray[i].atrsuplsku == urlParam && Venda.Attributes.attsArray[i].invtuuid === singleuID) {
                    Venda.Attributes.HalfswatchBehaviour('att1', Venda.Attributes.attsArray[i].att1, singleuID);
                    break;
                  }
                }
              }
            });
          }
          //All loaded
          Venda.Attributes.singleHalfSwatch();
          jQuery('.js-oneProductContent').css('visibility','visible');
        }
      });
    }
  });

}();


// Events
jQuery('.attribute-inputs').off('click').on('click', '.js-attributeSwatch', function() {
  var uID = this.id.substr(16),
    attName = this.getAttribute('data-attName'),
    attValue = this.getAttribute('data-attValue');

    /* do not change if selected */
  if(jQuery(this).is('.js-selected')){return false;}

   /* size attribute is NOT be clickable if not available */
  if (!jQuery(this).is('.js-att2Not_Available')) {
    Venda.Attributes.HalfswatchBehaviour(attName, attValue, uID);
  }

  /* sizes/colors that are unavailable should be disabled */
  if ((/not\savailable|out\sof\sstock/i).test((Venda.Attributes.dataObj.stockstatus || "").toLowerCase())) {
    jQuery('#oneProduct_' + uID + ' .js-addproduct').prop('disabled', true).addClass('disabled');
  } else {
    jQuery('#oneProduct_' + uID + ' .js-addproduct').prop('disabled', false).removeClass('disabled');
  }

  // If you have currency converter include the following line
  if (jQuery("#currencyConverter").length) {
    if (jQuery('#tag-currencycode') && (typeof jQuery().pennies !== 'undefined')) {
      jQuery('.js-attributesPrice .js-prod-price').pennies('convert', {
        to: jQuery(this).pennies('get'),
        from: jQuery('#tag-currencycode').html()
      })
    }
  }
  //Venda.Attributes.orderHalfSwatch();
});

jQuery('.attribute-inputs').on('change', 'select', function() {
  var uID = this.id.substr(5),
    attName = this.name,
    attValue = this.value,
    attText = jQuery('#' + attName + '_' + uID + ' option:selected').attr('data-attText');

    for(var i = 0; i < Venda.Attributes.productArr.length; i++) {
      if (Venda.Attributes.productArr[i].attSet.id == uID) {
        if(Venda.Attributes.productArr[i].attSet[attName].selected === attValue){
          /* do not change if selected */
          return false;
        }
      }
    }

  Venda.Attributes.HalfswatchBehaviour(attName, attText, uID);

  // If you have currency converter include the following line
  if (jQuery('#tag-currencycode') && (typeof jQuery().pennies !== 'undefined')) {
    jQuery('.js-attributesPrice .js-prod-price').pennies('convert', {
      to: jQuery(this).pennies('get'),
      from: jQuery('#tag-currencycode').html()
    })
  }
  //Venda.Attributes.orderHalfSwatch();
});

Venda.Attributes.HalfswatchBehaviour = function(attName, attValue, uID){
  Venda.Attributes.setSelectedJSON(attName,attValue, uID);
  if(attName === "att1"){
    for(var i = 0; i < Venda.Attributes.attsArray.length; i++) {
      if(Venda.Attributes.attsArray[i].atr1 == attValue && Venda.Attributes.attsArray[i].invtuuid === uID && Venda.Attributes.attsArray[i].atr3 != "") {
        Venda.Attributes.setSelectedJSON("att3", Venda.Attributes.attsArray[i].atr3, uID);
        break;
      }
    }
  }
  Venda.Attributes.updateAttributes(uID);
  Venda.Attributes.UpdateSwatch('att1', uID);
  if (Venda.Attributes.Settings.isMobile) {
    Venda.Attributes.UpdateDD('att2', uID);
  } else{
    Venda.Attributes.UpdateSwatch('att2', uID);
  }
  Venda.Attributes.UpdateDD('att3', uID);
  Venda.Attributes.UpdateDD('att4', uID);
  Venda.Attributes.setSelectedClass(uID);
  Venda.Attributes.swatchImage('att1',uID);
  if(attName === "att1"){
    Venda.Attributes.ImageSwap(attValue, uID);
  }
};


// auto select if only 1 attribute colour option is available
Venda.Attributes.singleHalfSwatch = function() {
  $('#attributeInputs ul').each(function() {
    if ($(this).find('li').size() === 1) {
      $(this).find('li').each(function() {
        var uID = this.id.substr(16),
          attName = this.getAttribute('data-attName'),
          attValue = this.getAttribute('data-attValue');
        if(attName === "att2"){
          if((/one size|taille unique|uns/i).test((attValue || "").toLowerCase())){
            Venda.Attributes.HalfswatchBehaviour(attName, attValue, uID);
          }
        }
      })
    }
  });
  jQuery("#attributeInputs select").each(function() {
    var uID = this.id.substr(5),
      attName = this.name,
      attValue = this.value,
      attText = jQuery('#' + attName + '_' + uID + ' option:selected').attr('data-attText');
    if (this.length === 2) {

      $(this).children().each(function() {
        if (attValue === "") {
          optValue = this.value;
          if (optValue !== "") {
            if(attName == "att2" && (/one size|taille unique|uns/i).test((optValue || "").toLowerCase())){
              $(this).attr('selected', 'selected');
              $(this).parent().trigger('change');
            }
          }
        }
      })
    }
  });
};

if (Venda.Attributes.generatedOptions.length>0 && Venda.Attributes.generatedOptions[0][0] === "") {
  Venda.Attributes.generatedOptions[0].splice(0, 1);
}

Venda.Attributes.orderSwatchLists = function () {
  $('[id^="swatchList_att"]').each(function(list) {
    var _this = this;
    for(var i = 0; i < Venda.Attributes.generatedOptions[list].length; i++) {
      if (Venda.Attributes.generatedOptions[list][i] !== "") {
        $(_this).find('li').each(function(listItemIndex) {
          if (listItemIndex >= i) {
            if (Venda.Attributes.generatedOptions[list][i] === $(this).find('span').text()) {
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

Venda.Attributes.orderDropdownElements = function () {
  $( "select[name^='att']" ).each (function (select) {
    select++;
    var _this = this;
    for(var i = 0; i < Venda.Attributes.generatedOptions[select].length; i++) {
      $(_this).find('option').each(function(optionIndex) {
        if (optionIndex >= i) {
          if (Venda.Attributes.generatedOptions[select][i] === $(this).attr('value')) {
            if (i !== optionIndex) {

              $(this).remove();
              $(this).insertBefore($(_this).find('option').eq(i));
            }
            return false;
          }
        }
      })
    };
  });
}

Venda.Attributes.orderHalfSwatch = function () {
  Venda.Attributes.orderSwatchLists();
  Venda.Attributes.orderDropdownElements();
}
//Venda.Attributes.orderHalfSwatch();