(function () {
  $(function () {
    setSlideInterval();

    $("#next").on('click', changeImage(true));
    $("#prev").on('click', changeImage(false));
  });

  function changeImage (forward) {
    return function () {
      $("#next, #prev").prop("disabled", true);
      
      var $active = $('.carousel li.active');
      var $next = ( forward ) ? $active.next() : $active.prev();

      if ( !$next.length ) {
        $next = ( forward ) ? $('.carousel li').first() : $('.carousel li').last();
      };

      toggleImageFade($active);
      toggleImageFade($next);
    };
  };

  function toggleImageFade ($element) {
    var opacity = ( +$element.css("opacity") ) ? 0 : 1;
    $element.animate({ opacity: opacity },
                     { duration: 500, 
                       complete: function () {
                        $element.toggleClass('active');
                        
                        setSlideInterval();
                        $("#next, #prev").prop("disabled", false);
                      }
                     });
  };

  function setSlideInterval () {
    clearInterval(window.slideTimer);
    window.slideTimer = setInterval(changeImage(true), 10000);
  };
})();