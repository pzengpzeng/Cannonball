const backgroundImg = new Image();
backgroundImg.src = "../assets/images/background.jpeg";
const monkeyBallImg = new Image();
monkeyBallImg.src = "../assets/images/monkey-ball.png";
const cannonEmptyRightImg = new Image();
cannonEmptyRightImg.src = "../assets/images/cannon-empty-right.png";
const cannonEmptyLeftImg = new Image();
cannonEmptyLeftImg.src = "../assets/images/cannon-empty-left.png";

export function renderStartScreen(ctx, blinkCount) {
  ctx.drawImage(backgroundImg, 0, 0, 1000, 600);

  ctx.textAlign = "center";

  ctx.drawImage(cannonEmptyRightImg, 305, 250, 90, 90);
  ctx.drawImage(monkeyBallImg, 455, 250, 90, 90);
  ctx.drawImage(cannonEmptyLeftImg, 605, 250, 90, 90);

  ctx.font = "120px 'Teko'";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;
  ctx.strokeText(`Monkeyball`, 500, 200);
  ctx.fillStyle = "#F5C028";
  ctx.fillText(`Monkeyball`, 500, 200);

  ctx.strokeStyle = "white";
  ctx.fillStyle = "black";
  ctx.font = "36px 'Teko'";
  ctx.strokeText(`1 point for every successful landing`, 500, 390);
  ctx.fillText(`1 point for every successful landing`, 500, 390);
  ctx.strokeText(`3 points for every successful double jump!`, 500, 440);
  ctx.fillText(`3 points for every successful double jump!`, 500, 440);

  if (blinkCount <= 120) {
    ctx.strokeStyle = "black";
    ctx.fillStyle = "#F5C028";
    ctx.font = "40px 'Teko'";
    ctx.strokeText(`Press space to start`, 500, 500);
    ctx.fillText(`Press space to start`, 500, 500);
  } else if (blinkCount > 120 && blinkCount <= 240) {
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.font = "40px 'Teko'";
    ctx.strokeText(`Press space to start`, 500, 500);
    ctx.fillText(`Press space to start`, 500, 500);
  }
}

export function renderGameOver(ctx, blinkCount, highScore, score) {
  ctx.textAlign = "center";
  ctx.font = "100px 'Teko'";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;
  ctx.strokeText(`GAME OVER`, 500, 200);
  ctx.fillStyle = "#F5C028";
  ctx.fillText(`GAME OVER`, 500, 200);

  ctx.font = "50px 'Teko'";
  ctx.strokeStyle = "white";
  ctx.lineWidth = 4;
  ctx.fillStyle = "black";
  ctx.strokeText(`Your best score : ${highScore}`, 500, 300);
  ctx.strokeText(`Recent score : ${score}`, 500, 350);
  ctx.fillText(`Your best score : ${highScore}`, 500, 300);
  ctx.fillText(`Recent score : ${score}`, 500, 350);

  if (blinkCount <= 90) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.strokeText(`PRESS SPACE TO CONTINUE PLAYING`, 500, 450);
    ctx.fillStyle = "#F5C028";
    ctx.fillText(`PRESS SPACE TO CONTINUE PLAYING`, 500, 450);
  } else if (blinkCount > 90 && blinkCount <= 180) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.strokeText(`PRESS SPACE TO CONTINUE PLAYING`, 500, 450);
    ctx.fillStyle = "#white";
    ctx.fillText(`PRESS SPACE TO CONTINUE PLAYING`, 500, 450);
  } else {
    blinkCount = 0;
  }
}

export function drawBackground(ctx, score, username) {
  ctx.drawImage(backgroundImg, 0, 0, 1000, 600);
  ctx.textAlign = "right";
  ctx.font = "30px 'Teko'";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;
  ctx.strokeText(`Score : ${score}`, 990, 60);
  ctx.strokeText(`Welcome , ${username}!`, 990, 30);
  ctx.fillStyle = "#F5C028";
  ctx.fillText(`Score : ${score}`, 990, 60);
  ctx.fillText(`Welcome , ${username}!`, 990, 30);
}

export function drawCannons(ctx, cannons) {
  cannons.forEach(cannon => {
    cannon.drawStationary(ctx);
  });
}

export function drawMonkey(ctx, monkey) {
  if (monkey) {
    monkey.degrees += 5;
    monkey.drawRotated(ctx, monkey.degrees);
  }
}
