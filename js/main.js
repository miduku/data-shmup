// Append states we are using into our game object in the main.js file.
app.game.state.add('load', app.load);
app.game.state.add('boot', app.boot);
app.game.state.add('level01', app.level01);

// Start the boot state which will take control from here.
app.game.state.start('boot');