const cannonEmptyLeftImage = new Image();
cannonEmptyLeftImage.src = "../assets/images/cannon-empty-left.png";
const cannonEmptyRightImage = new Image();
cannonEmptyRightImage.src = "../assets/images/cannon-empty-right.png";
const cannonFullLeftImage = new Image();
cannonFullLeftImage.src = "../assets/images/cannon-full-left.png";
const cannonFullRightImage = new Image();
cannonFullRightImage.src = "../assets/images/cannon-full-right.png";

class Cannon {
  constructor(xPos, verticalD, horizontalD) {
    let yPos = Math.random() * 500 + 50;

    this.position = [xPos, yPos];
    this.emptyLeftImage = cannonEmptyLeftImage;
    this.emptyRightImage = cannonEmptyRightImage;
    this.fullLeftImage = cannonFullLeftImage;
    this.fullRightImage = cannonFullRightImage;
    this.verticalD = verticalD;
    this.horizontalD = horizontalD;
    this.degrees = 0;
  }

  drawStationary(ctx) {
    let image = this.selectImage();
    ctx.drawImage(image, this.position[0], this.position[1], 60, 60);
  }

  drawRotated(ctx, degrees) {
    let image = this.selectImage();

    ctx.save();
    ctx.translate(this.position[0], this.position[1]);
    ctx.rotate((degrees * Math.PI) / 180);
    ctx.drawImage(image, -image.width / 2, -image.width / 2, 60, 60);
    ctx.restore();
  }

  move() {
    this.position[1] += this.verticalD;
    if (this.position[1] <= 0 || this.position[1] + 60 >= 600) {
      this.verticalD = -this.verticalD;
    }
  }

  selectImage() {
    let image;
    if (this.horizontalD === "LEFT") {
      image = this.emptyLeftImage;
    } else {
      image = this.emptyRightImage;
    }

    return image;
  }
}

export default Cannon;
