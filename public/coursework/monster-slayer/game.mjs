// The browser demo follows the same rules as the downloadable Python game.
export const DIFFICULTIES = Object.freeze({ Easy: [2, 3], Normal: [3, 5], Hard: [4, 7] });
export const SCORE_KEY = 'walrus.monster-slayer.highscores.v1';

export class Battle {
  constructor(username, difficulty = 'Normal') {
    if (!Object.hasOwn(DIFFICULTIES, difficulty)) throw new Error('Choose a valid difficulty.');
    this.username = username;
    this.difficulty = difficulty;
    this.playerHealth = 100;
    this.monsterHealth = 100;
    this.turn = 1;
    this.strongReady = 1;
    this.healReady = 1;
    this.winner = null;
  }

  canUse(action) {
    return !this.winner && (action === 'regular' ||
      (action === 'strong' && this.turn >= this.strongReady) ||
      (action === 'heal' && this.turn >= this.healReady));
  }

  act(action, random = Math.random) {
    if (!this.canUse(action)) return null;
    const roll = (min, max) => min + Math.floor(random() * (max - min + 1));
    const events = [];
    const round = this.turn;
    if (action === 'heal') {
      const restored = Math.min(roll(12, 20), 100 - this.playerHealth);
      this.playerHealth += restored;
      this.healReady = this.turn + DIFFICULTIES[this.difficulty][1];
      events.push(`You restore ${restored} health.`);
    } else {
      const damage = action === 'strong' ? roll(15, 22) : roll(6, 12);
      this.monsterHealth = Math.max(0, this.monsterHealth - damage);
      if (action === 'strong') this.strongReady = this.turn + DIFFICULTIES[this.difficulty][0];
      events.push(`${action === 'strong' ? 'Your strong attack deals' : 'You attack for'} ${damage} damage.`);
    }
    if (this.monsterHealth === 0) {
      this.winner = 'player';
      return { round, events };
    }
    const damage = roll(10, 18);
    this.playerHealth = Math.max(0, this.playerHealth - damage);
    events.push(`The monster attacks for ${damage} damage.`);
    if (this.playerHealth === 0) this.winner = 'monster';
    else this.turn += 1;
    return { round, events };
  }
}

export function readScores(text) {
  if (text === null) return [];
  const rows = JSON.parse(text);
  if (!Array.isArray(rows) || rows.some(row => !row || typeof row.username !== 'string' ||
    !row.username.trim() || !Number.isSafeInteger(row.rounds) || row.rounds < 1)) {
    throw new Error('Saved scores could not be read.');
  }
  return rows;
}

export function recordScore(rows, username, rounds) {
  const best = new Map();
  for (const row of [...rows, { username, rounds }]) {
    best.set(row.username, Math.min(row.rounds, best.get(row.username) ?? Infinity));
  }
  return [...best].map(([name, count]) => ({ username: name, rounds: count }))
    .sort((a, b) => a.rounds - b.rounds || a.username.localeCompare(b.username));
}
