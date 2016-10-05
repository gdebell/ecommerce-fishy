$(document).on('ready', function() {
  console.log('GO TEAM - Header');

  // clean up jquery and genericon classes in css

  $('.dropdown-toggle').on('click', function() {
    $('.dropdown-menu').toggleClass('block');
    $('header .genericon:not(.genericon-menu)').toggleClass('genericon-uparrow');
  });





  $('#menuToggle').on('click', function() {
    $(this).toggleClass('toggled');
    $('header ul:not(.dropdown-menu)').slideToggle('block');
  });
});
