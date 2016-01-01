(function () {
  $(function () {
    $("#purchase").on("click", attemptCharge);
  });

  function attemptCharge (e) {
    e.preventDefault();
    
    if ( !allFieldsValid() ) {
      return error({
        error: { message: "Some required information is missing!" }
      });
    };

    Stripe.setPublishableKey('pk_test_QApuWo9uNiwZmfSDgt9BkdX5');

    Stripe.card.createToken({
      number: $('.cc-number').val(),
      cvc: $('.cc-cvc').val(),
      exp_month: $('.cc-mm').val(),
      exp_year: $('.cc-yy').val()
    }, function (status, response) {
      if ( status === 200 ) { success() }
      else { error(response) };
    });
  };

  function success () {
    $(".shipping input, .billing input, .shipping select, .billing select").val('');
    $(".cc-message").empty().append("<p class='message-success'>Thank you for your purchase!</p>");
    
    displayMessage();
  };

  function error (response) {
    var errorMessage = "<p class='message-warning'>" + response.error.message + "</p>";
    $(".cc-message").empty().append(errorMessage);
    
    displayMessage();
  };

  function displayMessage () {
    var $message = $(".cc-message p");
    $message.slideDown();
    
    setTimeout(function () {
      $message.slideUp();
    }, 5000);
  };
})();