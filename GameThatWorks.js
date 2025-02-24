// TODO

// 1. make it harder 
// 2. dlete all code and quitr coding and dleete gitbin





/*******************************************************/
// P5.play: t22_keyboard
// Move sprite via keyboard
// Written by Scott
/*******************************************************/

// setup()
/*******************************************************/

const GameWidth = 800;
const GameHeight = 800;
const NumberOfCoins = 1000;
const TextSize = 35;
const GameSeconds = 15;
var Score = 0;

function setup() {
	console.log("setup: ");
	cnv = new Canvas(GameWidth, GameWidth);
	world.gravity.y = 10;

	Player = new Sprite(500, 200, 100, 100, 'd');
	Player.color = "White";
	Player.vel.x = 2;
	Player.bounciness = 0;

	Spinner = new Sprite(500, 800, 100, 500, 'k');
	Spinner.color = "Green";
	Spinner.rotationSpeed = -5;
	Spinner.vel.x = 0;
	Spinner.bounciness = 0;
	Spinner.friction = 200;

	WallGroup = new Group();
	Wall_Left = new Sprite(GameWidth + 10, 0, 20, GameHeight * 2, 'k');
	WallGroup.add(Wall_Left);
	Wall_Right = new Sprite(-10, 0, 20, GameHeight * 2, 'k');
	WallGroup.add(Wall_Right);
	Wall_Top = new Sprite(0, -10, GameWidth * 2, 20, 'k');
	WallGroup.add(Wall_Top);
	Wall_Bottom = new Sprite(0, GameHeight + 10, GameWidth * 2, 20, 'k');
	WallGroup.add(Wall_Bottom);

	WallGroup.bounciness = 1.5;

	CoinGroup = new Group();
	for (var i = 0; i < NumberOfCoins; i++) {
		MakeCoin();
	}

	function MakeCoin() {
		Coin = new Sprite(Math.random() * GameWidth, Math.random() * GameHeight, 20, "d");
		Coin.vel.x = 3;
		Coin.vel.y = 4;
		Coin.bounciness = 0.5;
		Coin.friction = 0;
		CoinGroup.add(Coin);
	}

	CoinGroup.collides(Player, CollisionFunction);
	function CollisionFunction(WhichCoin, Spinner) {
		WhichCoin.remove();
        Score++;
	}
}
	
/*******************************************************/
// draw()
/*******************************************************/
function draw() {
	
	// Controls
    Player.moveTowards(mouseX, mouseY, 0.05);
	if (mouse.presses()) {
		Player.moveTo(mouseX, mouseY, 10);
	}

	// Display text and check if game is over
    if(millis() >= GameSeconds * 1000) {
		// If game is over remove coins and 
        CoinGroup.remove();
        Spinner.remove();
        Player.remove();
		if(Score >= NumberOfCoins) {
			background('green');
			text("You Won :)", GameWidth / 2 - 75, GameHeight / 2 - 20);
			text("Your Score: " + Score + "/" + NumberOfCoins, GameWidth / 2 - 150, GameHeight / 2 + TextSize);
		} else {
			background('red');
			text("Game Over :(", GameWidth / 2 - 110, GameHeight / 2 - 20);
			text("Your Score: " + Score + "/" + NumberOfCoins, GameWidth / 2 - 150, GameHeight / 2 + TextSize);
		}
    } else {
		background('red');
		textSize(TextSize);
        fill('white');
        text("Score: " + Score + "/" + NumberOfCoins, 15, TextSize);
        text("Timer: " + (GameSeconds - Math.floor(millis()/1000)), 15, TextSize * 2 + 15);
	}
}

/*******************************************************/
//  END OF APP
/*******************************************************/