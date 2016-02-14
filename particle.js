function Particle(color, size, x, y, velocity, speed, fuseTimer) {
  this.color = color;
  this.size = size;
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.velocity = velocity;
  this.fuseTimer = fuseTimer;
  this.exploded = false;
  this.alpha = 1;
}

Particle.prototype = {
  update: function(delta) {
    this.fuseTimer -= delta;
    if (this.fuseTimer <= 0 && !this.exploded) {
      this.explode();
    }
    var speed = this.speed * delta;
    this.x += Math.cos(this.velocity) * speed;
    this.y += Math.sin(this.velocity) * speed;
  },
  draw: function(ctx) {
    if (!this.exploded) {
      var baseLen = this.size;

      ctx.save();
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 2;
      ctx.shadowColor = "#FF0000";
      ctx.translate(this.x, this.y);
      ctx.rotate(4);
      ctx.fillStyle = String.format(this.color, this.alpha);
      ctx.beginPath();
      ctx.moveTo(-baseLen, 0);
      ctx.arc(0, 0, baseLen, 0, Math.PI, false);
      ctx.lineTo(baseLen, 0);
      ctx.arc(baseLen, -baseLen, baseLen, Math.toRadians(90), Math.toRadians(270), true);
      ctx.lineTo(baseLen, -baseLen * 2);
      ctx.lineTo(-baseLen, -baseLen * 2);
      ctx.lineTo(-baseLen, 0);
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    }
  },
  explode: function() {
    this.exploded = true;
  },
  isExploded: function() {
    return this.exploded;
  }
};
