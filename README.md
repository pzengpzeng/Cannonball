# Monkeyball

## Overview

One of my favorite parts of the Donkey Kong series was when you'd load yourself up in a barrel, blast yourself off into the air, and cross your fingers that you'd timed your liftoff correctly so that you'd land in the next barrel with your life intact.

Monkeyball is inspired by this game mechanic and lets you traverse from cannon to cannon to your heart's content. Want to show off your skills? Try to make it onto the leaderboard!

[Play Monkeyball here!](http://monkeyball.peterzeng.io/)

## Technologies

- JavaScript
- Canvas
- HTML
- CSS
- MongoDB
- Express
- Node
- Webpack

## Gameplay Demo

A deceptively simple game that can truly test your concentration and reaction time.

![Gameplay Demo](./dist/assets/gameplay.gif)

## Code Highlights

### _Collision Detection_

When a player launches the monkey, there are 3 scenarios that can occur.

1. The launch was successful and 1 cannon was traversed.
2. The launch was successful and 2 cannons were traversed.
3. The launch was unsuccessful and the game is over.

The code below contains the logic behind determining which of these 3 scenarios has occurred and how to update the game state accordingly by answering the following questions.

- If the launch was successful, should the player be given 1 or 3 points?
- If the game is over, is this the best score this player has acheived during this play session?

```
detectCollisions() {
    let secondCannon, thirdCannon, monkey;

    if (this.cannons[1]) secondCannon = this.cannons[1];
    if (this.cannons[2]) thirdCannon = this.cannons[2];
    if (this.monkey) monkey = this.monkey;

    if (detectSuccessfulLanding(monkey, secondCannon)) {
      this.updateGameState(1, 1);
    } else if (detectSuccessfulLanding(monkey, thirdCannon)) {
      this.updateGameState(3, 2);
    } else if (monkey && detectWallCollision(monkey)) {
      this.gameOver = true;
      this.monkeyInFlight = false;
      this.highestScore = updateHighScore(this.score, this.highestScore);
      this.scoreSaved = saveScore(this.scoreSaved, this.score, this.username);
    }
  }

updateGameState(scoreIncrement, numCannonsToRemove) {
  for (let i = 0; i < numCannonsToRemove; i++) this.removeCannon();
  this.removeMonkey();
  this.successfulLanding = true;
  this.score += scoreIncrement;
  this.gameAudio.barrelLoad.play();
}
```
