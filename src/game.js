import Cannon from "./sprites/cannon";
import Monkey from "./sprites/monkey";
import GameAudio from "./audio";
import { drawCannons, drawMonkey } from "./draw/drawSprites";
import { renderBackground } from "./draw/renderBackground";
import { renderStartScreen } from "./draw/renderStartScreen";
import { renderGameOver } from "./draw/renderGameOver";
import { fetchScores, updateHighScore, saveScore } from "./scores";
import { detectSuccessfulLanding, detectWallCollision } from "./collisions";

const usernameGenerator = require("username-generator");
const cannonSpeedX = 10;
const RIGHTEMPTY = "RIGHTEMPTY";
const LEFT = "LEFT";
const RIGHTFULL = "RIGHTFULL";

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.username = usernameGenerator.generateUsername("", 5);
    this.score = 0;
    this.highestScore = parseInt(sessionStorage.getItem("highScore")) || 0;
    this.scoreSaved = false;
    this.sessionStarted = false;
    this.gameOver = false;
    this.cannons = [];
    this.monkey = null;
    this.monkeyInFlight = false;
    this.successfulLanding = false;
    this.distanceMoved = 0;
    this.gameAudio = new GameAudio();
  }

  animate() {
    if (this.cannons.length < 3) this.addCannon();

    if (this.monkeyInFlight && !this.successfulLanding) {
      this.moveAllCannons();
      this.distanceMoved += cannonSpeedX;
    } else if (this.cannons[0].xPos >= 155) {
      this.moveAllCannons();
      this.distanceMoved += cannonSpeedX;
    } else {
      this.monkeyInFlight = false;
      this.successfulLanding = false;
      this.distanceMoved = 0;
    }

    this.step(this.ctx);
    this.drawCanvas(this.ctx);
    requestAnimationFrame(this.animate.bind(this));
  }

  step() {
    this.detectCollisions();
    this.cannons.forEach(cannon => cannon.moveY());
    if (this.monkey) this.monkey.move();
  }

  detectKeyPress() {
    window.addEventListener("keydown", event => {
      if (event.keyCode === 32) {
        event.preventDefault();
      }
      if (event.keyCode === 32 && !this.monkeyInFlight) {
        if (!this.sessionStarted) {
          this.startGame();
        } else if (this.gameOver) {
          this.restartGame();
        } else {
          this.launchMonkey();
        }
      }
    });
  }

  startGame() {
    this.sessionStarted = true;
    this.gameAudio.bgTheme.play();
    this.gameAudio.bgTheme.loop = true;
  }

  restartGame() {
    fetchScores();
    this.score = 0;
    this.scoreSaved = false;
    this.gameOver = false;
    this.cannons = [];
    this.monkey = null;
    this.distanceMoved = 0;
  }

  launchMonkey() {
    this.addMonkey();
    this.gameAudio.barrelBlast.play();
    this.monkeyInFlight = true;
    this.cannons[0].horizontalD = RIGHTEMPTY;
  }

  drawCanvas(ctx) {
    if (!this.sessionStarted) {
      renderStartScreen(ctx);
    } else if (this.gameOver) {
      renderGameOver(ctx, this.highestScore, this.score);
    } else {
      renderBackground(ctx, this.score, this.username);
      drawCannons(ctx, this.cannons);
      drawMonkey(ctx, this.monkey);
    }
  }

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

  moveAllCannons() {
    this.cannons.forEach(cannon => {
      cannon.moveX(cannonSpeedX);
    });
  }

  addCannon() {
    let xPos, verticalD, horizontalD;

    if (this.cannons.length <= 0) {
      xPos = 150;
      verticalD = 4;
      horizontalD = RIGHTFULL;
    } else {
      xPos = this.cannons[this.cannons.length - 1].xPos + 300;
      verticalD = -this.cannons[this.cannons.length - 1].verticalD;
      horizontalD = LEFT;
    }

    this.cannons.push(new Cannon(xPos, verticalD, horizontalD));
  }

  removeCannon() {
    this.cannons.splice(0, 1);
    this.cannons[0].horizontalD = RIGHTFULL;
  }

  addMonkey() {
    let xPos = this.cannons[0].xPos + 45;
    let yPos = this.cannons[0].yPos;

    this.monkey = new Monkey(xPos, yPos);
  }

  removeMonkey() {
    this.monkey = null;
  }
}

export default Game;
