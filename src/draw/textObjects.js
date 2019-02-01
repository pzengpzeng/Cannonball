import { black, white, yellow } from "../constants";

// Start Screen

export const titleText = {
  fontSize: 120,
  color: yellow,
  outlineColor: black,
  text: "Monkeyball",
  xPos: 500,
  yPos: 200
};

export const instructionsOne = {
  fontSize: 36,
  color: black,
  outlineColor: white,
  text: "1 point for every successful landing",
  xPos: 500,
  yPos: 390
};

export const instructionsTwo = {
  fontSize: 36,
  color: black,
  outlineColor: white,
  text: "3 points for every successful double jump!",
  xPos: 500,
  yPos: 440
};

export const instructionsThree = {
  fontSize: 40,
  color: yellow,
  outlineColor: black,
  text: "Press space to start",
  xPos: 500,
  yPos: 500
};

export const instructionsThreeAlt = {
  fontSize: 40,
  color: white,
  outlineColor: black,
  text: "Press space to start",
  xPos: 500,
  yPos: 500
};

// Game Over Screen

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
