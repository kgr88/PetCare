export default function formatDate(date: Date) {
  // var datetime = date.split('T');
  // var time = datetime[1].split(':');
  // var timeWithoutSecs = time[0] + ':' + time[1];
  // return `${datetime[0]}, ${timeWithoutSecs}`;
  const newDate = new Date(date);
  // "8 Sep"
  const monthDay = newDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
  // "Wednesday"
  const weekdayLong = newDate.toLocaleDateString('en-GB', {
    weekday: 'long',
  });
  const year = newDate.toLocaleDateString('en-GB', {
    year: 'numeric',
  });
  const time = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  var result = {
    monthDay,
    weekdayLong,
    year,
    time,
  };
  return result;
}
