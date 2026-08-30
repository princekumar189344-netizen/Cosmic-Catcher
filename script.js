// ================================
// COSMIC CATCHER
// Main JavaScript
// ================================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");

const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");

const scoreElement = document.getElementById("score");
const livesElement = document.getElementById("lives");
const timerElement = document.getElementById("timer");
const highScoreElement = document.getElementById("highScore");
const finalScoreElement = document.getElementById("finalScore");

// ================================
// GAME SETTINGS
// ================================

const GAME_TIME = 60;

let score = 0;
let lives = 3;
let timeLeft = GAME_TIME;

let gameRunning = false;
let animationId = null;
let timerInterval = null;

let lastSpawnTime = 0;
let spawnInterval = 900;

let objects = [];

// ================================
// HIGH SCORE
// ================================

let highScore = Number(localStorage.getItem("cosmicCatcherHighScore")) || 0;

highScoreElement.textContent = highScore;

// ================================
// PLAYER
// ================================

const player = {
    x: canvas.width / 2 - 45,
    y: canvas.height - 55,
    width: 90,
    height: 25,
    speed: 7
};

// ================================
// KEYBOARD
// ================================

const keys = {};

document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();

    if (
        key === "arrowleft" ||
        key === "arrowright" ||
        key === "a" ||
        key === "d"
    ) {
        event.preventDefault();
    }

    keys[key] = true;
});

document.addEventListener("keyup", (event) => {
    keys[event.key.toLowerCase()] = false;
});

// ================================
// BACKGROUND STARS
// ================================

const backgroundStars = [];

for (let i = 0; i < 100; i++) {
    backgroundStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.2
    });
}

function drawBackground() {
    ctx.fillStyle = "#02030d";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const star of backgroundStars) {
        ctx.fillStyle = "white";

        ctx.beginPath();
        ctx.arc(
            star.x,
            star.y,
            star.size,
            0,
            Math.PI * 2
        );
        ctx.fill();

        star.y += star.speed;

        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    }
}

// ================================
// DRAW PLAYER
// ================================

