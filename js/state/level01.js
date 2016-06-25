app.level01 = {};

// create()
app.level01.create = function () {
  app.game.stage.backgroundColor = '#cc9966';

  this.player = new Player(640, 360);
  this.player.sub_create();
};

// update()
app.level01.update = function () {
  this.player.sub_update();
};

