import Link from "next/link";
import CaseStudySection from "@/components/CaseStudySection";

const accent = "var(--accent-games)";

const decks: [string, string, string][] = [
  ["Mega Excadrill ex", "22/22", "Mega Evolution Pokémon ex rule (3 Prize cards on knockout)"],
  ["Festival Lead", "26/26", "A Pokémon attacking more than once a turn (CheckAttackCountEffect)"],
  ["Basic Box", "27/27", "A different Bench size per player, plus Ancient/Future card tags"],
  ["Dhelmise", "22/22", "A shared \"prevent the opponent's attack/Ability effects\" helper"],
  ["Ogerpon Meganium Hydrapple", "24/24", "Tracking what a Pokémon evolves into, and Energy counted by what it provides"],
  ["Team Rocket's Honchkrow", "20/20", "Tracking which Pokémon were Knocked Out last turn"],
  ["Alakazam / Dusknoir", "26/26", "Devolving, plus a shared \"blocks moving damage\" check"],
  ["Dragapult ex / Dudunsparce", "26/26", "No new cards needed — every card already existed from four earlier decks"],
];

export default function RyuuPlayCaseStudy() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Link href="/video-games" className="text-sm font-semibold" style={{ color: accent }}>
        ← Video Games
      </Link>

      <div
        className="mt-4 rounded-2xl border-2 p-5"
        style={{ borderColor: accent, backgroundColor: `color-mix(in srgb, ${accent} 8%, transparent)` }}
      >
        <h1 className="text-3xl font-extrabold" style={{ color: accent }}>
          RyuuPlay — Pokémon TCG Trainer
        </h1>
        <p className="mt-1 text-sm font-bold uppercase tracking-wide" style={{ color: accent }}>
          Twenty Decks, Each One a Forcing Function
        </p>
        <p className="mt-3 text-[var(--muted)]">
          RyuuPlay is keeshii's open-source Pokémon TCG simulator, MIT-licensed. This fork doesn't rebuild the
          engine — it builds out current Standard-format support and a self-teaching learn mode on top of it,
          one deck at a time, and this page is about that work specifically.
        </p>
      </div>

      <CaseStudySection title="Twenty decks, one at a time">
        <p>
          Each deck is checked against a real tournament decklist, confirmed legal in the modern format, and
          run through bot-vs-bot mirror games clean before the next one starts. Several didn't just need new
          cards — they surfaced a rule the engine didn't support yet:
        </p>
        <div className="overflow-x-auto rounded-xl border-2 border-[var(--border)]">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="bg-[var(--card)]">
                <th className="border-b-2 border-[var(--border)] px-3 py-2 text-left font-bold text-[var(--foreground)]">
                  Deck
                </th>
                <th className="border-b-2 border-[var(--border)] px-3 py-2 text-left font-bold text-[var(--foreground)]">
                  Cards
                </th>
                <th className="border-b-2 border-[var(--border)] px-3 py-2 text-left font-bold text-[var(--foreground)]">
                  What it forced into the engine
                </th>
              </tr>
            </thead>
            <tbody>
              {decks.map(([deck, cards, forced]) => (
                <tr key={deck} className="border-b border-[var(--border)] last:border-b-0">
                  <td className="px-3 py-2 align-top font-semibold text-[var(--foreground)]">{deck}</td>
                  <td className="px-3 py-2 align-top">{cards}</td>
                  <td className="px-3 py-2 align-top">{forced}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Twenty decks are done end-to-end as of this writing. Deck 21 is next on the meta list, but four
          scheduled runs in a row couldn't start it: the unattended agent has web search but no tool to open a
          page, so it can't actually read a current decklist or confirm a card's text. That's a known, stated
          gap, not a silently stalled task.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Finding bot weaknesses by playing, not guessing">
        <p>
          Seeded mirror-game runs double as the project's own QA: they're how a bad bot habit gets caught,
          traced, and sometimes fixed.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className="font-semibold text-[var(--foreground)]">Fixed.</span> N's Zoroark used to always
            copy the same attack regardless of position; a trace showed it missing a cleaner available
            knockout, and the bot now takes that line instead. Slowking mirrors used to stall because the bot
            wouldn't retreat into a Pokémon that could actually attack when its Active couldn't — it does now,
            which ended the stalled games.
          </li>
          <li>
            <span className="font-semibold text-[var(--foreground)]">Found, named, and left open.</span>{" "}
            Alakazam loses close to half its mirror games (9 of 20) to its own over-drawing. Honchkrow mirrors
            mostly end in long stalls rather than true deck-outs, traced to the deck's Energy being entirely
            Special — so the bot's energy-recursion card can't get it back, and a real fix needs the bot to plan
            two moves ahead rather than one. Both are recorded as open, measured problems rather than papered
            over.
          </li>
        </ul>
      </CaseStudySection>

      <CaseStudySection title="A learn mode built to guide, never block">
        <p>
          The tutorial game sets each moment up, tells the player what to do, waits for them to do it, then
          explains why — but a deliberate design choice from the start: <span className="font-semibold text-[var(--foreground)]">the coach guides, it does not block</span>.
          Every legal move stays legal; an off-script move just moves the coach on rather than stopping the
          game. Deck primers, an after-game recap, and inline bot "Why?" notes were built on top of the same
          tutorial scaffolding afterward.
        </p>
        <p>
          A "Copy game for Claude" button turns the current table into plain text — board state, both players'
          Prize counts, the log's "Why?" notes, a prompt to ask a question — so a player can paste a live game
          into a chat and ask about it directly. Even there, hidden information stays hidden: the opponent's
          hand, both decks, and face-down Prize cards are only ever counted, never named, even though the
          client holds their real names. A spectator's copy gets no hand at all.
        </p>
        <p>
          That boundary runs deeper than one button. Certain prompt answers stay deliberately silent by design
          — deck searches, the starting Pokémon, and hand contents never get a "Why?" explanation, because
          naming those cards would show the human player information they shouldn't have. And a recurring bug
          class taught a standing rule: a table position (whose turn it is, which Bench slot) has to stay a
          plain index into an array, never an identity or a compacted list — both have caused real bugs when
          violated.
        </p>
      </CaseStudySection>

      <CaseStudySection title="How it's maintained">
        <p>
          Work lands through a nightly scheduled Claude Code run plus manual work, each change on its own
          branch, gated by CI before a squash-merge — CI is the referee, not the agent, and master is never
          rebased or force-pushed under it. A dated log entry records what happened on every run, and the "next
          up" block at the top gets rewritten each time rather than left stale. Bot changes are never shipped on
          the strength of one good-looking run: a new variant is measured with a benchmark harness against the
          old behavior across multiple eras, and win rates are only treated as comparable within the same era,
          never across them.
        </p>
      </CaseStudySection>
    </main>
  );
}
