const leaderboard = document.getElementById("leaderboard");
const statsMidContainer = document.getElementById("stats-mid-container");
const statsRightContainer = document.getElementById("stats-right-container");

const axios = require("axios");

export function updateHighScore(recentScore, highestScore) {
  if (recentScore > highestScore) {
    sessionStorage.setItem("highScore", recentScore);
    return parseInt(sessionStorage.getItem("highScore"));
  }
}

export function saveScore(scoreSaved, recentScore, username) {
  const newScore = { score: recentScore, username: username };
  if (!scoreSaved) {
    axios.post("/scores", newScore);
  }
  return true;
}

export function fetchScores() {
  //Retreives all scores
  while (leaderboard.firstChild) {
    leaderboard.removeChild(leaderboard.firstChild);
  }

  while (statsMidContainer.firstChild) {
    statsMidContainer.removeChild(statsMidContainer.firstChild);
  }

  while (statsRightContainer.firstChild) {
    statsRightContainer.removeChild(statsRightContainer.firstChild);
  }

  return axios.get("/scores").then(res => {
    const scores = res.data;

    //Populates leaderboard with top 50 scores
    for (let i = 0; i < 25; i++) {
      const rankDiv = document.createElement("DIV");
      const rankText = document.createTextNode(`${i + 1}.`);
      rankDiv.setAttribute("class", "rank-div");
      rankDiv.appendChild(rankText);

      const usernameDiv = document.createElement("DIV");
      const usernameText = document.createTextNode(scores[i].username);
      usernameDiv.setAttribute("class", "username-div");
      usernameDiv.appendChild(usernameText);

      const scoreDiv = document.createElement("DIV");
      const scoreText = document.createTextNode(scores[i].score);
      scoreDiv.setAttribute("class", "score-div");
      scoreDiv.appendChild(scoreText);

      const li = document.createElement("LI");
      li.setAttribute("class", "leaderboard-li");
      li.appendChild(rankDiv);
      li.appendChild(usernameDiv);
      li.appendChild(scoreDiv);
      leaderboard.appendChild(li);
    }

    //Calculate total games played, average score, and median score
    const gamesPlayed = scores.length;
    const middle = Math.floor(gamesPlayed / 2);
    const medianScore = scores[middle].score;
    let totalScore = 0;
    let zeroOrOne = 0;
    for (let i = 0; i < scores.length; i++) {
      totalScore += scores[i].score;

      if (scores[i].score === 0 || scores[i].score === 1) {
        zeroOrOne += 1;
      }
    }
    const averageScore = (totalScore / gamesPlayed).toFixed(2);

    const medianScoreDiv = document.createElement("DIV");
    medianScoreDiv.setAttribute("id", "median-score");
    const medianScoreText = document.createTextNode(`- Most common score: ${medianScore}`);
    medianScoreDiv.appendChild(medianScoreText);
    statsMidContainer.appendChild(medianScoreDiv);

    const averageScoreDiv = document.createElement("DIV");
    averageScoreDiv.setAttribute("id", "average-score");
    const averageScoreText = document.createTextNode(`- Average score: ${averageScore}`);
    averageScoreDiv.appendChild(averageScoreText);
    statsMidContainer.appendChild(averageScoreDiv);

    const gamesPlayedDiv = document.createElement("DIV");
    gamesPlayedDiv.setAttribute("id", "games-played");
    const gamesPlayedText = document.createTextNode(`- Total games played: ${gamesPlayed}`);
    gamesPlayedDiv.appendChild(gamesPlayedText);
    statsMidContainer.appendChild(gamesPlayedDiv);

    //__% of all games score 0 or 1 points
    const zeroOrOnePercent = Math.floor((zeroOrOne / gamesPlayed) * 100);

    const tidBitOneDiv = document.createElement("DIV");
    tidBitOneDiv.setAttribute("id", "tidbit-1");
    const tidBitOneText = document.createTextNode(
      `- ${zeroOrOnePercent}% of all games end between 0 and 1 points`
    );
    tidBitOneDiv.appendChild(tidBitOneText);
    statsRightContainer.appendChild(tidBitOneDiv);

    //95% of games score __ or lower
    const percentile95 = gamesPlayed - Math.floor(0.95 * gamesPlayed);
    const score95 = scores[percentile95].score;

    const tidBitTwoDiv = document.createElement("DIV");
    tidBitTwoDiv.setAttribute("id", "tidbit-2");
    const tidBitTwoText = document.createTextNode(`- 95% of all games score ${score95} or lower`);
    tidBitTwoDiv.appendChild(tidBitTwoText);
    statsRightContainer.appendChild(tidBitTwoDiv);

    //If you score __ or higher, you're doing better than 99% of all games played
    const percentile99 = gamesPlayed - Math.floor(0.99 * gamesPlayed);
    const score99 = scores[percentile99].score;

    const tidBitThreeDiv = document.createElement("DIV");
    tidBitThreeDiv.setAttribute("id", "tidbit-3");
    const tidBitThreeText = document.createTextNode(
      `- You're in the 99th percentil if you score ${score99} points or higher!`
    );
    tidBitThreeDiv.appendChild(tidBitThreeText);
    statsRightContainer.appendChild(tidBitThreeDiv);
  });
}
