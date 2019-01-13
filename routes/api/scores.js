const express = require("express");
const router = express.Router();
const Score = require("../../models/Score");

router.get("/", (req, res) => {
  Score.find()
    .sort({ score: -1 })
    .then(scores => {
      if (scores) {
        return res.json(scores);
      }
    });
});

router.post("/newScore", (req, res) => {
  new Score({ score: req.body.score }).save().then(newScore => {
    res.json(newScore);
  });
});

module.exports = router;
