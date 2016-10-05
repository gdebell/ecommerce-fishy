  var carouselArray = ['src/images/fish2 650x300.jpg', 'src/images/fish3 650x300.jpg', 'src/images/fish5-650x300.jpg'];
  var timerReset = 6000;
  var shoppingCartCount = 0;

  $(document).on('ready', function() {
      carouselRotate()
      addToCart('#shoppingCart1 img', '#product1')
      addToCart('#shoppingCart2 img', '#product2')
      addToCart('#shoppingCart3 img', '#product3')
      console.log('ready');

      $('#rightButton').on('click', function(event) {
          event.preventDefault();
          var i = carouselArray.indexOf($('#photoContainer img').attr('src'));
          console.log('before');
          if (i === (carouselArray.length - 1)) {
              i = 0;
          } else {
              i++
          }
          $('#photoContainer img').attr('src', carouselArray[i]);
      })
      $('#leftButton').on('click', function(event) {
          event.preventDefault();
          console.log($('#photoContainer img').attr('src'));
          var j = carouselArray.indexOf($('#photoContainer img').attr('src'));
          console.log("array count =" + j);
          console.log(carouselArray.length);
          if (j === 0) {
              j = (carouselArray.length - 1);
              timerReset = 3000;
          } else {
              j--
              timerReset = 3000;
          }
          $('#photoContainer img').attr('src', carouselArray[j])
      })

      $('#inputEmail').on('input', function(event) {
          event.preventDefault();
          var emailStatus = validateEmail($('#inputEmail').val());

          if ((emailStatus) === true) {
              console.log("validEmail");
              $('#emailFormGroup .form-control:focus').css("border-color", "#00cc00");
              $('#emailFormGroup .form-control:focus').css("box-shadow", "inset 0 10px 10px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 204, 0, 1)");
          }
          else if ((emailStatus) === false) {
            console.log("invalidEmail");
            $('#emailFormGroup .form-control:focus').css("border-color", "#FF0000");
            $('#emailFormGroup .form-control:focus').css("box-shadow", "inset 0 10px 10px rgba(0, 0, 0, 0.075), 0 0 8px rgba(255, 0, 0, 0.6)");
          }
      })
      $('#submitButton').click(function(event) {
          event.preventDefault();
          var emailStatus = validateEmail($('#inputEmail').val());
          if ((emailStatus) === false) {
              shakeEmail("#inputEmail");
          } else if ((emailStatus) === true) {
              $('#signup').fadeOut(2000)
              setTimeout(function() {
                  $('#emailFormGroup').replaceWith('<img class="fishmailImg" src="src/images/Fish-mailbox.jpg"/>')
                  $('#signup').fadeIn(2000)
                  $('#checkMark').fadeOut(0).fadeIn(2000)
                  $('#signupDescription').replaceWith('<p>Enjoy the fresh fish!</p>')
                  $('#fishHeader').replaceWith('<header id="fishHeader"> <h2>Thanks!</h2></header>')
                  $('#submitButton').css('display','none')
              }, 2000)
          }
      });
  });

  function addToCart(shopDivId, wrapper) {
      $(wrapper).mouseover(function() {
          $(shopDivId).show();
          $('#shoppingCart3').css('text-align', 'center');
      }).mouseout(function() {
          $(shopDivId).hide();
      });
      $(wrapper).click(function() {
          console.log("working");
          console.log(shoppingCartCount);
          shoppingCartCount++;
          $('#cart').replaceWith('<span id="cart">' + shoppingCartCount + '</span>');
      });
  };



  function carouselRotate() {
      setInterval(function() {
          $('#featurePhoto').fadeIn(1500).delay(1500).fadeOut(1500).delay(10)
          setTimeout(function() {
              var i = carouselArray.indexOf($('#photoContainer img').attr('src'))
              if (i === (carouselArray.length - 1)) {
                  i = 0;
              } else {
                  i++
              }
              $('#photoContainer img').attr('src', carouselArray[i])
          }, 4500)
      }, 4500)
  }

  function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }

  function shakeEmail(divId) {
      $(divId).animate({
          "margin-left": "50px"
      }, 50);
      $(divId).animate({
          "margin-left": "-50px"
      }, 50);
      $(divId).animate({
          "margin-left": "0px"
      }, 50);
  };
