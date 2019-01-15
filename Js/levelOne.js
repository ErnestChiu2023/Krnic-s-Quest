
	var platforms;
	var grounds;
	var character;
	var countGround;
	var sky;
	var countSky;
	var hazards;
	var coins;
	var score=0;
	var scoreText;
	var ground;
	var music;
	var enemy;
	var clouds;
	var mobs;
	var ghost;
	var coinAudio;
	var boss;
	var boots;
	var jump=-550;
	var speed=150;
	var StatsText;
	var health=0;
	var bossSpeed=-300;  
	var checkPoint=0;
	var death;
	var jumpSound;
	var complete;
	var hearts;
	var heart1;
	var heart2; 
	var heart3;
	var heartB1;
	var heartB2;
	var heartB3;
	var deathCounter=0;
	var bossMusic;
	var musicCount=0;
	var bossText;
	var wallCount=0;
	var laugh;
	countGround=7680/100;
	countSky=10000/1024;
	
	
	
	//**************************************************************functions with no return type and 2 paramaters*******************************************
	var createHazard= function(width, height)
	{
		spikes= hazards.create(width,height,"spike");
	   	spikes.scale.setTo(0.5,0.5);
	   	spikes.body.immovable = true;
	}
	var createPlatform= function(width, height)
	{
		ledge = platforms.create(width, height, 'ground');
	    ledge.body.immovable = true;
	}
	var createCloud= function(width, height)
	{
		cloud = clouds.create(width, height, 'cloud');
		cloud.scale.setTo(0.5,0.5);
	    ledge.body.immovable = true;
	}
	var createGhost= function(width, height)
	{
		ghost = mobs.create(width, height, "ghost");
		ghost.scale.setTo(3,3);
	    ledge.body.immovable = true;
	    ghost.body.checkCollision.left = false;
		ghost.body.checkCollision.right = false;
		ghost.body.checkCollision.down = false;
	}
	//**************************************************************function with no paramaters***************************
	var killByBoss= function()
	{
		character.x=checkPoint;
    	character.y=100;
    	music.volume=0;
    	bossMusic.volume=0;
  		death.play();
  		deathCounter+=1;
		console.log(deathCounter);
		if (deathCounter >= 3) 
		{
					character.x = 0;
				checkPoint= 0;
					game.world.setBounds(0, 0, 1890, 920);
			game.state.start ("deathScreen");
		}
	}
	
	

	var killedBeforeBoss= function()
	{
			if (character.x>=4370) 
		  	{
		  		createCloud(3950,325);
	    	createCloud(4150,325);
	    	createCloud(4370,425);
		  	}
			character.x=checkPoint;
		  	character.y=0;
		  	music.volume=0;
		  	bossMusic.volume=0;
		  	death.play();
		  	enemy.x=0;
		  	enemy.y=-1100;
		  	deathCounter+=1;
			if (deathCounter >= 3) 
		{
				character.x = 0;
				checkPoint= 0;
					game.world.setBounds(0, 0, 1890, 920);
			game.state.start ("deathScreen");
		}
		  	
	}
	var die= function(character, hazards) {

    // Removes the player from the screen
  	killedBeforeBoss();
		}


	var hdie= function(character, enemy) {

    // Removes the player from the screen
    killedBeforeBoss();
	}
	
	

	var collectCoin= function (character, coins) {

    // Removes the coin from the screen
    coinAudio.play();
    coins.kill();
    score += 10;
    scoreText.text = "Score: " + score;
}
	var collectBoot= function(character, boots) {

    // Removes the coin from the screen
   	boots.kill();
    jump-=200;
    speed+=200;
   	StatsText.text = "Stats: speed="+speed+", jump="+(-jump);
}


var bop= function (character, mobs) {
    // Removes the mob from the screen
    mobs.kill();
    character.body.velocity.y = jump;
    score+=10;
    scoreText.text = "Score: " + score;
}
var kill= function (character, mobs) {
    killedBeforeBoss();
}
var killedByBoss= function (character, boss) {
    killByBoss();
}

