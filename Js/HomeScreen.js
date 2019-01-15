var MainMusic;
var isMusicPlaying = 1;
var HomeScreenState = {
	
preload: function() {
	game.load.spritesheet("background","Krnic'sQuest/FinalStart.png", 1890, 920, 6);

game.load.audio('MainMusic', ["Krnic'sQuest/Zelda Main Theme Song.mp3"]);

	
},
	create: function() {
		
	var background = game.add.sprite(0,0,"background");
	background.animations.add('play',[0,1,2,3,4,5,],true);
	background.animations.play("play",5,true);
	
	var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
	enterKey.onDown.addOnce(this.Start, this);
	
	var hKey = game.input.keyboard.addKey(Phaser.Keyboard.H);
	hKey.onDown.addOnce(this.Help, this);
	
	if(isMusicPlaying === 1)
	{
	MainMusic = game.add.audio('MainMusic');
		MainMusic.play();
		MainMusic.volume=0.5; 
		isMusicPlaying = 0;
	}
	},


	Start: function () {
		game.state.start("level1"); 
		MainMusic.destroy();
	},
	
	Help: function () {
		game.state.start ("Help");
	}
	
};