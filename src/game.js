import Cannon from "./cannon";
import Monkey from "./monkey";

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
    this.backgroundImg = backgroundImg;
    this.monkeyBallImg = monkeyBallImg;
    this.cannonEmptyLeftImg = cannonEmptyLeftImg;
    this.cannonEmptyRightImg = cannonEmptyRightImg;
    this.blinkCounter = 0;
    this.score = 0;
    this.sessionStarted = false;
    this.gameOver = false;
    this.cannons = [];
    this.monkey = null;
    this.monkeyInFlight = false;
    this.successfulLanding = false;
    this.cannonSpeedX = 5;
    this.distanceMoved = 0;
    this.highestScore = parseInt(localStorage.getItem("highScore"));

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
  }

  reinitialize() {
    this.score = 0;
    this.gameOver = false;
    this.cannons = [];
    this.monkey = null;
    this.monkeyInFlight = false;
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
      if (this.score > this.highestScore) {
        localStorage.setItem("highScore", this.score);
        this.highestScore = parseInt(localStorage.getItem("highScore"));
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
      this.renderStartScreen(ctx);
    } else if (this.gameOver) {
      this.renderGameOver(ctx);
    } else {
      this.drawBackground(ctx);
      this.drawCannons(ctx);
      this.drawMonkey(ctx);
    }
  }

  renderStartScreen(ctx) {
    this.blinkCounter += 1;

    ctx.drawImage(this.backgroundImg, 0, 0, 1000, 600);

    ctx.textAlign = "center";

    ctx.drawImage(this.cannonEmptyRightImg, 305, 250, 90, 90);
    ctx.drawImage(this.monkeyBallImg, 455, 250, 90, 90);
    ctx.drawImage(this.cannonEmptyLeftImg, 605, 250, 90, 90);

    ctx.strokeStyle = "white";
    ctx.fillStyle = "black";
    ctx.font = "24px 'Teko'";
    ctx.strokeText(`Earn 1 point for every cannon you traverse`, 500, 390);
    ctx.fillText(`Earn 1 point for every cannon you traverse`, 500, 390);
    ctx.strokeText(`Earn 3x the points if you dare to traverse 2 cannons at a time!`, 500, 420);
    ctx.fillText(`Earn 3x the points if you dare to traverse 2 cannons at a time!`, 500, 420);

    if (this.blinkCounter <= 120) {
      ctx.font = "120px 'Teko'";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 4;
      ctx.strokeText(`Cannonball`, 500, 200);
      ctx.fillStyle = "white";
      ctx.fillText(`Cannonball`, 500, 200);

      ctx.strokeStyle = "black";
      ctx.fillStyle = "white";
      ctx.font = "40px 'Teko'";
      ctx.strokeText(`Press space to start`, 500, 500);
      ctx.fillText(`Press space to start`, 500, 500);
    } else if (this.blinkCounter > 120 && this.blinkCounter <= 240) {
      ctx.font = "120px 'Teko'";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 4;
      ctx.strokeText(`Cannonball`, 500, 200);
      ctx.fillStyle = "#C6D8FF";
      ctx.fillText(`Cannonball`, 500, 200);

      ctx.strokeStyle = "black";
      ctx.fillStyle = "#C6D8FF";
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
