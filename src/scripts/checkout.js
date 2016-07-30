$(document).on('ready', function() {
  console.log('GO TEAM - Checkout');
  nameCityAddressValidation();

  stateValidations();

  // stateValidate('.dropDownS', '.stateShipping');

  zipValidate('.zipS','.zipShipping');

  // stateValidate('.dropDownB', '.stateBilling')
  // validate zip for Billing
  zipValidate('.zipB', '.zipBilling')
  // card validators
  cardValidate('.cardNum', '.cardNumber');
  CVCvalidate('.CVCnum','.CVCNumber');
  expValidate('.expiration','.expirationDate');
  //copy shipping info into billing
  copyShipping();
  submitValidation();


});



/*
=====================
HELPER FUNCTIONS
=====================
*/

function textValidate(input, divClass) {
  $(input).on('blur input', function() {
    if ($(this).val().length < 3) {
      $(divClass).addClass('has-error');
      $(divClass).removeClass('has-success');
    } else {
      $(divClass).addClass('has-success');
      $(divClass).removeClass('has-error');
    }

  });
}

function stateValidate(input, divClass) {
  $(input).on('blur change', function() {
    if (this.value === "no_state") {
      $(divClass).addClass('has-error');
      $(divClass).removeClass('has-success');
    }
    else {
      $(divClass).addClass('has-success');
      $(divClass).removeClass('has-error');
    }
  });
}

function zipValidate(input, divClass) {
  $(input).on('blur keydown', function() {
    if ($(this).val().length < 4 || $(this).val().length > 9) {
      $(divClass).addClass('has-error');
      $(divClass).removeClass('has-success');
    }
    else {
      $(divClass).addClass('has-success');
      $(divClass).removeClass('has-error');

    }
  });
}

function cardValidate(input, divClass) {
  $(input).on('blur keydown', function() {
    if (Stripe.card.validateCardNumber($(input).val()) === true) {
      $(divClass).addClass('has-success');
      $(divClass).removeClass('has-error');
    }
    else {
      $(divClass).addClass('has-error');
      $(divClass).removeClass('has-success');
    }
  });
}

function CVCvalidate(input, divClass) {
  $(input).on('blur input', function () {
    if (Stripe.card.validateCVC($(input).val()) === true) {
      $(divClass).addClass('has-success');
      $(divClass).removeClass('has-error');
    }
    else {
      $(divClass).addClass('has-error');
      $(divClass).removeClass('has-success');
    }
  });
}

function expValidate(input, divClass) {
  $(input).on('blur input', function () {
    console.log($(input).val().split())
    if (Stripe.card.validateExpiry($(input).val()) === true) {
      $(divClass).addClass('has-success');
      $(divClass).removeClass('has-error');
    }
    else {
      $(divClass).addClass('has-error');
      $(divClass).removeClass('has-success');
    }
  });
}

function copyShipping() {
  $('.sameAs').change( function() {
    if($(this).is(':checked')) {
      console.log('checkbox')
      $('.firstNameB').val($('.firstNameS').val());
      $('.lastNameB').val($('.lastNameS').val());
      $('.addressB').val($('.addressS').val());
      $('.cityB').val($('.cityS').val());
      $('.dropDownB').val($('.dropDownS').val());
      $('.zipB').val($('.zipS').val());

    }
  });
}
function nameCityAddressValidation () {
  textValidate('.firstNameS','.firstNameShipping');
  textValidate('.lastNameS','.lastNameShipping');
  textValidate('.addressS','.addressShipping');
  textValidate('.cityS', '.cityShipping');
  textValidate('.firstNameB','.firstNameBilling');
  textValidate('.lastNameB','.lastNameBilling');
  textValidate('.addressB','.addressBilling');
  textValidate('.cityB', '.cityBilling');
};

function stateValidations() {
  stateValidate('.dropDownS', '.stateShipping');
  stateValidate('.dropDownB', '.stateBilling')
};

//$('billingClass').val($('shippingClass').val())
function submitValidation (){
  $('form').on('submit', function(event) {
    console.log()
    event.preventDefault();

    if ($('div').hasClass('has-error') === true || $('.required.has-error').length === 0) {
      var errorMessage = "Oops, looks like you messed up. Try again."
      shakeInput('.has-error');
      $(".save-status").empty().append('<p class="alert alert-dismissible alert-danger">' + errorMessage + '</p>');
      $(".save-status").fadeIn(500).delay(2000).fadeOut(500);
      }
    else {
      var SuccessMessage = "You can fill out forms. Great Job!"
      $(".save-status").empty().append('<p class="alert alert-dismissible alert-success">' + SuccessMessage + '</p>');
      $(".save-status").fadeIn(500).delay(2000).fadeOut(500);
      }
  });
}

function shakeInput(divId) {
      $(divId).animate({
          "margin-left": "75px"
      }, 50);
      $(divId).animate({
          "margin-left": "-75px"
      }, 50);
      $(divId).animate({
          "margin-left": "0px"
      }, 50);

  };
