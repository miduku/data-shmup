var Boss = function (x, y) {
  this.x = x;
  this.y = y;

  this.length = 0;
  this.height = 0;

  this.diagonal = (this.length * this.length) + (this.height * this.height);

  //Calculating nearest integer value of diagonal
  this.diagonal = Math.round( Math.sqrt( this.diagonal ) );
};

// functions to be used in app.level01.create ...
Boss.prototype.sub_create = function () {
  this.hull = app.game.add.sprite(this.x, this.y, 'ship-???');

  app.game.physics.enable(this.hull, Phaser.Physics.ARCADE);
  this.hull.anchor.setTo(0.5, 0.5);

  //  Tell it we don't want physics to manage the rotation
  this.hull.allowRotation = false;
}

// ... or app.level01.update
Boss.prototype.sub_update = function () {
  // Follow mouse position
  this.velocity = app.game.physics.arcade.moveToPointer(this.hull, 500, app.game.input.activePointer, 100);
}