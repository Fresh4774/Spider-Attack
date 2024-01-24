const tileSize = 32;

let isGamePaused = false;
let spiders = [];
let player;
let spiderSpawnTime = 300;
let spiderMaxSpeed = 1.2;
let frame = 0;
let score = 0;
let highScore = 0;

let playerSprite;
let spiderSprite;

function preload() {
	playerSprite = loadImage(
		"data:image/png;base64,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"
	);
	spiderSprite = loadImage(
		"data:image/png;base64,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"
	);
}

let touches = [];
let isMobileDevice = false;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.elt.setAttribute("style", "display: block");
	pixelDensity(1);
	player = new Player();

	for (let i = 0; i < 42; i++) {
		spiders.push(new Spider(random(spiderMaxSpeed)));
	}

	detectMobile();

	if (isMobileDevice) {
		canvas.mousePressed(() => {
			if (mouseButton === LEFT) {
				player.shoot();
			}
		});

		canvas.touchStarted(handleTouch);
		canvas.touchMoved(handleTouch);
		canvas.touchEnded(handleTouch);
	}

	const savedHighScore = localStorage.getItem("highScore");
	if (savedHighScore) {
		highScore = parseInt(savedHighScore);
	}
}

function handleTouch(event) {
	touches = event.touches;
}

