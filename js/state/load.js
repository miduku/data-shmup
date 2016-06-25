app.load = {};

app.load.preload = function () {
  app.game.load.image('ship-player', 'assets/img/player.png');
  app.game.load.image('bullet-01', 'assets/img/bullet1.png');
};

app.load.create = function () {
  app.game.state.start('level01');
};