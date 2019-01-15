import Cannon from "./cannon";
import Monkey from "./monkey";

const axios = require("axios");

const backgroundImg = new Image();
backgroundImg.src = "../assets/images/background.jpeg";
const monkeyBallImg = new Image();
monkeyBallImg.src = "../assets/images/monkey-ball.png";
const cannonEmptyRightImg = new Image();
cannonEmptyRightImg.src = "../assets/images/cannon-empty-right.png";
const cannonEmptyLeftImg = new Image();
cannonEmptyLeftImg.src = "../assets/images/cannon-empty-left.png";

const bgTheme = new Audio("../assets/sounds/bg_theme2.mp3");
const barrelBlast = new Audio("../assets/sounds/barrel_blast.mp3");
const barrelLoad = new Audio("../assets/sounds/barrel_load.mp3");

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.blinkCounter = 0;
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
    this.highestScore = parseInt(localStorage.getItem("highScore")) || 0;

    this.leaderboard = document.getElementById("leaderboard");
    this.statsMidContainer = document.getElementById("stats-mid-container");
    this.backgroundImg = backgroundImg;
    this.monkeyBallImg = monkeyBallImg;
    this.cannonEmptyLeftImg = cannonEmptyLeftImg;
    this.cannonEmptyRightImg = cannonEmptyRightImg;

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
    return axios.get("/scores").then(res => {
      const scores = res.data;

      //Populates leaderboard with top 50 scores
      for (let i = 0; i < 50; i++) {
        const rankDiv = document.createElement("DIV");
        const rankText = document.createTextNode(`${i + 1}.`);
        rankDiv.setAttribute("class", "rank-div");
        rankDiv.appendChild(rankText);

        const usernameDiv = document.createElement("DIV");
        const usernameText = document.createTextNode(`Username`);
        usernameDiv.setAttribute("class", "username-div");
        usernameDiv.appendChild(usernameText);

        const scoreDiv = document.createElement("DIV");
        const scoreText = document.createTextNode(`${scores[i].score}`);
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

      const gamesPlayedDiv = document.getElementById("games-played");
      const gamesPlayedText = document.createTextNode(`Total games played: ${gamesPlayed}`);
      gamesPlayedDiv.appendChild(gamesPlayedText);

      const averageScoreDiv = document.getElementById("average-score");
      const averageScoreText = document.createTextNode(`Average score: ${averageScore}`);
      averageScoreDiv.appendChild(averageScoreText);

      const medianScoreDiv = document.getElementById("median-score");
      const medianScoreText = document.createTextNode(`Most common score: ${medianScore}`);
      medianScoreDiv.appendChild(medianScoreText);

      //__% of all games score 0 or 1 points
      const zeroOrOnePercent = Math.floor((zeroOrOne / gamesPlayed) * 100);

      const tidBitOneDiv = document.getElementById("tidbit-1");
      const tidBitOneText = document.createTextNode(
        `${zeroOrOnePercent}% of all games end between 0 and 1 points`
      );
      tidBitOneDiv.appendChild(tidBitOneText);

      //95% of games score __ or lower
      const percentile95 = gamesPlayed - Math.floor(0.95 * gamesPlayed);
      const score95 = scores[percentile95].score;

      const tidBitTwoDiv = document.getElementById("tidbit-2");
      const tidBitTwoText = document.createTextNode(`95% of all games score ${score95} or lower`);
      tidBitTwoDiv.appendChild(tidBitTwoText);

      //If you score __ or higher, you're doing better than 99% of all games played
      const percentile99 = gamesPlayed - Math.floor(0.99 * gamesPlayed);
      const score99 = scores[percentile99].score;
      const tidBitThreeDiv = document.getElementById("tidbit-3");
      const tidBitThreeText = document.createTextNode(
        `If you happen to score ${score99} points or higher, you're in the 99th percentile!`
      );
      tidBitThreeDiv.appendChild(tidBitThreeText);
    });
  }

  createScore(score) {
    return axios.post("/scores", score);
  }

  reinitialize() {
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

  draw(ctx) {
    if (!this.sessionStarted) {
      this.renderStartScreen(ctx);
    } else if (this.gameOver) {
      this.renderGameOver(ctx);
    } else {
      this.drawBackground(ctx);
      this.drawCannons(ctx);
      this.drawMonkey(ctx);
    }
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
        localStorage.setItem("highScore", this.score);
        this.highestScore = parseInt(localStorage.getItem("highScore"));
      }
      if (!this.scoreSaved) {
        this.createScore({ score: this.score });
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

  renderStartScreen(ctx) {
    this.blinkCounter += 1;

    ctx.drawImage(this.backgroundImg, 0, 0, 1000, 600);

    ctx.textAlign = "center";

    ctx.drawImage(this.cannonEmptyRightImg, 305, 250, 90, 90);
    ctx.drawImage(this.monkeyBallImg, 455, 250, 90, 90);
    ctx.drawImage(this.cannonEmptyLeftImg, 605, 250, 90, 90);

    ctx.font = "120px 'Teko'";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.strokeText(`Cannonball`, 500, 200);
    ctx.fillStyle = "#F5C028";
    ctx.fillText(`Cannonball`, 500, 200);

    ctx.strokeStyle = "white";
    ctx.fillStyle = "black";
    ctx.font = "24px 'Teko'";
    ctx.strokeText(`Earn 1 point for every cannon you traverse`, 500, 390);
    ctx.fillText(`Earn 1 point for every cannon you traverse`, 500, 390);
    ctx.strokeText(`Earn 3x the points if you dare to traverse 2 cannons at a time!`, 500, 420);
    ctx.fillText(`Earn 3x the points if you dare to traverse 2 cannons at a time!`, 500, 420);

    if (this.blinkCounter <= 120) {
      ctx.strokeStyle = "black";
      ctx.fillStyle = "white";
      ctx.font = "40px 'Teko'";
      ctx.strokeText(`Press space to start`, 500, 500);
      ctx.fillText(`Press space to start`, 500, 500);
    } else if (this.blinkCounter > 120 && this.blinkCounter <= 240) {
      ctx.strokeStyle = "black";
      ctx.fillStyle = "#F5C028";
      ctx.font = "40px 'Teko'";
      ctx.strokeText(`Press space to start`, 500, 500);
      ctx.fillText(`Press space to start`, 500, 500);
    } else {
      this.blinkCounter = 0;
    }
  }

  renderGameOver(ctx) {
    ctx.textAlign = "center";
    ctx.font = "80px 'Teko'";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.strokeText(`GAME OVER`, 500, 200);
    ctx.fillStyle = "white";
    ctx.fillText(`GAME OVER`, 500, 200);

    ctx.font = "40px 'Teko'";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    ctx.fillStyle = "black";
    ctx.strokeText(`Your best score : ${this.highestScore}`, 500, 300);
    ctx.strokeText(`Recent score : ${this.score}`, 500, 350);

    ctx.fillStyle = "black";
    ctx.fillText(`Your best score : ${this.highestScore}`, 500, 300);
    ctx.fillText(`Recent score : ${this.score}`, 500, 350);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.strokeText(`PRESS SPACE TO CONTINUE PLAYING`, 500, 450);
    ctx.fillStyle = "white";
    ctx.fillText(`PRESS SPACE TO CONTINUE PLAYING`, 500, 450);
  }

  drawBackground(ctx) {
    ctx.drawImage(this.backgroundImg, 0, 0, 1000, 600);
    ctx.textAlign = "right";
    ctx.font = "30px 'Teko'";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    ctx.strokeText(`Score : ${this.score}`, 990, 30);
    ctx.fillStyle = "black";
    ctx.fillText(`Score : ${this.score}`, 990, 30);
  }

  drawCannons(ctx) {
    this.cannons.forEach(cannon => {
      cannon.drawStationary(ctx);
    });
  }

  drawMonkey(ctx) {
    if (this.monkey) {
      this.monkey.degrees += 5;
      this.monkey.drawRotated(ctx, this.monkey.degrees);
    }
  }
}

export default Game;
