var deathScreen = {


	preload: function() {
	game.load.image("background","Krnic'sQuest/DeathScreen.png");
	},
	create: function() {
	game.add.sprite(0,0,"background");
	var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
	
	enterKey.onDown.addOnce(this.Main, this);
	},
		
	


	Main: function () {
		game.state.start("HomeScreen"); 
		isMusicPlaying = 1;
		health = 0;
		deathCounter = 0;
		checkPoint = 0;
		 jump=-550;
		speed=150;
		score = 0;
	}
};
