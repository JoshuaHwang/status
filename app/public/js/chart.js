//-- DONUT CHARTS
var options = [
  {
    responsive: true,
    maintainAspectRatio: false
  }
];

// MEETINGS
var meetingData = [
  {
    value: 3,
    color: '#3ADB76'
  }
];

var meetingChart = new Chart(document.getElementById('meet-chart')
  .getContext('2d'))
  .Doughnut(meetingData, { percentageInnerCutout: 80 }, options);

// APPOINTMENTS
var appointmentData = [
  {
    value: 15,
    color: '#F35D66'
  }
];

var appointmentChart = new Chart(document.getElementById('apps-chart')
  .getContext('2d'))
  .Doughnut(appointmentData, { percentageInnerCutout: 80 }, options);

// LABS
var labData = [
  {
    value: 6,
    color: '#36B8D5'
  }
];

var labChart = new Chart(document.getElementById('labs-chart')
  .getContext('2d'))
  .Doughnut(labData, { percentageInnerCutout: 80 }, options);