import Cannon from "./cannon";
import Monkey from "./monkey";
import { renderStartScreen, renderGameOver, drawBackground, drawCannons, drawMonkey } from "./draw";

const axios = require("axios");
const usernameGenerator = require("username-generator");

const bgTheme = new Audio("../assets/sounds/bg_theme2.mp3");
const barrelBlast = new Audio("../assets/sounds/barrel_blast.mp3");
const barrelLoad = new Audio("../assets/sounds/barrel_load.mp3");

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.username = usernameGenerator.generateUsername("", 6);
    this.startBlinkCounter = 0;
    this.endBlinkCounter = 0;
    this.score = 0;
    this.scoreSaved = false;
    this.sessionStarted = false;
    this.gameOver = false;
    this.cannons = [];
    this.monkey = null;
    this.monkeyInFlight = false;
    this.successfulLanding = false;
    this.cannonSpeedX = 5;
    this.distanceMoved = 0;
    this.highestScore = parseInt(sessionStorage.getItem("highScore")) || 0;

    this.leaderboard = document.getElementById("leaderboard");
    this.statsMidContainer = document.getElementById("stats-mid-container");
    this.statsRightContainer = document.getElementById("stats-right-container");

    this.bgTheme = bgTheme;
    this.bgTheme.volume = 0.1;
    this.barrelBlast = barrelBlast;
    this.barrelBlast.volume = 0.2;
    this.barrelLoad = barrelLoad;
    this.barrelLoad.volume = 0.2;
    this.audio = document.getElementById("audio");

    this.audio.onclick = function() {
      if (audio.className === "on") {
        audio.classList.add("off");
        audio.classList.remove("on");
        audio.src = "../assets/images/mute.png";
        bgTheme.volume = 0;
        barrelBlast.volume = 0;
        barrelLoad.volume = 0;
      } else {
        audio.classList.add("on");
        audio.classList.remove("off");
        audio.src = "../assets/images/speaker.png";
        bgTheme.volume = 0.1;
        barrelBlast.volume = 0.2;
        barrelLoad.volume = 0.2;
      }
    };

    this.animate();
    this.detectKeyPress();

    this.scores = this.fetchScores();
  }

  fetchScores() {
    //Retreives all scores
    while (this.leaderboard.firstChild) {
      this.leaderboard.removeChild(this.leaderboard.firstChild);
    }

    while (this.statsMidContainer.firstChild) {
      this.statsMidContainer.removeChild(this.statsMidContainer.firstChild);
    }

    while (this.statsRightContainer.firstChild) {
      this.statsRightContainer.removeChild(this.statsRightContainer.firstChild);
    }

    return axios.get("/scores").then(res => {
      const scores = res.data;

      //Populates leaderboard with top 50 scores
      for (let i = 0; i < 20; i++) {
        const rankDiv = document.createElement("DIV");
        const rankText = document.createTextNode(`${i + 1}.`);
        rankDiv.setAttribute("class", "rank-div");
        rankDiv.appendChild(rankText);

        const usernameDiv = document.createElement("DIV");
        const usernameText = document.createTextNode(scores[i].username);
        usernameDiv.setAttribute("class", "username-div");
        usernameDiv.appendChild(usernameText);

        const scoreDiv = document.createElement("DIV");
        const scoreText = document.createTextNode(scores[i].score);
        scoreDiv.setAttribute("class", "score-div");
        scoreDiv.appendChild(scoreText);

        const li = document.createElement("LI");
        li.setAttribute("class", "leaderboard-li");
        li.appendChild(rankDiv);
        li.appendChild(usernameDiv);
        li.appendChild(scoreDiv);
        this.leaderboard.appendChild(li);
      }

      //Calculate total games played, average score, and median score
      const gamesPlayed = scores.length;
      const middle = Math.floor(gamesPlayed / 2);
      const medianScore = scores[middle].score;
      let totalScore = 0;
      let zeroOrOne = 0;
      for (let i = 0; i < scores.length; i++) {
        totalScore += scores[i].score;

        if (scores[i].score === 0 || scores[i].score === 1) {
          zeroOrOne += 1;
        }
      }
      const averageScore = (totalScore / gamesPlayed).toFixed(2);

      const medianScoreDiv = document.createElement("DIV");
      medianScoreDiv.setAttribute("id", "median-score");
      const medianScoreText = document.createTextNode(`Most common score: ${medianScore}`);
      medianScoreDiv.appendChild(medianScoreText);
      this.statsMidContainer.appendChild(medianScoreDiv);

      const averageScoreDiv = document.createElement("DIV");
      averageScoreDiv.setAttribute("id", "average-score");
      const averageScoreText = document.createTextNode(`Average score: ${averageScore}`);
      averageScoreDiv.appendChild(averageScoreText);
      this.statsMidContainer.appendChild(averageScoreDiv);

      const gamesPlayedDiv = document.createElement("DIV");
      gamesPlayedDiv.setAttribute("id", "games-played");
      const gamesPlayedText = document.createTextNode(`Total games played: ${gamesPlayed}`);
      gamesPlayedDiv.appendChild(gamesPlayedText);
      this.statsMidContainer.appendChild(gamesPlayedDiv);

      //__% of all games score 0 or 1 points
      const zeroOrOnePercent = Math.floor((zeroOrOne / gamesPlayed) * 100);

      const tidBitOneDiv = document.createElement("DIV");
      tidBitOneDiv.setAttribute("id", "tidbit-1");
      const tidBitOneText = document.createTextNode(
        `${zeroOrOnePercent}% of all games end between 0 and 1 points`
      );
      tidBitOneDiv.appendChild(tidBitOneText);
      this.statsRightContainer.appendChild(tidBitOneDiv);

      //95% of games score __ or lower
      const percentile95 = gamesPlayed - Math.floor(0.95 * gamesPlayed);
      const score95 = scores[percentile95].score;

      const tidBitTwoDiv = document.createElement("DIV");
      tidBitTwoDiv.setAttribute("id", "tidbit-2");
      const tidBitTwoText = document.createTextNode(`95% of all games score ${score95} or lower`);
      tidBitTwoDiv.appendChild(tidBitTwoText);
      this.statsRightContainer.appendChild(tidBitTwoDiv);

      //If you score __ or higher, you're doing better than 99% of all games played
      const percentile99 = gamesPlayed - Math.floor(0.99 * gamesPlayed);
      const score99 = scores[percentile99].score;

      const tidBitThreeDiv = document.createElement("DIV");
      tidBitThreeDiv.setAttribute("id", "tidbit-3");
      const tidBitThreeText = document.createTextNode(
        `If you happen to score ${score99} points or higher, you're in the 99th percentile!`
      );
      tidBitThreeDiv.appendChild(tidBitThreeText);
      this.statsRightContainer.appendChild(tidBitThreeDiv);
    });
  }

  createScore(score) {
    return axios.post("/scores", score);
  }

  reinitialize() {
    this.fetchScores();
    this.score = 0;
    this.scoreSaved = false;
    this.gameOver = false;
    this.cannons = [];
    this.monkey = null;
    this.distanceMoved = 0;
  }

  animate() {
    if (!this.monkeyInFlight) {
      if (this.cannons.length < 3) {
        this.addCannon();
      }
    }

    if (this.monkeyInFlight && !this.successfulLanding) {
      this.moveAllCannons();
      this.distanceMoved += this.cannonSpeedX;
    } else if (this.cannons[0].position[0] >= 155) {
      this.moveAllCannons();
      this.distanceMoved += this.cannonSpeedX;
    } else {
      this.monkeyInFlight = false;
      this.successfulLanding = false;
      this.distanceMoved = 0;
    }

    this.step(this.ctx);

    this.draw(this.ctx);

    requestAnimationFrame(this.animate.bind(this));
  }

  step() {
    this.cannons.forEach(cannon => {
      cannon.moveY();
    });

    if (this.monkey) {
      this.monkey.move();
    }

    this.detectCollisions();
  }

  detectKeyPress() {
    window.addEventListener("keydown", event => {
      const RIGHTEMPTY = "RIGHTEMPTY";
      if (event.keyCode === 32) {
        event.preventDefault();
      }
      if (event.keyCode === 32 && !this.monkeyInFlight) {
        if (!this.sessionStarted) {
          this.sessionStarted = true;
          this.bgTheme.play();
          this.bgTheme.loop = true;
        } else if (this.gameOver) {
          this.reinitialize();
        } else {
          this.addMonkey();
          this.barrelBlast.play();
          this.monkeyInFlight = true;
          this.cannons[0].horizontalD = RIGHTEMPTY;
        }
      }
    });
  }

  detectCollisions() {
    let nextCannonX, nextCannonY, lastCannonX, lastCannonY, monkeyX, monkeyY;

    if (this.cannons[1]) {
      nextCannonX = this.cannons[1].position[0];
      nextCannonY = this.cannons[1].position[1];
    }

    if (this.cannons[2]) {
      lastCannonX = this.cannons[2].position[0];
      lastCannonY = this.cannons[2].position[1];
    }

    if (this.monkey) {
      monkeyX = this.monkey.position[0];
      monkeyY = this.monkey.position[1];
    }

    const xBoundaries = [0, 1000];
    const yBoundaries = [0, 600];

    if (
      monkeyX + 30 >= nextCannonX + 30 &&
      monkeyX + 30 <= nextCannonX + 100 &&
      monkeyY + 30 >= nextCannonY + 30 &&
      monkeyY + 30 <= nextCannonY + 100
    ) {
      this.removeMonkey();
      this.removeCannon();
      this.successfulLanding = true;
      this.score += 1;
      this.barrelLoad.play();
    } else if (
      monkeyX + 30 >= lastCannonX + 30 &&
      monkeyX + 30 <= lastCannonX + 100 &&
      monkeyY + 30 >= lastCannonY + 30 &&
      monkeyY + 30 <= lastCannonY + 100
    ) {
      this.removeMonkey();
      this.removeCannon();
      this.removeCannon();
      this.successfulLanding = true;
      this.score += 3;
      this.barrelLoad.play();
    } else if (
      monkeyX + 30 <= xBoundaries[0] ||
      monkeyX + 30 >= xBoundaries[1] ||
      monkeyY + 30 <= yBoundaries[0] ||
      monkeyY + 30 >= yBoundaries[1]
    ) {
      this.gameOver = true;
      this.monkeyInFlight = false;
      if (this.score > this.highestScore) {
        sessionStorage.setItem("highScore", this.score);
        this.highestScore = parseInt(sessionStorage.getItem("highScore"));
      }
      if (!this.scoreSaved) {
        this.createScore({ score: this.score, username: this.username });
        this.scoreSaved = true;
      }
    }
  }

  moveAllCannons() {
    this.cannons.forEach(cannon => {
      cannon.moveX(this.cannonSpeedX);
    });
  }

  addCannon() {
    let xPos;
    let verticalD;
    let horizontalD;
    const LEFT = "LEFT";
    const RIGHTFULL = "RIGHTFULL";

    if (this.cannons.length <= 0) {
      xPos = 150;
      verticalD = 2;
      horizontalD = RIGHTFULL;
    } else {
      xPos = this.cannons[this.cannons.length - 1].position[0] + 300;
      verticalD = -this.cannons[this.cannons.length - 1].verticalD;
      horizontalD = LEFT;
    }

    this.cannons.push(new Cannon(xPos, verticalD, horizontalD));
  }

  removeCannon() {
    const RIGHTFULL = "RIGHTFULL";
    this.cannons.splice(0, 1);
    this.cannons[0].horizontalD = RIGHTFULL;
  }

  addMonkey() {
    let xPos = this.cannons[0].position[0] + 45;
    let yPos = this.cannons[0].position[1];

    this.monkey = new Monkey(xPos, yPos);
  }

  removeMonkey() {
    this.monkey = null;
  }

  draw(ctx) {
    if (!this.sessionStarted) {
      renderStartScreen(ctx, this.startBlinkCounter);
      this.startBlinkCounter += 1;
      if (this.startBlinkCounter >= 240) this.startBlinkCounter = 0;
    } else if (this.gameOver) {
      renderGameOver(ctx, this.endBlinkCounter, this.highestScore, this.score);
      this.endBlinkCounter += 1;
      if (this.endBlinkCounter >= 240) this.endBlinkCounter = 0;
    } else {
      drawBackground(ctx, this.score, this.username);
      drawCannons(ctx, this.cannons);
      drawMonkey(ctx, this.monkey);
    }
  }
}

export default Game;
