export function drawCannons(ctx, cannons) {
  cannons.forEach(cannon => {
    cannon.drawStationary(ctx);
  });
}

export function drawMonkey(ctx, monkey) {
  if (monkey) {
    monkey.degrees += 5;
    monkey.drawRotated(ctx, monkey.degrees);
  }
}
