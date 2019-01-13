const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  score: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Score = mongoose.model("score", ScoreSchema);
