/*global Venda, jQuery */

/**
 * @fileoverview Venda.CountrySelect
 *
 * Rearange country dropdown list to show top most popular countries first.
 * Manage a country specific registration form display.
 *
 * @author Donatas Cereska <dcereska@venda.com>,  Keith Freeman <kfreeman@venda.com>
 */

Venda.namespace('CountrySelect');


/**
 * Stub function is used to support JSDoc.
 * @class Venda.CountrySelect
 * @constructor
 */

Venda.CountrySelect = function () {};


 /**
 * Initiate an empty object to collect the country data printed from within the
 */

Venda.CountrySelect.countryAndData = {};

Venda.CountrySelect.Init = function () {
  var topCountries, el, selectOptions;

  switch (jQuery('#tag-sessionlocn').text()) {

    case 'uk':
      topCountries = [
        'United Kingdom'
      ];
      break;
    case 'fra':
      topCountries = [
        'France'
      ];
      break;

    case 'us':
      topCountries = [
        'United States',
        'Canada',
        'Mexico',
        'Brazil'
      ];
      break;

    //restoftheworld
    default:
      topCountries = [];
  }

  //cache selectors
  el = {
    countrySelect: jQuery('select#cntrylist'),
    countrySelectOption: jQuery('select#cntrylist option'),
    stateSelect: jQuery('select#statelist'),
    stateLabel: jQuery('#stateLabel'),
    stateErrorLabel: Venda.Validate.msg.state,
    stateInput: jQuery('#statetext'),
    stateListSelect: jQuery('select#statelist'),
    stateList: jQuery('#statelist'),
    zipLabel: jQuery('#zipcLabel'),
    zipInput: jQuery('#zipc'),
    houseNum: jQuery('#houseNum'),
    numInput: jQuery('#num'),
    deliverTo: jQuery('#deliverto'),
    billingAddr: jQuery('#usebillingaddress'),
    diffAddr: jQuery('#deliveryaddressadd')
  };
  var selectOptions = {};
  var sortOptions = [];

  el.stateSelect.change(function () {
    if (jQuery('#statelist option:selected').index() > 0) {
      el.stateInput.val(Venda.CountrySelect.countryAndData[jQuery('#cntrylist option:selected').val()][jQuery('#statelist option:selected').index() - 1].split(':')[0]);
    }
  });


  var pleaseselect = el.countrySelectOption.eq(0).text();
  var pleaseselect_value = el.countrySelectOption.eq(0).prop('value');
  el.countrySelectOption.eq(0).remove();
  el.countrySelectOption = jQuery('select#cntrylist option');


  if(jQuery('#tag-sessionlang').text() === 'fr'){
    var options = [];
    el.countrySelectOption.each(function (index) {
      options.push($(this).text());
    });

    options.sort(function(a,b) {
      var a = a, b = b;
      var a_order = (typeof(Venda.CountrySelect.countryMapping[a]) != 'undefined')?Venda.CountrySelect.countryMapping[a].fr.order:300;
      var b_order = (typeof(Venda.CountrySelect.countryMapping[b]) != 'undefined')?Venda.CountrySelect.countryMapping[b].fr.order:300;

      if (a_order > b_order) return 1;
      else if (a_order < b_order) return -1;
      else return 0
    });

    el.countrySelect.html(function(){
      var out = [];
      for (var i = 0, l = options.length; i < l; i++) {
        out.push('<option value="' + options[i] + '">' + options[i] + '</option>');
      };
      return out.join('');
    });
  }

  el.countrySelectOption = jQuery('select#cntrylist option');

  el.countrySelectOption.each(function (index) {
    var text  = jQuery(this).text(),
        value = jQuery(this).val();
    selectOptions[index] = jQuery(this).val();

    if(value === 'Netherlands') {
      jQuery(this).text('The Netherlands');
    }

    if(jQuery('#tag-sessionlang').text() === 'fr' && typeof(Venda.CountrySelect.countryMapping[text]) != 'undefined'){
      jQuery(this).text(Venda.CountrySelect.countryMapping[text].fr.translate);
    }
  });

  if (topCountries.length > 0 && !el.countrySelect.is('.hidden-input') && el.countrySelect.find('option').length > 2) {
    el.countrySelect.prepend('<option value="-" disabled>-</option>');
    for (var i = (topCountries.length - 1); i >= 0; i--) {
      for (var key in selectOptions) {
        if (selectOptions[key] === topCountries[i]) {
          el.countrySelect.prepend(el.countrySelect.find('option[value="'+topCountries[i]+'"]'));
        }
      }
    }
    el.countrySelectOption.each(function(i,v){
      if ($(v).val() == '') {
        el.countrySelect.prepend($(v));
      }
    });
  }
  el.countrySelect.prepend('<option value="'+pleaseselect_value+'">' + pleaseselect + '</option>');

  if($('#dcntrylist').text()!="" && $('#dcntrylist').text()!="Empty" && $('#tag-curstep').text()!="social-create") {
    el.countrySelect.val($('#dcntrylist').text());
    Venda.CountrySelect.SetCountry($('#dcntrylist').text(), el);
  } else if($('.addressform-error').length > 0){
    el.countrySelect.val($('#venda_cntry').text());
    Venda.CountrySelect.SetCountry($('#venda_cntry').text(), el);
  } else {
    el.countrySelect.val(el.countrySelect.find('option:first').val());
    Venda.CountrySelect.SetCountry(el.countrySelect.find('option:first').val(), el);
  }
  Venda.Ebiz.customSelectUpdate();

  el.countrySelect.change(function () {
    el.zipInput.parents('form').validate().resetForm();
    Venda.CountrySelect.SetCountry(jQuery(this).val(), el);
  });

  var hideWrapper = setTimeout(function () {
    jQuery('select#statelist').closest('.ui-select').hide();
  }, 100);

  if ( el.billingAddr.length ) {
    el.billingAddr.on('do-disable', function(){
      Venda.CountrySelect.canUseBillingAddress('disabled', el);
    });

    el.billingAddr.on('do-enable', function(){
      Venda.CountrySelect.canUseBillingAddress('enabled', el);
    });
  }


  setTimeout(function(){
    if(el.countrySelect.is('.hidden-input')){
      el.countrySelect.trigger('change');
    }

    Venda.Ebiz.select2.init();
    Venda.Ebiz.select2.destroy('#statelist');
    el.countrySelect.trigger('change');
    el.zipInput.trigger('blur');
  }, 200);
};

