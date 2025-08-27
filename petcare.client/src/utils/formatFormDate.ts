export default function formatFormDate(dateValue: Date, timeValue: string) {
  const date = dateValue;
  const [hh = '00', mm = '00'] = (timeValue ?? '00:00').split(':');
  const yyyy = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const HH = String(parseInt(hh, 10) || 0).padStart(2, '0');
  const MIN = String(parseInt(mm, 10) || 0).padStart(2, '0');
  return `${yyyy}-${MM}-${dd}T${HH}:${MIN}:00`;
}
