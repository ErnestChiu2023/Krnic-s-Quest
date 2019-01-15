//***************ARRAYS*********************
var LeaderboardNames = ["Player1", "Jeff", "Dunkey Keng", "Cornholio", "Krnic Killers"];
var Leaderscores = [0,123,300,666,1000 ];
var Slot1;
var Slot2;
var Slot3;
var Slot4;
var Slot5;


var LBoard = {




	preload: function() {
		game.load.spritesheet("Leaderboardimage","Krnic'sQuest/HighScore.png" ,1890, 920, 6);
	},
	create: function() {
	
	var NameBox = prompt("Please enter your name","Steven Keller");
	
	
	LeaderboardNames[0] = NameBox;
	
	Leaderscores[0] = score;
	
	//*******************use of .length and bubble sorting****************
            for (q = 0; q < Leaderscores.length; q++) {
                for (var x = 0; x < Leaderscores.length - 1; x++)
                {
                    if (Leaderscores[x] < Leaderscores[x + 1])
                    {
                        var y = Leaderscores[x];
                        Leaderscores[x] = Leaderscores[x + 1];
                        Leaderscores[x + 1] = y;

                        var temp = LeaderboardNames[x];
                        LeaderboardNames[x] = LeaderboardNames[x + 1];
                        LeaderboardNames[x + 1] = temp;
                    }
                }
            }
	var leaderboardimage = game.add.sprite(0,0,"Leaderboardimage");
	leaderboardimage.animations.add('play',[0,1,2,3,4,5,],true);
	leaderboardimage.animations.play("play",5,true);
	
	
	
	Slot1 = game.add.text(940, 460, LeaderboardNames [0] +" : "+ Leaderscores[0],
	{font: "Arial", fill: "#ff0044", align: "center"});
	Slot2 = game.add.text(940, 510, LeaderboardNames [1] +" : "+Leaderscores[1],
	{font: "Arial", fill: "#ff0044", align: "center"});
	Slot3 = game.add.text(940, 560, LeaderboardNames [2] +" : "+ Leaderscores[2],
	{font: "Arial", fill: "#ff0044", align: "center"});
	Slot4 = game.add.text(940, 610, LeaderboardNames [3] +" : "+ Leaderscores[3],
	{font: "Arial", fill: "#ff0044", align: "center"});
	Slot5 = game.add.text(940, 660, LeaderboardNames [4] +" : "+ Leaderscores[4],
	{font: "Arial", fill: "#ff0044", align: "center"});
	
	
	
	Slot1.fontSize = 20;
	Slot2.fontSize = 20;
	Slot3.fontSize = 20;
	Slot4.fontSize = 20;
	Slot5.fontSize = 20;
	
	var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
	
	enterKey.onDown.addOnce(this.Main, this);
	
	
//***************SUBSTRING USE*********************
	var FirstInitial = NameBox.substring(0,1);
	var SecondInitial = NameBox.substring (NameBox.indexOf(" ") + 1, NameBox.indexOf(" ") + 2);
	NameBox = FirstInitial + "." + SecondInitial;
	
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