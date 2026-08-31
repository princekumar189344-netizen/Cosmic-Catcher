// Cosmic Catcher
// Game JavaScript

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");

const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");

const scoreText = document.getElementById("score");
const livesText = document.getElementById("lives");
const timerText = document.getElementById("timer");
const highScoreText = document.getElementById("highScore");
const finalScoreText = document.getElementById("finalScore");

const gameLength = 60;

let score = 0;
let lives = 3;
let timeLeft = gameLength;
let playing = false;

let objects = [];
let lastSpawn = 0;
let spawnDelay = 900;

let gameAnimation;
let timer;

// Player

const player = {
    x: canvas.width / 2 - 45,
    y: canvas.height - 50,
    width: 90,
    height: 25,
    speed: 7
};

// Keyboard controls

const keys = {};

document.addEventListener("keydown", function (event) {
    const key = event.key.toLowerCase();

    if (
        key === "arrowleft" ||
        key === "arrowright" ||
        key === "a" ||
        key === "d"
    ) {
        event.preventDefault();
        keys[key] = true;
    }
});

document.addEventListener("keyup", function (event) {
    keys[event.key.toLowerCase()] = false;
});

// Background

const stars = [];

for (let i = 0; i < 80; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() + 0.2
    });
}

function drawBackground() {
    ctx.fillStyle = "#02030d";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const star of stars) {
        ctx.fillStyle = "white";

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.speed;

        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    }
}

// Player

function drawPlayer() {
    ctx.fillStyle = "#4fc3f7";

    ctx.beginPath();
    ctx.moveTo(player.x, player.y);
    ctx.lineTo(player.x + player.width, player.y);
    ctx.lineTo(
        player.x + player.width - 10,
        player.y + player.height
    );
    ctx.lineTo(
        player.x + 10,
        player.y + player.height
    );
    ctx.closePath();
    ctx.fill();
}

function movePlayer() {
    if (keys["arrowleft"] || keys["a"]) {
        player.x -= player.speed;
    }

    if (keys["arrowright"] || keys["d"]) {
        player.x += player.speed;
    }

    if (player.x < 0) {
        player.x = 0;
    }

    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }
}

// Falling objects

function createObject() {
    const meteor = Math.random() < 0.25;
    const size = meteor ? 25 : 18;

    objects.push({
        x: Math.random() * (canvas.width - size),
        y: -size,
        size: size,
        speed: 2 + Math.random() * 2,
        type: meteor ? "meteor" : "star"
    });
}

function drawObject(object) {
    const centerX = object.x + object.size / 2;
    const centerY = object.y + object.size / 2;

    if (object.type === "star") {
        ctx.fillStyle = "#ffd54f";

        ctx.beginPath();

        for (let i = 0; i < 10; i++) {
            const angle = (Math.PI * i) / 5 - Math.PI / 2;
            const radius = i % 2 === 0
                ? object.size / 2
                : object.size / 4;

            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.closePath();
        ctx.fill();

    } else {
        ctx.fillStyle = "#8d6e63";

        ctx.beginPath();
        ctx.arc(
            centerX,
            centerY,
            object.size / 2,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }
}

// Collision

function touchingPlayer(object) {
    return (
        object.x < player.x + player.width &&
        object.x + object.size > player.x &&
        object.y < player.y + player.height &&
        object.y + object.size > player.y
    );
}

// Update objects

function updateObjects() {
    for (let i = objects.length - 1; i >= 0; i--) {
        const object = objects[i];

        object.y += object.speed;

        if (touchingPlayer(object)) {
            if (object.type === "star") {
                score += 10;
            } else {
                lives--;
            }

            objects.splice(i, 1);
            updateDisplay();

            if (lives <= 0) {
                finishGame();
                return;
            }
        }

        if (object.y > canvas.height) {
            objects.splice(i, 1);
        }
    }
}

// Spawn objects

function spawnObjects(time) {
    if (time - lastSpawn > spawnDelay) {
        createObject();
        lastSpawn = time;

        spawnDelay = Math.max(300, 900 - score * 3);
    }
}

// Display

function updateDisplay() {
    scoreText.textContent = score;
    livesText.textContent = "❤️".repeat(lives);
    timerText.textContent = timeLeft;
}

// Timer

function startTimer() {
    clearInterval(timer);

    timer = setInterval(function () {
        if (!playing) {
            return;
        }

        timeLeft--;
        timerText.textContent = timeLeft;

        if (timeLeft <= 0) {
            finishGame();
        }
    }, 1000);
}

// Game loop

function gameLoop(time) {
    if (!playing) {
        return;
    }

    drawBackground();
    movePlayer();
    updateObjects();
    spawnObjects(time);

    for (const object of objects) {
        drawObject(object);
    }

    drawPlayer();

    gameAnimation = requestAnimationFrame(gameLoop);
}

// Start

function startGame() {
    score = 0;
    lives = 3;
    timeLeft = gameLength;
    objects = [];

    player.x = canvas.width / 2 - player.width / 2;

    spawnDelay = 900;
    lastSpawn = 0;
    playing = true;

    startScreen.classList.add("hidden");
    gameOverScreen.classList.add("hidden");

    updateDisplay();
    startTimer();

    cancelAnimationFrame(gameAnimation);
    gameAnimation = requestAnimationFrame(gameLoop);
}

// End

function finishGame() {
    if (!playing) {
        return;
    }

    playing = false;

    clearInterval(timer);
    cancelAnimationFrame(gameAnimation);

    finalScoreText.textContent = score;

    gameOverScreen.classList.remove("hidden");
}

// Buttons

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);

// Initial display

updateDisplay();
drawBackground();
drawPlayer();
