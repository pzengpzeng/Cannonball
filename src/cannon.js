const cannonEmptyLeftImage = new Image();
cannonEmptyLeftImage.src = "../assets/images/cannon-empty-left.png";
const cannonEmptyRightImage = new Image();
cannonEmptyRightImage.src = "../assets/images/cannon-empty-right.png";
const cannonFullLeftImage = new Image();
cannonFullLeftImage.src = "../assets/images/cannon-full-left.png";
const cannonFullRightImage = new Image();
cannonFullRightImage.src = "../assets/images/monkey-loaded-right.png";

class Cannon {
  constructor(xPos, verticalD, horizontalD) {
    let yPos = Math.random() * 450 + 50;

    this.position = [xPos, yPos];
    this.emptyLeftImage = cannonEmptyLeftImage;
    this.emptyRightImage = cannonEmptyRightImage;
    this.fullLeftImage = cannonFullLeftImage;
    this.fullRightImage = cannonFullRightImage;
    this.verticalD = verticalD;
    this.horizontalD = horizontalD;
    this.image = null;
    this.degrees = 0;
  }

  drawStationary(ctx) {
    let image = this.selectImage();
    ctx.drawImage(image, this.position[0], this.position[1], 90, 90);
  }

  drawRotated(ctx, degrees) {
    let image = this.selectImage();

    ctx.save();
    ctx.translate(this.position[0], this.position[1]);
    ctx.rotate((degrees * Math.PI) / 180);
    ctx.drawImage(image, -image.width / 2, -image.height / 2, 90, 90);
    ctx.restore();
  }

  moveY() {
    this.position[1] += this.verticalD;
    if (this.position[1] <= 0 || this.position[1] + 90 >= 600) {
      this.verticalD = -this.verticalD;
    }
  }

  moveX(speed) {
    this.position[0] -= speed;
  }

  selectImage() {
    if (this.horizontalD === "LEFT") {
      this.image = this.emptyLeftImage;
    } else if (this.horizontalD === "RIGHTFULL") {
      this.image = this.fullRightImage;
    } else if (this.horizontalD === "RIGHTEMPTY") {
      this.image = this.emptyRightImage;
    }

    return this.image;
  }
}

export default Cannon;
