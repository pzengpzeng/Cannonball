import Cannon from "./cannon";

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.cannons = [];
    this.animate();
    window.removeCannon = this.removeCannon.bind(this, this.ctx);
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

  draw(ctx) {
    this.drawBackground(ctx);
    this.drawCannons(ctx);
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
}

export default Game;
