app.level01 = {};

/**
 * create ()
 */
app.level01.create = function () {
  this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'bgr-space');
  this.background.autoScroll(-100, 0);

  this.parsedJSON = JSON.parse(localStorage.getItem('hashtagJSON'));
  this.weapons    = this.game.cache.getJSON('weapons');

  // array matrix function
  this.arrayMatrix = function (arr, steps) {
    var steps = steps || 1;

    this.output = {
      matrix: [],
      largestNumber: Math.max.apply(Math, arr),
      steps: steps
    };

    for (let i = 0; i < arr.length; i++) {
      this.output.matrix[i] = [];

      for (let j = 0; j < this.output.largestNumber; j = j+steps) {
        if (j+1 <= arr[i]) {
          this.output.matrix[i][j] = 1;
        } else {
          this.output.matrix[i][j] = 0;
        }
      }
    }

    return this.output;
  }; // END array matrix function


  // Weaponpattern Data for Boss from parsedJSON
  this.arrHashtags        = [];
  this.arrFollowers_count = [];
  for (let item of this.parsedJSON.statuses) {
    this.arrHashtags.push(item.entities.hashtags.length);
    this.arrFollowers_count.push(item.user.followers_count);
  }

  this.matrixHashtags  = this.arrayMatrix(this.arrHashtags);
  this.matrixFollowers = this.arrayMatrix(this.arrFollowers_count, 50);
  console.log('matrixHashtags', this.matrixHashtags);


  // Mouse input
  this.cursor = this.input.activePointer;

  // Weapons
  this.weaponSB = new Weapon.SingleBullet(this.game);
  this.weaponSB.visible = false;

  this.weaponAB = new Weapon.ArrayBullet(this.game, this.matrixHashtags, this.weapons.arr01);
  this.weaponAB.visible = false;
  this.weaponAB2 = new Weapon.ArrayBullet(this.game, this.matrixFollowers, this.weapons.arr02);
  this.weaponAB2.visible = false;

  // Actors
  this.player = new Player(640, 360);
  this.player.sub_create();

  this.boss = new Boss(640, 360);
  this.boss.sub_create();




  console.log('weaponSB', this.weaponSB.getFirstExists(false));
  // console.log('parsedJSON', this.parsedJSON);
  // console.log('matrixHashtags', this.matrixHashtags);
  // console.log('matrixFollowers', this.matrixFollowers);
  // console.log('largestNumberHashtags', this.largestNumberHashtags);
  // console.log('arrFollowers_count', this.arrFollowers_count);
};



/**
 * update ()
 */
app.level01.update = function () {
  // Weapons (player)
  // this.playerFire(this.weaponSB);
  if (this.cursor.isDown) {
    this.weaponSB.visible = true;
    this.weaponSB.fireFrom(this.player.hull);
  // console.log('weaponSB', this.weaponSB.getFirstExists(false));
  }


  this.weaponAB.visible = true;
  this.weaponAB.fireFrom(this.boss.hull);
  this.weaponAB2.visible = true;
  this.weaponAB2.fireFrom(this.boss.hull);

  // Actors
  this.player.sub_update();
  this.boss.sub_update();
  // console.log(this.nextFire);

  this.physics.arcade.overlap ( this.weaponAB, this.player.hull, this.hitPlayer, null, this );
  this.physics.arcade.overlap ( this.weaponAB2, this.player.hull, this.hitPlayer, null, this );

  this.physics.arcade.overlap ( this.weaponSB, this.boss.hull, this.hitBoss, null, this );
};

app.level01.hitBoss = function (layer, bullet) {
  bullet.kill();
}

app.level01.hitPlayer = function (layer, bullet) {
  layer.kill();
}

/**
 * render ()
 */
// app.level01.render = function () {
//   this.game.debug.start(20, 20, 'hotpink');
//   this.game.debug.line('Debugging Phaser ' + Phaser.VERSION);
//   this.game.debug.line('Weapon: ' + this.weaponSB.name);
//   this.game.debug.stop();

//   this.game.debug.bodyInfo(this.player.hull, 32, 32);
//   this.game.debug.body(this.player.hull);
//   this.game.debug.text('Player anchor', this.player.hull.x + 4, this.player.hull.y, 'red');
//   this.game.debug.pixel(this.player.hull.x-2, this.player.hull.y-2, 'red', 4);

//   // // this.game.debug.bodyInfo(this.boss.hull, 32, 32);
//   this.game.debug.body(this.boss.hull);
//   this.game.debug.text('Boss anchor', this.boss.hull.x + 4, this.boss.hull.y, 'red');
//   this.game.debug.pixel(this.boss.hull.x, this.boss.hull.y, 'red', 4);
// };