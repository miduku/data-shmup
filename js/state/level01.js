app.level01 = {};

// create()
app.level01.create = function () {
  this.stage.backgroundColor = '#ddd';

  // Mouse input
  this.cursor = this.input.activePointer;

  // Weapons
  this.weaponSB = new Weapon.SingleBullet(this.game);
  this.weaponSB.visible = false;
  this.weaponAB = new Weapon.ArrayBullet(this.game);
  this.weaponAB.visible = false;

  // Actors
  this.player = new Player(640, 360);
  this.player.sub_create();

  this.boss = new Boss(640, 360);
  this.boss.sub_create();

  this.parsedJSON = JSON.parse(localStorage.getItem('hashtagJSON'));
  this.bulletArray = [];
  for (var item of this.parsedJSON.statuses) {
    this.bulletArray.push(item.entities.hashtags.length);
  }
  this.rotate = 180;
  this.nextFire = 0;

  console.log(this.bulletArray);
  

};

// update()
app.level01.update = function () {

  // Weapons
  // if mouse is klicked, shoot weapon
  if (this.cursor.isDown) {
    this.weaponSB.visible = true;
    this.weaponSB.fireFrom(this.player.hull);
  }

  if (this.game.time.now > this.nextFire) {
    this.rotate += this.bulletArray.length;
    this.nextFire = this.game.time.now + this.weaponAB.fireRate;
  }
  this.weaponAB.visible = true;
  this.weaponAB.fireFrom(this.boss.hull, this.rotate);

  // Actors
  this.player.sub_update();
  this.boss.sub_update();
  console.log(this.nextFire);
  
};



// render()
app.level01.render = function () {
  this.game.debug.start(20, 20, 'hotpink');
  this.game.debug.line('Debugging Phaser ' + Phaser.VERSION);
  this.game.debug.line('Weapon: ' + this.weaponSB.name);
  this.game.debug.stop();

  this.game.debug.bodyInfo(this.player.hull, 32, 32);
  this.game.debug.body(this.player.hull);
  this.game.debug.text('Player anchor', this.player.hull.x + 4, this.player.hull.y, 'red');
  this.game.debug.pixel(this.player.hull.x, this.player.hull.y, 'red', 4);
  
};