app.game.state.add('load', app.load);
app.game.state.add('boot', app.boot);
app.game.state.add('level01', app.level01);

app.game.state.start('boot');