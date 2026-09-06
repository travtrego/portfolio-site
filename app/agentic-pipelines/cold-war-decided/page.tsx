import Link from "next/link";

const accent = "var(--accent-productivity)";

const phases = [
  "Interactive command-center prototype and deterministic demo mode.",
  "Live AI pipeline with four specialist agents.",
  "Chief feedback, controlled revisions, and Counterintelligence review.",
  "Protected serverless APIs, structured outputs, retry handling, and secret management.",
  "Neon Postgres mission ledger and protected Run History.",
  "PDF scenario ingestion, evidence routing, page citations, and document fingerprints.",
  "Scenario adjudication, independent Decision Auditor, deterministic policy matrix, regression testing, and production validation.",
];

const workflow = [
  "A built-in brief or uploaded PDF enters the system.",
  "Evidence is routed into four separate silos: Submarine Intelligence, ELINT, Air Intelligence, and HUMINT.",
  "Four specialists produce independent initial reports.",
  "The Chief gives each specialist targeted feedback.",
  "Each specialist completes one controlled revision.",
  "Counterintelligence red-teams the combined evidence.",
  "The Chief creates a structured proposal.",
  "A deterministic software policy matrix calculates eligible actions.",
  "An independent Decision Auditor challenges the proposal and its evidence.",
  "The Chief produces a final synthesis.",
  "The software recomputes the policy result and builds a coherent Action / Why / Avoid / Reconsider decision block.",
  "A human remains responsible for authorization.",
  "All 16 stage outputs, evaluations, telemetry, and provenance records are preserved in the mission ledger.",
];

const skillGroups = [
  {
    title: "AI systems engineering",
    items: [
      "Multi-agent orchestration",
      "Evidence siloing",
      "Parallel and sequential model execution",
      "Structured JSON outputs",
      "Prompt and context design",
      "Critique-and-revision loops",
      "Human-in-the-loop authorization",
      "Hybrid AI and deterministic decision control",
    ],
  },
  {
    title: "Evaluation and governance",
    items: [
      "Scenario-specific benchmark design",
      "Analysis Quality versus Decision Accuracy",
      "Decision-collapse detection",
      "Evidence citations and provenance",
      "Explicit action contracts",
      "Regression tests derived from production failures",
      "Audit-trail preservation",
      "Honest limitation reporting",
    ],
  },
  {
    title: "Full-stack and infrastructure",
    items: [
      "Serverless API development",
      "PostgreSQL schema design and migrations",
      "PDF parsing and document routing",
      "Authentication and secret management",
      "Runtime and build-log investigation",
      "CI testing and Git deployments",
      "Cost, token, latency, and response-ID telemetry",
    ],
  },
  {
    title: "Product and debugging",
    items: [
      "Root-cause analysis using saved production records",
      "Separating model, application, database, deployment, and caching failures",
      "Converting live failures into regression tests",
      "Knowing when software rules are more appropriate than additional prompting",
      "Determining when a project is complete",
    ],
  },
];

const componentMapping = [
  ["Scenario PDF", "Tax notice, workpaper, client document, loan package, or financial report"],
  ["Evidence router", "Document classification and data extraction"],
  ["Specialist agents", "Tax, accounting, compliance, bookkeeping, payroll, fraud-risk, or financial-analysis specialists"],
  ["Chief Agent", "Engagement manager, controller, CFO, or workflow orchestrator"],
  ["Counterintelligence", "Contradiction, fraud-risk, missing-information, and source-reliability review"],
  ["Decision Auditor", "Technical reviewer, quality-control reviewer, or internal audit"],
  ["Policy matrix", "Firm policies, materiality thresholds, approval limits, filing deadlines, segregation-of-duties rules, and regulatory requirements"],
  ["Human authorization", "Preparer, reviewer, manager, controller, CFO, or partner approval"],
  ["Mission ledger", "Engagement file, workpaper history, and defensible audit log"],
  ["Evaluator", "Quality monitoring, exception reporting, and process-improvement metrics"],
];

