$(function () {
  $(".sorter ul li a").on('click', sortBy);
  resetMargins();
});

function sortBy (e) {
  $(".sorter a").removeClass("active");
  $(this).addClass("active");

  e.preventDefault();
  $(".product").removeClass("hidden");

  if ( $(this).data('category') ) { sortByCategory(this) }
  else if ( $(this).data('price') ) { sortByPrice(this) }
  else { console.log('Something went wrong...') };
};

function sortByCategory (element) {
  var selector       = $(element).data("category");
  var jQuerySelector = ".product:not(." + selector + ")";
  
  if ( selector != "all" ) {
    $(jQuerySelector).each(function () {
      $(this).addClass('hidden');
    });
  };

  resetMargins();
};

function sortByPrice (element) {
  var selector = $(element).data("price");
  
  if ( selector != "all" ) {
    $(".product:not(.hidden) h6 span").map(function () {
      if ( selector === "above" && (+$(this).html() < 100)) {
        $(this).parents(".product").addClass("hidden");
      } else if ( (+$(this).html() < (+selector - 25)) || (+$(this).html() > +selector) ) {
        $(this).parents(".product").addClass("hidden");
      };
    });
  }

  resetMargins();
};

function resetMargins () {
  var $products = $(".product-listing .product:not(.hidden)");
  $products.css({ "margin-left": "" });

  for ( var i = 0; i < $products.length; i+=3 ) {
    var product = $products[i];
    $(product).css({ 'margin-left': '0' });
  };
};