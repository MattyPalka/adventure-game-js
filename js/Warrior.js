const WALK_SPEED = 3;

function warriorClass() {
	this.x = 75;
	this.y = 75;
	
	this.myWarriorPic; // which picture to use
	this.name = "Untitled Warrior";
	this.keyHeld = 0;

	this.keyHeld_Up = false;
	this.keyHeld_Down = false;
	this.keyHeld_Left = false;
	this.keyHeld_Right = false;

	this.controlKeyUp;
	this.controlKeyRight;
	this.controlKeyDown;
	this.controlKeyLeft;

	this.setupInput = function(upKey, rightKey, downKey, leftKey) {
		this.controlKeyUp = upKey;
		this.controlKeyRight = rightKey;
		this.controlKeyDown = downKey;
		this.controlKeyLeft = leftKey;
	}

	this.reset = function(whichImage, warriorName) {
		this.name = warriorName;
		this.myWarriorPic = whichImage;
		this.keyHeld = 0;

		for(var eachRow=0;eachRow<WORLD_ROWS;eachRow++) {
			for(var eachCol=0;eachCol<WORLD_COLS;eachCol++) {
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
				if(worldGrid[arrayIndex] == WORLD_PLAYERSTART) {
					worldGrid[arrayIndex] = WORLD_ROAD;
					
					this.x = eachCol * WORLD_W + WORLD_W/2;
					this.y = eachRow * WORLD_H + WORLD_H/2;
					return;
				} // end of player start if
			} // end of col for
		} // end of row for
		console.log("NO PLAYER START FOUND!");
	} // end of warriorReset func

	this.move = function() {
		var nextX = this.x;
		var nextY = this.y;

		if(this.keyHeld_Up) {
			nextY -= WALK_SPEED;
		}
		if(this.keyHeld_Down) {
			nextY += WALK_SPEED;
		}
		if(this.keyHeld_Left) {
			nextX -= WALK_SPEED;
		}
		if(this.keyHeld_Right) {
			nextX += WALK_SPEED;
		}
		
		var walkIntoTileIndex = warriorWorldHandling(nextX, nextY);
		var walkIntoTileType = WORLD_WALL;

		if (walkIntoTileIndex != undefined) {
			walkIntoTileType = worldGrid[walkIntoTileIndex];
		}

		switch(walkIntoTileType ) {
			case WORLD_ROAD:
				this.x = nextX;
				this.y = nextY;
				break;
			case WORLD_GOAL:
				loadLevel(oldLevel);
				break;
			case WORLD_DOOR:
				if (this.keyHeld > 0){
					this.keyHeld--;
					worldGrid[walkIntoTileIndex] = WORLD_ROAD;
				}
				break;
			case WORLD_KEY:
				this.keyHeld++;
				worldGrid[walkIntoTileIndex] = WORLD_ROAD;
				break;
			case WORLD_WALL:
			default:
				break;

		}

		//warriorWorldHandling(this);
	}

	this.draw = function() {
		drawBitmapCenteredWithRotation(this.myWarriorPic, this.x,this.y);
	}
}