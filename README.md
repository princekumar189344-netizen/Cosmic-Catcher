# 🌌 Cosmic Catcher

A fun and interactive space-themed arcade game built using **HTML, CSS, and JavaScript**.

## 🎮 About the Game

**Cosmic Catcher** is a browser-based arcade game where the player controls a futuristic catcher and tries to catch falling ⭐ stars while avoiding dangerous ☄️ meteors.

The game lasts for **60 seconds** and the player starts with **3 lives**. Every star caught increases the score by **10 points**, while hitting a meteor removes one life.

The goal is to get the highest score possible before the timer reaches zero or all lives are lost.

---

## ✨ Features

- 🌌 Space-themed game design
- ⭐ Falling collectible stars
- ☄️ Falling meteors
- 🚀 Futuristic player catcher
- ❤️ 3-life system
- ⏱️ 60-second countdown timer
- 🏆 High-score system
- 💾 High score saved using Local Storage
- 📈 Increasing game difficulty
- 🎮 Keyboard controls
- 📱 Responsive design
- ✨ Animated background stars
- 🔄 Restart / Play Again option
- 💻 HTML5 Canvas gameplay

---

## 🕹️ How to Play

1. Open the game in your browser.
2. Click the **Start Game** button.
3. Move the catcher using the keyboard.
4. Catch ⭐ stars to increase your score.
5. Avoid ☄️ meteors.
6. Try to survive for the full 60 seconds.
7. Get the highest score possible!

---

## 🎮 Controls

1. ←/A  Move Left
2. →/D  Move Right

--- 

## ⭐ Scoring Syst

Object | Effect

⭐ Star | +10 Points
☄️ Meteor | -1 Life
❤️ 0 Lives | Game Over
⏱️ 0 Seconds | Game Over

--- 

## ❤️ Lives

The game starts with:
**❤️ ❤️ ❤️**

Every time the catcher hits a meteor, one life is removed.
When all lives are lost, the game ends.

---

## ⏱️ Timer

Each game starts with:
**60 Seconds**

The timer decreases every second.
When the timer reaches 0, the game automatically ends.

---

## 🏆 High Score

Cosmic Catcher includes a high-score system.
The highest score is saved in the browser using:
**localStorage**

This allows the best score to remain saved even after refreshing the page.

---

## 📈 Increasing Difficulty

The game becomes harder as the player's score increases.

Objects start spawning more frequently, making it more challenging to achieve a high score.

---

## 🌌 Game Background

The game includes an animated star field created using JavaScript.
Background stars move continuously to create a space-like environment.

---

## 🛠️ Technologies Used

**HTML5**
Used to create the structure of the game and interface.

**CSS3**
Used for:

- Space-themed design
- Animations
- Glowing borders
- Buttons
- Responsive layout
- Game screens

**JavaScript**
Used for:

- Game logic
- Player movement
- Star generation
- Meteor generation
- Collision detection
- Score system
- Lives system
- Timer
- Game loop
- Difficulty system
- High-score storage

---

## 📁 Project Structure

Cosmic-Catcher/
│
├── index.html
├── style.css
├── script.js
└── README.md

---

## 📄 Files Description

**index.html**

Contains the main HTML structure of the game, including the header, score, lives, timer, canvas, buttons and game screens.

**style.css**

Contains all the visual styling, animations, responsive design and space-themed effects.

**script.js**

Contains the main game logic, including movement, falling objects, collision detection, scoring, timer, lives, difficulty and high score.

**README.md**

Contains the documentation and information about the project.

---

## 🧠 How It Works

The game uses the HTML5 Canvas element to create the gameplay area.
JavaScript uses:
*requestAnimationFrame()*

to continuously update the game.

The game loop:

- Draws the background.
- Updates the player.
- Moves falling objects.
- Creates new objects.
- Checks collisions.
- Updates the score and lives.
- Draws the objects.
- Draws the player.

