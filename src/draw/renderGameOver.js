import {
  gameOverText,
  highScoreText,
  recentScoreText,
  continuePlaying,
  continuePlayingAlt
} from "./gameOverText";

import { renderText, renderBlinkingText } from "./renderText";

export function renderGameOver(ctx, highScore, recentScore) {
  ctx.textAlign = "center";
  ctx.lineWidth = 4;

  renderText(ctx, ...Object.values(gameOverText));
  renderText(ctx, ...Object.values(highScoreText(highScore)));
  renderText(ctx, ...Object.values(recentScoreText(recentScore)));
  renderBlinkingText(ctx, continuePlaying, continuePlayingAlt);
}
