$(document).on('ready', function() {
  console.log('GO TEAM - Footer');



  for (var i = 1; i < 17; i++) {
    $('<img class="swim" src="src/svg/fish-'+[i]+'.svg">').appendTo('#catch');
    animateDiv();

  }

  $('img.swim').on('click', function() {
    $(this).removeClass('swim');
  });

});


function makeNewPosition(){

    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh,nw];

}

function animateDiv(){
    var newq = makeNewPosition();
    $('.swim').animate({ top: newq[0], left: newq[1] }, 2000, function(){
      animateDiv();
    });
};

var myCenter=new google.maps.LatLng(24.489853, -77.608439);

function initialize()
{
var mapProp = {
  center:myCenter,
  zoom:7,
  mapTypeId:google.maps.MapTypeId.ROADMAP
  };

var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

var marker=new google.maps.Marker({
  position:myCenter,
  });

marker.setMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);

// global vars
var div = document.createElement('div'),
    body = document.getElementsByTagName('body')[0],
    canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    w,
    h;

// events
window.onresize = function(event) {
  SetMargins();
};

// initialization
function Init () {
  document.body.appendChild(div);
  div.style.position = "fixed";
  canvas.style.zIndex = "0";
  canvas.style.position = "absolute";
  div.appendChild(canvas);

  SetMargins();
  Update();
}
Init();


// main loop
function Update() {

  ctx.fillStyle = '#00d4c8';
  ctx.fillRect(0,0,w,h);

  var timeCur = new Date().getTime();

  var maxLayers = Math.floor(h / 150) + 1;
  var waveLayer = -1;
  var offset = 0;
  var offsetInc = 30;

  while(waveLayer < maxLayers){
    var timeDivider = (8 - (5 * waveLayer / maxLayers));
    var timeMod = timeCur / timeDivider;
    var ampMod = 32 + 12 * waveLayer;
    var ampMult = 8 + waveLayer * 4;

    var grd = ctx.createLinearGradient(0,offset,0,offset + offsetInc * 2);
    grd.addColorStop(0,'#80e0d0');//'rgba(255,255,208,0.2)');
    grd.addColorStop(0.5,'#40d8d4');//'rgba(255,208,208,0)');
    grd.addColorStop(1,'#40d4d0');

    ctx.beginPath();

    for(var i = 0 ; i < w; i+= 10 ){
      var timeUse = (timeMod + i) / ampMod;
      var amp = ampMult * Math.sin(timeUse);
      var height = 4 * Math.cos((timeMod) / 48);
      var yPoint = amp - height + offset;
      var xPoint = i;
      ctx.lineTo(xPoint, yPoint);
    }
    ctx.lineTo(w,h+offset);
    ctx.lineTo(0,h+offset);
    ctx.lineTo(0,offset);

    ctx.closePath();
    ctx.fillStyle = grd;
    ctx.fill();

    waveLayer++;
    offsetInc = 30 + 10 * Math.pow(waveLayer,2);
    offset += offsetInc
  }

  requestAnimationFrame(Update);
}


// functions
function SetMargins () {
  var bodyW = document.documentElement.clientWidth,
      bodyH = document.documentElement.clientHeight;

  w = canvas.width = Math.max(600,bodyW);
  h = canvas.height = bodyH;
  canvas.style.bottom = 0;

 div.style.left=div.style.right=div.style.top=div.style.bottom="0";
}
