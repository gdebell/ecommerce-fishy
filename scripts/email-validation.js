(function () {
  $(function () {
    $("#email-signup").on('keyup focus', validateEmail);
    $("#email-signup-button").on('click', signup);
  });

  function validateEmail () {
    var email = $(this).val();
    var regex = new RegExp(/^[A-Za-z0-9.+]+@[A-Za-z0-9.+]+\.[a-z]{2,}/g);

    if ( !regex.exec(email) ) { $(this).addClass('warning') }
    else { $(this).removeClass('warning') };
  };

  function signup () {
    var $input = $("#email-signup");
    if ( $input.hasClass('warning') ) { shake($input) }
    else {
      $input.val('');
      $(".success").fadeIn( 300 );
      setTimeout(function () {
        $(".success").fadeOut( 300 );
      }, 1500);
    };
  };

  function shake ($element) {
    $element.animate({ left: '10px' }, 50).
             animate({ left: '-10px' }, 50).
             animate({ left: '10px' }, 50).
             animate({ left: '-10px' }, 50).
             animate({ left: '10px' }, 50);
  };
})();