function Firework(color, size, x, y, velocity, speed, fuseTimer, pCount) {
  Particle.call(this, color, size, x, y, velocity, speed, fuseTimer);
  this.pCount = pCount;
  this.particles = [];
}

Firework.prototype = Object.create(Particle.prototype);

Firework.prototype.update = function(delta) {
  Particle.prototype.update.call(this, delta);
  for (var i=0; i < this.particles.length; i++) {
    this.particles[i].update(delta);
  }
};

Firework.prototype.draw = function(ctx) {
  Particle.prototype.draw.call(this, ctx);
  for (var i=0; i < this.particles.length; i++) {
    this.particles[i].alpha = this.particles[i].fuseTimer;
    this.particles[i].draw(ctx);
  }
};

Firework.prototype.explode = function() {
  Particle.prototype.explode.call(this);
  for (var i=0; i < this.pCount; i++) {
    var min = 0;
    var max = 360;
    var p = new Particle(this.color, 2, this.x, this.y,
      Math.toRadians(Math.random() * (max - min) + min),
       25, 2);
    this.particles.push(p);
  }
};

Firework.prototype.isDone = function() {
  var isDone = false;
  if (this.exploded) {
    isDone = true;
    for (var i=0; i < this.particles.length; i++) {
      if (!this.particles[i].exploded) {
        isDone = false;
        break;
      }
    }
  }
  return isDone;
};
