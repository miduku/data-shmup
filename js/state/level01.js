app.level01 = {};

// create()
app.level01.create = function () {
  this.stage.backgroundColor = '#ddd';

  // Mouse input
  this.cursor = this.input.activePointer;

  // Weapons
  this.weaponSB = new Weapon.SingleBullet(this.game);
  this.weaponSB.visible = false;

  // Actors
  this.player = new Player(640, 360);
  this.player.sub_create();

  this.boss = new Boss(640, 360);
  this.boss.sub_create();
};

// update()
app.level01.update = function () {
  // Weapons
  // if mouse is klicked, shoot weapon
  if (this.cursor.isDown) {
    this.weaponSB.visible = true;
    this.weaponSB.fireFrom(this.player.hull);
  }

  // Actors
  this.player.sub_update();
  this.boss.sub_update();
};



// render()
app.level01.render = function () {
  this.game.debug.start(20, 20, 'hotpink');
  this.game.debug.line('Debugging Phaser ' + Phaser.VERSION);
  this.game.debug.line('Weapon: ' + this.weaponSB.name);
  this.game.debug.stop();
};