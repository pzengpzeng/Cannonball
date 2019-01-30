import Game from "./game";
import { fetchScores } from "./scores";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  let game = new Game(ctx);
  game.animate();
  game.detectKeyPress();
  fetchScores();
});
