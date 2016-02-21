var timer;
var timerCurrent;
var timerFinish;
var timerSeconds;
var originalDIV;
var mousein = false;
var anchor;

function drawTimer(percent) {

  $('.slice').remove();
  $('.timer').append(   '<div ' + 
                          (percent > 50 ? ' class="slice gt50"' : ' class="slice" ') + '><div class="pie"></div>' + 
                          (percent > 50 ? '<div class="pie fill"></div>' : '') + 
                        '</div>');

  var deg = 360 / 100 * percent;
  $('.slice .pie').css({
    '-moz-transform': 'rotate(' + deg + 'deg)',
    '-webkit-transform': 'rotate(' + deg + 'deg)',
    '-o-transform': 'rotate(' + deg + 'deg)',
    'transform': 'rotate(' + deg + 'deg)'
  });
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
      timerSeconds = 30;
      timerCurrent = 0;
      timerFinish = new Date().getTime() + (timerSeconds * 1000);
      //stopWatch();
      timer = setInterval('stopWatch()', 10000);
    }
  }, function() {

    $(this).find(".spoiler").parent().removeClass("timer");
    clearInterval(timer);
    console.log("out");
    mousein = false;
    $(".slice").remove();
  });
});