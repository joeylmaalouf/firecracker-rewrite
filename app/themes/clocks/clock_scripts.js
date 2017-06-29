function get_current_time_string () {
  var now = new Date();
  var h = now.getHours();
  var m = now.getMinutes();
  var s = now.getSeconds();
  if (m < 10) { m = "0" + m; }
  if (s < 10) { s = "0" + s; }
  return h + ":" + m + ":" + s;
}
