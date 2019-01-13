const axios = require("axios");

import Game from "./game";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // const leaderboard = document.getElementById("leaderboard");

  // const fetchScores = () => {
  //   return axios
  //     .get("api/scores")
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // };

  // leaderboard.innerHTML = fetchScores();

  let game = new Game(ctx);
  game.animate();
});
