var HelpScreen ={


preload: function() {
	game.load.image("helpbg","Krnic'sQuest/FinalHelp.png");
},
	create: function() {
		
	var helpbg = game.add.sprite(0,0,"helpbg");
	
	
	var backKey = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
	
	backKey.onDown.addOnce(this.Return, this);
	
	
	
	},
	Return: function () {
		game.state.start("HomeScreen"); 
	}
};