Venda.CountrySelect.SetCountry = function (cntry, el) {

  if(cntry === ''){
    el.countrySelect.parents('form').find('input[name="lang"]').val($('#tag-sessionlanguage').text());
    $('#delivery-address-option-eur .js-eurcountry').text('');
  }
  var text = $('#delivery-address-option-' + jQuery('#tag-sessionlocn').text()).html();
  $('#delivery-address-option').html(text);


  switch (cntry) {

    case 'United States':
      // values: enabled,disabled - num field
      Venda.CountrySelect.numField('disabled', el);
      // values: enabled,disabled - billing address
      Venda.CountrySelect.canUseBillingAddress('disabled', el);
      // values: county,state,province,region
      Venda.CountrySelect.Locality('state', 'required', el);
      // values: postcode,zipcode
      Venda.CountrySelect.postalCode('zipcode', 'required', el);
      // values: inputtext, inputselect
      Venda.CountrySelect.LocalityInputType('select', el);
      // values: lookup, manual
      Venda.CountrySelect.addressEntry('manual', el);
      el.stateList.parents('form').validate().resetForm();
      break;

    case 'United Kingdom':
      // values: enabled,disabled - num field
      Venda.CountrySelect.numField('enabled', el);
      // values: enabled,disabled - billing address
      Venda.CountrySelect.canUseBillingAddress('enabled', el);
      // values: county,state,province,region
      Venda.CountrySelect.Locality('county', 'optional', el);
      // values: postcode,zipcode
      Venda.CountrySelect.postalCode('postcode', 'required', el);
      // values: inputtext, inputselect
      Venda.CountrySelect.LocalityInputType('text', el);
      // values: true, false
      Venda.CountrySelect.addressEntry('lookup', el);

      el.countrySelect.parents('form').find('input[name="lang"]').val('ae');

      var text = $('#delivery-address-option-uk').text();
      $('#delivery-address-option').text(text);

      break;

    case 'Germany':
      // values: enabled,disabled - num field
      Venda.CountrySelect.numField('disabled', el);
      // values: enabled,disabled - billing address
      Venda.CountrySelect.canUseBillingAddress('enabled', el);
      // values: county,state,province,region
      Venda.CountrySelect.Locality('state', 'optional', el);
      // values: postcode,zipcode
      Venda.CountrySelect.postalCode('postcode', 'required', el);
      // values: inputtext, inputselect
      Venda.CountrySelect.LocalityInputType('text', el);
      // values: lookup, manual
      Venda.CountrySelect.addressEntry('manual', el);
      $('.js-eurcountry').text(' (' + cntry + ' ONLY)');
      break;

    case 'France':
      // values: enabled,disabled - num field
      Venda.CountrySelect.numField('disabled', el);
      // values: enabled,disabled - billing address
      Venda.CountrySelect.canUseBillingAddress('enabled', el);
      // values: county,state,province,region
      Venda.CountrySelect.Locality('disabled', 'optional', el);
      // values: postcode,zipcode
      Venda.CountrySelect.postalCode('postcode', 'required', el);
      // values: inputtext, inputselect
      Venda.CountrySelect.LocalityInputType('disabled', el);
      // values: lookup, manual
      Venda.CountrySelect.addressEntry('manual', el);

      var text = $('#delivery-address-option-fra').text();
      $('#delivery-address-option').text(text);

      break;

    case 'Italy':
      // values: enabled,disabled - num field
      Venda.CountrySelect.numField('disabled', el);
      // values: enabled,disabled - billing address
      Venda.CountrySelect.canUseBillingAddress('enabled', el);
      // values: county,state,province,region
      Venda.CountrySelect.Locality('region', 'optional', el);
      // values: postcode,zipcode
      Venda.CountrySelect.postalCode('postcode', 'required', el);
      // values: inputtext, inputselect
      Venda.CountrySelect.LocalityInputType('text', el);
      // values: lookup, manual
      Venda.CountrySelect.addressEntry('manual', el);
      $('.js-eurcountry').text(' (' + cntry + ' ONLY)');
      break;

    case 'Spain':
      // values: enabled,disabled - num field
      Venda.CountrySelect.numField('disabled', el);
      // values: enabled,disabled - billing address
      Venda.CountrySelect.canUseBillingAddress('enabled', el);
      // values: county,state,province,region
      Venda.CountrySelect.Locality('province', 'optional', el);
      // values: postcode,zipcode
      Venda.CountrySelect.postalCode('postcode', 'required', el);
      // values: inputtext, inputselect
      Venda.CountrySelect.LocalityInputType('text', el);
      // values: lookup, manual
      Venda.CountrySelect.addressEntry('manual', el);
      $('.js-eurcountry').text(' (' + cntry + ' ONLY)');
      break;

      case 'Netherlands':
        // values: enabled,disabled - num field
        Venda.CountrySelect.numField('disabled', el);
        // values: enabled,disabled - billing address
        Venda.CountrySelect.canUseBillingAddress('enabled', el);
      // values: county,state,province,region
      Venda.CountrySelect.Locality('province', 'optional', el);
      // values: postcode,zipcode
      Venda.CountrySelect.postalCode('postcode', 'required', el);
      // values: inputtext, inputselect
      Venda.CountrySelect.LocalityInputType('text', el);
      // values: lookup, manual
      Venda.CountrySelect.addressEntry('manual', el);
      $('.js-eurcountry').text(' (' + cntry + ' ONLY)');
      break;

    case 'Canada':
      // values: enabled,disabled - num field
      Venda.CountrySelect.numField('disabled', el);
      // values: enabled,disabled - billing address
      Venda.CountrySelect.canUseBillingAddress('disabled', el);
      // values: county,state,province,region
      Venda.CountrySelect.Locality('province', 'required', el);
      // values: postcode,zipcode
      Venda.CountrySelect.postalCode('zipcode', 'required', el);
      // values: inputtext, inputselect
      Venda.CountrySelect.LocalityInputType('select', el);
      // values: lookup, manual
      Venda.CountrySelect.addressEntry('manual', el);
      el.stateList.parents('form').validate().resetForm();
      break;

    default:
      // values: enabled,disabled - num field
      Venda.CountrySelect.numField('disabled', el);
      // values: enabled,disabled - billing address
      Venda.CountrySelect.canUseBillingAddress('disabled', el);
      // values: county,state,province,region
      Venda.CountrySelect.Locality('region', 'optional', el);
      // values: postcode,zipcode
      Venda.CountrySelect.postalCode('postcode', 'optional', el);
      // values: inputtext, inputselect
      Venda.CountrySelect.LocalityInputType('text', el);
      // values: lookup, manual
      Venda.CountrySelect.addressEntry('manual', el);
      el.zipInput.rules('remove', 'required');
      break;
  }
  if (cntry && Venda.CountrySelect.countryAndData[cntry]) {
    var state_options = '<option value="">' + jQuery('#js-countryselect-pleaseselect').text() + '</option>', totalOption = 0;
    for (var i = 0; i < Venda.CountrySelect.countryAndData[cntry].length; i++) {
      if (typeof Venda.CountrySelect.countryAndData[cntry][i] === 'string') {
        state_options += '<option value="' + Venda.CountrySelect.countryAndData[cntry][i].split(':')[0] + '">' + Venda.CountrySelect.countryAndData[cntry][i].split(':')[1] + '</option>';
        totalOption++;
      }
    }
    el.stateSelect.html(state_options);
    if (jQuery('#venda_state').text().length > 0) {
      el.stateSelect.val(jQuery('#venda_state').text());
      el.stateInput.val(jQuery('#venda_state').text());
    }
    if (el.stateInput.val().length > 0) {
      el.stateSelect.val(el.stateInput.val());
      el.stateInput.val(el.stateInput.val());
    }
    el.stateListSelect.next('.js-select').find('span.js-selected').text(jQuery('select#statelist option:selected').text());

    if(totalOption > 0){
      Venda.Ebiz.select2.refresh('#stateDiv');
    }else{
      Venda.Ebiz.select2.destroy('#statelist');
      $('#statelist').hide();
    }
  }else{
    Venda.Ebiz.select2.destroy('#statelist');
    $('#statelist').hide();
  }

  if (jQuery('.addressform-error').length > 0) {
    jQuery(document).trigger('setCountry-loaded');
  }
};


