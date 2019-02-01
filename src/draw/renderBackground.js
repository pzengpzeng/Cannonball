import { backgroundImg } from "../constants";

export function renderBackground(ctx, score, username) {
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
