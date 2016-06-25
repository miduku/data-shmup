// Our core Bullet class
// This is a simple Sprite object that we set a few properties on
// It is fired by all of the Weapon classes
// http://phaser.io/tutorials/coding-tips-007


// This is essentially a Sprite with a couple of extra features
var Bullet = function (game, key) {
  Phaser.Sprite.call(this, game, 0, 0, key);

  this.texture.baseTexture.scaleMode = PIXI.scaleMode.NEAREST; // Tells Pixi to use nearest neighbour scaling. This means when the bullet is scaled from its default size it won't be automatically 'smoothed' as will retain its pixel crispness.

  this.anchor.setTo(0.5, 0.5);

  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  this.exists = false;

  this.tracking = false; // The tracking property tells the Bullet to rotate to face the direction it is moving in, as it moves
  this.scaleSpeed = 0; // scaleSpeed is how fast the bullet should grow in size as it travels
};

//
Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.fire = function (x, y, angle, speed, gx, gy) {
  gx = gx || 0;
  gy = gy || 0;

  this.reset(x, y);
  this.scale.setTo(1, 1);

  this.app.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

  this.angle = angle;
  this.body.gravity.setTo(gx, gy);
};

Bullet.prototype.update = function () {
  if (this.tracking) {
    this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
  }

  if (this.scaleSpeed > 0) {
    this.scale.x += this.scaleSpeed;
    this.scale.y += this.scaleSpeed;
  }
};