Venda.CountrySelect.Locality = function (type, setfield, el) {

  switch (type) {

    case 'state':

      switch (setfield) {

        case 'required':
          el.stateInput.rules('remove', 'required');
          el.stateErrorLabel = Venda.Validate.msg.state;
          el.stateInput.rules('add', {
            required: true,
            messages: {
              required: el.stateErrorLabel
            }
          });
          el.stateLabel.text(jQuery('#js-countryselect-state').text() + ' ' + jQuery('#js-countryselect-required').text());
          break;

        case 'optional':
          el.stateInput.rules('remove', 'required');
          el.stateLabel.text(jQuery('#js-countryselect-state').text());
          break;
      }
      break;

    case 'county':

      switch (setfield) {

        case 'required':
          el.stateInput.rules('remove', 'required');
          el.stateErrorLabel = Venda.Validate.msg.county;
          el.stateInput.rules('add', {
            required: true,
            messages: {
              required: el.stateErrorLabel
            }
          });
          el.stateLabel.text(jQuery('#js-countryselect-county').text() + ' ' + jQuery('#js-countryselect-required').text());
          break;

        case 'optional':
          el.stateInput.rules('remove', 'required');
          el.stateLabel.text(jQuery('#js-countryselect-county').text());
          break;
      }
      break;

    case 'province':

      switch (setfield) {

        case 'required':
          el.stateInput.rules('remove', 'required');
          el.stateErrorLabel = Venda.Validate.msg.province;
          el.stateInput.rules('add', {
            required: true,
            messages: {
              required: el.stateErrorLabel
            }
          });
          el.stateLabel.text(jQuery('#js-countryselect-province').text() + ' ' + jQuery('#js-countryselect-required').text());
          break;

        case 'optional':
          el.stateInput.rules('remove', 'required');
          el.stateLabel.text(jQuery('#js-countryselect-province').text());
          break;
      }
      break;

    case 'region':

      switch (setfield) {

        case 'required':
          el.stateInput.rules('remove', 'required');
          el.stateErrorLabel = Venda.Validate.msg.region;
          el.stateInput.rules('add', {
            required: true,
            messages: {
              required: el.stateErrorLabel
            }
          });
          el.stateLabel.text(jQuery('#js-countryselect-region').text() + ' ' + jQuery('#js-countryselect-required').text());
          break;

        case 'optional':
          el.stateInput.rules('remove', 'required');
          el.stateLabel.text(jQuery('#js-countryselect-region').text());
          break;

      }
      break;

    case 'disabled':
      // hide label - all other stuff is disabled in the LocalityInputType below
      el.stateLabel.hide();
      break;
  }
};

