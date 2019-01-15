const express = require("express");
const app = express();
const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");
const path = require("path");
const Score = require("./models/Score");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});

app.get("/scores", (req, res) => {
  Score.find()
    .sort({ score: -1 })
    .then(scores => {
      if (scores) {
        return res.json(scores);
      }
    });
});

app.post("/scores", (req, res) => {
  new Score({ score: req.body.score, username: req.body.username }).save().then(newScore => {
    res.json(newScore);
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));
