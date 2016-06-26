var Weapon = {};

/**
 * Single bullet fired from front
 * http://phaser.io/tutorials/coding-tips-007
 */
Weapon.SingleBullet = function (game) {
  Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);

  this.nextFire = 0; // nextFire is the time the player is allowed to shoot again
  this.bulletSpeed = 1000; // bulletSpeed is the speed the bullets this particular weapon fires travel at
  this.fireRate = 100; // fireRate is the rate at which this weapon fires. The lower the number, the higher the firing rate.

  // create 64 bullets to add to the pool
  for (var i = 0; i < 64; i++) {
    this.add( new Bullet(this.game, 'bullet-01'), true );
  }

  return this;
};

Weapon.SingleBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.SingleBullet.prototype.constructor = Weapon.SingleBullet;

Weapon.SingleBullet.prototype.fireFrom = function (source) {
  if (this.game.time.now < this.nextFire) {
    return;
  }

  // starting positon from where bullets fired from
  var x = source.x + 10;
  var y = source.y;

  this.getFirstExists(false).fireFrom(x, y, 0, this.bulletSpeed, 0, 0);
  this.nextFire = this.game.time.now + this.fireRate;
};