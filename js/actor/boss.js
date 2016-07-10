var Boss = function (x, y) {
  this.x = x;
  this.y = y;

  this.length = 55;
  this.height = 70;

  this.diagonal = (this.length * this.length) + (this.height * this.height);

  //Calculating nearest integer value of diagonal
  this.diagonal = Math.round( Math.sqrt( this.diagonal ) );

  this.health = 500;
  this.alive = true;
  this.speed = 50;
  this.direction = 'up';
};


/**
 * sub_create ()
 */
Boss.prototype.sub_create = function () {
  this.hull = app.game.add.sprite(this.x, this.y, 'ship-boss');

  // create provisional bitmap for the shape
  // this.bmd = app.game.add.bitmapData(this.length, this.height);
  // this.bmd.ctx.beginPath();
  // this.bmd.ctx.rect(0, 0, this.length, this.height);
  // this.bmd.ctx.fillStyle = '#4f616e';
  // this.bmd.ctx.fill();
  // this.hull = app.game.add.sprite(this.x, this.y, this.bmd);

  // app.game.physics.enable(this.hull, Phaser.Physics.ARCADE);
  this.hull.anchor.setTo(0.5, 0.5);
  this.hull.body.setSize(this.length, this.height, this.hull.width/2 - this.length/2, this.hull.height/2 - this.height/2);

  //  Tell it we don't want physics to manage the rotation
  this.hull.allowRotation = false;
}


/**
 * sub_update ()
 */
Boss.prototype.sub_update = function () {
  if (this.hull.body.y < app.game.stage.height*.15) {
    this.direction = 'down';
  }
  else if (this.hull.body.y > app.game.stage.height*.75) {
    this.direction = 'up';
  }

  if (this.direction === 'up') {
    this.hull.body.velocity.y = -this.speed;
  }
  else if (this.direction === 'down') {
    this.hull.body.velocity.y = this.speed;
  }
}