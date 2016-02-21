var timer;
var timerCurrent;
var timerFinish;
var timerSeconds;
var originalHTML;
var mousein;

function drawTimer(seconds) {


  $('.percent').html(Math.round(seconds));
}

function stopWatch() {
  var seconds = (timerFinish - (new Date().getTime())) / 1000;
  if (seconds <= 0) {
    drawTimer(timerSeconds);
    clearInterval(timer);
  } else {
    drawTimer(seconds);
  }
}

$(document).ready(function() {
  $(".spoiler").parent().parent().hover(function() {
    if (!mousein) {
      mousein = true;
      $(this).find('.spoiler').parent().append('<div class="percent"></div>');
      timerSeconds = 5;
      timerCurrent = 0;
      timerFinish = new Date().getTime() + (timerSeconds * 1000);
      timer = setInterval('stopWatch()', 50);

    }
  }, function() {
    
    clearInterval(timer);
    mousein = false;
    
  });
});
