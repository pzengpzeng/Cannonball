const monkeyBallImage = new Image();
monkeyBallImage.src = "../assets/images/monkey-ball.png";

class Monkey {
  constructor(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.ballImage = monkeyBallImage;
    this.degrees = 0;
  }

  drawRotated(ctx, degrees) {
    ctx.save();
    ctx.translate(this.xPos, this.yPos);
    ctx.rotate((degrees * Math.PI) / 180);
    ctx.drawImage(this.ballImage, -60 / 2, -60 / 2, 60, 60);
    ctx.restore();
  }

  move() {
    this.xPos += 8;
  }
}

export default Monkey;
