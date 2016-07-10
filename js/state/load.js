/**
 * Load assets needed throughout the game.
 */
app.load = {};

app.load.preload = function () {
  this.game.load.image('ship-player', 'assets/img/player.png');
  this.game.load.image('ship-boss', 'assets/img/boss.png');

  this.game.load.image('bullet-01', 'assets/img/player_shots.png');
  this.game.load.image('bullet-02', 'assets/img/bombs.png');

  this.game.load.image('bgr-space', 'assets/img/space.png');
  this.game.load.image('bgr-pentagon01', 'assets/img/pentagon_01.png');

  // http://www.widgetworx.com/spritelib/
  this.game.load.spritesheet('boom-big', 'assets/img/boom-big.png', 65, 65);

  // http://opengameart.org/content/laser-fire
  this.game.load.audio('audio-pew-player', 'assets/audio/laser1.wav');

  // http://opengameart.org/content/boom-pack-1
  this.game.load.audio('audio-boom', 'assets/audio/boom4.wav');

  // http://opengameart.org/content/5-chiptunes-action
  // this.game.load.audio('music-level01', 'assets/audio/Juhani-Junkala-Retro Game Music Pack-Level-1.wav');
  this.game.load.audio('music-level01', ['assets/audio/Juhani-Junkala-Retro-Game-Music-Pack-Level-1.ogg', 'assets/audio/Juhani-Junkala-Retro-Game-Music-Pack-Level-1.mp3']);

  this.game.load.json('weapons', 'assets/settings/weapons-boss.json');
};

app.load.create = function () {
  this.game.state.start('menu');
};