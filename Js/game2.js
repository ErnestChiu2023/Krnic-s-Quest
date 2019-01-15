

var game = new Phaser.Game(1890, 920, Phaser.AUTO, 'gameDiv');



game.state.add("HomeScreen", HomeScreenState);
game.state.add("Help", HelpScreen);
game.state.add("HighScore", LBoard);
game.state.add("Win", WinScreen);
game.state.add("deathScreen", deathScreen);
game.state.add("level1", levelOne);

game.state.start("HomeScreen");
