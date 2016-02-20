//-- SCROLL TO DEFAULT
$('#caret').click(discover);

function discover() {
  $('html, body').animate({
    scrollTop: $('#info-title').offset().top
  }, 1000);
}

//-- CLOCK
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

var currentDate = document.getElementById('current-date');
var currentTime = document.getElementById('current-time');

var meridies = document.getElementById('meridies');

function formatMin(m) {
  if(m < 10) {
    m = '0' + m;
  }

  return m;
}

function formatHour(h) {
  if(h > 12) {
    h = h - 12;
  }

  return h;
}

function startTime() {
  var today = new Date();
  var month = monthNames[today.getMonth()];
  var day   = dayNames[today.getDay()];
  var date  = today.getDate();
  var hour  = formatHour(today.getHours());
  var min   = formatMin(today.getMinutes());

  if(hour >= 12) {
    meridies.innerHTML = 'AM';
  } else if(hour <= 12) {
    meridies.innerHTML = 'PM';
  }

  currentDate.innerHTML = day + ', ' + month + ' ' + date; 
  currentTime.innerHTML = hour + ':' + min;

  var timeout = setTimeout(function() {
    startTime()
  }, 500);
}

startTime();