---

## 💥 Collision Detection

The game checks whether a falling object overlaps with the catcher.
If the object is a star:
*⭐ Score +10*

If the object is a meteor:
*☄️ Life -1*

This creates the main gameplay mechanic.

---

## 📱 Responsive Design

The game is designed to work on different screen sizes.
CSS media queries are used to adjust:

- Header size
- Game information boxes
- Buttons
- Game screen
- Text sizes
- Game container
- The game can be played on both desktop and smaller screens.

---

## 🚀 How to Run

*(No installation or external libraries are required)*

**Step 1**
Download or clone this project.

**Step 2**
Keep all files in the same folder:

- index.html
- style.css
- script.js

**Step 3**
Open index.html in a modern web browser.

**Step 4**
Click:

🚀 (Start Game) and start playing!

---

## 🌐 Browser Support

The game works with modern browsers such as:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari

---

## 🧩 Challenges

Some challenging parts of creating this project were:

- Creating a smooth game loop
- Implementing collision detection
- Making falling objects move correctly
- Managing player lives
- Creating the countdown timer
- Increasing the difficulty as the score increases
- Saving the high score
- Making the interface responsive

---

## 🏆 What I Am Proud Of

I am proud that I created a complete playable browser game using only:

- HTML

### HTML <img width="1366" height="720" alt="Screenshot 2026-08-30 175648" src="https://github.com/user-attachments/assets/c7cb2e2f-be95-409d-a4ca-76b84bc9e1cc" />

- CSS

### CSS <img width="1366" height="720" alt="Screenshot 2026-08-30 175712" src="https://github.com/user-attachments/assets/d3b9d9df-1ea4-4975-9f07-5153f19fd023" />

- JavaScript

### JavaScript <img width="1366" height="720" alt="Screenshot 2026-08-30 175726" src="https://github.com/user-attachments/assets/1e6a74b2-932a-4d06-adf8-61a8c525d4e0" />


The project combines game logic, animation, user interaction and responsive web design into one project.
I am especially proud of the star collection system, meteor system, lives system, timer, high-score system and space-themed design.

---

## 📚 What I Learned

While building Cosmic Catcher, I learned about:

- HTML5 Canvas
- JavaScript game loops
- requestAnimationFrame()
- Keyboard events
- Collision detection
- Random object generation
- DOM manipulation
- JavaScript timers
- Local Storage
- CSS animations
- Responsive web design
- Game-state management

---

## 🔮 Future Improvements

Possible future features include:

- 🔊 Sound effects
- 🎵 Background music
- 🛸 Different spaceships
- 🛡️ Shield powerups 
- ⚡ Speed powerups
- 💎 Bonus objects
- 👾 Special enemies
- ⏸️ Pause button
- 📱 Touch controls
- 🏅 Difficulty levels
- 🌌 More space backgrounds
- 🥇 Online leaderboard
- 🎯 Combo scoring system

---

## 🎯 Project Goal

The main goal of Cosmic Catcher is to create a simple but enjoyable arcade game while practicing HTML, CSS and JavaScript.
The player needs to:

**Catch ⭐ stars → Avoid ☄️ meteors → Survive ⏱️ 60 seconds → Beat the 🏆 high score!**

---

## 👨‍💻 Project Information

**Project Name:** Cosmic Catcher
**Project Type:** Browser Arcade Game
**Languages:** HTML5, CSS3, JavaScript
**Game Time:** 60 seconds
**Starting Lives:** 3
**Star Reward:** +10 points
**Platform:** Web Browser

---

## 🌟 Made With

HTML + CSS + JavaScript
Made with creativity, curiosity and a love for coding. 🚀🌌

---

## 📄 License

***MIT license***

---

## 🌌 Cosmic Catcher

⭐ Catch the stars. ☄️ Avoid the meteors. 🏆 Beat your high score!

---

## ✍️ Author

**Prince Kumar**

---
