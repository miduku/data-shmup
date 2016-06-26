// TODO: add progress bar
app.boot = {};

app.boot.create = function () {
  // Start arcade physics
  app.game.physics.startSystem(Phaser.Physics.ARCADE);
  
  app.game.state.start('load');
};