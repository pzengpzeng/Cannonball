import { halfInterval, fullInterval } from "../constants";

export function renderText(
  ctx,
  fontSize,
  color,
  outlineColor,
  text,
  xPos,
  yPos
) {
  ctx.font = `${fontSize}px 'Teko'`;

  ctx.fillStyle = color;
  ctx.strokeStyle = outlineColor;

  ctx.strokeText(text, xPos, yPos);
  ctx.fillText(text, xPos, yPos);
}

let blinkCounter = 0;

export function renderBlinkingText(ctx, text, textAlt) {
  if (blinkCounter >= fullInterval) blinkCounter = 0;
  blinkCounter += 1;

  if (blinkCounter <= halfInterval) {
    renderText(ctx, ...Object.values(text));
  } else if (blinkCounter > halfInterval && blinkCounter <= fullInterval) {
    renderText(ctx, ...Object.values(textAlt));
  }
}
