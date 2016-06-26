/**
 * Load assets needed throughout the game.
 */
app.load = {};

app.load.preload = function () {
  this.game.load.image('ship-player', 'assets/img/player.png');
  this.game.load.image('bullet-01', 'assets/img/bullet1.png');
};

app.load.create = function () {
  this.game.state.start('level01');
};