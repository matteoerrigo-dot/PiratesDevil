export function botPlay(game) {
  const bot = game.bot;

  const playable = bot.hand.find(
    c => c.cost <= bot.energy
  );

  if (playable) {
    game.playCard(bot, playable);
  }
}