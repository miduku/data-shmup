app.level01 = {};

/**
 * create ()
 */
app.level01.create = function () {
  this.setupData();
  this.setupBackground();
  this.setupWeapons();
  this.drawGraph(this.arrHashtags, this.game.stage.width - 50);
  this.drawGraph(this.arrFollowers_count, this.game.stage.width - 100, -10, .1);
  this.drawGraph(this.arrFriends_count, this.game.stage.width - 150, -10, .2);
  this.setupPlayer();
  this.setupBoss();
  this.setupText();
  this.setupAudio();


  // Mouse input
  this.cursor = this.input.activePointer;

  this.initBossHealth = this.boss.health;

  this.music.loop = true;
  this.music.play();

  // console.log('weaponSB', this.weaponSB.getFirstExists(false));
  console.log('parsedJSON', this.parsedJSON);
  // console.log('matrixHashtags', this.matrixHashtags);
  // console.log('matrixFollowers', this.matrixFollowers);
  // console.log('largestNumberHashtags', this.largestNumberHashtags);
  // console.log('arrFollowers_count', this.arrFollowers_count);
};



/**
 * update ()
 */
app.level01.update = function () {
  // Weapons: Player
  if (this.cursor.isDown) {
    this.weaponSB.visible = true;
    this.weaponSB.fireFrom(this.player.hull);
  // console.log('weaponSB', this.weaponSB.getFirstExists(false));
  }

  // Weapons: Boss
  this.weaponAB.visible = true;
  this.weaponAB2.visible = true;
  this.weaponAB3.visible = true;

  if (this.boss.alive === true) {
    if (this.boss.health < this.initBossHealth*0.25) {
      this.weaponAB3.fireFrom(this.boss.hull);
      this.weaponAB2.fireFrom(this.boss.hull);
      this.weaponAB.fireFrom(this.boss.hull);
    }
    else if (this.boss.health < this.initBossHealth*0.5) {
      this.weaponAB3.fireFrom(this.boss.hull);
    }
    else if (this.boss.health < this.initBossHealth*0.75) {
      this.weaponAB2.fireFrom(this.boss.hull);
    }
    else if (this.boss.health < this.initBossHealth) {
      this.weaponAB.fireFrom(this.boss.hull);
    }
  }

  // Actors
  this.player.sub_update();
  this.boss.sub_update();

  // Hit detection
  this.physics.arcade.overlap ( this.weaponAB, this.player.hull, this.hitPlayer, null, this );
  this.physics.arcade.overlap ( this.weaponAB2, this.player.hull, this.hitPlayer, null, this );
  this.physics.arcade.overlap ( this.boss.hull, this.player.hull, this.crashPlayer, null, this );

  this.physics.arcade.overlap ( this.weaponSB, this.boss.hull, this.hitBoss, null, this );
};


/**
 * render ()
 */
app.level01.render = function () {
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
};


/**
 * Hit detection methods and animations
 */
app.level01.hitBoss = function (actor, bullet) {
  bullet.kill();
  this.boss.health--;
  this.textBossHealth.setText('Boss Health: ' + this.boss.health);
  
  if (this.boss.health <= 0) {
    actor.kill();
    this.boss.alive = false;
    this.explosion(actor);
  }
};

app.level01.hitPlayer = function (actor, bullet) {
  actor.kill();
  bullet.kill();
  this.explosion(actor);
};

app.level01.crashPlayer = function (enemy, actor) {
  actor.kill();
  this.boss.health = this.boss.health - 10;
  this.explosion(actor);
};

app.level01.explosion = function (actor) {
  this.explosionBig = this.game.add.sprite(actor.x, actor.y, 'boom-big');
  
  this.explosionBig.anchor.setTo(.5, .5);
  this.explosionBig.animations.add('boomBig');
  this.explosionBig.play('boomBig', 15, false, true);
  this.boom.play();
  this.music.stop();

  this.explosionBig.events.onAnimationComplete.add( function () {
    app.game.state.start('boot');
  });
};


/**
 * Setup
 */
app.level01.setupData = function () {
  // Dataset
  this.parsedJSON = JSON.parse(localStorage.getItem('hashtagJSON'));

  // Settings
  this.weapons    = this.game.cache.getJSON('weapons');
};


app.level01.setupBackground = function () {
  this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'bgr-space');
  this.background.autoScroll(-400, 0);
};


app.level01.setupWeapons = function () {
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
  this.arrFriends_count = [];
  for (let item of this.parsedJSON.statuses) {
    this.arrHashtags.push(eval(this.weapons.arr01.data));
    this.arrFollowers_count.push(eval(this.weapons.arr02.data));
    this.arrFriends_count.push(eval(this.weapons.arr03.data));
  }

  this.matrixHashtags  = this.arrayMatrix(this.arrHashtags);
  this.matrixFollowers = this.arrayMatrix(this.arrFollowers_count, 100);
  this.matrixFriends = this.arrayMatrix(this.arrFriends_count, 100);
  // console.log('matrixHashtags', this.matrixHashtags);

  // Weapons
  this.weaponSB = new Weapon.SingleBullet(this.game);
  this.weaponSB.visible = false;

  this.weaponAB = new Weapon.ArrayBullet(this.game, this.matrixHashtags, this.weapons.arr01);
  this.weaponAB.visible = false;
  this.weaponAB2 = new Weapon.ArrayBullet(this.game, this.matrixFollowers, this.weapons.arr02);
  this.weaponAB2.visible = false;
  this.weaponAB3 = new Weapon.ArrayBullet(this.game, this.matrixFollowers, this.weapons.arr03);
  this.weaponAB3.visible = false;
};


app.level01.setupPlayer = function () {
  this.player = new Player(0, 360);
  this.player.sub_create();
};


app.level01.setupBoss = function () {
  this.boss = new Boss(this.game.stage.width*.75, this.game.stage.height*.5);
  this.boss.sub_create();
};


app.level01.setupText = function () {
  var style = { font: '24px consolas', fill: '#ff0044', align: 'center' };

  this.textBossHealth = this.game.add.text(this.game.world.centerX, 20, 'Boss Health: ' + this.boss.health, style);
  this.textBossHealth.anchor.setTo(0.5, 0.5);
};

app.level01.setupAudio = function () {
  this.boom = this.game.add.audio('audio-boom');
  this.music = this.game.add.audio('music-level01');
};


app.level01.drawGraph = function (array, x, y, barHeight, barWidth, hexColor) {
  var hexColor  = hexColor || '#4f616e';
  var x         = x || 10;
  var y         = y || -10;
  var barHeight = barHeight || 10;
  var barWidth  = barWidth || 2;
  var visible   = visible || true;

  this.bmd = this.game.make.bitmapData(this.game.stage.width, this.game.stage.height);
  this.bmd.addToWorld();
  this.bmd.ctx.beginPath();

  for (let i = 0; i < array.length; i++) {
    this.bmd.ctx.rect( 
      (3 * i) + x, 
      this.game.stage.height - (barHeight * array[i]) + y, 
      barWidth, 
      barHeight * array[i] 
    );
  }
  
  this.bmd.ctx.fillStyle = hexColor;
  this.bmd.ctx.fill();

};