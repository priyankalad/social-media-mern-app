export default function formatDate(date, format) {
  let dd = date.getDate();

  let mm = date.getMonth() + 1;

  const yyyy = date.getFullYear();
  let mi = date.getMinutes();
  let hh = date.getHours();
  let ampm = hh >= 12 ? "pm" : "am";
  hh = hh % 12;
  hh = hh ? hh : 12; // the hour '0' should be '12'
  mi = mi < 10 ? "0" + mi : mi;
  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }

  var month_names = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  switch (format) {
    case "MM/dd/yyyy":
      date = `${mm}/${dd}/${yyyy}`;
      break;
    case "dd/MM/yyyy":
      date = `${dd}/${mm}/${yyyy}`;
      break;
    case "dd-MM-yyyy":
      date = `${dd}-${mm}-${yyyy}`;
      break;
    case "MMM, yyyy":
      date = `${month_names[date.getMonth()]}, ${yyyy}`;
      break;
    default:
      date = `${dd}-${mm}-${yyyy} ${hh}:${mi} ${ampm}`;
      break;
  }
  return date;
}
