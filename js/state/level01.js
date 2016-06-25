app.level01 = {};

// create()
app.level01.create = function () {
  this.game.stage.backgroundColor = '#cc9966';

  this.weapon = new Weapon.SingleBullet(this.game);
  this.weapon.visible = true;

  this.player = new Player(640, 360);
  this.player.sub_create();
};

// update()
app.level01.update = function () {
  if (this.game.input.activePointer.isDown) {
    this.weapon.fireFrom(this.player);
  }

  this.player.sub_update();
};