const exampleWorkflow = [
  "A tax notice enters through a client portal, SharePoint, OneDrive, SmartVault, or email intake.",
  "An OCR/document product (e.g. Azure AI Document Intelligence, Google Document AI, Amazon Textract) extracts dates, agencies, balances, periods, and notice codes.",
  "The system retrieves relevant client information from QuickBooks Online, Xero, NetSuite, Sage Intacct, a tax platform, or the FirmOS database.",
  "Specialist agents separately review notice classification and deadline, client account history, tax-law or procedural requirements, financial reconciliation, and missing documents and risk.",
  "A manager agent synthesizes the findings.",
  "Deterministic rules enforce deadlines, approval authority, materiality, required documentation, and actions the AI may not take.",
  "A technical reviewer or partner approves the response.",
  "The workflow creates or updates a task in a practice-management system (e.g. Karbon, Financial Cents, Canopy, TaxDome).",
  "A draft response is created in Microsoft Word or Google Docs.",
  "Final documents may flow through DocuSign or Adobe Acrobat Sign.",
  "Communications may be delivered through Outlook, Gmail, Microsoft Teams, or a secure client portal.",
  "Every source, revision, approval, and final action remains in the engagement audit trail.",
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 border-t-2 border-[var(--border)] pt-6">
      <h2 className="text-2xl font-extrabold">{title}</h2>
      <div className="mt-4 space-y-3 text-[var(--muted)]">{children}</div>
    </section>
  );
}