function detectMobile() {
	if (
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		)
	) {
		isMobileDevice = true;
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function handleGameOver() {
	isGamePaused = true;

	if (score > highScore) {
		highScore = score; 
		localStorage.setItem("highScore", highScore); 
	}
}

function draw() {
	if (isGamePaused) {
		background(0, 0, 0, 200); 
		textSize(32);
		fill(255);
		textAlign(CENTER);
		text("Game Over", width / 2, height / 2 - 100);
		text("Current Score: " + score, width / 2, height / 2);
		text("High Score: " + highScore, width / 2, height / 2 + 50);

		fill(100, 100, 200);
		rectMode(CENTER); 
		rect(width / 2, height / 2 + 117, 150, 50);
		fill(255);
		textSize(24);
		text("Restart", width / 2, height / 2 + 125); 
		textSize(32); 

		if (mouseIsPressed) {
			if (
				mouseX > width / 2 - 75 &&
				mouseX < width / 2 + 75 &&
				mouseY > height / 2 + 75 &&
				mouseY < height / 2 + 125
			) {
				restart();
				isGamePaused = false; 
			}
		}
	} else {
		background(97, 87, 97);
		rectMode(CENTER);

		player.draw();
		player.update();
		player.animate();

		for (let i = spiders.length - 1; i >= 0; i--) {
			spiders[i].draw();
			spiders[i].update();

			if (spiders[i].ateYou()) {
				restart();
				break;
			}

			if (player.hasShot(spiders[i])) {
				score++;
				spiders.splice(i, 1);
			}
		}

		if (frame >= random(spiderSpawnTime, spiderSpawnTime * 1.2)) {
			spiders.push(new Spider(random(spiderMaxSpeed)));
			spiderSpawnTime *= 0.95;
			frame = 0;
		}

		if (frameCount % 1000 == 0) {
			spiderMaxSpeed += 0.1;
		}

		frame++;

		textAlign(CENTER);
		textSize(40);
		textFont("Pixelify Sans"); 
		fill(255); 
		stroke(0);
		strokeWeight(4); 
		text(score, width / 2, 100);

		if (touches.length === 1) {
			const touch = touches[0];
			let joystickCenterX = width / 6;
			let joystickCenterY = height - height / 6;
			let movementVector = createVector(
				touch.x - joystickCenterX,
				touch.y - joystickCenterY
			);
			let movementMagnitude = movementVector.mag();

			if (movementMagnitude > 20) {
				movementVector.normalize();
				movementVector.mult(4); 
				player.pos.add(movementVector);
			}
		}
	}
}

function restart() {
	player = new Player();
	spiders = [];
	spiderSpawnTime = 300;
	spiderMaxSpeed = 1.2;
	score = 0;
}

function mouseClicked() {
	player.shoot();
}

function randomGradient() {
	let colors = [
		color("#b6908d"),
		color("#eacec4"),
		color("#af8886"),
		color("#b09192")
	];
	shuffle(colors, true); 
	return colors[0];
}

class Bullet {
	constructor(x, y, angle, playerSize) {
		this.pos = createVector(x, y);
		this.speed = 16;
		this.angle = angle;
		this.playerSize = playerSize;
		this.bulletLength = random(playerSize * 0.4, playerSize * 0.6);
		this.bulletWidth = random(playerSize * 0.04, playerSize * 0.06);
		this.circleSize = random(playerSize * 0.06, playerSize * 0.1);
		this.fillColor = randomGradient();
	}

	draw() {
		push();
		noStroke();
		translate(this.pos.x, this.pos.y);
		rotate(this.angle);

		let fromColor = this.fillColor;
		let toColor = color("#b09192"); 
		for (let i = 0; i < 3; i++) {
			let interColor = lerpColor(fromColor, toColor, i / 2);
			fill(interColor);
			rectMode(CENTER);
			rect(0, 0, this.bulletLength, this.bulletWidth, this.circleSize);
			fromColor = interColor;
		}

		fill(fromColor);
		ellipse(-this.bulletLength / 2, 0, this.circleSize);
		ellipse(this.bulletLength / 2, 0, this.circleSize);

		stroke("#5d4352"); 
		strokeWeight(2); 

		pop();
	}

	update() {
		const cosAngle = cos(this.angle);
		const sinAngle = sin(this.angle);
		this.pos.x += this.speed * cosAngle;
		this.pos.y += this.speed * sinAngle;
	}
}

class Player {
	constructor() {
		this.pos = createVector(width / 2, height / 2);
		this.angle = 0;
		this.bullets = [];
		this.spriteSheet = playerSprite;
		this.spriteFrames = 4;
		this.animationSpeed = 0.15;
		this.currentFrame = 0;
		this.isMoving = false;
		this.animationState = "idle";
		this.animationTimer = 0;
		this.scaleFactor = 1.7;
	}

	draw() {
		push();
		translate(this.pos.x, this.pos.y);
		scale(this.scaleFactor);

		let frameX = this.currentFrame * tileSize;
		let frameY = 0;

		if (this.animationState === "idle" || this.animationState === "moving") {
			let facingDirection = this.getFacingDirection();
			let flipped = false; 

			if (facingDirection === "left") {
				facingDirection = "right"; 
				flipped = true;
			}

			if (this.animationState === "idle") {
				frameY =
					tileSize * ["down", "right", "up", "left"].indexOf(facingDirection);
			} else if (this.isMoving) {
				frameY =
					tileSize * (3 + ["down", "right", "up", "left"].indexOf(facingDirection));
			}

			if (flipped) {
				scale(-1, 1);
			}
		}

		imageMode(CENTER);
		let sprite = this.spriteSheet.get(frameX, frameY, tileSize, tileSize);
		image(sprite, 0, 0, tileSize, tileSize);
		pop();

		for (let bullet of this.bullets) {
			bullet.update();
			bullet.draw();
		}

		this.checkBulletCollision();
		this.removeOutOfBoundsBullets();
	}

	getFacingDirection() {
		let angle = atan2(mouseY - this.pos.y, mouseX - this.pos.x);

		if (angle < -PI / 4 && angle >= (-3 * PI) / 4) {
			return "up"; 
		} else if (angle >= -PI / 4 && angle < PI / 4) {
			return "right"; 
		} else if (angle >= (3 * PI) / 4 || angle < (-3 * PI) / 4) {
			return "left"; 
		} else {
			return "down"; 
		}
	}

	animate() {
		if (this.animationState === "idle" || this.animationState === "moving") {
			this.animationTimer += this.animationSpeed;

			if (this.animationTimer >= 1) {
				this.currentFrame = (this.currentFrame + 1) % this.spriteFrames;
				this.animationTimer = 0; 
			}
		}
	}

	update() {
		let xSpeed = 0;
		let ySpeed = 0;

		if (keyIsPressed) {
			if (keyIsDown(65)) {
				xSpeed = -2;
			}
			if (keyIsDown(68)) {
				xSpeed = 2;
			}
			if (keyIsDown(87)) {
				ySpeed = -2;
			}
			if (keyIsDown(83)) {
				ySpeed = 2;
			}
		}

		if (xSpeed !== 0 || ySpeed !== 0) {
			this.isMoving = true; 
		} else {
			this.isMoving = false; 
		}

		if (this.isMoving) {
			this.animationState = "moving";
		} else {
			this.animationState = "idle";
		}

		this.pos.add(xSpeed, ySpeed);
		this.angle = atan2(mouseY - this.pos.y, mouseX - this.pos.x);
	}

	shoot() {
		this.bullets.push(new Bullet(this.pos.x, this.pos.y, this.angle, tileSize));
	}

	hasShot(spider) {
		for (let i = this.bullets.length - 1; i >= 0; i--) {
			if (
				dist(
					this.bullets[i].pos.x,
					this.bullets[i].pos.y,
					spider.pos.x,
					spider.pos.y
				) < 15
			) {
				this.bullets.splice(i, 1);
				return true;
			}
		}
		return false;
	}

	checkBulletCollision() {
		for (let i = this.bullets.length - 1; i >= 0; i--) {
			for (let j = spiders.length - 1; j >= 0; j--) {
				const bullet = this.bullets[i];
				const spider = spiders[j];
				const distance = dist(
					bullet.pos.x,
					bullet.pos.y,
					spider.pos.x,
					spider.pos.y
				);

				if (distance < 15) {
					this.bullets.splice(i, 1);
					spiders.splice(j, 1);
					score++;
					break;
				}
			}
		}
	}

	removeOutOfBoundsBullets() {
		for (let i = this.bullets.length - 1; i >= 0; i--) {
			const bullet = this.bullets[i];
			if (
				bullet.pos.x < 0 ||
				bullet.pos.x > width ||
				bullet.pos.y < 0 ||
				bullet.pos.y > height
			) {
				this.bullets.splice(i, 1);
			}
		}
	}
}

class Spider {
	constructor(speed) {
		this.speed = speed;
		this.pos = this.getOffscreenPosition();
		this.spriteSheet = spiderSprite;
		this.spriteFrames = 8;
		this.currentFrame = 0;
		this.frameWidth = 64;
		this.frameHeight = 64;
		this.animationSpeed = 4;
		this.frameCounter = 0;
		this.scaleFactor = random(0.5, 1);
	}

	getOffscreenPosition() {
		let spawnX, spawnY;

		let side = floor(random(4));

		if (side === 0) {
			spawnX = random(width);
			spawnY = -10;
		} else if (side === 1) {
			spawnX = random(width);
			spawnY = height + 10;
		} else if (side === 2) {
			spawnX = -10;
			spawnY = random(height);
		} else {
			spawnX = width + 10;
			spawnY = random(height);
		}

		return createVector(spawnX, spawnY);
	}

	draw() {
		push();
		imageMode(CENTER);
		translate(this.pos.x, this.pos.y);

		this.frameCounter++;

		if (this.frameCounter >= this.animationSpeed) {
			this.currentFrame = (this.currentFrame + 1) % this.spriteFrames;
			this.frameCounter = 0; 
		}

		scale(this.scaleFactor);

		let frameX = this.currentFrame * this.frameWidth;
		image(
			this.spriteSheet,
			0,
			0,
			this.frameWidth,
			this.frameHeight,
			frameX,
			0,
			this.frameWidth,
			this.frameHeight
		);
		pop();
	}

	getAnimationType() {
		if (this.direction === "south") {
			return 0;
		} else if (this.direction === "east") {
			return 1;
		} else if (this.direction === "north") {
			return 2;
		} else if (this.direction === "west") {
			return 3;
		}
	}

	update() {
		let difference = p5.Vector.sub(player.pos, this.pos);
		difference.limit(this.speed);
		this.pos.add(difference);
	}

	ateYou() {
		const distance = dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y);
		if (distance < 20) {
			handleGameOver(); 
		}
	}
}