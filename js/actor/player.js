var Player = function (x, y) {
  this.x = x;
  this.y = y;

  this.length = 8;
  this.height = 8;

  this.diagonal = (this.length * this.length) + (this.height * this.height);

  //Calculating nearest integer value of diagonal
  this.diagonal = Math.round( Math.sqrt( this.diagonal ) );
};


/**
 * sub_create ()
 */
Player.prototype.sub_create = function () {
  this.hull = app.game.add.sprite(this.x, this.y, 'ship-player');

  // app.game.physics.enable(this.hull, Phaser.Physics.ARCADE);
  this.hull.anchor.setTo(0.5, 0.5);
  this.hull.body.setSize(this.length, this.height, this.hull.width-this.length, this.hull.height/2 - this.height/2);

  //  Tell it we don't want physics to manage the rotation
  this.hull.allowRotation = false;
};


/**
 * sub_update ()
 */
Player.prototype.sub_update = function () {
  // Follow mouse position
  this.hull.velocity = app.game.physics.arcade.moveToPointer(this.hull, 100, app.game.input.activePointer, 50);
};