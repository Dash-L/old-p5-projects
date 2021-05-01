var snake;
var snake2;
var food1;
var food2;
var food3;
var food4;
var food5;

function setup() {
    createCanvas(500, 500);
    snake = new Snake();
    snake2 = new Snake();
    food1 = new Food();
    food2 = new Food();
    food3 = new Food();
    food4 = new Food();
    food5 = new Food();
    // snake 1 coords
    snake.snakeX = 30;
    snake.snakeY = height / 2 - 10;
    // snake 2 coords
    snake2.snakeX = width - 30;
    snake2.snakeY = height / 2 - 10;
}

var gameOver = false;

var grid = [];

function draw() {
    background(51);
    frameRate(15);
    // fill the grid
    for (var i = 0; i < width / 10; i++) {
        grid[i] = i * 10;
    }
    // snake control
    snake.drawSnake();
    snake.keyboardInput(87, 83, 65, 68);
    snake.moveSnake();
    snake.gameOver();
    // second snake control
    snake2.drawSnake();
    snake2.keyboardInput(UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW);
    snake2.moveSnake();
    snake2.gameOver();
    // food control
    food1.foodControl();
    food2.foodControl();
    food3.foodControl();
    food4.foodControl();
    food5.foodControl();
    // display the score/length
    fill(255);
    text(str(snake.score), 25, 10, 50, 50);
    text(str(snake2.score), width - 25, 10, 50, 50);
    // reseting the snakes
    if (snake.BOOLgameOver) {
        snake.xDir = 0;
        snake.yDir = 0;
        snake.snakeX = 30;
        snake.snakeY = height / 2 - 10;
        snake.segments = 0;
        snake.score = 0;
        snake.BOOLgameOver = false;
    }
    if (snake2.BOOLgameOver) {
        snake2.xDir = 0;
        snake2.yDir = 0;
        snake2.snakeX = width - 30;
        snake2.snakeY = height / 2 - 10;
        snake2.segments = 0;
        snake2.score = 0;
        snake2.BOOLgameOver = false;
    }
    // check for player collison and add kills
    if (snake.snakeX == snake2.snakeX && snake.snakeY == snake2.snakeY) {
        snake.kills += 1;
        snake2.kills += 1;
        snake.BOOLgameOver = true;
        snake2.BOOLgameOver = true;
    }
    for (var i = 0; i <= snake.segments; i++) {
        if (snake2.snakeX == snake.pathX[frameCount - i] && snake2.snakeY == snake.pathY[frameCount - i]) {
            snake2.BOOLgameOver = true;
            snake.kills += 1;
        }
    }
    for (var i = 0; i <= snake2.segments; i++) {
        if (snake.snakeX == snake2.pathX[frameCount - i] && snake.snakeY == snake2.pathY[frameCount - i]) {
            snake.BOOLgameOver = true;
            snake2.kills += 1;
        }
    }
    // display kills
    fill(255);
    text(str(snake.kills), 25, height - 20, 50, 50);
    text(str(snake2.kills), width - 25, height - 20, 50, 50);
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
            snake.score += 1;
            if (snake.segments == 0) {
                snake.segments += 2;
            } else {
                snake.segments += 1;
            }
        }
        if (snake2.snakeX == this.foodX && snake2.snakeY == this.foodY) {
            this.onScreen = false;
            snake2.score += 1;
            if (snake2.segments == 0) {
                snake2.segments += 2;
            } else {
                snake2.segments += 1;
            }
        }
    }
}

function Snake() {
    this.kills = 0;
    this.score = 0;

    this.segments = 0;
    this.segmentX;
    this.segmentY;

    this.snakeX;
    this.snakeY;

    this.xDir = 0;
    this.yDir = 0;

    this.pathX = [];
    this.pathY = [];

    this.speed = 10;

    this.BOOLgameOver = false;

    this.drawSnake = function() {
        fill(100, 10, 140);
        if (this.segments > 0) {
            for (var i = 0; i <= this.segments; i++) {
                for (var j = this.segments; j >= 1; j--) {
                    this.segmentX = this.pathX[frameCount - 1 * j];
                    this.segmentY = this.pathY[frameCount - 1 * j];
                    rect(this.segmentX, this.segmentY, 10, 10);
                }
            }
        }
        fill(0, 0, 255);
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
    }

    this.keyboardInput = function(up, down, right, left) {
        if (!this.BOOLgameOver) {
            if (keyIsDown(up)) {
                if (this.yDir != 1) {
                    this.yDir = -1;
                    this.xDir = 0;
                }
            }else if (keyIsDown(down)) {
                if (this.yDir != -1) {
                    this.yDir = 1;
                    this.xDir = 0;
                }
            }else if (keyIsDown(left)) {
                if (this.xDir != -1) {
                    this.xDir = 1;
                    this.yDir = 0;
                }
            }else if (keyIsDown(right)) {
                if (this.xDir != 1) {
                    this.xDir = -1;
                    this.yDir = 0;
                }
            }
        }
    }
}
