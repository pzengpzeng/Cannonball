import {
  gameOverText,
  continuePlaying,
  continuePlayingAlt
} from "./textObjects";

import { renderText, renderBlinkingText } from "./renderText";

export function renderGameOver(ctx, highScore, score) {
  ctx.textAlign = "center";
  ctx.lineWidth = 4;

  renderText(ctx, ...Object.values(gameOverText));

  ctx.font = "50px 'Teko'";
  ctx.strokeStyle = "white";
  ctx.fillStyle = "black";

  ctx.strokeText(`Your best score : ${highScore}`, 500, 300);
  ctx.fillText(`Your best score : ${highScore}`, 500, 300);

  ctx.strokeText(`Recent score : ${score}`, 500, 350);
  ctx.fillText(`Recent score : ${score}`, 500, 350);

  renderBlinkingText(ctx, continuePlaying, continuePlayingAlt);
}
