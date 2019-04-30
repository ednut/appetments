import moment from 'moment';

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function convertTimeformat(format, str) {
  var time = str;
  var hours = Number(time.match(/^(\d+)/)[1]);
  var minutes = Number(time.match(/:(\d+)/)[1]);
  var AMPM = time.match(/\s(.*)$/)[1];
  if (AMPM == "pm" && hours < 12) hours = hours + 12;
  if (AMPM == "am" && hours == 12) hours = hours - 12;
  var sHours = hours.toString();
  var sMinutes = minutes.toString();
  if (hours < 10) sHours = "0" + sHours;
  if (minutes < 10) sMinutes = "0" + sMinutes;
  return sHours + ":" + sMinutes;
}

export function convert(date) {
  let seperateDayAndTime = date.split("T");
  let seperatedDay = seperateDayAndTime[0].split("-");
  let seperatedTime = seperateDayAndTime[1].split("+")[0].split(":");

  return new Date(
    parseInt(seperatedDay[0]),
    parseInt(seperatedDay[1]) - 1,
    parseInt(seperatedDay[2]),
    parseInt(seperatedTime[0]),
    parseInt(seperatedTime[1]),
    parseInt(seperatedTime[2])
  );
}


export function formatDate (date, format = 'MMMM YYYY, D dddd') {
    return moment.utc(date).local().format(format);
}
