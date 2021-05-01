var brickX = 0;

function setup() {
    createCanvas(500, 500);
    createBricks();
    textSize(20);
}

var dirValue = [-1, 1];

var lives = 3;
var dispLivesX = 30;

var score = 0;

var bricks1 = [];
var bricks2 = [];
var bricks3 = [];
var bricks4 = [];
var bricks5 = [];
var bricks6 = [];


var width = 500;
var height = 500;

var gameOver = false;

var gameStarted = false;

var ball = {
    r: 20,
    xDir: 0,
    yDir: 0,
    speed: 4,
    x: width / 2,
    y: height - 70
};

var paddle = {
    x: width / 2 - 30,
    y: height - 50,
    w: 60,
    h: 10
};

function draw() {
    background(51);
    fill(255);
    noStroke();
    ellipse(ball.x, ball.y, ball.r, ball.r);
    rect(paddle.x, paddle.y, paddle.w, paddle.h);
    for (var i = 0; i < lives - 1; i++) {
        ellipse(dispLivesX, height - 25, ball.r, ball.r);
        dispLivesX += 30;
    }
    text(str(score), width - 100, height - 25);
    dispLivesX = 20;
    for (var i = 0; i < 8; i++) {
        fill(255, 0, 0);
        rect(bricks1[i], 10, 50, 10);
        fill(255, 184, 0);
        rect(bricks2[i], 30, 50, 10);
        fill(255, 255, 0);
        rect(bricks3[i], 50, 50, 10);
        fill(0, 255, 0);
        rect(bricks4[i], 70, 50, 10);
        fill(0, 0, 255);
        rect(bricks5[i], 90, 50, 10);
        fill(100, 20, 150);
        rect(bricks6[i], 110, 50, 10);
        if (ball.x >= bricks1[i] && ball.x <= bricks1[i] + 50 && ball.y >= 10 && ball.y <= 10 + 10) {
            bricks1.splice(i, 1);
            ball.yDir *= -1;
            score += 10;
        } else if (ball.x >= bricks2[i] && ball.x <= bricks2[i] + 50 && ball.y >= 10 && ball.y <= 30 + 10) {
            bricks2.splice(i, 1);
            ball.yDir *= -1;
            score += 10;
        } else if (ball.x >= bricks3[i] && ball.x <= bricks3[i] + 50 && ball.y >= 10 && ball.y <= 50 + 10) {
            bricks3.splice(i, 1);
            ball.yDir *= -1;
            score += 10;
        } else if (ball.x >= bricks4[i] && ball.x <= bricks4[i] + 50 && ball.y >= 10 && ball.y <= 70 + 10) {
            bricks4.splice(i, 1);
            ball.yDir *= -1;
            score += 10;
        } else if (ball.x >= bricks5[i] && ball.x <= bricks5[i] + 50 && ball.y >= 10 && ball.y <= 90 + 10) {
            bricks5.splice(i, 1);
            ball.yDir *= -1;
            score += 10;
        } else if (ball.x >= bricks6[i] && ball.x <= bricks6[i] + 50 && ball.y >= 10 && ball.y <= 110 + 10) {
            bricks6.splice(i, 1);
            ball.yDir *= -1;
            score += 10;
        }
    }
    if (!gameOver) {
        ball.x += ball.xDir * ball.speed;
        ball.y += ball.yDir * ball.speed;
        if (ball.x <= 0) {
            ball.xDir *= -1;
        } else if (ball.x >= width) {
            ball.xDir *= -1;
        } else if (ball.y <= 0) {
            ball.yDir *= -1;
        } else if (ball.y >= paddle.y && ball.y <= paddle.y + paddle.h && ball.x >= paddle.x && ball.x <= paddle.x + paddle.w) {
            ball.yDir *= -1;
        }
        if (!gameStarted) {
            if (keyIsDown(65)) {
                paddle.x -= 5;
                ball.x -= 5;
            } else if (keyIsDown(68)) {
                paddle.x += 5;
                ball.x += 5;
            }
        } else {
            if (keyIsDown(65)) {
                paddle.x -= 5;
            } else if (keyIsDown(68)) {
                paddle.x += 5;
            }
        }
    }
    if (ball.y >= height) {
        lives -= 1;
        if (lives > 0) {
            ball.x = paddle.x + paddle.w / 2;
            ball.y = height - 70;
        }
        ball.xDir = 0;
        ball.yDir = 0;
        gameStarted = false;
    }
    if (lives <= 0) {
        gameOver = true;
        fill(255);
        text("GAME OVER", width / 2, height / 2);
    }
    if (keyIsDown(82) && gameOver) {
        paddle.x = width / 2 - 30;
        ball.x = paddle.x + paddle.w / 2;
        ball.y = height - 70;
        ball.xDir = 0;
        ball.yDir = 0;
        gameOver = false;
        gameStarted = false;
        lives = 3;
        score = 0;
        createBricks();
    }
    if (keyIsDown(32) && !gameStarted) {
        gameStarted = true;
        ball.yDir = -1;
        ball.xDir = random(dirValue);
    }
}

function createBricks() {
    for (var i = 0; i < 8; i++) {
        brickX = i * 50;
        bricks1[i] = brickX + (i + 1) * 11;
        bricks2[i] = brickX + (i + 1) * 11;
        bricks3[i] = brickX + (i + 1) * 11;
        bricks4[i] = brickX + (i + 1) * 11;
        bricks5[i] = brickX + (i + 1) * 11;
        bricks6[i] = brickX + (i + 1) * 11;
    }
}
