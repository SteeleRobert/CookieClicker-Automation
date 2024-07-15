var autoGoldenCookie = setInterval(function() {
  while (0 < Game.shimmers.length) Game.shimmers[0].pop();
}, 1000);