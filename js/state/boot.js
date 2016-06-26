/**
 * Boot state, mainly starts the engine
 */

// TODO: add progress bar
app.boot = {};

app.boot.create = function () {
  // Start arcade physics
  this.game.physics.startSystem(Phaser.Physics.ARCADE);
  // this.game.world.enableBody = true;
  
  this.game.state.start('load');
};