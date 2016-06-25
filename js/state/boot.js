app.boot = {};

app.boot.create = function () {
  app.game.physics.startSystem(Phaser.Physics.ARCADE);

  app.game.state.start('load');
}