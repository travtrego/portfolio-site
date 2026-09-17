# Monster Slayer

A coursework game developed from a plain-English brief. This folder includes the original commented Python/Tkinter game and a browser version with the same combat rules.

## Play

- Browser: open `/coursework/monster-slayer/index.html` on the portfolio.
- Desktop: download `monster_slayer.py` and run `py monster_slayer.py` with Python and Tkinter installed.

Choose a username once per program/page launch, then a difficulty before each battle. Both fighters start at 100 health. Regular attacks deal 6–12 damage, strong attacks 15–22, healing restores 12–20 up to 100, and the monster deals 10–18. Zero health ends the battle immediately. A defeated monster cannot retaliate.

| Difficulty | Strong cooldown | Healing cooldown |
| --- | --- | --- |
| Easy | 2 turns | 3 turns |
| Normal | 3 turns | 5 turns |
| Hard | 4 turns | 7 turns |

Both special actions start available. Cooldowns count from the turn used: a Normal strong attack on turn 1 is available again on turn 4. New Game keeps the username and last difficulty selection.

## High scores

Each exact username keeps its fewest winning rounds. All difficulties share a leaderboard sorted in ascending order. Losses are not scored.

The Python game saves readable JSON text in `monster_slayer_highscores.txt` beside the script. The browser version saves to this browser's local storage and offers the same text-file export after wins. Scores are local; there is no shared online leaderboard or account system. The public download contains no personal score data.

## Checks

From the repository root, run `node --test tests/monster-slayer.test.mjs` to check the browser combat rules and score handling. Run `npm run build` for the portfolio build.
