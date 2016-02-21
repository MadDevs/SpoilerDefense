var timer;
var timerCurrent;
var timerFinish;
var timerSeconds;
var originalIMG;
var mousein = false;

function drawTimer(percent) {
  $('.slice').remove();
  $('.timer').append(   '<div class="slice"' + 
                          (percent > 50 ? ' class="gt50"' : '') + '><div class="pie"></div>' + 
                          (percent > 50 ? '<div class="pie fill"></div>' : '') + 
                        '</div>');

  var deg = 360 / 100 * percent;
  $('.slice .pie').css({
    '-moz-transform': 'rotate(' + deg + 'deg)',
    '-webkit-transform': 'rotate(' + deg + 'deg)',
    '-o-transform': 'rotate(' + deg + 'deg)',
    'transform': 'rotate(' + deg + 'deg)'
  });
  //$('.percent').html(Math.round(timerSeconds - percent / 100 * timerSeconds));
}

function stopWatch() {
  var seconds = (timerFinish - (new Date().getTime())) / 1000;
  if (seconds <= 0) {
    drawTimer(100);
    $('.timer').removeClass("timer");
    $('.slice').remove();
    clearInterval(timer);
  } else {
    var percent = 100 - ((seconds / timerSeconds) * 100);
    drawTimer(percent);
  }
}

$(document).ready(function() {

  
  
  //$('html > head').append(styleTag);

  $(".spoiler").parent().parent().hover(function() {
    if (!mousein) {
      $(this).find('.spoiler').parent().addClass("timer");
      mousein = true;
      timerSeconds = 5;
      timerCurrent = 0;
      timerFinish = new Date().getTime() + (timerSeconds * 1000);
      timer = setInterval('stopWatch()', 50);
    }
  }, function() {
    
    $(this).find('.spoiler').parent().removeClass("timer");
    $('.slice').remove();
    clearInterval(timer);
    mousein = false;
    //$(this).html(originalIMG);
  });
});