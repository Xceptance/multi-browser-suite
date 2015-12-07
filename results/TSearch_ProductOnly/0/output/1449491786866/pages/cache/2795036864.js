/**
* @fileoverview Venda.Attributes
 * Venda's Attributes functionality incorporates a standardized way of interfacing Attribute Products with the front-end as to make
 * the modification and creation of selection methods easier.
 *
 * These are the dropdown assets required for intefaces that use select dropdown boxes.
 *
 * @author Alby Barber <abarber@venda.com>
 * @author Donatas Cereska <DonatasCereska@venda.com>
*/

Venda.Attributes.UpdateDD = function (attName, uID) {
 var optionDefault = (Venda.Attributes.Settings.isMobile) ? jQuery('#attributes-optionDefault-small').text() : jQuery('#attributes-optionDefault').text();

 for(var i = 0; i < Venda.Attributes.productArr.length; i++) {
    if (Venda.Attributes.productArr[i].attSet.id == uID) {
      if(jQuery("select[id='"+ attName +"_" + uID + "']").length === 0){continue;}

      var options = '';
      var att1 = Venda.Attributes.productArr[i].attSet.att1.selected,
        att2 = Venda.Attributes.productArr[i].attSet.att2.selected,
        att3 = Venda.Attributes.productArr[i].attSet.att3.selected,
        att4 = Venda.Attributes.productArr[i].attSet.att4.selected,
        stockstatus = '',
        lastSize    = '';

      for (var t = 0; t < Venda.Attributes.productArr[i].attSet[attName].options.length; t++) {

        var attOption   = Venda.Attributes.productArr[i].attSet[attName].options[t];

        if (attName == 'att1'){
          stockstatus = Venda.Attributes.GetAll(Venda.Attributes.productArr[i].attSet.att1.options[t], att2, att3, att4, 'stockstatus', uID);
        }
        if (attName == 'att2'){
          stockstatus = Venda.Attributes.GetAll(att1, Venda.Attributes.productArr[i].attSet.att2.options[t], att3, att4, 'stockstatus', uID);
        }
        if (attName == 'att3'){
          stockstatus = Venda.Attributes.GetAll(att1, att2, Venda.Attributes.productArr[i].attSet.att3.options[t], att4, 'stockstatus', uID);
        }
        if (attName == 'att4'){
          stockstatus = Venda.Attributes.GetAll(att1, att2, att3, Venda.Attributes.productArr[i].attSet.att4.options[t], 'stockstatus', uID);
        }

        atrsuplsku = atrsuplsku = Venda.Attributes.GetAll(Venda.Attributes.productArr[i].attSet.att1.options[t], "", "", "", 'atrsuplsku', uID);

        var optionBody = 'data-attText="' + Venda.Attributes.productArr[i].attSet[attName].options[t] + '"  data-atrsuplsku="'+atrsuplsku+'" value="'+ Venda.Attributes.productArr[i].attSet[attName].optionValues[t] +'">' + Venda.Attributes.productArr[i].attSet[attName].options[t];


        if (attName !== "att1" && Venda.Attributes.Settings.hideNotAvailable && stockstatus == 'Not Available'){
          /* options += '<option style="display:none" ' + optionBody + '</option>'; */
        } else {
          options += '<option ' + optionBody + '</option>';
          lastSize = Venda.Attributes.productArr[i].attSet[attName].optionValues[t];
        }
      }

      var $select       = jQuery('select[id="' + attName + '_' + uID + '"]'),
          selectedValue = Venda.Attributes.productArr[i].attSet[attName].selectedValue;
      if(attName == "att2" && !(/one size|taille unique|uns/i).test(lastSize)){
        options = '<option value="" data-attText="">'+optionDefault+'</option>' + options;
      }
      $select.html(options);
      if(selectedValue === "" || (selectedValue !== "" && $select.find('option[data-attText="'+selectedValue+'"]').length === 0)){
        selectedValue = $select.find('option:first').attr('value');
        if(attName === "att2"){
          Venda.Attributes.setSelectedJSON(attName, selectedValue, uID);
          Venda.Attributes.updateAttributes(uID);
        }if(attName === "att3"){
          $select.val(selectedValue);
          if(selectedValue){
            if(typeof(Venda.Attributes.HalfswatchBehaviour) === "function"){
              Venda.Attributes.HalfswatchBehaviour(attName, selectedValue, uID);
            }else{
              $select.trigger('change');
            }
          }
        }
      }else{
        $select.val(selectedValue);
      }
    }
  }
 Venda.Attributes.sortDropdownOrder();
 Venda.Ebiz.customSelectUpdate();
};

Venda.Attributes.productDetail = $('#productdetail').text();
Venda.Attributes.sortDropdownOrder = function () {
  if (Venda.Attributes.productDetail === 'dropdown') {
    $( 'select[name^="att"]' ).each(function(select) {
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
        });
      }
    });
  }
};
Venda.Attributes.sortDropdownOrder();
