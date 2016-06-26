app.level01 = {};

// create()
app.level01.create = function () {
  this.stage.backgroundColor = '#ddd';

  this.weapon = new Weapon.SingleBullet(this.game);
  this.weapon.visible = false;

  this.player = new Player(640, 360);
  this.player.sub_create();

  console.log(this.player.diagonal);
  console.log(app.game.width);
};

// update()
app.level01.update = function () {
  // if mouse is klicked, shoot weapon
  if (this.input.activePointer.isDown) {
    this.weapon.visible = true;
    this.weapon.fireFrom(this.player.hull);
  }

  this.player.sub_update();
};

