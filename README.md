# Cosmic Catcher

A small space arcade game I made with HTML, CSS and JavaScript for Stardance. You have 60 seconds and 3 lives. Catch the stars for points and dodge the meteors.

Live Demo: https://princekumar189344-netizen.github.io/Cosmic-Catcher/
Made by: @princekumar

---

### Why I made this

I wanted to make a simple arcade game that I could actually finish in a weekend. I love space games, so I thought of a catcher that moves left-right at the bottom of the screen catching falling stars. The idea was to keep it super simple - just one canvas, one player, two types of falling objects.

I didn't want to use any library like Phaser. I wanted to understand how a game loop really works.

---

### How I actually built it

The game is just 3 files - index.html, style.css, script.js.

The main part is in script.js. The game runs on `requestAnimationFrame`. Every frame it does:
1. Draws the background starfield
2. Moves the player based on A/D or Arrow keys
3. Spawns a new star or meteor
4. Moves all falling objects down
5. Checks for collision with the catcher

For collision I just check if the rectangles overlap. It's not perfect but it works for this game.

Player is drawn as a simple trapezoid shape with `ctx.fill()`. Stars are drawn as 10-point shapes, meteors as circles.

For difficulty, I made the spawn delay decrease as score increases: `spawnDelay = Math.max(300, 900 - score * 3)`. So the more you score, the faster objects come.

High score is saved in `localStorage` so it stays even after refresh.

---

## Photos 

### HTML 

<img width="1366" height="720" alt="Screenshot 2026-08-31 165236" src="https://github.com/user-attachments/assets/a587b6b0-472a-450e-9641-806385a5cfd4" />

### CSS

<img width="1366" height="720" alt="Screenshot 2026-08-31 165252" src="https://github.com/user-attachments/assets/80ffaf14-e66b-49be-a2cf-b9c62e13021c" />

### Javascript

<img width="1366" height="720" alt="Screenshot 2026-08-31 165309" src="https://github.com/user-attachments/assets/2c486483-502a-472b-9799-44798c1bba0b" />

---

### Features

- 60 second timer and 3 lives system. If you hit a meteor you lose a heart, if you catch a star you get 10 points.
- Moving starfield background made with 80 small dots moving down the canvas.
- Controls with both Arrow keys and A/D which I added because it felt more natural while testing.
- Game Over screen with final score and Play Again button.
- Responsive layout - I used media queries to make the info boxes turn into a grid on mobile.
- No images or external libraries, everything is drawn with Canvas.

---

### How to play

1. Open index.html in a browser
2. Click Start Game
3. Use Left/Right arrow or A/D to move the catcher
4. Try to survive 60 seconds

---

### Challenges I faced

The biggest problem was the game loop. At first the objects were spawning too fast and lagging. I had to use a timestamp check with `lastSpawn` to control it.

Second was collision detection. My first version used center distance but it was not accurate for the trapezoid player, so I switched to simple box collision.

Also the timer was running even after game over, so I had to add a `playing` flag and clear the interval properly.

---

### What I learned

This was my first time properly using HTML5 Canvas. I learned about:
- requestAnimationFrame and why it's better than setInterval for games
- handling keydown/keyup properly
- how to manage game states (start, playing, game over)
- localStorage for high scores

---

### What's next

I want to add sound when you catch a star, a pause button, and maybe touch controls for mobile. A shield power-up could be fun too.

Thanks for checking it out!

---

## Final 

<img width="1365" height="720" alt="Screenshot 2026-08-30 213945" src="https://github.com/user-attachments/assets/0e6c6fa5-c452-4446-b2ca-ce1c58d1ed29" />

---

## Author

**Prince Kumar**
