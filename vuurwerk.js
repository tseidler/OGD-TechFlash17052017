(function() {
  "use strict";
  let canvas = document.getElementById("canvas");
  let context = canvas.getContext("2d");
  let lastUpdate = 0;
  let particles = [];
  const COLOURS = ['white', 'green', 'yellow', 'orange', 'pink', 'blue', 'brown', 'red', 'magenta', 'purple'];
  const GRAVITY = -7;
  const FRICTION = 5;

  window.addEventListener("resize", resizeCanvas);
  canvas.addEventListener("click", addParticle);

  function resizeCanvas(oEvent) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
  }

  function addParticle(oEvent) {
    let colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
    let particle = new Particle(oEvent.clientX, oEvent.clientY, 5, colour, 5, -5);
    particles.push(particle);
  }

  function update(timestamp) {
    if (lastUpdate === 0) {
      lastUpdate = timestamp;
    }
    let dTime = (timestamp - lastUpdate) / 1000;

    particles.forEach(particle => particle.update(dTime));

    draw(dTime);
    lastUpdate = timestamp;
    window.requestAnimationFrame(time => update(time));
  }

  function draw(dTime) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => particle.draw(context));
  }
  resizeCanvas();
  window.requestAnimationFrame(timestamp => update(timestamp));

  class Particle {
    constructor(x, y, size, colour, vx, vy) {
      this.x = x;
      this.y = y;
      this.size =  size;
      this.colour = colour;

      this.velocity = {
        x: vx,
        y: vy
      }
    }

    draw(context) {
      context.fillStyle = this.colour;
      context.fillRect(this.x, this.y, this.size, this.size);
    }

    update(dTime) {
      this.velocity.y -= GRAVITY * dTime;
      this.velocity.x -= Math.sign(this.velocity.x)  * dTime * FRICTION;

      this.x = this.x + this.velocity.x;
      this.y = this.y + this.velocity.y;
    }
  }
})();
