
const CurDate = document.getElementById('date');
let weatherCon = document.getElementById('weathercon');

const tempStatus = "sunny";

const getCurDay = () => {
var weekdays = new Array(7);
weekdays[0] = "SUN";
weekdays[1] = "MON";
weekdays[2] = "TUES";
weekdays[3] = "WED";
weekdays[4] = "Thurs";
weekdays[5] = "FRI";
weekdays[6] = "SAT";
let curDay = new Date();
let day = weekdays[curDay.getDay()];
return day;
}

let getcurtime = () => {
var months = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
var CurTime = new Date();
var date = CurTime.getDate()
var month = months[CurTime.getMonth()];

var hour  = CurTime.getHours();
var mints = CurTime.getMinutes();

var period = "AM";

if(hour > 11){
period = "PM";
if(hour >12) hour -= 12;
}
if(mints < 10){
mints = "0" + mints
}

return `${month} ${date} | ${hour}:${mints} ${period}`

}

CurDate.innerHTML = getCurDay() + " | " + getcurtime();
