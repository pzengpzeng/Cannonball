# Cannonball

## Background and Overview

One of my favorite parts of the Donkey Kong series was when you'd load yourself up in a barrel, blast yourself off into the air, and cross your fingers that you'd timed your liftoff correctly so that you'd land in the next barrel with your life intact. Cannonball is inspired by this game mechanic and lets you traverse from cannon to cannon to your heart's content. Want to show off your skills? Try to make it onto the leaderboard!

## Functionality and MVP

#### MVPs:

- [ ] Display brief instructions of how to play the game below game start
- [ ] Keep track of user's score on screen (# of cannons successfully traversed \* 1000)
- [ ] Cannons change angles on a set timer (limit to 180 degrees, reverse direction when upper/lower bound reached)
- [ ] Visual representation of sprite being launched from the cannon to the next cannon, as well as a visual indicator of which cannon you're currently in
- [ ] Difficulty scales by having cannons no longer just change angles, but also traverse the game space vertically and with increasing velocity
- [ ] Production README
- [ ] Deploy to Heroku

#### Bonus features:

- [ ] Before game can begin, user must choose a username (no user authentication)
- [ ] Username persists against multiple playthroughs, but should reset when browser is reloaded
- [ ] Save username and associated score in database when game ends
- [ ] Have leaderboard that filters for top 10 scores
- [ ] Add background music with a mute button, as well as specific sound snippets when launching from cannon to cannon

## Technologies & Technical Challenges

#### Core technologies:

- Vanilla JavaScript for overall structure and game logic
- HTML5 Canvas for DOM manipulation and rendering
- Webpack to bundle and serve up the various scripts

#### Bonus technologies:

- MongoDB, Express, and Node.js to save usernames and scores in a database to generate leaderboard

#### Technical Challenges:

- Getting cannons to angle correctly, move up and down the screen correctly, and speed up appropriately to scale difficulty
- Changing image of cannon when it's loaded versus when it's empty (so user knows which cannon they're currently in)
- Be able to determine when a launch was successful or a failure

## Implementation Timeline

#### Day One (Wed, Jan 9)

- Work on project proposal
- Modify proposal based on feedback

#### Day Two

- Render stationary cannons that change angles correctly on Canvas
- Deploy to Heroku

#### Day Three

- Launch sprite out of cannon based on angle when user pressed spacebar
- Detect whether launch was successful or if game is over

#### Day Four

- Detect which cannon is loaded and move visible game screen so previous cannon is no longer in view
- Render new cannon when visible game screen changes

#### Day Five

- Get cannons to move vertically and vary in velocity when moving up and down
- Add scoring system that continuously updates on Canvas

#### Day Six

- Polish sprites that are being rendered
- Refine and finalize design

#### Day Seven (Tues, Jan 15)

- Complete testing and debugging
- Production README
- Bonus features if time permits

## Wireframe

![alt text](https://res.cloudinary.com/craftsy/image/upload/v1547064955/JS%20/drawing.png)
