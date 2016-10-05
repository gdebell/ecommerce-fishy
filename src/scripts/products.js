$.ajax ({

  url:'http://galvanize-student-apis.herokuapp.com/gcommerce/products',

  method: 'GET'
}).done (function(dataFromSite) {

  buildArticles(dataFromSite)

    $('#2').val(1);
    $('#3').val(3);
    $('#4').val(3);
    $('#5').val(1);
    $('#6').val(1);
    $('#7').val(3);
    $('#8').val(1);
    $('#9').val(2);
    $('#10').val(3);
    $('#11').val(1);
    $('#12').val(2);
    $('#13').val(2);
    $('#14').val(2);

    $('#resetButtonProduct').click(function() {
        $('.col-md-4').css('display', "block");
    })

    $('#select1').change(function(e) {
      var titleSelect1 = $('#select1').val();

      $('.col-md-4').css('display', 'none');

      for (var i = 2; i < 15; i++) {
        if (($('#'+i).val()) == (titleSelect1 ))  {
          console.log("test");
          $('#'+i).css('display', 'block');
        }
      }
    })

  $('#select2').change(function(e) {
    var titleSelect2 = $('#select2').val();
    var titleSelect2Num = parseInt(titleSelect2);
    console.log(typeof titleSelect2Num);

    dataFromSite.forEach(function(el) {

      if (parseFloat(Math.round(el.price.replace('$', ''))) < titleSelect2Num) {
          // for(var j=2; j< 15; j++) {
            $('#'+el.id).css('display', 'block')
          // }
      } else {
            $('#'+el.id).css('display', 'none')
      }
    })
  })
})

var arrProductName = ["x", "Lion Fish", "Turtle", "Shark Fish", "Fish   Bowl Fish", "Silver Fish", "Lobster", "Gold Fish", "Slim Fish",  "Whale", "Clown Fish", "Guppy Fish", "Orange Fish", "Sucker Fish"];

function buildArticles (arr) {
  for (var i=1; i < arr.length; i++) {
    var productWrapper = $('<div class="col-md-4" id="'+[i+1]+'"></div>');
    productWrapper.append('<img src="./src/images/fish' + [i] + '.jpg"  style="width:100%;"/><h3>' + arrProductName[i] + '</h3><h4>Price: '   + arr[i].price + '</h4><p>'+ arr[i].description + '</p>');
    productWrapper.css("margin-bottom", "50px");
    $("#productRow").append(productWrapper);
  }
}