function drawPlayer() {
    const centerX = player.x + player.width / 2;

    // Main catcher
    ctx.fillStyle = "#4fc3f7";

    ctx.beginPath();
    ctx.moveTo(player.x, player.y);
    ctx.lineTo(player.x + player.width, player.y);
    ctx.lineTo(player.x + player.width - 12, player.y + player.height);
    ctx.lineTo(player.x + 12, player.y + player.height);
    ctx.closePath();
    ctx.fill();

    // Inner section
    ctx.fillStyle = "#1976d2";

    ctx.fillRect(
        player.x + 12,
        player.y + 5,
        player.width - 24,
        7
    );

    // Small center light
    ctx.fillStyle = "white";

    ctx.beginPath();
    ctx.arc(
        centerX,
        player.y + 8,
        3,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

// ================================
// PLAYER MOVEMENT
// ================================

function updatePlayer() {
    if (keys["arrowleft"] || keys["a"]) {
        player.x -= player.speed;
    }

    if (keys["arrowright"] || keys["d"]) {
        player.x += player.speed;
    }

    // Left boundary
    if (player.x < 0) {
        player.x = 0;
    }

    // Right boundary
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }
}

// ================================
// CREATE FALLING OBJECT
// ================================

function createObject() {
    const isMeteor = Math.random() < 0.25;

    const size = isMeteor
        ? Math.random() * 15 + 18
        : Math.random() * 10 + 12;

    objects.push({
        x: Math.random() * (canvas.width - size),
        y: -size,
        size: size,
        speed: Math.random() * 2 + 2 + score / 150,
        type: isMeteor ? "meteor" : "star",
        rotation: Math.random() * Math.PI * 2
    });
}

// ================================
// DRAW FALLING OBJECTS
// ================================

function drawObject(object) {
    ctx.save();

    ctx.translate(
        object.x + object.size / 2,
        object.y + object.size / 2
    );

    if (object.type === "star") {
        drawStar(object.size / 2);
    } else {
        drawMeteor(object.size / 2);
    }

    ctx.restore();
}

// ================================
// DRAW STAR
// ================================

function drawStar(radius) {
    const spikes = 5;
    const outerRadius = radius;
    const innerRadius = radius * 0.45;

    ctx.fillStyle = "#ffd54f";

    ctx.beginPath();

    for (let i = 0; i < spikes * 2; i++) {
        const angle =
            (Math.PI / spikes) * i - Math.PI / 2;

        const currentRadius =
            i % 2 === 0 ? outerRadius : innerRadius;

        const x = Math.cos(angle) * currentRadius;
        const y = Math.sin(angle) * currentRadius;

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }

    ctx.closePath();
    ctx.fill();
}

// ================================
// DRAW METEOR
// ================================

function drawMeteor(radius) {
    ctx.fillStyle = "#8d6e63";

    ctx.beginPath();

    ctx.arc(
        0,
        0,
        radius,
        0,
        Math.PI * 2
    );

    ctx.fill();

    // Meteor details
    ctx.fillStyle = "#5d4037";

    ctx.beginPath();
    ctx.arc(
        -radius * 0.3,
        -radius * 0.2,
        radius * 0.2,
        0,
        Math.PI * 2
    );
    ctx.fill();

    ctx.beginPath();
    ctx.arc(
        radius * 0.3,
        radius * 0.25,
        radius * 0.15,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

// ================================
// COLLISION DETECTION
// ================================

function isColliding(object) {
    const objectLeft = object.x;
    const objectRight = object.x + object.size;

    const objectTop = object.y;
    const objectBottom = object.y + object.size;

    const playerLeft = player.x;
    const playerRight = player.x + player.width;

    const playerTop = player.y;
    const playerBottom = player.y + player.height;

    return (
        objectLeft < playerRight &&
        objectRight > playerLeft &&
        objectTop < playerBottom &&
        objectBottom > playerTop
    );
}

// ================================
// UPDATE OBJECTS
// ================================

function updateObjects() {
    for (let i = objects.length - 1; i >= 0; i--) {
        const object = objects[i];

        object.y += object.speed;

        if (isColliding(object)) {
            if (object.type === "star") {
                score += 10;
            } else {
                lives--;
            }

            objects.splice(i, 1);

            updateUI();

            if (lives <= 0) {
                endGame();
                return;
            }

            continue;
        }

        // Remove objects that leave the screen
        if (object.y > canvas.height + object.size) {
            objects.splice(i, 1);
        }
    }
}

// ================================
// SPAWN OBJECTS
// ================================

function spawnObjects(timestamp) {
    if (timestamp - lastSpawnTime > spawnInterval) {
        createObject();

        lastSpawnTime = timestamp;

        // Increase difficulty
        spawnInterval = Math.max(
            300,
            900 - score * 3
        );
    }
}

// ================================
// UPDATE UI
// ================================

function updateUI() {
    scoreElement.textContent = score;

    livesElement.textContent =
        "❤️".repeat(Math.max(0, lives));

    timerElement.textContent = timeLeft;
}

// ================================
// GAME TIMER
// ================================

function startTimer() {
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if (!gameRunning) {
            return;
        }

        timeLeft--;

        timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// ================================
// GAME LOOP
// ================================

function gameLoop(timestamp) {
    if (!gameRunning) {
        return;
    }

    drawBackground();

    updatePlayer();
    updateObjects();

    spawnObjects(timestamp);

    for (const object of objects) {
        drawObject(object);
    }

    drawPlayer();

    animationId = requestAnimationFrame(gameLoop);
}

// ================================
// START GAME
// ================================

function startGame() {
    score = 0;
    lives = 3;
    timeLeft = GAME_TIME;

    objects = [];

    player.x = canvas.width / 2 - player.width / 2;

    spawnInterval = 900;
    lastSpawnTime = 0;

    gameRunning = true;

    startScreen.classList.add("hidden");
    gameOverScreen.classList.add("hidden");

    updateUI();
    startTimer();

    cancelAnimationFrame(animationId);

    animationId = requestAnimationFrame(gameLoop);
}

// ================================
// END GAME
// ================================

function endGame() {
    if (!gameRunning) {
        return;
    }

    gameRunning = false;

    clearInterval(timerInterval);
    cancelAnimationFrame(animationId);

    finalScoreElement.textContent = score;

    // Save high score
    if (score > highScore) {
        highScore = score;

        localStorage.setItem(
            "cosmicCatcherHighScore",
            highScore
        );

        highScoreElement.textContent = highScore;
    }

    gameOverScreen.classList.remove("hidden");
}

// ================================
// BUTTONS
// ================================

startButton.addEventListener("click", () => {
    startGame();
});

restartButton.addEventListener("click", () => {
    startGame();
});

// ================================
// INITIAL SCREEN
// ================================

updateUI();

drawBackground();
drawPlayer();
