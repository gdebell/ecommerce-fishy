window.allFieldsValid = (function () {
  $(function () {
    $(".required-presence").on("keyup focus", checkPresence);
    $(".required-state").on("click change", checkPresence);
    $(".required-zip").on("keyup focus", checkZip);
    $(".copy input[type='checkbox']").on("change", copyShippingToBilling);
  });

  function checkPresence () {
    if ( !$(this).val() ) { $(this).addClass("warning") }
    else { $(this).removeClass("warning") };
  };

  function checkZip () {
    var zip    = $(this).val().replace("-","");
    var parsed = parseInt(zip).toString();

    if ( parsed.length === 5 ) { $(this).removeClass("warning") }
    else if ( parsed.length > 5 ) { 
      var main      = parsed.substring(0,5);
      var extra     = parsed.substring(5);
      var formatted = main + "-" + extra;
      
      $(this).val(formatted);
    } else { $(this).addClass("warning") };
  };

  function copyShippingToBilling () {
    if ( !$(this).is(":checked") ) { $(".billing input, .billing select").val('') }
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
