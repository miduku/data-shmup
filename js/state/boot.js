/**
 * Boot state, mainly starts the engine
 */

// TODO: add progress bar
app.boot = {};

app.boot.create = function () {
  // Start arcade physics
  this.game.physics.startSystem(Phaser.Physics.ARCADE);
  this.game.world.enableBody = true; // applies physics to every item we create in our game.
  
  this.game.state.start('load');
};