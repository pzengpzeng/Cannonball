import {
  backgroundImg,
  cannonEmptyRightImg,
  monkeyBallImg,
  cannonEmptyLeftImg
} from "../constants";

import {
  titleText,
  instructionsOne,
  instructionsTwo,
  instructionsThree,
  instructionsThreeAlt
} from "./textObjects";

import { renderText, renderBlinkingText } from "./renderText";

export function renderStartScreen(ctx) {
  ctx.drawImage(backgroundImg, 0, 0, 1000, 600);
  ctx.drawImage(cannonEmptyRightImg, 305, 250, 90, 90);
  ctx.drawImage(monkeyBallImg, 455, 250, 90, 90);
  ctx.drawImage(cannonEmptyLeftImg, 605, 250, 90, 90);

  ctx.textAlign = "center";
  ctx.lineWidth = 4;

  renderText(ctx, ...Object.values(titleText));
  renderText(ctx, ...Object.values(instructionsOne));
  renderText(ctx, ...Object.values(instructionsTwo));

  renderBlinkingText(ctx, instructionsThree, instructionsThreeAlt);
}
