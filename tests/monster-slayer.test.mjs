import test from 'node:test';
import assert from 'node:assert/strict';
import { Battle, DIFFICULTIES, readScores, recordScore } from '../public/coursework/monster-slayer/game.mjs';

test('starts at 100 health with both special actions available', () => {
  const battle = new Battle('Slayer');
  assert.equal(battle.turn, 1);
  assert.equal(battle.playerHealth, 100);
  assert.equal(battle.monsterHealth, 100);
  assert.ok(battle.canUse('strong'));
  assert.ok(battle.canUse('heal'));
});

for (const [level, [strong, heal]] of Object.entries(DIFFICULTIES)) {
  test(`${level}: cooldowns begin on use and unlock on the exact turn`, () => {
    const battle = new Battle('Slayer', level);
    battle.act('strong', () => 0);
    assert.equal(battle.strongReady, 1 + strong);
    battle.act('heal', () => 0);
    assert.equal(battle.healReady, 2 + heal);
    while (battle.turn <= 2 + heal) {
      assert.equal(battle.canUse('strong'), battle.turn >= 1 + strong);
      assert.equal(battle.canUse('heal'), battle.turn >= 2 + heal);
      const old = JSON.stringify(battle);
      if (!battle.canUse('heal')) assert.equal(battle.act('heal'), null);
      assert.equal(JSON.stringify(battle), old);
      battle.act('regular', () => 0);
    }
  });
}

test('attack endpoints and monster response use the original damage ranges', () => {
  for (const [value, regular, strong, monster] of [[0, 6, 15, 10], [0.999999, 12, 22, 18]]) {
    for (const [action, damage] of [['regular', regular], ['strong', strong]]) {
      const battle = new Battle('Slayer');
      const events = battle.act(action, () => value);
      assert.equal(battle.monsterHealth, 100 - damage);
      assert.equal(battle.playerHealth, 100 - monster);
      assert.equal(events.events.length, 2);
      assert.equal(battle.turn, 2);
    }
  }
});

test('healing reports actual restoration and never exceeds 100', () => {
  const battle = new Battle('Slayer');
  battle.playerHealth = 95;
  const result = battle.act('heal', () => 0.999999);
  assert.equal(result.events[0], 'You restore 5 health.');
  assert.equal(battle.playerHealth, 82);
});

test('exact zero and overkill end immediately, without retaliation after victory', () => {
  for (const health of [1, 6]) {
    const battle = new Battle('Slayer');
    battle.monsterHealth = health;
    const result = battle.act('regular', () => 0);
    assert.equal(battle.winner, 'player');
    assert.equal(battle.playerHealth, 100);
    assert.equal(battle.monsterHealth, 0);
    assert.equal(result.round, 1);
    assert.equal(result.events.length, 1);
    assert.equal(battle.act('regular'), null);
  }
  const battle = new Battle('Slayer');
  battle.playerHealth = 10;
  battle.act('regular', () => 0);
  assert.equal(battle.winner, 'monster');
  assert.equal(battle.playerHealth, 0);
});

test('invalid difficulty and actions cannot alter a battle', () => {
  assert.throws(() => new Battle('Slayer', 'Impossible'));
  assert.throws(() => new Battle('Slayer', 'toString'));
  const battle = new Battle('Slayer');
  assert.equal(battle.act('unknown'), null);
  assert.equal(battle.turn, 1);
});

test('scores keep one personal best and sort numerically, preserving other names', () => {
  let scores = recordScore([], 'Zoë', 10);
  scores = recordScore(scores, 'Alex', 2);
  scores = recordScore(scores, 'Zoë', 12);
  assert.deepEqual(scores, [{ username: 'Alex', rounds: 2 }, { username: 'Zoë', rounds: 10 }]);
  scores = recordScore(scores, 'Zoë', 8);
  assert.equal(scores[1].rounds, 8);
  assert.deepEqual(readScores(JSON.stringify(scores)), scores);
});

test('missing scores start empty; damaged scores are rejected', () => {
  assert.deepEqual(readScores(null), []);
  for (const value of ['broken', '{}', '[null]', '[{"username":"A","rounds":0}]']) {
    assert.throws(() => readScores(value));
  }
});
