window.allFieldsValid = (function () {
  $(function () {
    $(".required-presence").on("keyup focus", checkPresence);
    $(".required-state, .cc-mm, .cc-yy").on("click change", checkPresence);
    $(".required-zip").on("keyup focus", checkZip);
    $(".cc-number").on("keyup", checkCardNumber);
    $(".cc-number").on("blur", formatCardNumber);
    $(".copy input[type='checkbox']").on("change", copyShippingToBilling);
  });

  function checkPresence () {
    if ( !$(this).val() ) { $(this).addClass("warning") }
    else { $(this).removeClass("warning") };
  };

  function checkZip () {
    var zip = $(this).val().replace(/[^0-9]/g,"");

    if ( zip.length === 5 ) { $(this).removeClass("warning") }
    else if ( zip.length > 5 ) { 
      var formatted = formatZip(zip);
      $(this).val(formatted);
    } else { $(this).addClass("warning") };
  };

  function formatZip (zip) {
    var main  = zip.substring(0,5);
    var extra = zip.substring(5);
    
    return main + "-" + extra;
  };

  function checkCardNumber () {
    var number = $(this).val().replace(/[^0-9]/g,"");
    
    ( number.length !== 16 ) ? $(this).addClass("warning") : $(this).removeClass("warning");
  };

  function formatCardNumber () {
    var number = $(this).val().replace(/[^0-9]/g,"");
    var separated = number.replace(/(.{4})/g, "$1 ");
    
    $(this).val(separated);
  };

  function copyShippingToBilling () {
    if ( !$(this).is(":checked") ) { $(".billing .buyer-details input, \
                                        .billing .buyer-details select, \
                                        .billing .address-details input, \
                                        .billing .address-details select").val('') }
    else {
      $(".shipping input, .shipping select").each(function () {
        var shippingVal     = $(this).val();
        var inputType       = $(this).prop("tagName").toLowerCase();
        var billingSelector = ".billing " + inputType + "[name='" + $(this).attr('name') + "']";
        var $billingInput   = $(billingSelector);
        
        $billingInput.val(shippingVal);
      });

      allFieldsValid();
    };
  };

  function allFieldsValid () {
    $(".billing input.required, .shipping input.required, .billing select.required, .shipping select.required").each(checkPresence);
    $(".billing .required-zip, .shipping .required-zip").each(checkZip);
    return !$(".warning").length;
  };

  return allFieldsValid;
})();
