//-- SCROLL TO DEFAULT
$('#caret').click(discover);

function discover() {
  $('html, body').animate({
    scrollTop: $('#info-title').offset().top
  }, 1000);
}

//-- SHOW TIME
var monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

var dayNames = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
];

var today = new Date();
var month = monthNames[today.getMonth()];
var day   = dayNames[today.getDay()];
var date  = today.getDate();
var hour  = today.getHours();
var min   = today.getMinutes();

if(min < 10) {
  min = '0' + min;
}

if(hour > 12) {
  hour = hour - 12;
}

var meridies = document.getElementById('meridies');

if(hour >= 12) {
  meridies.innerHTML = 'AM';
} else if(hour <= 12) {
  meridies.innerHTML = 'PM';
}

var currentDate = document.getElementById('current-date');
var currentTime = document.getElementById('current-time');

currentDate.innerHTML = day + ', ' + month + ' ' + date; 
currentTime.innerHTML = hour + ':' + min;
