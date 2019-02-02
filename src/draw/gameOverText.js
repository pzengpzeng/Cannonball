import { black, white, yellow } from "../constants";

export const gameOverText = {
  fontSize: 100,
  color: yellow,
  outlineColor: black,
  text: "GAME OVER",
  xPos: 500,
  yPos: 200
};

export function highScoreText(highScore) {
  return {
    fontSize: 50,
    color: black,
    outlineColor: white,
    text: `Your best score : ${highScore}`,
    xPos: 500,
    yPos: 300
  };
}

export function recentScoreText(recentScore) {
  return {
    fontSize: 50,
    color: black,
    outlineColor: white,
    text: `Recent score : ${recentScore}`,
    xPos: 500,
    yPos: 350
  };
}

export const continuePlaying = {
  fontSize: 50,
  color: yellow,
  outlineColor: black,
  text: "PRESS SPACE TO CONTINUE PLAYING",
  xPos: 500,
  yPos: 450
};

export const continuePlayingAlt = {
  fontSize: 50,
  color: white,
  outlineColor: black,
  text: "PRESS SPACE TO CONTINUE PLAYING",
  xPos: 500,
  yPos: 450
};
