import Cannon from "./cannon";
import Monkey from "./monkey";

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.score = 0;
    this.gameOver = false;
    this.cannons = [];
    this.monkey = null;
    this.successfulLaunch = false;
    this.distanceMoved = 0;

    this.animate();
    this.detectKeyPress();
  }

  animate() {
    if (this.cannons.length < 3) {
      this.addCannon();
    }

    this.draw(this.ctx);

    if (this.successfulLaunch) {
      if (this.distanceMoved <= 300) {
        this.moveAllCannons();
        this.distanceMoved += 5;
      } else {
        this.successfulLaunch = false;
        this.distanceMoved = 0;
      }
    } else {
      this.step(this.ctx);
    }

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
        this.addMonkey();
        this.cannons[0].horizontalD = RIGHTEMPTY;
      } else if (event.keyCode === 13) {
        location.reload();
      }
    });
  }

  detectCollisions() {
    let nextCannonX, nextCannonY, monkeyX, monkeyY;

    if (this.cannons[1]) {
      nextCannonX = this.cannons[1].position[0];
      nextCannonY = this.cannons[1].position[1];
    }

    if (this.monkey) {
      monkeyX = this.monkey.position[0];
      monkeyY = this.monkey.position[1];
    }
    const xBoundaries = [0, 1000];
    const yBoundaries = [0, 600];

    if (
      monkeyX + 30 >= nextCannonX + 45 &&
      monkeyX + 30 <= nextCannonX + 90 &&
      monkeyY + 30 >= nextCannonY + 45 &&
      monkeyY + 30 <= nextCannonY + 90
    ) {
      this.removeMonkey();
      this.removeCannon();
      this.score += 1;
      this.successfulLaunch = true;
    } else if (
      monkeyX <= xBoundaries[0] ||
      monkeyX >= xBoundaries[1] ||
      monkeyY <= yBoundaries[0] ||
      monkeyY >= yBoundaries[1]
    ) {
      this.gameOver = true;
    }
  }

  moveAllCannons() {
    this.cannons.forEach(cannon => {
      cannon.moveX(5);
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
    if (this.gameOver) {
      this.renderGameOver(ctx);
    } else {
      this.drawBackground(ctx);
      this.drawCannons(ctx);
      this.drawMonkey(ctx);
    }
  }

  renderGameOver(ctx) {
    ctx.textAlign = "center";
    ctx.font = "40px 'Teko'";
    ctx.fillStyle = "white";
    ctx.fillText(`THANKS FOR PLAYING!`, 500, 300);
    ctx.fillStyle = "yellow";
    ctx.fillText(`Press enter to restart!`, 500, 350);
  }

  drawBackground(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 1000, 600);
    ctx.font = "30px 'Teko'";
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${this.score}`, 860, 30);
  }

  drawCannons(ctx) {
    this.cannons.forEach(cannon => {
      cannon.drawStationary(ctx);
      // cannon.degrees += 0.3;
      // cannon.drawRotated(ctx, cannon.degrees);
    });
  }

  drawMonkey(ctx) {
    if (this.monkey) {
      // this.monkey.drawStationary(ctx);
      this.monkey.degrees += 5;
      this.monkey.drawRotated(ctx, this.monkey.degrees);
    }
  }
}

export default Game;
