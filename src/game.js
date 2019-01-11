import Cannon from "./cannon";
import Monkey from "./monkey";

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.cannons = [];
    this.monkey = null;
    this.animate();
    window.removeCannon = this.removeCannon.bind(this, this.ctx);

    this.detectSpacePress();
  }

  animate() {
    if (this.cannons.length < 3) {
      this.addCannon();
    }

    this.draw(this.ctx);
    this.step();

    requestAnimationFrame(this.animate.bind(this));
  }

  step() {
    this.cannons.forEach(cannon => {
      cannon.move();
    });

    if (this.monkey) {
      this.monkey.move();
    }

    this.detectCollisions();
  }

  detectSpacePress() {
    window.addEventListener("keydown", event => {
      if (event.keyCode === 32) {
        this.addMonkey();
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
    const XBoundaries = [0, 1000];
    const yBoundaries = [0, 600];

    if (
      monkeyX + 40 >= nextCannonX &&
      monkeyX + 40 <= nextCannonX + 45 &&
      monkeyY + 40 >= nextCannonY &&
      monkeyY + 40 <= nextCannonY + 45
    ) {
      this.removeMonkey();
    }
  }

  addCannon() {
    let xPos;
    let verticalD;
    let horizontalD;
    const LEFT = "LEFT";
    const RIGHT = "RIGHT";

    if (this.cannons.length <= 0) {
      xPos = 150;
      verticalD = 1;
      horizontalD = RIGHT;
    } else {
      xPos = this.cannons[this.cannons.length - 1].position[0] + 300;
      verticalD = -this.cannons[this.cannons.length - 1].verticalD;
      horizontalD = LEFT;
    }

    this.cannons.push(new Cannon(xPos, verticalD, horizontalD));
  }

  removeCannon(ctx) {
    const RIGHT = "RIGHT";
    this.cannons.splice(0, 1);
    this.cannons[0].horizontalD = RIGHT;
    this.drawCannons(ctx);
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
    this.drawBackground(ctx);
    this.drawCannons(ctx);
    this.drawMonkey(ctx);
  }

  drawBackground(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 1000, 600);
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
      this.monkey.drawStationary(ctx);
    }
  }
}

export default Game;
