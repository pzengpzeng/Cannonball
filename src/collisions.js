export function detectSuccessfulLanding(monkey, cannon) {
  return (
    monkey &&
    cannon &&
    monkey.xPos + 30 >= cannon.xPos + 30 &&
    monkey.xPos + 30 <= cannon.xPos + 100 &&
    monkey.yPos + 30 >= cannon.yPos + 30 &&
    monkey.yPos + 30 <= cannon.yPos + 100
  );
}

export function detectWallCollision(monkey) {
  const canvasXBound = [0, 1000];
  const canvasYBound = [0, 600];

  return (
    monkey.xPos + 30 <= canvasXBound[0] ||
    monkey.xPos + 30 >= canvasXBound[1] ||
    monkey.yPos + 30 <= canvasYBound[0] ||
    monkey.yPos + 30 >= canvasYBound[1]
  );
}
