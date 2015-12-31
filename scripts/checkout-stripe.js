(function () {
  $(function () {
    $("#purchase").on("click", attemptCharge);
  });

  function attemptCharge (e) {
    e.preventDefault();
    
    if ( !allFieldsValid() ) {
      return error({
        error: { message: "Please check your shipping and billing information" }
      });
    };

    Stripe.setPublishableKey('pk_test_QApuWo9uNiwZmfSDgt9BkdX5');

    Stripe.card.createToken({
      number: $('.cc-number').val(),
      cvc: $('.cc-cvc').val(),
      exp_month: $('.cc-mm').val(),
      exp_year: "20" + $('.cc-yy').val()
    }, function (status, response) {
      if ( status === 200 ) { success() }
      else { error(response) };
    });
  };

  function success () {
    $(".shipping input, .billing input, .shipping select, .billing select").val('');
    $(".cc-message").empty().append("<p class='success'>Thank you for your purchase!</p>");
    displayMessage();
  };

  function error (response) {
    var errorMessage = "<p class='success'>" + response.error.message + "</p>";
    $(".cc-message").empty().append(errorMessage);
    displayMessage();
  };

  function displayMessage () {
    var $message = $(".cc-message p");
    $message.slideDown();
    
    setTimeout(function () {
      $message.slideUp();
    }, 3000);
  };
})();