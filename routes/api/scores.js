const express = require("express");
const router = express.Router();
const Score = require("../../models/Score");

router.get("/leaderboard", (req, res) => {
  Score.find()
    .sort({ score: -1 })
    .limit(10)
    .then(scores => {
      if (scores) {
        return res.json({ scores: scores });
      }
    });
});

router.post("/createScore", (req, res) => {
  new Score({
    score: req.body.score,
    username: req.body.username
  })
    .save()
    .then(newScore => {
      res.json(newScore);
    });
});

router.get("/highscore/:username", (req, res) => {
  Score.find()
    .sort({ score: -1 })
    .findOne({ username: req.params.username })
    .then(score => {
      if (score) {
        return res.json({ score: score });
      }
    });
});

module.exports = router;
