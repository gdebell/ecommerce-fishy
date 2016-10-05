(function () {
  $(function () {
    initSubMenus();
  });

  function initSubMenus () {
    var $subMenus = $('.sub-menu');

    for ( var i = 0; i < $subMenus.length; i++ ) {
      var $li = $($subMenus[i]).parent();

      $li.on('click', function () {
        var $submenu = $(this).find('.sub-menu');

        if ( $submenu.is(":visible") ) { clearMenuSelection() } 
        else {
          clearMenuSelection();
          $submenu.fadeToggle( 300 );
          $(this).find('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
        };
      });
    };
  };

  function clearMenuSelection () {
    $('.sub-menu').fadeOut( 300 );
    $('nav i').removeClass('fa-chevron-up').addClass('fa-chevron-down'); 
  };
})();