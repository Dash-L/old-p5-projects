var snake;
foodCount = 1;
var highScore = 0;
var food = [];
var c = 1;
var r;
var g;
var b;

function setup() {
    createCanvas(500, 500);
    snake = new Snake();
    for (var i = 0; i < foodCount; i++) {
        f = new Food();
        food.push(f);
    }
}

var gameOver = false;

var score = 0;

var grid = [];

function draw() {
    background(51);
    frameRate(15);
    document.title = highScore;
    // fill the grid
    for (var i = 0; i < width / 10; i++) {
        grid[i] = i * 10;
    }
    if (frameCount % 1 == 0){
        changeColor();
    }
    // snake control
    snake.drawSnake();
    snake.keyboardInput();
    snake.moveSnake();
    snake.gameOver();
    // food control
    for (var i = 0; i < food.length; i++) {
        food[i].foodControl();
    }
    // display the score/length
    fill(255);
    text(str(score), width - 25, 10, 50, 50);
}

function Food() {
    this.foodX;
    this.foodY;

    this.onScreen = false;

    this.foodControl = function() {
        if (this.onScreen == false) {
            this.foodX = random(grid);
            this.foodY = random(grid);
            this.onScreen = true;
        }
        fill(255, 0, 0);
        rect(this.foodX, this.foodY, 10, 10);
        if (snake.snakeX == this.foodX && snake.snakeY == this.foodY) {
            this.onScreen = false;
            score += 1;
            if (snake.segments == 0) {
                snake.segments += 2;
            } else {
                snake.segments += 1;
            }
        }
    }
}

function changeColor() {
    if (c == 1) {
        r = 255;
        g = 0;
        b = 0;
    } else if (c == 2) {
        r = 255;
        g = 102;
        b = 0;
    } else if (c == 3) {
        r = 255;
        g = 255;
        b = 0;
    } else if (c == 4) {
        r = 0;
        g = 255;
        b = 0;
    } else if (c == 5) {
        r = 0;
        g = 0;
        b = 255;
    } else if (c == 6) {
        r = 170;
        g = 0;
        b = 255;
    }
    c ++;
    if (c == 7) {
        c = 1;
    }
}

function Snake() {
    this.segments = 0;
    this.segmentX;
    this.segmentY;

    this.snakeX = 30;
    this.snakeY = height / 2 - 10;

    this.xDir = 0;
    this.yDir = 0;

    this.pathX = [];
    this.pathY = [];

    this.speed = 10;

    this.BOOLgameOver = false;

    this.drawSnake = function() {
        fill (r, g, b);
        if (this.segments > 0) {
            for (var i = 0; i <= this.segments; i++) {
                for (var j = this.segments; j >= 1; j--) {
                    this.segmentX = this.pathX[frameCount - 1 * j];
                    this.segmentY = this.pathY[frameCount - 1 * j];
                    rect(this.segmentX, this.segmentY, 10, 10);
                }
            }
        }
        rect(this.snakeX, this.snakeY, 10, 10);
        append(this.pathX, this.snakeX);
        append(this.pathY, this.snakeY);
    }

    this.moveSnake = function() {
        if (!this.BOOLgameOver) {
            if (this.xDir == 1) {
                this.snakeX += this.speed;
            }else if (this.xDir == -1) {
                this.snakeX -= this.speed;
            }else if (this.yDir == 1) {
                this.snakeY += this.speed;
            }else if (this.yDir == -1) {
                this.snakeY -= this.speed;
            }
        }
    }

    this.gameOver = function() {
        // check if it should be game over
        if (this.snakeX < 0 || this.snakeX > width - 10) {
            this.BOOLgameOver = true;
        }
        if (this.snakeY < 0 || this.snakeY > height - 10) {
            this.BOOLgameOver = true;
        }
        for (var i = 0; i <= this.segments; i++) {
            if (this.snakeX == this.pathX[frameCount - i] && this.snakeY == this.pathY[frameCount - i]) {
                this.BOOLgameOver = true;
            }
        }
        // if it is game over do that
        if (this.BOOLgameOver) {
            fill(255);
            text("GAME OVER", width / 2, height / 2, 60, 60);
            text("PRESS 'R' TO RESTART", width / 2, height / 2 + 50, 60, 60);
        }
    }

    this.keyboardInput = function() {
        if (!this.BOOLgameOver) {
            if (keyIsDown(87) || keyIsDown(UP_ARROW)) {
                if (this.yDir != 1) {
                    this.yDir = -1;
                    this.xDir = 0;
                }
            }else if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) {
                if (this.yDir != -1) {
                    this.yDir = 1;
                    this.xDir = 0;
                }
            }else if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
                if (this.xDir != -1) {
                    this.xDir = 1;
                    this.yDir = 0;
                }
            }else if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
                if (this.xDir != 1) {
                    this.xDir = -1;
                    this.yDir = 0;
                }
            }
        }
        if (keyIsDown(82) && this.BOOLgameOver) {
            if (score > highScore) {
                highScore = score;
            }
            this.xDir = 0;
            this.yDir = 0;
            this.snakeX = 30;
            this.snakeY = height / 2 - 10;
            this.segments = 0;
            score = 0;
            this.BOOLgameOver = false;
            for (var i = 0; i < food.length; i++) {
                food[i].onScreen = false;
            }
        }
    }
}