export default function ColdWarCaseStudy() {
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
          Cold War: Decided
        </h1>
        <p className="mt-1 text-sm font-bold uppercase tracking-wide" style={{ color: accent }}>
          Evidence-Disciplined Multi-Agent Decision Simulator
        </p>
        <p className="mt-3 text-[var(--muted)]">
          The Cold War setting is the user-facing theme. The portfolio value is the reusable AI workflow
          architecture underneath: document ingestion, specialist agents, independent review, deterministic
          software guardrails, human authorization, and a persistent audit trail.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href="https://cold-war-decided.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-3 py-1 text-xs font-bold shadow-sm transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: accent, color: "var(--on-accent)" }}
          >
            Live demo ↗
          </a>
        </div>
      </div>

      <Section title="Project objective">
        <p>
          The project began as an interactive Cold War decision simulator and evolved into a production test
          bed for auditable multi-agent AI. The goal became more than generating an answer — the system needed
          to:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>isolate evidence between specialists;</li>
          <li>preserve uncertainty and competing hypotheses;</li>
          <li>challenge conclusions through feedback and red-team review;</li>
          <li>produce one decision-ready recommendation;</li>
          <li>enforce high-consequence action boundaries;</li>
          <li>require human authorization;</li>
          <li>preserve every stage for later inspection; and</li>
          <li>evaluate decision correctness separately from writing quality.</li>
        </ul>
      </Section>

      <Section title="Development phases">
        <ol className="list-decimal space-y-2 pl-5">
          {phases.map((phase) => (
            <li key={phase}>{phase}</li>
          ))}
        </ol>
      </Section>

      <Section title="Final multi-agent workflow">
        <div className="flex flex-wrap gap-2">
          {["Submarine Intelligence", "ELINT", "Air Intelligence", "HUMINT"].map((silo) => (
            <span
              key={silo}
              className="rounded-full px-3 py-1 text-xs font-semibold"
              style={{ backgroundColor: accent, color: "var(--on-accent)" }}
            >
              {silo}
            </span>
          ))}
        </div>
        <ol className="list-decimal space-y-2 pl-5">
          {workflow.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </Section>

      <Section title="Hardest engineering problem">
        <p>
          Production testing showed that the Chief repeatedly selected the same response across materially
          different scenarios. Additional prompt instructions changed the preferred default but did not
          reliably eliminate the bias.
        </p>
        <p>
          The persisted run history made it possible to inspect the exact evidence, structured factors, Auditor
          feedback, and selected actions for every run. That diagnosis showed prompt-only control was
          insufficient — the fix couldn&apos;t just be a better instruction.
        </p>
        <p className="font-semibold text-[var(--foreground)]">
          The final solution used a hybrid AI and deterministic policy architecture:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>The AI interprets evidence, identifies uncertainty, and populates structured factors.</li>
          <li>Deterministic software calculates which actions are eligible.</li>
          <li>Explicit action contracts protect consequential choices.</li>
          <li>The Decision Auditor challenges unsupported factors.</li>
          <li>The human retains final authority.</li>
          <li>
            The complete decision block is generated from the policy result so the label and explanation
            cannot contradict each other.
          </li>
        </ul>
      </Section>

      <Section title="Final validation">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border-2 p-4" style={{ borderColor: accent }}>
            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: accent }}>
              Operation Northern Glass
            </p>
            <p className="mt-1 font-semibold text-[var(--foreground)]">Action: Keep monitoring</p>
          </div>
          <div className="rounded-xl border-2 p-4" style={{ borderColor: accent }}>
            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: accent }}>
              Operation Amber Circuit
            </p>
            <p className="mt-1 font-semibold text-[var(--foreground)]">Action: Launch a covert operation</p>
          </div>
        </div>
        <ul className="list-disc space-y-1 pl-5">
          <li>Both completed all 16 expected reports.</li>
          <li>Both received 100% scenario-specific Decision Accuracy in the final production validation.</li>
          <li>Two materially different evidence patterns produced two different actions.</li>
          <li>The final action explanations matched the enforced decisions.</li>
          <li>Build checks and production runtime logs were clean.</li>
        </ul>
        <p className="text-sm italic">
          These results apply to the supplied benchmark scenarios — not a claim of universal accuracy,
          defense-grade reliability, or statistically comprehensive validation.
        </p>
      </Section>

      <Section title="Skills demonstrated">
        <div className="grid gap-4 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.title} className="rounded-xl border-2 border-[var(--border)] bg-[var(--card)] p-4">
              <p className="text-xs font-bold uppercase tracking-wide" style={{ color: accent }}>
                {group.title}
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Carryover to accounting and finance workflows">
        <p>
          The Cold War scenario is fictional, but the workflow is directly transferable to accounting, tax,
          finance, compliance, and professional-services operations. In those settings, the evidence changes
          from intelligence reports to client documents, transaction records, tax notices, workpapers,
          policies, and financial data. The same architecture can route information to specialized reviewers,
          apply deterministic firm rules, require human approval, and preserve a defensible audit trail — the
          kind of foundation a project like FirmOS would build on.
        </p>
        <div className="overflow-x-auto rounded-xl border-2 border-[var(--border)]">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="bg-[var(--card)]">
                <th className="border-b-2 border-[var(--border)] px-3 py-2 text-left font-bold text-[var(--foreground)]">
                  Cold War: Decided
                </th>
                <th className="border-b-2 border-[var(--border)] px-3 py-2 text-left font-bold text-[var(--foreground)]">
                  Accounting / finance equivalent
                </th>
              </tr>
            </thead>
            <tbody>
              {componentMapping.map(([left, right]) => (
                <tr key={left} className="border-b border-[var(--border)] last:border-b-0">
                  <td className="px-3 py-2 align-top font-semibold text-[var(--foreground)]">{left}</td>
                  <td className="px-3 py-2 align-top">{right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 font-semibold text-[var(--foreground)]">
          Example reuse: a tax-notice response workflow
        </p>
        <p className="text-sm italic">
          All product names below are possible future integrations, not part of this project&apos;s actual
          technology stack.
        </p>
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          {exampleWorkflow.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </Section>
    </main>
  );
}
