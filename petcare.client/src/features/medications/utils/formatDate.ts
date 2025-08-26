export default function formatDate(date: string) {
  var datetime = date.split('T');
  var time = datetime[1].split(':');
  var timeWithoutSecs = time[0] + ':' + time[1];
  return `${datetime[0]}, ${timeWithoutSecs}`;
}
