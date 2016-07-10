var Weapon = {};

/**
 * Single bullet fired from front
 * http://phaser.io/tutorials/coding-tips-007
 */
Weapon.SingleBullet = function (game) {
  Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);

  this.nextFire    = 0; // nextFire is the time the player is allowed to shoot again
  this.bulletSpeed = 800; // bulletSpeed is the speed the bullets this particular weapon fires travel at
  this.fireRate    = 100; // fireRate is the rate at which this weapon fires. The lower the number, the higher the firing rate.
  this.pew = this.game.add.audio('audio-pew-player');

  // create 64 bullets to add to the pool
  for (var i = 0; i < 64; i++) {
    this.add( new Bullet(this.game, 'bullet-01'), true );
  }

  return this;
};

Weapon.SingleBullet.prototype             = Object.create(Phaser.Group.prototype);
Weapon.SingleBullet.prototype.constructor = Weapon.SingleBullet;

Weapon.SingleBullet.prototype.fireFrom = function (source) {
  if (this.game.time.now < this.nextFire) {
    return;
  }

  // starting positon from where bullets fired from
  var x = source.x + 10;
  var y = source.y;

  this.getFirstExists(false).fireFrom(x, y, 0, this.bulletSpeed, 0, 0);
  this.pew.play();
  this.nextFire = this.game.time.now + this.fireRate;
};



/**
 * Array Bullet
 */
Weapon.ArrayBullet = function (game, pattern, weaponSettings) {
  Phaser.Group.call(this, game, game.world, 'Array Bullet', false, true, Phaser.Physics.ARCADE);

  this.mtx         = pattern;
  this.settings    = weaponSettings;
  this.arcSetter   = this.settings.fireArc / this.mtx.matrix.length;
  this.cycles      = 0;
  this.nextFire    = this.settings.nextFire; // nextFire is the time the player is allowed to shoot again
  this.bulletSpeed = this.settings.bulletSpeed; // bulletSpeed is the speed the bullets this particular weapon fires travel at
  this.fireRate    = this.settings.fireRate; // fireRate is the rate at which this weapon fires. The lower the number, the higher the firing rate.


  // create bullets to add to the pool
  for (var i = 0; i < this.settings.bullets; i++) {
    this.add( new Bullet( this.game, this.settings.bulletSprite ), this.settings.tracking );
    this.children[i].tint = this.settings.tint;
  }

  return this;
};

Weapon.ArrayBullet.prototype             = Object.create(Phaser.Group.prototype);
Weapon.ArrayBullet.prototype.constructor = Weapon.ArrayBullet;

Weapon.ArrayBullet.prototype.fireFrom = function (source) {
  if (this.game.time.now < this.nextFire) { return; }

  var x = source.x;
  var y = source.y;

  if (this.settings.rotationDir === 'cw') {
    this.settings.fireArc += (this.mtx.matrix.length/2);
  } else {
    this.settings.fireArc -= (this.mtx.matrix.length/2);
  }

  for (let i = 0; i < this.mtx.matrix.length; i++) {
    if (this.mtx.matrix[i][this.cycles] === 1) {
      this.getFirstExists(false).fireFrom(x, y, ((i*this.arcSetter) + 0   + this.settings.fireArc), (this.bulletSpeed), 0 + this.settings.gravity[0], 0 + this.settings.gravity[1]);
      this.getFirstExists(false).fireFrom(x, y, ((i*this.arcSetter) + 180 + this.settings.fireArc), (this.bulletSpeed), 0 + this.settings.gravity[0], 0 + this.settings.gravity[1]);
    }
  }


  if (this.cycles < this.mtx.largestNumber) {
    this.cycles = this.cycles + this.mtx.steps;
  } else {
    this.cycles = 0;
  }

  this.nextFire = this.game.time.now + this.fireRate;
};
