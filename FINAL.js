<script src="phaser.min.js"></script>
<script src="phaser.js"></script>
<script>

//MASTER HACK WEBSITE 69
//http://phaser.io/tutorials/making-your-first-phaser-game/index

var game = new Phaser.Game(800,600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var background;
var platform;

var player;

var playerSpeed;






var test ={
function preload() {

game.load.image("background","Krnic's Quest/1172262_orig.jpg");




}
function create() {

//  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

//  A simple background for our game
background = game.add.sprite(0,0,"background");


alert("wow");
}
function update() {




}
}
</script>