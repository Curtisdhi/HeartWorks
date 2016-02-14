// Converts from degrees to radians.
Math.toRadians = function(degrees) {
  return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.toDegrees = function(radians) {
  return radians * 180 / Math.PI;
};

//http://jsfiddle.net/joquery/9KYaQ/
String.format = function() {
    // The string containing the format items (e.g. "{0}")
    // will and always has to be the first argument.
    var theString = arguments[0];

    // start with the second argument (i = 1)
    for (var i = 1; i < arguments.length; i++) {
        // "gm" = RegEx options for Global search (more than one instance)
        // and for Multiline search
        var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        theString = theString.replace(regEx, arguments[i]);
    }

    return theString;
}

window.onload = function() {
  var canvas = document.getElementById('heartworks');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  var bubblerTime = 200;
  var textAlpha = 0;
  var ch = canvas.height;
  var cw = canvas.width;

  var ctx;
  var lastUpdate = Date.now();
  var lastBubbleTime = Date.now();
  var heartworks = [];
  var bubblers = [];

  if (canvas && canvas.getContext){
    ctx = canvas.getContext('2d');
    init();

    setInterval(function() {
      update();
    }, 100);
  }

  function init() {
    function f(s, r) {
        var cx = cw/2;
        return new Firework('rgba(254, 231, 231, {0})', 5, cx, ch, r, s, 7, 15);
    }

    heartworks = [
      f(45, Math.toRadians(325)),
      f(45, Math.toRadians(320)),
      f(45, Math.toRadians(310)),
      f(42.5, Math.toRadians(305)),
      f(40, Math.toRadians(300)),
      f(35, Math.toRadians(290)),
      f(30, Math.toRadians(280)),
      f(25, Math.toRadians(270)), //center
      f(30, Math.toRadians(260)),
      f(35, Math.toRadians(250)),
      f(40, Math.toRadians(240)),
      f(42.5, Math.toRadians(235)),
      f(45, Math.toRadians(230)),
      f(45, Math.toRadians(220)),
      f(45, Math.toRadians(215)),

      f(40, Math.toRadians(210)),
      f(35, Math.toRadians(210)),
      f(30, Math.toRadians(210)),
      f(25, Math.toRadians(210)),
      f(20, Math.toRadians(210)),
      f(15, Math.toRadians(210)),
      f(10, Math.toRadians(210)),
      f(7, Math.toRadians(210)),

      f(40, Math.toRadians(330)),
      f(35, Math.toRadians(330)),
      f(30, Math.toRadians(330)),
      f(25, Math.toRadians(330)),
      f(20, Math.toRadians(330)),
      f(15, Math.toRadians(330)),
      f(10, Math.toRadians(330)),
      f(7, Math.toRadians(330)),

      f(3, Math.toRadians(270)),
    ];
  }

  function update() {

    var now = Date.now();
    var delta = (now - lastUpdate) / 1000;
    lastUpdate = now;



    for (var i = heartworks.length-1; i >= 0; i--) {
      heartworks[i].update(delta);
      if (heartworks[i].isDone()) {
        heartworks.splice(i, 1);
      }
    }

    if (heartworks.length <= 0) {
      init();
    }


    bubbler(delta);

    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawText();

    for (var i = 0; i < heartworks.length; i++) {
      heartworks[i].draw(ctx);
    }

    for (var i = 0; i < bubblers.length; i++) {
      bubblers[i].draw(ctx);
    }
  }

  function drawText() {
      textAlpha += 0.01;
      ctx.shadowOffsetX = 4;
      ctx.shadowOffsetY = 4;
      ctx.shadowBlur = 2;
      ctx.shadowColor = String.format("rgba(255, 0, 0, {0})", textAlpha);
      ctx.fillStyle = String.format("rgba(255, 255, 255, {0})", textAlpha);;

      ctx.font = "72px love";
      var str = "q Happy Valetine's q";
      var width = ctx.measureText(str).width;
      ctx.fillText(str, (cw/2) - (width/2), ch/2);
      ctx.font = "30px love";
      str = "o Be my o"
      var swidth = ctx.measureText(str).width;
      ctx.fillText(str, (cw/2) - (swidth/2) + (width/6), (ch/2) - 60);
  }

  function bubbler(delta) {
    if (Date.now() - lastBubbleTime  >= bubblerTime) {
      var speed = Math.random() * (100 - 50) + 50;
      var fuseTimer = Math.random() * (5 - 1) + 1;
      var x = Math.random() * (300 - 50) + 50;
      //bottom
      var f = new Firework('rgba(254, 231, 231, {0})', 5, x, ch, Math.toRadians(270), speed, fuseTimer, 15);
      bubblers.push(f);
      var f = new Firework('rgba(254, 231, 231, {0})', 5, cw - x, ch, Math.toRadians(270), speed, fuseTimer, 15);
      bubblers.push(f);
      //top
      var f = new Firework('rgba(254, 231, 231, {0})', 5, x, 0, Math.toRadians(90), speed, fuseTimer, 15);
      bubblers.push(f);
      var f = new Firework('rgba(254, 231, 231, {0})', 5, cw - x, 0, Math.toRadians(90), speed, fuseTimer, 15);
      bubblers.push(f);

      lastBubbleTime = Date.now();
    }

    for (var i = bubblers.length-1; i >= 0; i--) {
      bubblers[i].update(delta);
      if (bubblers[i].isDone()) {
        bubblers.splice(i, 1);
      }
    }
  }

};
