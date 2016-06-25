var Player = function (x, y) {
  this.x = x;
  this.y = y;

  this.length = 24;
  this.height = 16;

  this.diagonal = (this.length * this.length) + (this.height * this.height);

  //Calculating nearest integer value of diagonal
  this.diagonal = Math.round( Math.sqrt( this.diagonal ) );
};


Player.prototype.sub_create = function () {
  this.body = app.game.add.sprite(this.x, this.y, 'ship-player');

  app.game.physics.enable(this.body, Phaser.Physics.ARCADE);
  this.body.anchor.setTo(0.5, 0.5);

  //  Tell it we don't want physics to manage the rotation
  this.body.allowRotation = false;
}

Player.prototype.sub_update = function () {
  // Follow mouse position
  this.velocity = app.game.physics.arcade.moveToPointer(this.body, 500, app.game.input.activePointer, 100);
}