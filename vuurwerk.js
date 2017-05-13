(function() {
  "use strict";
  let canvas = document.getElementById("canvas");
  let context = canvas.getContext("2d");
  let lastUpdate = 0;

  window.addEventListener("resize", resizeCanvas, false);

  function resizeCanvas(oEvent) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
  }

  function update(timestamp) {
    if (lastUpdate === 0) {
      lastUpdate = timestamp;
    }
    let dTime = (timestamp - lastUpdate) / 1000;

    draw(dTime);
    lastUpdate = timestamp;
    window.requestAnimationFrame(time => update(time));
  }

  function draw(dTime) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
  resizeCanvas();
  window.requestAnimationFrame(timestamp => update(timestamp));
})();
