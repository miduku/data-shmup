app.level01 = {};

// create()
app.level01.create = function () {
  this.stage.backgroundColor = '#ddd';
  this.fireArc = 45;
  this.rotate = 0;
  this.nextFire = 0;

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
  for (let item of this.parsedJSON.statuses) {
    this.bulletArray.push(item.entities.hashtags.length);
  }
  this.largestNumber = Math.max.apply(Math, this.bulletArray); 

  console.log(this.bulletArray);
  console.log(this.largestNumber);
};

// update()
app.level01.update = function () {

  // Weapons (player)
  // if mouse is klicked, shoot weapon
  if (this.cursor.isDown) {
    this.weaponSB.visible = true;
    this.weaponSB.fireFrom(this.player.hull);
  }

  // Weapons (boss)
  this.weaponAB.visible = true;

  if (this.game.time.now > this.nextFire) {
    this.rotate += this.bulletArray.length;
    this.nextFire = this.game.time.now + this.weaponAB.fireRate;

    let arcSetter = this.fireArc / this.bulletArray.length;

    for (let i = 0; i < this.bulletArray.length; i++) {
      if (this.bulletArray[i] <= this.largestNumber) {
        this.weaponAB.fireFrom(this.boss.hull, (i*arcSetter) /*+ this.rotate*/);
      }
    }
  }

  // Actors
  this.player.sub_update();
  this.boss.sub_update();
  // console.log(this.nextFire);
  
};


app.level01.shoot = function (rotate) {
}


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