Venda.CountrySelect.LocalityInputType = function (type, el) {

  switch (type) {

    case 'text':
      el.stateLabel.show();
      el.stateInput.show();
      el.stateList.hide();
      el.stateList.next('.js-validateError').hide();
      // Remove jquery validate rules
      el.stateList.rules('remove', 'required');
      //resets the state field name - removed when state select is used
      el.stateInput.attr('name', 'state');
      //Hide JS generated dropdown
      el.stateListSelect.next('.js-select').hide();
      //Clear statelist values
      el.stateListSelect.empty();
      break;

    case 'select':
      el.stateLabel.show();
      el.stateInput.hide();
      //removes the state field name so this value isn't submitted
      el.stateInput.attr('name', '');
      el.stateList.show();
      // Remove jquery validate rules
      el.stateInput.rules('remove', 'required');
      el.stateList.rules('add', {
        required: true,
        messages: {
          required: el.stateErrorLabel
        }
      });
      el.stateListSelect.next('.js-select').show();
      el.stateListSelect.empty();
      break;

    case 'disabled':
      // Disable + reset + hide state input
      el.stateInput.val('');
      el.stateInput.rules('remove', 'required');
      el.stateInput.hide();

      //Disable + reset + hide the state select
      el.stateList.hide();
      // Remove jquery validate rules
      el.stateList.rules('remove', 'required');
      //Hide JS generated dropdown
      el.stateListSelect.next('.js-select').hide();
      //Clear statelist values
      el.stateListSelect.empty();
      break;
  }
};

Venda.CountrySelect.postalCode = function (type, setfield, el) {
  switch (type) {

    case 'zipcode':

      switch (setfield) {

        case 'required':
          el.zipInput.rules('add', 'required');
          el.zipLabel.text(jQuery('#js-countryselect-zipc').text() + ' ' + jQuery('#js-countryselect-required').text());
          break;

        case 'optional':
          el.zipInput.rules('remove', 'required');
          el.zipLabel.text(jQuery('#js-countryselect-zipc').text());
          break;
      }
      break;

    case 'postcode':

      switch (setfield) {

        case 'required':
          el.zipInput.rules('add', 'required');
          el.zipLabel.text(jQuery('#js-countryselect-postcode').text() + ' ' + jQuery('#js-countryselect-required').text());
          break;

        case 'optional':
          el.zipInput.rules('remove', 'required');
          el.zipLabel.text(jQuery('#js-countryselect-postcode').text());
          break;
      }
      break;
  }
  el.zipInput.rules('remove', 'ukpostcode');
  el.zipInput.rules('remove', 'findaddress');

  var isDeliveryAddr = (el.countrySelect.parents('form').attr('name')==("addressbookform" || "deliveryaddressaddform" || "deliveryaddresseditform"));
  if(el.countrySelect.val()=='United Kingdom' && isDeliveryAddr) {
    el.zipInput.rules('add', {
      ukpostcode: true,
      messages: {
        ukpostcode: Venda.Validate.msg.invalid_uk_postcode
      }
    });
  }

  el.zipInput.rules('add', {
    findaddress: true,
    messages: {
      findaddress: Venda.Validate.msg.postcode_populate
    }
  });
};

Venda.CountrySelect.addressEntry = function (type, el) {

  switch (type) {

    case 'lookup':
      if (jQuery('#addr1').val() !== '') {
        //edit address or server side error
        Venda.AddressLookup.manualFormReset();
      } else {
        //add address
        Venda.AddressLookup.lookupFormReset();
      }
      break;

    case 'manual':
      Venda.AddressLookup.manualFormReset();
      //reset button not required for manual entry only countries
      jQuery('#js-lookup-reset-btn').hide();
      //set it back
      jQuery('#js-hideOrShowAddress, #zipcDiv').show();
      el.zipInput.rules('remove', 'populatedaddress');

      break;
  }
};

Venda.CountrySelect.numField = function (type, el) {

  switch (type) {

    case 'enabled':
      el.houseNum.show();
      if(el.numInput.attr('data-num')){ el.numInput.val(el.numInput.attr('data-num')); }
      el.numInput.rules('add', 'required');
      break;

    case 'disabled':
      el.numInput.attr('data-num', el.numInput.val()).val('');
      el.numInput.rules('remove', 'required');
      // num field is only used in the UK
      el.houseNum.hide();
      break;
  }
};

