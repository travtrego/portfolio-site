import Link from "next/link";
import CaseStudySection from "@/components/CaseStudySection";

const accent = "var(--accent-productivity)";

const pipeline = [
  ["Retriever", "Searches sec.gov / blackstone.com only, cites the primary source and prefers the most recent filing."],
  ["Mechanics Explainer", "Reads the raw retrieved text and explains hurdle, catch-up, GP/LP split, and crystallization terms — flagging anything the source doesn't cover instead of filling the gap with a plausible industry default."],
  ["Neutral Summarizer", "Compresses the Mechanics output to 3–5 sentences. Never sees the raw source — only the prior agent's output — so the handoff itself can be tested for what a blind compression step loses."],
  ["Disclosure Skeptic", "Reviews only the Summarizer's compressed output, not the raw filing or the full Mechanics explanation. A second-reviewer role, hunting for unsubstantiated claims and ambiguity."],
  ["Synthesis", "Combines the summary and the Skeptic's concerns into a final reviewer memo."],
  ["Judge", "Grades the final memo against the original raw source — not any intermediate agent's output — on completeness, accuracy, and skeptic value-add, 0–10 each with cited justification."],
];

const lessons = [
  "Write down what \"correct\" looks like before building the thing meant to produce it — otherwise the implementation grades itself. But that only catches what you thought to test: the eval set here was written to catch old, fully-realized funds being understated, and it caught exactly that. It missed the mirror case — funds still inside their investment period, where the same assumption overstates carry — because nobody wrote that case. It only surfaced later, from sweeping all 27 computable funds instead of the five the eval cases happened to name.",
  "Never let an LLM do arithmetic that a few lines of real code can do deterministically and verifiably instead.",
  "A single successful run tells you almost nothing. Repeat runs are what separate a real bug from ordinary model variance.",
  "When a system can't solve a problem with the data it has, the right fix is often an honest flag, not a forced number.",
];

