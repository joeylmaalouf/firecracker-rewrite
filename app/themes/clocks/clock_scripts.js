function start_digital_clock () {
  setInterval(function () {
    document.getElementById("clock").innerHTML = get_current_time_string();
  }, 1000);
}

function get_current_time_string () {
  var now = new Date();
  var h = now.getHours();
  var m = now.getMinutes();
  var s = now.getSeconds();
  if (m < 10) { m = "0" + m; }
  if (s < 10) { s = "0" + s; }
  return h + ":" + m + ":" + s;
}

function start_analog_clock () {
  var canvas = document.getElementById("clock");
  var context = canvas.getContext("2d");
  var radius = canvas.height / 2;
  context.translate(radius, radius);
  radius = radius * 0.90;
  setInterval(function () {
    draw_face(context, radius);
    draw_numbers(context, radius);
    draw_time(context, radius);
  }, 1000);
}

function draw_face (context, radius) {
  var gradient;
  context.beginPath();
  context.arc(0, 0, radius, 0, 2 * Math.PI);
  context.fillStyle = "white";
  context.fill();
  gradient = context.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
  gradient.addColorStop(0, "#333333");
  gradient.addColorStop(0.5, "white");
  gradient.addColorStop(1, "#333333");
  context.strokeStyle = gradient;
  context.lineWidth = radius  * 0.1;
  context.stroke();
  context.beginPath();
  context.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  context.fillStyle = "#333333";
  context.fill();
}

function draw_numbers (context, radius) {
  var angle;
  context.font = radius * 0.15 + "px arial";
  context.textBaseline = "middle";
  context.textAlign = "center";
  for(var n = 1; n < 13; ++n){
    angle = n * Math.PI / 6;
    context.rotate(angle);
    context.translate(0, -radius * 0.85);
    context.rotate(-angle);
    context.fillText(n.toString(), 0, 0);
    context.rotate(angle);
    context.translate(0, radius * 0.85);
    context.rotate(-angle);
  }
}

function draw_time(context, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
      (minute * Math.PI / (6 * 60)) +
      (second * Math.PI / (6 * 60 * 60));
    draw_hand(context, hour, radius * 0.5, radius * 0.07);
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    draw_hand(context, minute, radius * 0.8, radius * 0.07);
    second = (second * Math.PI / 30);
    draw_hand(context, second, radius * 0.9, radius * 0.02);
}

function draw_hand (context, pos, length, width) {
    context.beginPath();
    context.lineWidth = width;
    context.lineCap = "round";
    context.moveTo(0, 0);
    context.rotate(pos);
    context.lineTo(0, -length);
    context.stroke();
    context.rotate(-pos);
}
