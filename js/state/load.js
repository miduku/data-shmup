/**
 * Load assets needed throughout the game.
 */
app.load = {};

app.load.preload = function () {
  this.game.load.image('ship-player', 'assets/img/player.png');
  this.game.load.image('ship-boss', 'assets/img/boss.png');
  this.game.load.image('bullet-01', 'assets/img/player_shots.png');
  this.game.load.image('bullet-02', 'assets/img/bombs.png');

  this.game.load.json('weapons', 'assets/settings/weapons-boss.json');
};

app.load.create = function () {
  this.game.state.start('menu');
};