Venda.CountrySelect.canUseBillingAddress = function (type, el) {
  switch (type) {

    case 'enabled':
      el.billingAddr.parents('label').show();
      break;

    case 'disabled':
      el.billingAddr.parents('label').hide();
      break;
  }
  if(!$('#usebillingaddress').is(':checked') && !$('#multipledeliveryaddresses').is(':checked') && !$('#deliveryaddressadd').is(':checked')){
    el.deliverTo.find('input[type=radio]:visible').first().prop('checked', true);
  }else{
    if(type === 'disabled' && $('#usebillingaddress').is(':checked')){
      el.deliverTo.find('input[type=radio]:visible').first().prop('checked', true);
    }
  }
};

Venda.CountrySelect.countryMapping = {
  "Aland Islands"                            : {'fr': {order: 2, translate: "Aland Islands"}},
  "Albania"                                  : {'fr': {order: 3, translate: "Albanie"}},
  "Algeria"                                  : {'fr': {order: 4, translate: "Algérie"}},
  "Andorra"                                  : {'fr': {order: 6, translate: "Andorre"}},
  "Anguilla"                                 : {'fr': {order: 7, translate: "Anguilla"}},
  "Antarctica"                               : {'fr': {order: 8, translate: "Antarctique"}},
  "Antigua and Barbuda"                      : {'fr': {order: 9, translate: "Antigua-et-Barbuda"}},
  "Argentina"                                : {'fr': {order: 12, translate: "Argentine"}},
  "Armenia"                                  : {'fr': {order: 13, translate: "Arménie"}},
  "Aruba"                                    : {'fr': {order: 14, translate: "Aruba"}},
  "Australia"                                : {'fr': {order: 15, translate: "Australie"}},
  "Austria"                                  : {'fr': {order: 16, translate: "Autriche"}},
  "Azerbaijan"                               : {'fr': {order: 17, translate: "Azerbaïdjan"}},
  "Bahamas"                                  : {'fr': {order: 18, translate: "Bahamas"}},
  "Bahrain"                                  : {'fr': {order: 19, translate: "Bahreïn"}},
  "Bangladesh"                               : {'fr': {order: 20, translate: "Bangladesh"}},
  "Barbados"                                 : {'fr': {order: 21, translate: "Barbade"}},
  "Belarus"                                  : {'fr': {order: 27, translate: "Biélorussie"}},
  "Belgium"                                  : {'fr': {order: 22, translate: "Belgique"}},
  "Belize"                                   : {'fr': {order: 23, translate: "Belize"}},
  "Benin"                                    : {'fr': {order: 24, translate: "Bénin"}},
  "Bermuda"                                  : {'fr': {order: 25, translate: "Bermudes"}},
  "Bhutan"                                   : {'fr': {order: 26, translate: "Bhoutan"}},
  "Bolivia, Plurinational State of"          : {'fr': {order: 28, translate: "Bolivie, Etat plurinational de"}},
  "Bosnia and Herzegovina"                   : {'fr': {order: 29, translate: "Bosnie Herzégovine"}},
  "Botswana"                                 : {'fr': {order: 30, translate: "Botswana"}},
  "Bouvet Island"                            : {'fr': {order: 89, translate: "Île Bouvet"}},
  "Brazil"                                   : {'fr': {order: 31, translate: "Brésil"}},
  "British Indian Ocean Territory"           : {'fr': {order: 207, translate: "Territoire britannique de l'océan Indien"}},
  "Brunei Darussalam"                        : {'fr': {order: 32, translate: "Brunei Darussalam"}},
  "Bulgaria"                                 : {'fr': {order: 33, translate: "Bulgarie"}},
  "Burkina Faso"                             : {'fr': {order: 35, translate: "Burkina Faso"}},
  "Burundi"                                  : {'fr': {order: 36, translate: "Burundi"}},
  "Cambodia"                                 : {'fr': {order: 37, translate: "Cambodge"}},
  "Cameroon"                                 : {'fr': {order: 38, translate: "Cameroun"}},
  "Canada"                                   : {'fr': {order: 39, translate: "Canada"}},
  "Cape Verde"                               : {'fr': {order: 40, translate: "Cap-Vert"}},
  "Cayman Islands"                           : {'fr': {order: 92, translate: "Îles Caïmans"}},
  "Chad"                                     : {'fr': {order: 205, translate: "Tchad"}},
  "Chile"                                    : {'fr': {order: 41, translate: "Chili"}},
  "China"                                    : {'fr': {order: 42, translate: "Chine"}},
  "Christmas Island"                         : {'fr': {order: 43, translate: "Christmas Island"}},
  "Cocos (Keeling) Islands"                  : {'fr': {order: 45, translate: "Cocos (Keeling)"}},
  "Colombia"                                 : {'fr': {order: 46, translate: "Colombie"}},
  "Comoros"                                  : {'fr': {order: 47, translate: "Comores"}},
  "Congo"                                    : {'fr': {order: 48, translate: "Congo"}},
  "Congo, the Democratic Republic of the"    : {'fr': {order: 49, translate: "Congo, la République démocratique du"}},
  "Cook Islands"                             : {'fr': {order: 93, translate: "Iles Cook"}},
  "Costa Rica"                               : {'fr': {order: 51, translate: "Costa Rica"}},
  "Croatia"                                  : {'fr': {order: 52, translate: "Croatie"}},
  "Cyprus"                                   : {'fr': {order: 44, translate: "Chypre"}},
  "Czech Republic"                           : {'fr': {order: 173, translate: "République Tchèque"}},
  "Denmark"                                  : {'fr': {order: 53, translate: "Danemark"}},
  "Djibouti"                                 : {'fr': {order: 55, translate: "Djibouti"}},
  "Dominica"                                 : {'fr': {order: 56, translate: "Dominique"}},
  "Dominican Republic"                       : {'fr': {order: 172, translate: "République Dominicaine"}},
  "Ecuador"                                  : {'fr': {order: 59, translate: "Equateur"}},
  "Egypt"                                    : {'fr': {order: 57, translate: "Egypte"}},
  "El Salvador"                              : {'fr': {order: 118, translate: "Le Salvador"}},
  "Equatorial Guinea"                        : {'fr': {order: 81, translate: "Guinée Equatoriale"}},
  "Eritrea"                                  : {'fr': {order: 60, translate: "Érythrée"}},
  "Estonia"                                  : {'fr': {order: 62, translate: "Estonie"}},
  "Ethiopia"                                 : {'fr': {order: 64, translate: "Ethiopie"}},
  "Falkland Islands (Malvinas)"               : {'fr': {order: 94, translate: "Îles Falkland (Malvinas)"}},
  "Faroe Islands"                            : {'fr': {order: 95, translate: "Îles Féroé"}},
  "Fiji"                                     : {'fr': {order: 66, translate: "Fidji"}},
  "Finland"                                  : {'fr': {order: 67, translate: "Finlande"}},
  "France"                                   : {'fr': {order: 68, translate: "France"}},
  "French Guiana"                            : {'fr': {order: 84, translate: "Guyane française"}},
  "French Polynesia"                         : {'fr': {order: 168, translate: "Polynésie française"}},
  "French Southern Territories"              : {'fr': {order: 206, translate: "Terres australes françaises"}},
  "Gabon"                                    : {'fr': {order: 69, translate: "Gabon"}},
  "Gambia"                                   : {'fr': {order: 70, translate: "Gambie"}},
  "Georgia"                                  : {'fr': {order: 71, translate: "Géorgie"}},
  "Germany"                                  : {'fr': {order: 5, translate: "Allemagne"}},
  "Gibraltar"                                : {'fr': {order: 73, translate: "Gibraltar"}},
  "Greece"                                   : {'fr': {order: 74, translate: "Grèce"}},
  "Greenland"                                : {'fr': {order: 76, translate: "Groenland"}},
  "Grenada"                                  : {'fr': {order: 75, translate: "Grenade"}},
  "Guadeloupe"                               : {'fr': {order: 77, translate: "Guadeloupe"}},
  "Guatemala"                                : {'fr': {order: 78, translate: "Guatemala"}},
  "Guernsey"                                 : {'fr': {order: 79, translate: "Guernesey"}},
  "Guinea"                                   : {'fr': {order: 80, translate: "Guinée"}},
  "Guinea-Bissau"                            : {'fr': {order: 82, translate: "Guinée-Bissau"}},
  "Guyana"                                   : {'fr': {order: 83, translate: "Guyane"}},
  "Haiti"                                    : {'fr': {order: 85, translate: "Haïti"}},
  "Heard Island and Mcdonald Islands"        : {'fr': {order: 90, translate: "Île îles Heard et McDonald"}},
  "Holy See (Vatican City State)"             : {'fr': {order: 185, translate: "Saint-Siège (Cité du Vatican)"}},
  "Honduras"                                 : {'fr': {order: 86, translate: "Honduras"}},
  "Hong Kong"                                : {'fr': {order: 87, translate: "Hong Kong"}},
  "Hungary"                                  : {'fr': {order: 88, translate: "Hongrie"}},
  "Iceland"                                  : {'fr': {order: 105, translate: "Islande"}},
  "India"                                    : {'fr': {order: 102, translate: "Inde"}},
  "Indonesia"                                : {'fr': {order: 103, translate: "Indonésie"}},
  "Ireland"                                  : {'fr': {order: 104, translate: "Irlande"}},
  "Isle of Man"                              : {'fr': {order: 106, translate: "Isle of Man"}},
  "Israel"                                   : {'fr': {order: 107, translate: "Israël"}},
  "Italy"                                    : {'fr': {order: 108, translate: "Italie"}},
  "Jamaica"                                  : {'fr': {order: 109, translate: "Jamaïque"}},
  "Japan"                                    : {'fr': {order: 110, translate: "Japon"}},
  "Jersey"                                   : {'fr': {order: 111, translate: "Jersey"}},
  "Jordan"                                   : {'fr': {order: 112, translate: "Jordanie"}},
  "Kazakhstan"                               : {'fr': {order: 113, translate: "Kazakhstan"}},
  "Kenya"                                    : {'fr': {order: 114, translate: "Kenya"}},
  "Kiribati"                                 : {'fr': {order: 116, translate: "Kiribati"}},
  "Korea, Republic of"                       : {'fr': {order: 50, translate: "Corée, République de"}},
  "Kuwait"                                   : {'fr': {order: 117, translate: "Koweit"}},
  "Kyrgyzstan"                               : {'fr': {order: 115, translate: "Kirghizstan"}},
  "Lao People's Democratic Republic"         : {'fr': {order: 171, translate: "République démocratique populaire lao"}},
  "Latvia"                                   : {'fr': {order: 120, translate: "Lettonie"}},
  "Lebanon"                                  : {'fr': {order: 121, translate: "Liban"}},
  "Lesotho"                                  : {'fr': {order: 119, translate: "Lesotho"}},
  "Liechtenstein"                            : {'fr': {order: 122, translate: "Liechtenstein"}},
  "Lithuania"                                : {'fr': {order: 123, translate: "Lituanie"}},
  "Luxembourg"                               : {'fr': {order: 124, translate: "Luxembourg"}},
  "Macao"                                    : {'fr': {order: 125, translate: "Macao"}},
  "Macedonia"                                : {'fr': {order: 126, translate: "Macédoine"}},
  "Madagascar"                               : {'fr': {order: 127, translate: "Madagascar"}},
  "Malawi"                                   : {'fr': {order: 129, translate: "Malawi"}},
  "Malaysia"                                 : {'fr': {order: 128, translate: "Malaisie"}},
  "Maldives"                                 : {'fr': {order: 130, translate: "Maldives"}},
  "Mali"                                     : {'fr': {order: 131, translate: "Mali"}},
  "Malta"                                    : {'fr': {order: 132, translate: "Malte"}},
  "Marshall Islands"                         : {'fr': {order: 97, translate: "Iles Marshall"}},
  "Martinique"                               : {'fr': {order: 134, translate: "Martinique"}},
  "Mauritania"                               : {'fr': {order: 135, translate: "Mauritanie"}},
  "Mauritius"                                : {'fr': {order: 91, translate: "Ile Maurice"}},
  "Mayotte"                                  : {'fr': {order: 136, translate: "Mayotte"}},
  "Mexico"                                   : {'fr': {order: 137, translate: "Mexique"}},
  "Micronesia, Federated States of"          : {'fr': {order: 138, translate: "Micronésie, États fédérés de"}},
  "Moldova, Republic of"                     : {'fr': {order: 139, translate: "Moldova, République de"}},
  "Monaco"                                   : {'fr': {order: 140, translate: "Monaco"}},
  "Mongolia"                                 : {'fr': {order: 141, translate: "Mongolie"}},
  "Montenegro"                               : {'fr': {order: 142, translate: "Monténégro"}},
  "Montserrat"                               : {'fr': {order: 143, translate: "Montserrat"}},
  "Morocco"                                  : {'fr': {order: 133, translate: "Maroc"}},
  "Mozambique"                               : {'fr': {order: 144, translate: "Mozambique"}},
  "Namibia"                                  : {'fr': {order: 145, translate: "Namibie"}},
  "Nauru"                                    : {'fr': {order: 146, translate: "Nauru"}},
  "Nepal"                                    : {'fr': {order: 147, translate: "Népal"}},
  "Netherlands Antilles"                     : {'fr': {order: 10, translate: "Antilles néerlandaises"}},
  "Netherlands"                          : {'fr': {order: 163, translate: "Pays-Bas"}},
  "New Caledonia"                            : {'fr': {order: 154, translate: "Nouvelle-Calédonie"}},
  "New Zealand"                              : {'fr': {order: 153, translate: "Nouvelle Zélande"}},
  "Newsletter"                               : {'fr': {order: 34, translate: "Bulletin"}},
  "Nicaragua"                                : {'fr': {order: 148, translate: "Nicaragua"}},
  "Niger"                                    : {'fr': {order: 149, translate: "Niger"}},
  "Niue"                                     : {'fr': {order: 150, translate: "Niue"}},
  "Norfolk Island"                           : {'fr': {order: 151, translate: "Norfolk Island"}},
  "Northern Mariana Islands"                 : {'fr': {order: 96, translate: "Îles Mariannes du Nord"}},
  "Norway"                                   : {'fr': {order: 152, translate: "Norvège"}},
  "Oman"                                     : {'fr': {order: 155, translate: "Oman"}},
  "Pakistan"                                 : {'fr': {order: 158, translate: "Pakistan"}},
  "Palau"                                    : {'fr': {order: 159, translate: "Palau"}},
  "Palestinian Territory, Occupied"          : {'fr': {order: 208, translate: "Territoires palestiniens"}},
  "Panama"                                   : {'fr': {order: 160, translate: "Panama"}},
  "Papua New Guinea"                         : {'fr': {order: 161, translate: "Papouasie Nouvelle Guinée"}},
  "Paraguay"                                 : {'fr': {order: 162, translate: "Paraguay"}},
  "Peru"                                     : {'fr': {order: 164, translate: "Pérou"}},
  "Philippines"                              : {'fr': {order: 165, translate: "Philippines"}},
  "Pitcairn"                                 : {'fr': {order: 166, translate: "Pitcairn"}},
  "Poland"                                   : {'fr': {order: 167, translate: "Pologne"}},
  "Portugal"                                 : {'fr': {order: 169, translate: "Portugal"}},
  "Qatar"                                    : {'fr': {order: 170, translate: "Qatar"}},
  "Reunion"                                  : {'fr': {order: 174, translate: "Réunion"}},
  "Romania"                                  : {'fr': {order: 175, translate: "Roumanie"}},
  "Russian Federation"                       : {'fr': {order: 65, translate: "Fédération Russe"}},
  "Rwanda"                                   : {'fr': {order: 177, translate: "Rwanda"}},
  "Saint Barthelemy"                         : {'fr': {order: 179, translate: "Saint Barthelemy"}},
  "Saint Helena"                             : {'fr': {order: 180, translate: "Saint Helena"}},
  "Saint Kitts and Nevis"                    : {'fr': {order: 183, translate: "Saint-Kitts-et-Nevis"}},
  "Saint Lucia"                              : {'fr': {order: 182, translate: "Sainte-Lucie"}},
  "Saint Martin (French Part)"                : {'fr': {order: 181, translate: "Saint Martin (partie française)"}},
  "Saint Pierre and Miquelon"                : {'fr': {order: 184, translate: "Saint-Pierre-et-Miquelon"}},
  "Saint Vincent and the Grenadines"         : {'fr': {order: 186, translate: "Saint-Vincent-et-les Grenadines"}},
  "Samoa"                                    : {'fr': {order: 187, translate: "Samoa"}},
  "San Marino"                               : {'fr': {order: 188, translate: "San Marino"}},
  "Sao Tome and Principe"                    : {'fr': {order: 189, translate: "Sao Tomé et Principe"}},
  "Saudi Arabia"                             : {'fr': {order: 11, translate: "Arabie Saoudite"}},
  "Senegal"                                  : {'fr': {order: 190, translate: "Sénégal"}},
  "Serbia"                                   : {'fr': {order: 191, translate: "Serbie"}},
  "Seychelles"                               : {'fr': {order: 192, translate: "Seychelles"}},
  "Singapore"                                : {'fr': {order: 193, translate: "Singapour"}},
  "Slovakia"                                 : {'fr': {order: 194, translate: "Slovaquie"}},
  "Slovenia"                                 : {'fr': {order: 195, translate: "Slovénie"}},
  "Solomon Islands"                          : {'fr': {order: 99, translate: "Iles Salomon"}},
  "South Africa"                             : {'fr': {order: 1, translate: "Afrique Du Sud"}},
  "South Georgia and South Sandwich Islands" : {'fr': {order: 72, translate: "Géorgie du Sud et îles Sandwich du Sud"}},
  "Spain"                                    : {'fr': {order: 61, translate: "Espagne"}},
  "Sri Lanka"                                : {'fr': {order: 196, translate: "Sri Lanka"}},
  "Suriname"                                 : {'fr': {order: 199, translate: "Suriname"}},
  "Svalbard and Jan Mayen Islands"           : {'fr': {order: 200, translate: "Svalbard et Jan Mayen"}},
  "Swaziland"                                : {'fr': {order: 201, translate: "Swaziland"}},
  "Sweden"                                   : {'fr': {order: 197, translate: "Suède"}},
  "Switzerland"                              : {'fr': {order: 198, translate: "Suisse"}},
  "Taiwan, Province of China"                : {'fr': {order: 203, translate: "Taiwan, province de Chine"}},
  "Taiwan"                : {'fr': {order: 203, translate: "Taiwan"}},
  "Tajikistan"                               : {'fr': {order: 202, translate: "Tadjikistan"}},
  "Tanzania, United Republic of"             : {'fr': {order: 204, translate: "Tanzanie, République-Unie de"}},
  "Thailand"                                 : {'fr': {order: 209, translate: "Thaïlande"}},
  "Timor-Leste"                              : {'fr': {order: 210, translate: "Timor-Leste"}},
  "Togo"                                     : {'fr': {order: 211, translate: "Togo"}},
  "Tokelau"                                  : {'fr': {order: 212, translate: "Tokélaou"}},
  "Tonga"                                    : {'fr': {order: 213, translate: "Tonga"}},
  "Trinidad and Tobago"                      : {'fr': {order: 214, translate: "Trinité-et-Tobago"}},
  "Tunisia"                                  : {'fr': {order: 215, translate: "Tunisie"}},
  "Turkey"                                   : {'fr': {order: 54, translate: "Dinde"}},
  "Turkmenistan"                             : {'fr': {order: 216, translate: "Turkménistan"}},
  "Turks and Caicos Islands"                 : {'fr': {order: 100, translate: "Îles Turques et Caïques"}},
  "Tuvalu"                                   : {'fr': {order: 217, translate: "Tuvalu"}},
  "Uganda"                                   : {'fr': {order: 156, translate: "Ouganda"}},
  "Ukraine"                                  : {'fr': {order: 218, translate: "Ukraine"}},
  "United Arab Emirates"                     : {'fr': {order: 58, translate: "Emirats Arabes Unis"}},
  "United Kingdom"                           : {'fr': {order: 176, translate: "Royaume-Uni"}},
  "United States Minor Outlying Islands"     : {'fr': {order: 98, translate: "Îles mineures éloignées des États-Unis"}},
  "United States"                            : {'fr': {order: 63, translate: "États Unis"}},
  "Uruguay"                                  : {'fr': {order: 219, translate: "Uruguay"}},
  "Uzbekistan"                               : {'fr': {order: 157, translate: "Ouzbékistan"}},
  "Vanuatu"                                  : {'fr': {order: 220, translate: "Vanuatu"}},
  "Venezuela, Bolivarian Republic of"        : {'fr': {order: 221, translate: "Venezuela, République bolivarienne du"}},
  "Viet Nam"                                 : {'fr': {order: 222, translate: "Viêt Nam"}},
  "Virgin Islands, British"                  : {'fr': {order: 101, translate: "Îles Vierges britanniques,"}},
  "Wallis and Futuna"                        : {'fr': {order: 223, translate: "Wallis et Futuna"}},
  "Western Sahara"                           : {'fr': {order: 178, translate: "Sahara Occidental"}},
  "Yemen"                                    : {'fr': {order: 224, translate: "Yémen"}},
  "Zambia"                                   : {'fr': {order: 225, translate: "Zambie"}},
  "Zimbabwe"                                 : {'fr': {order: 226, translate: "Zimbabwe"}}
};


