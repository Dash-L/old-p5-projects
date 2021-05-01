var player;
var pipe1;
var pipe2;

var score = 0;

var myFrameCount = 0;

var gameOver = false;

function setup() {
    createCanvas(700, 700);
    player = new Player();
    pipe1 = new Obstacle();
    pipe2 = new Obstacle();
    textSize(25);
}

function draw() {
    myFrameCount += 1;
    background(51);
    noStroke();
    drawGround();
    if (!gameOver) {
        // player mechanics
        player.gravity();
        if (keyIsDown(32)) {
            player.jump();
        }
        // move the pipes
        pipe1.movePipe();
        pipe2.movePipe();
    }
    // create new pipes if needed
    if (myFrameCount > 120 && pipe1.onScreen == false) {
        pipe1.newPipe();
        pipe1.onScreen = true;
    }
    if (pipe1.x < width - 400 && pipe2.onScreen == false) {
        pipe2.newPipe();
        pipe2.onScreen = true;
    }
    // check if the pipes are off screen, if so delete it
    if (pipe1.x + pipe1.pipeWidth < 0) {
        pipe1.onScreen = false;
        pipe1.x = width;
    }
    if (pipe2.x + pipe2.pipeWidth < 0) {
        pipe2.onScreen = false;
        pipe2.x = width;
    }
    // display score
    fill(0, 0, 255);
    text(str(score), 40, 40);
    // draw the pipes
    pipe1.drawPipe();
    pipe2.drawPipe();
    // draw player
    player.drawPlayer();
    if (gameOver && keyIsDown(82)) {
        gameOver = false;
        player.x = 30;
        player.y = height / 2 - 10;
        score = 0;
        pipe1.onScreen = false;
        pipe2.onScreen = false;
        myFrameCount = 0;
        pipe1.x = width;
        pipe2.x = width;
        pipe1.topPipeHeight = 0;
        pipe2.topPipeHeight = 0;
    }
    if (gameOver) {
        fill (255);
        text("GAME OVER", width / 2 - 25, height / 2 - 25);
        text("(press 'R' to restart)", width / 2 - 25, height / 2);
    }
}

function drawGround() {
    fill(139,69,19);
    rect(0, height - 20, width, 20);
    fill(24, 109, 46);
    rect(0, height - 30, width, 10);
    // this is actually the ceiling...
    fill(120);
    rect(0, 0, width, 10);
}

function Player() {
    this.x = 30;
    this.y = height / 2 - 10;
    this.s = 20;
    this.jumpHeight = 20;

    this.drawPlayer = function() {
        fill(255,255,51);
        rect(this.x, this.y, this.s, this.s);
    }

    this.jump = function() {
        for (var i = 0; i <= this.jumpHeight; i++) {
            this.y -= 1;
            if (this.y < 10) {
                break;
            }
        }
    }

    this.gravity = function() {
        if (this.y < height - 50) {
            this.y += 6;
        } else {
            // check player collision with ground
            this.y = height - 50;
            gameOver = true;
        }
    }
}

function Obstacle() {
    this.openSpace = 120;
    this.pipeWidth = 30;
    this.topPipeHeight = 0;
    this.bottomPipeHeight = 0;
    this.onScreen = false;
    this.x = width;

    this.newPipe = function() {
        this.topPipeHeight = random(100, height - 175);
        this.bottomPipeHeight = (height - 30) - (this.topPipeHeight + this.openSpace)
    }

    this.drawPipe = function() {
        if (this.topPipeHeight != 0) {
            fill(0, 255, 0);
            rect(this.x, 0, this.pipeWidth, this.topPipeHeight);
            rect(this.x, 0 + this.topPipeHeight + this.openSpace, this.pipeWidth, this.bottomPipeHeight);
            // check player collision with pipe
            if (player.x <= this.x + this.pipeWidth && player.x >= this.x) {
                if (player.y >= this.topPipeHeight && player.y + player.s <= this.topPipeHeight + this.openSpace) {
                    if (player.x == this.x) {
                        score += 1;
                    }
                } else {
                    gameOver = true;
                }
            }
        }
    }
    this.movePipe = function() {
        if (this.onScreen) {
            this.x -= 5;
        }
    }
}
