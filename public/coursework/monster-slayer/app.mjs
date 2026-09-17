import { Battle, SCORE_KEY, readScores, recordScore } from './game.mjs';

const $ = id => document.getElementById(id);
let username = '';
let battle = null;
let busy = false;
let actionTimer = null;
let scores = [];

function chooseDifficulty() {
  clearTimeout(actionTimer);
  busy = false;
  battle = null;
  $('welcome').hidden = true;
  $('battle').hidden = true;
  $('setup').hidden = false;
  $('greeting').textContent = `WELCOME, ${username}`;
  $('setup-title').focus();
}

$('username-form').addEventListener('submit', event => {
  event.preventDefault();
  const value = $('username').value.trim();
  if (!value || value.length > 20) {
    $('name-error').textContent = 'Enter a username with 1–20 characters.';
    $('username').focus();
    return;
  }
  username = value;
  chooseDifficulty();
});

$('difficulty-form').addEventListener('submit', event => {
  event.preventDefault();
  const difficulty = new FormData(event.currentTarget).get('difficulty');
  battle = new Battle(username, difficulty);
  $('setup').hidden = true;
  $('battle').hidden = false;
  $('result').hidden = true;
  $('leaderboard').hidden = true;
  $('log').replaceChildren();
  $('player-name').textContent = username;
  render();
  $('regular').focus();
});

function render() {
  $('round').textContent = `${battle.difficulty} · Round ${battle.turn}`;
  for (const [name, value] of [['player', battle.playerHealth], ['monster', battle.monsterHealth]]) {
    $(`${name}-health`).textContent = value;
    $(`${name}-bar`).value = value;
  }
  for (const action of ['regular', 'strong', 'heal']) $(action).disabled = busy || !battle.canUse(action);
  for (const [action, ready] of [['strong', battle.strongReady], ['heal', battle.healReady]]) {
    const wait = Math.max(0, ready - battle.turn);
    $(`${action}-wait`).textContent = wait ? `Ready in ${wait} ${wait === 1 ? 'turn' : 'turns'}` : 'Ready';
  }
  $('status').textContent = battle.winner ? (battle.winner === 'player' ? 'The monster is defeated.' : 'The monster wins this time.') : busy ? 'Resolving turn…' : 'Choose your action.';
}

function finish() {
  const won = battle.winner === 'player';
  $('result').hidden = false;
  $('result-kicker').textContent = won ? 'VICTORY' : 'DEFEAT';
  $('result-title').textContent = won ? `Well fought, ${username}.` : 'The monster got the upper hand.';
  $('result-detail').textContent = won ? `You won in ${battle.turn} rounds on ${battle.difficulty}. Can you beat your best?` : `Your battle ended in round ${battle.turn}. Choose a difficulty and try again.`;
  if (won) {
    let saved = false;
    try {
      scores = recordScore(readScores(localStorage.getItem(SCORE_KEY)), username, battle.turn);
      localStorage.setItem(SCORE_KEY, JSON.stringify(scores));
      saved = true;
    } catch {
      // Preserve unreadable saved data; make this win available to export.
      scores = recordScore(scores, username, battle.turn);
    }
    $('score-note').textContent = saved
      ? 'Fewest rounds wins. Personal bests, across all difficulties, saved in this browser.'
      : 'Browser scores could not be saved. Existing saved data was left alone. Export this session’s scores below.';
    $('score-rows').replaceChildren();
    scores.forEach((score, index) => {
      const row = document.createElement('tr');
      if (score.username === username) row.className = 'current';
      for (const value of [index + 1, score.username, score.rounds]) {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.append(cell);
      }
      $('score-rows').append(row);
    });
    $('leaderboard').hidden = false;
  }
  $('result-title').focus();
}

for (const action of ['regular', 'strong', 'heal']) {
  $(action).addEventListener('click', () => {
    if (!battle || busy || !battle.canUse(action)) return;
    busy = true;
    const result = battle.act(action);
    const line = document.createElement('li');
    const round = document.createElement('strong');
    round.textContent = `Round ${result.round}`;
    line.append(round, document.createTextNode(result.events.join(' ')));
    $('log').append(line);
    $('log').scrollTop = $('log').scrollHeight;
    if (battle.winner) {
      busy = false;
      render();
      finish();
      return;
    }
    render();
    actionTimer = setTimeout(() => {
      busy = false;
      render();
    }, 450);
  });
}

$('new-game').addEventListener('click', chooseDifficulty);
$('play-again').addEventListener('click', chooseDifficulty);
$('export-scores').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(scores, null, 2) + '\n'], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'monster_slayer_highscores.txt';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