var damage= function (character, boss) {
	character.body.velocity.y =jump;
	boss.animations.stop();
    health+=1;
   	if (health>=3) 
   	{
   		bossMusic.stop();
   		boss.kill();
   		score+=100;
    	scoreText.text = "Score: " + score;
    	complete.play();
		character.x = 0;
			game.camera.x=0;
			game.world.setBounds(0,0,1890,920);
		game.state.start ("Win");
   	}
	

   }
	
var levelOne = {


	
	
	
	preload: function() {
		//**********************************************************************************loading in the images************************
		game.load.spritesheet("Mr.Krnic","Krnic'sQuest/KrnicRun.png",127,140,8);
		game.load.image("ground","Krnic'sQuest/ground.png");
		game.load.image("sky","Krnic'sQuest/sky1.jpg");
		game.load.spritesheet("coins","Krnic'sQuest/coins1.png",58,64,6);
		game.load.image("spike","Krnic'sQuest/spike.png");
		game.load.spritesheet("boss","Krnic'sQuest/Bossmans.png",413,549,10);
		//game.load.image("sword","Krnic'sQuest/coins")
		game.load.audio('music', ["Krnic'sQuest/music2.mp3"]);
		game.load.audio('bossMusic', ["Krnic'sQuest/bossMusic.mp3"]);
		game.load.audio('jumpSound', ["Krnic'sQuest/jump.mp3"]);
		game.load.audio('coin', ["Krnic'sQuest/coin.mp3"]);
		game.load.audio('died', ["Krnic'sQuest/Death.mp3"]);
		game.load.audio('complete', ["Krnic'sQuest/complete.mp3"]);
		game.load.image("boots","Krnic'sQuest/boots1.png");
		game.load.image("enemy","Krnic'sQuest/wall.png");
		game.load.image("cloud","Krnic'sQuest/cloud.png");
		game.load.image("heart","Krnic'sQuest/heart.png");
		game.load.spritesheet("ghost","Krnic'sQuest/ghost.png",23,22,8);
		game.load.image("dieMsg","Krnic'sQuest/dieMsg.png");
		game.load.image("laugh","Krnic'sQuest/laugh.png")
	},
	

	create: function() {
	
		console.log("setUp");
		//to enable Arcade Physics system
		game.physics.startSystem(Phaser.Physics.ARCADE);
		//A simple background for our game
		grounds=game.add.group();
		grounds.enableBody=true;
		//generating the ground
		for (var i=0; i < countGround; i++)
		{
			ground=grounds.create(i*100, 877,"ground");
			ground.body.immovable= true;
			if (i>3 && i<10) 
			{
				ground.kill();
			}

			else if (i>12 && i<19) 
			{
				ground.kill();
			}
		}
		//genrating the background 
		for (var i=0; i < countSky; i++)
		{
			game.add.tileSprite(i*1920, 0, 1920, 1920, 'sky');
		}
		

		//setting the world boundaries
		game.world.setBounds(0, 0, 10000, 1028);
		platforms=game.add.group();
		//enabling physics
		platforms.enableBody=true;
		//creating the platforms
		var ledge=createPlatform(300,765);
		createPlatform(400,615);
		createPlatform(500,515);
		createPlatform(800,515);
		createPlatform(1000,715);
		createPlatform(1350,715);
		createPlatform(1550,615);
		createPlatform(1750,785);
		createPlatform(2050,785);
		createPlatform(2200,635);
		createPlatform(2350,485);
		createPlatform(2500,335);
		createPlatform(3300,715);
		createPlatform(3400,715);
		createPlatform(3500,715);
		createPlatform(3650,585);
		createPlatform(3800,455);
		createPlatform(6700,210);
		createPlatform(6800,210);
		createPlatform(6600,210);
		createPlatform(6900,210);
		createPlatform(6500,210);

		




		
	    //create the hazards(spikes)
	    hazards=game.add.group();
	    hazards.enableBody=true;
	    var spikes= createHazard(400,815);
	    createHazard(700,815);
	    createHazard(1300,815);
	    createHazard(1600,815);
	    createHazard(2300,815);
	    createHazard(2530,815);
	    createHazard(3500,815);
	    createHazard(3900,815);
	    createHazard(4250,815);

	    //creating the falling platforms
	    clouds=game.add.group();
	    clouds.enableBody=true;
	    var cloud=createCloud(3950,325);
	    createCloud(4150,325);
	    createCloud(4370,425);

	    //create mobs
	    mobs=game.add.group();
	    mobs.enableBody=true;
	    ghost=createGhost(1200,700);
	    ghost=createGhost(1475,600);
	    ghost=createGhost(2000,500);
	    ghost=createGhost(2600,700);
	    ghost=createGhost(3700,200);
	    ghost=createGhost(4400,200);
	    //adding the animation for the enemies
	    mobs.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5,6,7], 7, true);
	    mobs.callAll('animations.play', 'animations', 'spin');


		




	    //******************************************************************************Creating the Character*******************************
	    //add the character's sprite into the game
	    character= game.add.sprite(checkPoint, 500, 'Mr.Krnic');
	    character.scale.setTo(0.6,0.75);
	    game.physics.arcade.enable(character);
    	character.body.gravity.y = 900;
    	character.body.collideWorldBounds = true;
    	//two animations for the character
    	character.animations.add("right", [0,1,2,3],10, true);
    	character.animations.add("left", [4,5,6,7],10, true);
    	game.camera.follow(character);
    	//****************************************************************Boss*************************************
    	boss=game.add.sprite(7800,300,"boss");
		game.physics.arcade.enable(boss);
    	boss.body.gravity.y = 5000;
    	boss.body.collideWorldBounds = true;
    	boss.body.checkCollision.left = false;
		boss.body.checkCollision.right = false;
		health=0;
		boss.scale.setTo(0.5,0.5);
		boss.anchor.setTo(0.5);
		boss.animations.add("walk",[6,7,8,9],5,true);
		boss.animations.add("run",[6,7,8,9],10,true);
		boss.animations.add("sprint",[6,7,8,9],15,true);
		boss.animations.play("walk");
		
		//*****************************************die msg*****************************************
		dieMsg=game.add.sprite(7800,300,"dieMsg");
		game.physics.arcade.enable(dieMsg);
    	dieMsg.body.gravity.y = 0;
    	dieMsg.y=600;
    	
    	//********************************************************************enemy**********************************
    	enemy=game.add.sprite(0,-1100,"enemy");
    	enemy.scale.setTo(1,1);
		game.physics.arcade.enable(enemy);
		enemy.body.gravity.y=0;

    	//*******************************************************************************adding the coins**************************************
    	coins=game.add.group();
    	coins.enableBody=true;
    	coins.create(415,550,"coins");	
    	coins.create(680,400,"coins");
    	coins.create(320,700,"coins");
    	coins.create(515,450,"coins");
    	coins.create(815,450,"coins");
    	coins.create(1015,650,"coins");
    	coins.create(1215,815,"coins");
    	coins.create(1370,650,"coins");
    	coins.create(1560,400,"coins");
    	coins.create(1620,700,"coins");
    	coins.create(2060,700,"coins");
    	coins.create(2200,800,"coins");
    	coins.create(2220,550,"coins");
    	coins.create(2360,300,"coins");
    	coins.create(2660,150,"coins");
    	coins.create(3400,800,"coins");
    	coins.create(3400,500,"coins");
    	coins.create(3665,500,"coins");
    	coins.create(3815,300,"coins");
    	coins.create(4015,200,"coins");
    	coins.create(4265,200,"coins");
    	coins.create(4515,600,"coins");
    	coins.create(4700,815,"coins");
		coins.create(4800,700,"coins");
		coins.create(4900,815,"coins");
		coins.create(5100,815,"coins");
		coins.create(5300,815,"coins");
		coins.create(5500,815,"coins");
		coins.create(2600,500,"coins");


    	coins.callAll('animations.add', 'animations', 'spin', [0,1,2,3,4,5], 12, true);
	    coins.callAll('animations.play', 'animations', 'spin');
	    //******************************************hearts*******************************************
	    hearts=game.add.group();
	    hearts.enableBody=true;
	    heart1=hearts.create(0,100,"heart");
	    heart1.scale.setTo(0.10,0.10);
	    heart2=hearts.create(100,100,"heart");
	    heart2.scale.setTo(0.10,0.10);
	    heart3=hearts.create(200,100,"heart");
	    heart3.scale.setTo(0.10,0.10);
	    hearts.fixedToCamera=true;
	    //*****************************************************************creating the boots***********************************
	   	boots=game.add.group();
	   	boots.enableBody=true;
	   	boots.create(5500,780,"boots");
		
    	//******************************************************************************score board and upgrades*******************************************
    	scoreText = game.add.text(16, 16, 'Score: 0'+deathCounter, { fontSize: '32px', fill: '#000' });
    	scoreText.fixedToCamera=true;
    	StatsText = game.add.text(16, 50, "Stats: speed="+speed+", jump="+(-jump), { fontSize: '32px', fill: '#000' });
    	StatsText.fixedToCamera=true;
    	//******************************************************************************music**************************************
    	music = game.add.audio('music');
		music.play();
		music.volume=0.5; 
		coinAudio=game.add.audio("coin");
		death=game.add.audio("died");

		jumpSound=game.add.audio("jumpSound");
		jumpSound.volume=0.2;
		complete=game.add.audio("complete");
		bossMusic=game.add.audio("bossMusic");
		
			
	var backKey = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
	
	backKey.onDown.addOnce(this.Main, this);

    },

	update: function() {
		//group interactions 
		cursors = game.input.keyboard.createCursorKeys();
		//interactions taht lead to functions
		game.physics.arcade.overlap(character, hazards, die, null, this);
		game.physics.arcade.overlap(character,enemy , hdie, null, this);
		game.physics.arcade.overlap(character, coins, collectCoin, null, this);	
		game.physics.arcade.overlap(character,enemy , hdie, null, this);
		game.physics.arcade.collide(character,mobs , bop, null, this);
		game.physics.arcade.overlap(character,mobs,kill,null,this);
		game.physics.arcade.overlap(character,boots,collectBoot,null,this);
		game.physics.arcade.collide(coins, grounds);
		game.physics.arcade.collide(character,mobs);
		game.physics.arcade.collide(character,boss);
		game.physics.arcade.collide(grounds,boss);
		game.physics.arcade.collide(dieMsg,grounds);
		

		var hitcloud=game.physics.arcade.collide(character,clouds);
    	var hitPlatform = game.physics.arcade.collide(character, platforms);
    	var hitHazard = game.physics.arcade.collide(character, hazards);
    	var hitGround=game.physics.arcade.collide(character,grounds);
    	
    	game.physics.arcade.collide(character,boss , damage, null, this);
		game.physics.arcade.overlap(character,boss,killedByBoss,null,this);
    	//*************************movements**************************************************
    	//  Reset the players velocity (movement)
	   
	     character.body.velocity.x = 0;
	     //character movements
	    if (cursors.left.isDown)
	    {
	        //  Move to the left
	        
	       	character.body.velocity.x = -speed;
	    	//game.camera.x -= 1;
	        //character.animations.play('walk');
	       	character.animations.play("left");
	    }
	    else if (cursors.right.isDown)
	    {
	        //  Move to the right
	        
	        character.body.velocity.x = speed;
	        //game.camera.x += 1
	       	character.animations.play("right");
			
	        
	    }
	    else
    	{
        	//  Stand still
        	 character.animations.stop();	
        	 character.frame=0;

    	}
    	
	    
	    //  Allow the player to jump if they are touching the ground.
	    if (cursors.up.isDown && character.body.touching.down && hitPlatform)
	    {
			music.volume=0.5;
			if (musicCount>0)
			{
				bossMusic.volume=1;
			}
	        character.body.velocity.y = jump;
	        jumpSound.play();
	    }
	    if (cursors.up.isDown && character.body.touching.down && hitGround)
	    {
			music.volume=0.5;
			if (musicCount>0)
			{
				bossMusic.volume=1;
			}
	        character.body.velocity.y = jump;
	        jumpSound.play();


	    }
	    if (cursors.up.isDown && character.body.touching.down && hitcloud)
	    {
	    	
			music.volume=0.5;
			if (musicCount>0)
			{
				bossMusic.volume=1;
			}
	        character.body.velocity.y = jump;
	        jumpSound.play();
	      	    }
	   //*********************************************************************enemy***************************
		if (character.x>=1000) 
		{
			enemy.body.collideWorldBounds=true;
			enemy.body.velocity.y=450;
			enemy.body.velocity.x=130;
			

		}
		else  
		{
			enemy.body.collideWorldBounds=false;
			enemy.body.velocity.x=0;
			enemy.body.velocity.y=0;
		}
		//****************************************spawns the boss when you get to 5700 pixels******************
		if (character.x>=5700) 
		{
			enemy.kill();
			game.world.setBounds(5700, 0, 2056, 1028);
			checkPoint=6700;
			if (musicCount==0) 
			{
				bossMusic.play();
				///spawns the boss hearts
				heartB1=hearts.create(1550,50,"heart");
	   	 		heartB1.scale.setTo(0.10,0.10);
			    heartB2=hearts.create(1650,50,"heart");
			    heartB2.scale.setTo(0.10,0.10);
			    heartB3=hearts.create(1750,50,"heart");
			    heartB3.scale.setTo(0.10,0.10);
			    musicCount+=1;
			}
			
			music.stop();
			bossText= game.add.text(1600, 20, "Lunch Duty Health", { fontSize: '32px', fill: '#000' });
    		bossText.fixedToCamera=true;
		}

		
		var high=400;
		var low=300;
		var testSpeed;
		//***************changed the speed and animation of the boss as he loses health********************

		if (health==1) 
		{
			
	        boss.animations.play("run");
			high=600;
			low=500;
			heartB1.kill();
			dieMsg.kill();
		}
		if (health==2) 
		{
			
	        boss.animations.play("sprint");
			high=1000;
			low=900;
			heartB2.kill();

		}
		if (health==3) 
		{
			heartB3.kill();
		}
		if (boss.x>5700&&boss.x<5840) 
		{
			if (deathCounter<3)
		{
			testSpeed=Math.floor((Math.random() * high) + low);
			dieMsg.body.velocity.x=testSpeed;
			boss.body.velocity.x=testSpeed;
			boss.scale.setTo(-0.5,0.5);
		}
		}

		if (boss.x>7600) 
		{
			if (deathCounter<3)
		{
			testSpeed=-Math.floor((Math.random() * high) + low);
			dieMsg.body.velocity.x=testSpeed;
			boss.body.velocity.x=testSpeed;

			boss.scale.setTo(0.5,0.5);
		}
		}
		//*********************************************heartCounter*********************************
		if (deathCounter==1) 
		{
			heart1.kill();
			
		}
		if (deathCounter==2)
		{
			heart2.kill();

		}
		if (deathCounter>=3)
		{
			heart3.kill();
			character.kill();
			boss.body.velocity.x=0;
			dieMsg.kill();
			boss.frame=6;
			laugh=game.add.sprite(7800,600,"laugh");
    		game.physics.arcade.enable(laugh);
    		laugh.body.gravity.y = 0;
    		laugh.x=boss.x;
		}


		

		 
		
		


		
		 
		

 		  
	   
	},


	Main: function () {
		music.stop();
		isMusicPlaying = 1;
		game.state.start("HomeScreen"); 		
		health = 0;
		deathCounter = 0;
		score = 0;
	}

	
};
