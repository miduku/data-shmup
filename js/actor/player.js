var Player = function (x, y) {
  this.x = x;
  this.y = y;

  this.length = 10;
  this.height = 10;

  this.diagonal = (this.length * this.length) + (this.height * this.height);

  //Calculating nearest integer value of diagonal
  this.diagonal = Math.round( Math.sqrt( this.diagonal ) );
};

// functions to be used in app.level01.create ...
Player.prototype.sub_create = function () {
  this.hull = app.game.add.sprite(this.x, this.y, 'ship-player');

  // app.game.physics.enable(this.hull, Phaser.Physics.ARCADE);
  this.hull.anchor.setTo(0.5, 0.5);
  this.hull.body.setSize(this.length, this.height, 5, 5);

  //  Tell it we don't want physics to manage the rotation
  this.hull.allowRotation = false;
}

// ... or app.level01.update
Player.prototype.sub_update = function () {
  // Follow mouse position
  this.velocity = app.game.physics.arcade.moveToPointer(this.hull, 500, app.game.input.activePointer, 70);
}