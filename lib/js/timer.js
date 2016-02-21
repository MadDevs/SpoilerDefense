var timer;
var timerCurrent;
var timerFinish;
var timerSeconds;
var originalIMG;
var mousein = false;

function drawTimer(percent) {
  $('div.timer').html(originalIMG.html()+'<div class="percent"></div><div id="slice"' + (percent > 50 ? ' class="gt50"' : '') + '><div class="pie"></div>' + (percent > 50 ? '<div class="pie fill"></div>' : '') + '</div>');
  var deg = 360 / 100 * percent;
  $('#slice .pie').css({
    '-moz-transform': 'rotate(' + deg + 'deg)',
    '-webkit-transform': 'rotate(' + deg + 'deg)',
    '-o-transform': 'rotate(' + deg + 'deg)',
    'transform': 'rotate(' + deg + 'deg)'
  });
  $('.percent').html(Math.round(timerSeconds - percent / 100 * timerSeconds));
}

function stopWatch() {
  var seconds = (timerFinish - (new Date().getTime())) / 1000;
  if (seconds <= 0) {
    drawTimer(100);
    originalIMG.removeClass("timer");
    originalIMG.removeClass("spoiler");
    clearInterval(timer);
  } else {
    var percent = 100 - ((seconds / timerSeconds) * 100);
    drawTimer(percent);
  }
}

$(document).ready(function() {
  var styleTag = $("<style> .spoiler{ font-size: 200px; } .timer { position: absolute; width: 1em; height: 1em; float: left; } .timer > .percent { position: absolute; top: 1.05em; left: 0; width: 3.33em; font-size: 0.3em; text-align: center; } .timer > #slice { position: absolute; top: 0; width: 1em; height: 1em; clip: rect(0px, 1em, 1em, 0.5em); } .timer > #slice.gt50 { clip: rect(auto, auto, auto, auto); } .timer > #slice > .pie { border: 0.1em solid #c0c0c0; position: absolute; width: 0.8em; /* 1 - (2 * border width) */ height: 0.8em; /* 1 - (2 * border width) */ clip: rect(0em, 0.5em, 1em, 0em); -moz-border-radius: 0.5em; -webkit-border-radius: 0.5em; border-radius: 0.5em; } .timer > #slice > .pie.fill { -moz-transform: rotate(180deg) !important; -webkit-transform: rotate(180deg) !important; -o-transform: rotate(180deg) !important; transform: rotate(180deg) !important; } .timer.fill > .percent { display: none; } .timer.fill > #slice > .pie { border: transparent; background-color: #c0c0c0; width: 1em; height: 1em; } </style>");
  console.log("style");
  $('html > head').append(styleTag);

  $(".spoiler").parent().parent().hover(function() {
    if (!mousein) {
      $(this).addClass("timer");
      mousein = true;
      originalIMG = $(this);
      timerSeconds = 5;
      timerCurrent = 0;
      timerFinish = new Date().getTime() + (timerSeconds * 1000);
      timer = setInterval('stopWatch()', 50);
    }
  }, function() {
    $(this).removeClass("timer");
    clearInterval(timer);
    mousein = false;
    $(this).html(originalIMG.html());
  });
});