const monkeyBallImage = new Image();
monkeyBallImage.src = "../assets/images/monkey-ball.png";

class Monkey {
  constructor(xPos, yPos) {
    this.position = [xPos, yPos];
    this.ballImage = monkeyBallImage;
    this.degrees = 0;
  }

  drawRotated(ctx, degrees) {
    ctx.save();
    ctx.translate(this.position[0], this.position[1]);
    ctx.rotate((degrees * Math.PI) / 180);
    ctx.drawImage(this.ballImage, -60 / 2, -60 / 2, 60, 60);
    ctx.restore();
  }

  move() {
    this.position[0] += 4;
  }
}

export default Monkey;
