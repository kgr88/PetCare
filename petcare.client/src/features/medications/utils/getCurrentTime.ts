export default function getCurrentTime() {
  var d = new Date();
  var hour = String(d.getHours());
  var min = String(d.getMinutes());
  if (min.length == 1) {
    min = '0' + min;
  }
  if (hour.length == 1) {
    hour = '0' + hour;
  }
  return `${hour}:${min}`;
}
