var WinScreen ={


preload: function() {
	game.load.image("winbg","Krnic'sQuest/YoureWinner.png");
},
	create: function() {
		
	var winbg = game.add.sprite(0,0,"winbg");
	
	
	var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
	
	enterKey.onDown.addOnce(this.Return, this);
	
	
	
	},
	Return: function () {
		game.state.start("HighScore"); 
	}
};
