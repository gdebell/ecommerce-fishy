(function () {
  $(function () {
    $('.product-img').hover(function () {
      $(this).find('.overlay').fadeToggle( 300 );
    });
  });
})();