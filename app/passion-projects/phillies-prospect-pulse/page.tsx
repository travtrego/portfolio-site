import Link from "next/link";
import CaseStudySection from "@/components/CaseStudySection";

const accent = "var(--accent-fun)";

const weights: [string, string][] = [
  ["Scouting", "25%"],
  ["Performance", "22%"],
  ["Sentiment", "12%"],
  ["Age / level", "9%"],
  ["Development", "8%"],
  ["Movement", "8%"],
  ["Risk", "6%"],
  ["Defense", "4%"],
  ["Pitch quality", "4%"],
  ["History", "1%"],
  ["Consensus", "1%"],
];

const genieRoutes = [
  ["Predictive front office", "Forward-looking organizational questions — e.g. where the farm system is trending into a future season."],
  ["Development dossier", "A specific player's skill trajectory and current development focus."],
  ["Front office decision", "Roster, promotion, and value-tradeoff questions framed the way a front office would ask them."],
  ["Simulation", "Hypothetical \"what if\" scenarios run against the live rankings."],
  ["Organization", "Broad organizational questions not tied to a specific player."],
  ["Core", "Everything else — the default conversational fallback."],
];

export default function PhilliesCaseStudy() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Link href="/passion-projects" className="text-sm font-semibold" style={{ color: accent }}>
        ← Passion Projects
      </Link>

      <div
        className="mt-4 rounded-2xl border-2 p-5"
        style={{ borderColor: accent, backgroundColor: `color-mix(in srgb, ${accent} 8%, transparent)` }}
      >
        <h1 className="text-3xl font-extrabold" style={{ color: accent }}>
          Phillies Prospect Pulse
        </h1>
        <p className="mt-1 text-sm font-bold uppercase tracking-wide" style={{ color: accent }}>
          A Self-Updating Farm System, With a Model That Shows Its Work
        </p>
        <p className="mt-3 text-[var(--muted)]">
          Started as a player database. Became three things stacked on top of each other: an automated data
          pipeline, a weighted ranking model that reports its own confidence, and a conversational assistant
          that reasoned over the live result instead of just displaying it.
        </p>
      </div>

      <CaseStudySection title="Project objective">
        <p>
          Public prospect rankings mostly show a single number with no visible reasoning behind it. The goal
          here was a rank that explained itself — which inputs moved it, how confident the system actually was
          given the data it had that week, and a chat assistant that could answer a real follow-up question
          against the live database rather than a canned FAQ.
        </p>
      </CaseStudySection>

      <CaseStudySection title="The automated pipeline">
        <p>
          Scheduled GitHub Actions workflows kept the data live without manual upkeep: a daily injury-status
          update, a periodic prospect-data refresh pulling news, stats, and promotions, and a recurring quality
          check specifically on the Genie assistant's own answers. Supporting scripts reconciled roster
          assignments and audited the ranking, UI, and Genie outputs for drift between runs.
        </p>
      </CaseStudySection>

      <CaseStudySection title="A ranking model that reports its own confidence">
        <p>
          Eleven weighted components fed a single 0–100 score, re-normalized automatically whenever an input
          was missing rather than silently treating a gap as a zero:
        </p>
        <div className="flex flex-wrap gap-2">
          {weights.map(([name, weight]) => (
            <span
              key={name}
              className="rounded-full px-3 py-1 text-xs font-semibold"
              style={{ backgroundColor: accent, color: "var(--on-accent)" }}
            >
              {name} · {weight}
            </span>
          ))}
        </div>
        <p>
          Each evaluation also produced a confidence label — high, moderate, or low — computed from how much of
          the core and optional input set actually was available for that player, with an explicit limitations
          list attached whenever something was missing (for example, "defensive-quality input unavailable")
          instead of hiding the gap behind a clean-looking number.
        </p>
      </CaseStudySection>

      <CaseStudySection title="A backtest that reports honestly when it has nothing to report">
        <p>
          A backtest harness measured two different things and was careful not to conflate them: Spearman rank
          correlation and mean-absolute-rank-change against the prior snapshot (stability — does the model
          thrash week to week), and the same statistics against optional external public rankings (validation —
          does it agree with other evaluators). When the external-rankings source was empty, the report said so
          explicitly — "no validation sample" — rather than fabricating a correlation number from nothing.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Prospect Genie — routed, not a single prompt">
        <p>
          The chat assistant routed each question to one of six specialized response modes based on what was
          actually being asked, rather than handling every question with one undifferentiated prompt:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          {genieRoutes.map(([name, detail]) => (
            <li key={name}>
              <span className="font-semibold text-[var(--foreground)]">{name}</span> — {detail}
            </li>
          ))}
        </ul>
      </CaseStudySection>

      <CaseStudySection title="What this is">
        <p>
          A fan project tracking public prospect information for one MLB farm system — not an official team
          tool, and not a claim to a validated sabermetric model. The component weights are the author's own
          judgment about what should matter and by how much, not a trained or peer-reviewed formula. The value
          is the architecture: a model that shows its reasoning and degrades honestly, a pipeline that updates
          itself, and an assistant that answers from the real data instead of a script.
        </p>
      </CaseStudySection>
    </main>
  );
}
