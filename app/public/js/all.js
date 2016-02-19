//-- SCROLL TO DEFAULT
$('#caret').click(discover);

function discover() {
  $('html, body').animate({
    scrollTop: $('#info-title').offset().top
  }, 1000);
}