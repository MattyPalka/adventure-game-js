var canvas, canvasContext;

var blueWarrior = new warriorClass();


window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	colorRect(0,0, canvas.width,canvas.height, 'black');
	colorText("LOADING IMAGES", canvas.width/2, canvas.height/2, 'white');

	loadImages();
}

function imageLoadingDoneSoStartGame() {
	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);

	setupInput();

	loadLevel(levelList[levelNow]);
}

function nextLevel() {
	levelNow++;
	if(levelNow >= levelList.length) {
		levelNow = 0;
	}
	loadLevel(levelList[levelNow]);
}

function loadLevel(whichLevel) {
	worldGrid = whichLevel.slice();

	blueWarrior.reset(warriorPic, "Blue Lagoon")
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
	blueWarrior.move();

}

function drawAll() {
	drawWorlds();
	blueWarrior.draw();

} 