export default function BlackstoneCaseStudy() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Link href="/agentic-pipelines" className="text-sm font-semibold" style={{ color: accent }}>
        ← Agentic &amp; Multi-Agentic Pipelines
      </Link>

      <div
        className="mt-4 rounded-2xl border-2 p-5"
        style={{ borderColor: accent, backgroundColor: `color-mix(in srgb, ${accent} 8%, transparent)` }}
      >
        <h1 className="text-3xl font-extrabold" style={{ color: accent }}>
          Blackstone Carry Review
        </h1>
        <p className="mt-1 text-sm font-bold uppercase tracking-wide" style={{ color: accent }}>
          A Multi-Agent Review Pipeline, Tested Until It Broke
        </p>
        <p className="mt-3 text-[var(--muted)]">
          A learning project built around one question: most multi-agent demos show a pipeline that works
          once, on camera. Does this one actually hold up — tested repeatedly, against a written answer key —
          or does it just look good the first time?
        </p>
      </div>

      <CaseStudySection title="Project objective">
        <p>
          Two separate branches, built to test two different claims. Branch 1 reviews how Blackstone discloses
          its carried-interest terms in public SEC filings, using a six-agent pipeline with deliberately
          restricted handoffs — built to find out whether a chain of agents loses or distorts information
          between stages, not just whether the final memo reads well. Branch 2 is a deterministic calculator
          estimating per-fund carry economics from a public performance table, built to test a narrower claim:
          that an LLM should never be trusted to do arithmetic a real function can do instead.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Branch 1 — the six-stage disclosure pipeline">
        <p>
          A chain-of-custody design: each agent hands off to the next with deliberately restricted context, so
          the pipeline can be tested for information loss, not just correctness.
        </p>
        <ol className="list-decimal space-y-2 pl-5">
          {pipeline.map(([name, detail]) => (
            <li key={name}>
              <span className="font-semibold text-[var(--foreground)]">{name}</span> — {detail}
            </li>
          ))}
        </ol>
      </CaseStudySection>

      <CaseStudySection title="Branch 2 — the calculator that doesn't let the model do math">
        <p>
          Deliberately not an LLM doing math. A real, testable JavaScript function computes the actual
          waterfall — paid-in capital, compounded hurdle, GP catch-up, the 80/20 split. An LLM call only
          narrates the already-computed numbers afterward, explicitly instructed not to recompute anything.
          The split exists on purpose: LLM arithmetic can be subtly wrong in ways invisible from the output
          alone, while a bug in real code is traceable and fixable — which is exactly what the first bug below
          turned out to be.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Two real bugs, found by testing against a written answer key">
        <p className="font-semibold text-[var(--foreground)]">
          Bug #1 — the hurdle compounded to today instead of to realization.
        </p>
        <p>
          The calculator initially compounded the 8% hurdle from a fund's deployment date all the way to the
          current report date, for every fund — including funds fully realized years or decades earlier.
          Result: BCP IV, a 2.9x MOIC / 36% IRR fund and one of the strongest in the dataset, came out to 0%
          carry, because a 23-year uninterrupted compound produced a hurdle larger than the fund's actual
          profit. The fix capped years-elapsed at 12 — a typical closed-end fund lifecycle — so mature,
          realized funds stop accruing hurdle once they're actually done. This was only caught by writing an
          eval set before building the calculator, then running the implementation against it; a one-off
          manual spot check on a different fund had already missed it.
        </p>
        <p className="font-semibold text-[var(--foreground)]">
          Bug #2 — long-duration funds were still under-modeled after the fix.
        </p>
        <p>
          One eval case still failed: BCP I-III, deployed 1987–2002 over a 15-year investment period, 19% net
          IRR, still computed 0% carry. The root cause wasn't fixable with the data available — the model
          treats all paid-in capital as a lump sum at the fund's midpoint, which doesn't reflect how capital is
          actually called and returned gradually over a long fund life, and the public reference table has no
          capital-call timing to model that properly. Rather than force a fix the data couldn't support, the
          calculator now cross-checks its own output against the fund's disclosed net IRR: if the IRR clearly
          clears the hurdle but the computed carry is near zero, it surfaces an explicit warning and the
          headline "effective carry" figure reads <code>n/m</code> instead of a confident <code>0.0%</code>.
          The full waterfall stays visible above it — only the misleading takeaway number is withheld. This
          affects five funds in total: BCP I-III, Strategic Partners VII, Strategic Partners VI, BCP VI, and
          Energy I.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Verification">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            11 legacy calculator checks plus 17 runtime/proxy/workflow tests — cancellation, deadlines,
            malformed input, source-domain spoofing, resume, output-schema validation, and value
            conservation — all passing.
          </li>
          <li>
            A full six-stage run completed in the browser in roughly 100 seconds, with every stage timed:
            Retrieve 19s, Mechanics 28s, Summarize 9s, Skeptic 22s, Synthesis 14s, Judge 8s.
          </li>
          <li>
            The Judge scored that run completeness 8, accuracy 9, skeptic value-add 9 — the model's own
            assessment against the retrieved excerpts, not an independently verified grade.
          </li>
          <li>Save All exported all six stages with citations intact; the CSV matched the calculator byte-for-byte across 35 funds.</li>
        </ul>
      </CaseStudySection>

      <CaseStudySection title="What this is, and isn't">
        <p>
          A working local demonstration using live primary-source search and a dated fund-performance table
          inherited from an earlier prototype — not validated against Blackstone's actual current LPA terms.
          The calculator's 8% hurdle, 100% catch-up, and 20% carry are teaching assumptions, not confirmed
          contract terms, and every exported row carries that warning. It's a standalone local application with
          a server-side API boundary, not a publicly hosted tool — the server binds to loopback and rejects
          non-local hosts as a local-use safeguard, not authentication.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Lessons that transfer beyond this project">
        <ol className="list-decimal space-y-2 pl-5">
          {lessons.map((lesson) => (
            <li key={lesson.slice(0, 40)}>{lesson}</li>
          ))}
        </ol>
      </CaseStudySection>
    </main>
  );
}
