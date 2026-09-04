export type Project = {
  title: string;
  /** One-sentence hook, shown above the full description. */
  summary?: string;
  description: string;
  github?: string;
  demo?: string;
  /** Link to an in-site case-study page, when one exists for this project. */
  caseStudy?: string;
  tags?: string[];
  improvements?: string[];
  nextSteps?: string[];
  comingSoon?: boolean;
  images?: { src: string; alt: string }[];
};

export const site = {
  name: "Travis Sherman Trego",
  tagline: "Navy veteran, tax accountant, husband, and dog dad, currently teaching myself AI and how to build things.",
  about: [
    "I work in accounting. A few required training modules on AI turned into a real interest in Python and building things. This site is where that interest turns into actual projects — hobby apps, data analytics I'm still learning, and tools aimed at making accounting work less painful.",
  ],
  bio: [
    "Navy veteran, Electronic Warfare Operator, deployed across the Middle East and North Africa. Still dealing with the PTSD that came home with me. Building things is one of the ways I manage it.",
  ],
  // Ordered to mirror the tagline: veteran, husband, dog dad.
  photos: [
    { src: "/photos/body-armor-selfie.jpg", alt: "Geared up on deployment" },
    { src: "/photos/wedding-kiss.jpg", alt: "Wedding day" },
    { src: "/photos/dog-belly-rub.jpg", alt: "Belly rubs for the dog" },
    { src: "/photos/dog-blanket.jpg", alt: "The dog, unbothered" },
  ],
};

export const apps: Project[] = [
  {
    title: "CPA Study App",
    summary:
      "An offline-first study app for CPA exam prep — adaptive quizzes, a full analytics dashboard, and a built-in tutor, with no backend at all.",
    description:
      "Installable and works without a connection, running entirely client-side in vanilla HTML/CSS/JavaScript with zero backend or framework. Deployed as a static site on Vercel with custom cache-control headers so service worker and manifest updates roll out immediately instead of going stale. Features an adaptive quiz engine (weak-area drilling, timed mode, custom quizzes, question-of-the-day), a full analytics dashboard (accuracy, streaks, topic breakdowns, weekly heatmap), multi-profile support with JSON backup/restore, and a built-in tutor that explains every question three ways — plain English, step-by-step, and \"why the trap.\"",
    github: "https://github.com/travtrego/-tcp-study-app",
    demo: "https://tcp-study-app.vercel.app/",
    tags: [
      "Vanilla JavaScript",
      "Progressive Web App (PWA)",
      "Offline-first / service worker",
      "Vercel deployment",
      "Client-side state & analytics",
    ],
    images: [
      { src: "/projects/tcp-mastery/home.png", alt: "Course home and daily study plan" },
      { src: "/projects/tcp-mastery/quiz.png", alt: "Practice quiz with answer feedback" },
      { src: "/projects/tcp-mastery/stats.png", alt: "Analytics dashboard with topic accuracy and study heatmap" },
    ],
    nextSteps: [
      "Having built state management from scratch in vanilla JS, a future project could compare how a framework like React handles the same problem",
      "Now that offline-first caching works end to end, a future app could add real-time sync across devices once there's an actual backend",
    ],
  },
  {
    title: "Doorstop",
    summary:
      "A pre-leave checklist app — swipe through stove, locks, and garage before you walk out the door, with streaks and cross-device sync.",
    description:
      "Set up a checklist once (stove off, garage closed, doors locked...) and swipe through it every time you leave, like a pre-flight check for the house. Each item is a full-screen card — swipe right to confirm, left to flag it for a second look. Supports multiple profiles (\"Leaving for work\" vs. \"Leaving for vacation\", each its own ordered subset of items), a streak and history log, and accounts with row-level-security-scoped Supabase sync so the same checklists show up on every device. Also includes an honestly-scoped location nudge: while the app is open it can flag that you've left home without checking in today, clearly labeled as foreground-only, since a browser tab can't watch location in the background the way a native app could.",
    github: "https://github.com/travtrego/Doorstop",
    tags: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Framer Motion (gestures)",
      "PWA / offline support",
      "Supabase (Postgres, Auth, Realtime)",
    ],
    images: [
      { src: "/projects/doorstop/home.png", alt: "Home screen with active streak and checklist profiles" },
      { src: "/projects/doorstop/session.png", alt: "Swipe-to-confirm card mid-checklist" },
      { src: "/projects/doorstop/account.png", alt: "Account settings with the foreground-only geofence nudge" },
    ],
    nextSteps: [
      "Having built a foreground-only geofence nudge here, a future project could explore a native wrapper (Capacitor, React Native) to get real background location",
      "Now that Supabase realtime sync (postgres_changes) works end to end, a future project could reuse the same pattern for any multi-device app that needs live sync",
    ],
  },
];

export const funStuff: Project[] = [
  {
    title: "Phillies Prospect Pulse",
    summary:
      "A self-updating farm-system dashboard with a custom prospect ranking model and a Claude-powered chat assistant that reasons over the live database.",
    description:
      "An automated pipeline pulls and reconciles news, stats, promotions, and injuries on a schedule, feeding a ranking model I designed from scratch — weighing scouting, performance, age/level, media sentiment, and risk — that shows exactly what moved each player's rank. \"Prospect Genie\" is a live, Claude-powered chat assistant that reasons over the database to answer natural-language questions about the system — why a player hasn't been promoted, who's trending, head-to-head comparisons. Uses Supabase, and an automated quality pipeline (data audits, ranking backtests against historical outcomes, and typechecking) that runs before every deploy.",
    github: "https://github.com/travtrego/phillies-prospect-pulse",
    demo: "https://phillies-prospect-pulse-self.vercel.app/",
    tags: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Claude API (Anthropic SDK)",
      "Automated data pipelines",
      "Custom ranking model",
    ],
    images: [
      { src: "/projects/prospect-pulse/rankings.png", alt: "Top 30 prospect rankings table" },
      { src: "/projects/prospect-pulse/player.png", alt: "Player profile with organizational rank" },
      { src: "/projects/prospect-pulse/genie.png", alt: "Prospect Genie AI chat assistant" },
    ],
    nextSteps: [
      "Having weighed Claude against DeepSeek and Llama for this Claude assistant — tested live against the real API, not just compared on paper — a future project could build a provider-switchable AI layer to compare cost, latency, and quality head-to-head.",
      "Now that a full backtesting pipeline exists, a future project could swap the weighted ranking formula for a trained model and compare the two",
    ],
  },
  {
    title: "MycoFlow",
    summary:
      "A mushroom cultivation tracker built on a real phase state machine — every batch followed from grain jar to dried harvest, with an audit trail that can't drift.",
    description:
      "Every batch moves through grain colonization, break & shake, bulk colonizing, fruiting, drying, and done, with location assignment and dried-weight yields logged at each step. The lab map (shelves and chambers) derives occupancy from each batch's location instead of storing the relationship twice, and every mutating action writes one entry to both the batch's own history and a global activity log in the same call — so the audit trail can't drift out of sync. Next.js + TypeScript on the frontend, Postgres (Neon) on the backend.",
    github: "https://github.com/travtrego/MycoFlow",
    tags: ["Next.js", "TypeScript", "Postgres (Neon)", "State machine design", "Data modeling"],
    images: [
      { src: "/projects/mycoflow/dashboard.png", alt: "Cultivation overview dashboard" },
      { src: "/projects/mycoflow/batches.png", alt: "Active batches with phase and yield" },
      { src: "/projects/mycoflow/locations.png", alt: "Lab map showing shelf and chamber occupancy" },
    ],
    nextSteps: [
      "Having modeled a real phase state machine here, that same pattern is reusable for any workflow-tracking app, not just cultivation",
      "Now that the audit-log pattern (one write, two tables, always in sync) is proven out, future projects can reuse it anywhere mutations need a paper trail",
    ],
  },
];

export const dataProjects: Project[] = [
  {
    title: "Digit Recognizer (Kaggle MNIST)",
    summary:
      "Three convolutional neural networks built from scratch and tuned to 99.34% accuracy — missing just 66 of 10,000 handwritten digits.",
    description:
      "Built in Keras/TensorFlow across three progressively deeper architectures — stacking Conv2D blocks with batch normalization and dropout, tuning learning rate schedules with EarlyStopping and ReduceLROnPlateau, and diagnosing what the model got wrong with a full misclassification breakdown.",
    tags: [
      "Python",
      "TensorFlow / Keras",
      "CNN architecture design",
      "Batch norm & dropout tuning",
      "Model evaluation",
    ],
    images: [
      { src: "/projects/digit-recognizer/training-curves.png", alt: "Training accuracy and loss curves" },
      { src: "/projects/digit-recognizer/misclassified.png", alt: "Misclassified test digits" },
    ],
    nextSteps: [
      "Having trained CNNs from scratch here, a future project could start from a pretrained model and compare transfer learning against training from zero",
      "Now that the misclassification-analysis workflow exists, the same diagnostic approach could be reused on a harder, noisier dataset",
    ],
  },
  {
    title: "Greenwashing Risk Detector",
    summary:
      "Scores airline climate claims 0–5 on how specific and verifiable they are — not on whether they're true.",
    description:
      "A screening model for greenwashing risk in corporate climate claims, built from 2025 sustainability and environmental performance reports from three major airlines. Each claim is scored against five credibility indicators — a stated number, target year, baseline year, emissions scope, and progress evidence — with only the indicators actually applicable to that type of claim counted, so a claim isn't penalized for missing a scope reference it was never expected to have. Claims that back up fewer of their applicable indicators score higher on a 0–5 Greenwashing Risk Score. Built, documented, and presented using Python/pandas pipelines and Next.js/Recharts.",
    tags: [
      "Python / pandas",
      "Rule-based NLP scoring",
      "Jupyter notebook cleanup",
      "Next.js",
      "TypeScript",
      "Recharts",
    ],
    images: [
      { src: "/projects/greenwashing/dashboard.png", alt: "Risk dashboard with per-airline and per-category breakdowns" },
      { src: "/projects/greenwashing/methodology.png", alt: "Methodology page detailing the scoring formula and credibility indicators" },
    ],
    nextSteps: [
      "Having built a rule-based scoring pipeline here, a future project could compare it against an embeddings-based approach on the same claims",
      "Now that the credibility-indicator framework works for airlines, the same scoring approach could be pointed at a completely different industry's disclosures",
    ],
  },
  {
    title: "FSO Risk Explorer",
    summary:
      "8,348 risk factors pulled from 49 bank and insurer 10-K filings, then clustered into themes with no labeled training data.",
    description:
      "Each company's \"Item 1A. Risk Factors\" section is scraped from SEC EDGAR, split into individual risk statements, vectorized with TF-IDF, and grouped into 12 clusters with K-means — 6 of which turned out to be genuine, business-model-aligned risk themes (Bank Capital & Liquidity, Cybersecurity & Data, Regulatory & Privacy, and others), rediscovering the industry's risk taxonomy without any labeled training data. Built as a clean, documented, reproducible pipeline, plus a Next.js/Recharts dashboard for exploring the results by sub-sector and by company.",
    tags: [
      "Python / pandas",
      "scikit-learn (TF-IDF, K-means)",
      "SEC EDGAR data pipeline",
      "Jupyter notebook cleanup",
      "Next.js",
      "TypeScript",
      "Recharts",
    ],
    images: [
      { src: "/projects/fso-risk-explorer/overview.png", alt: "Overview dashboard with risk volume by sub-sector and category" },
      { src: "/projects/fso-risk-explorer/company-explorer.png", alt: "Per-company risk category breakdown and statement table" },
    ],
    nextSteps: [
      "Having built a TF-IDF + K-means clustering pipeline here, a future project could compare it against topic modeling (LDA) or embedding-based clustering on the same data",
      "Now that the SEC EDGAR scraping pattern exists, it's reusable for pulling any other structured section out of a 10-K, not just risk factors",
    ],
  },
];

export const agenticProjects: Project[] = [
  {
    title: "Cold War: Decided",
    summary:
      "An evidence-disciplined, production-deployed multi-agent decision simulator — document ingestion, specialist agents, independent review, deterministic guardrails, human authorization, and a persistent audit trail.",
    description:
      "Four evidence-siloed specialists (Submarine, ELINT, Air, HUMINT) analyze the same crisis from isolated dossiers, get targeted Chief feedback, revise once each, and pass through Counterintelligence red-team review before a Decision Auditor challenges the proposal and a deterministic software policy matrix — not free-form prose — decides which actions are actually eligible. A human still authorizes every outcome. The system ingests PDF scenarios with page-level citations, and every one of the 16 pipeline stages is preserved in a persistent Postgres mission ledger for later inspection. The Cold War setting is the user-facing theme; the reusable part is the architecture underneath.",
    github: "https://github.com/travtrego/Cold-War-decided-",
    demo: "https://cold-war-decided.vercel.app",
    caseStudy: "/agentic-pipelines/cold-war-decided",
    tags: [
      "OpenAI Responses API",
      "GPT-5 Mini",
      "Neon Postgres",
      "Vercel Functions",
      "JSON Schema structured outputs",
      "PDF ingestion (unpdf)",
      "SHA-256 fingerprinting",
    ],
    nextSteps: [
      "Having built a rule-based evaluator to score evidence discipline and independence, a future project could pit it against an LLM-as-judge grader on the same transcripts and see where they disagree",
      "Now that every mission stage lands in an immutable ledger, a future project could add a side-by-side replay view to diff two runs of the same scenario",
    ],
  },
];

export const comingSoonProjects: Project[] = [
  {
    title: "Guided Visualization",
    summary:
      "An app that writes an original guided visualization every session, choosing from six generation templates — from calming pre-competition nerves to winding down for sleep. Nothing is pre-recorded; each one is generated fresh, built to feel like a memory, not a script.",
    description:
      "Text pipeline is built and wired to Claude, with six session templates each validated against a hand-written exemplar. Audio narration is next.",
    tags: ["Claude API (Anthropic SDK)", "Prompt engineering", "Audio-first UX"],
    images: [
      { src: "/projects/mindfulness/intro.png", alt: "App intro screen for the guided visualization prototype" },
    ],
    comingSoon: true,
  },
  {
    title: "Right Whale Classifier",
    summary:
      "A planned computer-vision model to identify individual North Atlantic right whales, using a photo-based dataset.",
    description:
      "Researchers already track right whales individually by the unique callosity patterns on their heads. The idea: fine-tune a CNN on that same identification task and see how close a from-scratch model gets.",
    tags: ["Python", "Computer vision", "CNN / transfer learning", "Image classification"],
    images: [
      { src: "/projects/right-whale-classifier/whale-photo.jpg", alt: "A North Atlantic right whale underwater, its head callosities visible, with a diver for scale" },
    ],
    comingSoon: true,
  },
  {
    title: "Wildlife Drone Program",
    summary:
      "Building both the aircraft and the autonomy stack behind a deliberately homegrown goal: spotting the coyotes that move through the neighborhood, from the air.",
    description:
      "A hardware build and a software program at the same time. Three airframes \u2014 an X500 V2 as the proving platform, a Fighter 2430 VTOL for long-endurance mapping, and Coyote, an RJX1300H hexacopter and the largest of the three, for close-range multi-sensor work \u2014 assembled and bench-tested rather than bought turnkey, with a Jetson companion computer carrying the perception load. The software runs PX4 and MAVSDK under one hard rule: flight-critical authority stays on the autopilot, covering geofence, return-to-home, battery and link-loss failsafes, while mission logic and inference stay on the companion computer. The current milestone is simulation-only \u2014 an arm/takeoff/loiter/land smoke mission against PX4 SITL, a config layer written to import no MAVSDK at all so it unit-tests in CI with no simulator or vehicle present, and an address check that refuses anything but loopback, so the smoke mission structurally cannot be pointed at a real aircraft.",
    github: "https://github.com/travtrego/Wildlife-Drone-Program",
    tags: [
      "PX4 / MAVSDK",
      "Python",
      "ROS 2",
      "Jetson companion compute",
      "Computer vision",
      "Airframe build",
      "GitHub Actions CI",
    ],
    comingSoon: true,
  },
];

// Not linked from the nav or homepage — assignments and projects from courses and training,
// not flagship work. Standout entries get promoted into one of the real categories above.
export const courseworkProjects: Project[] = [
  {
    title: "Resume & Story Site",
    summary:
      "The first project from Udemy's \"ChatGPT and Generative AI\" — built to practice prompt engineering, not just generate throwaway output. A resume page and a separate narrative \"My Story\" page.",
    description:
      "Built as the first course project for Udemy's \"ChatGPT and Generative AI,\" using it as a testbed for prompt engineering technique — iterating on prompts to get a structured resume (experience, skills, education, selected work) and a separate four-chapter narrative page tracing the path from Navy electronic warfare through civilian technical roles to a Master's in Accounting and work at EY. Static HTML/CSS, no framework or backend. The link opens to the resume page — use its own nav to reach \"My Story.\"",
    demo: "/coursework/resume-website/index.html",
    tags: ["HTML", "CSS", "Static site", "Prompt engineering"],
    images: [
      { src: "/projects/resume-website/resume.png", alt: "Resume page with portrait, experience timeline, skills, and education" },
      { src: "/projects/resume-website/story.png", alt: "My Story page with a four-chapter narrative" },
    ],
  },
];

export type LearningGroup = {
  group: string;
  note: string;
  courses: string[];
};

export const learningPlan: LearningGroup[] = [
  {
    group: "Currently working through",
    note: "Internal EY training, running alongside everything below.",
    courses: ["EY Sustainability Courses", "EY Technology Courses"],
  },
  {
    group: "Cloud & data fundamentals",
    note: "The vocabulary layer — what the services are, and where AI and data sit in a cloud stack.",
    courses: [
      "Microsoft Azure Fundamentals (AZ-900)",
      "Microsoft Azure AI Fundamentals (AI-901)",
      "Microsoft Azure Data Fundamentals (DP-900)",
    ],
  },
  {
    group: "Building with LLM APIs & agents",
    note: "Free, fast, and closest to what I'm already building — these feed the projects on this site directly.",
    courses: [
      "Anthropic Academy — Building with the Claude API",
      "Anthropic Academy — Claude Code 101",
      "Anthropic Academy — Claude Code in Action",
      "Anthropic Academy — Introduction to Model Context Protocol",
      "Anthropic Academy — Advanced MCP",
      "Anthropic Academy — Agent Skills",
      "Anthropic Academy — Subagents",
      "OpenAI Academy — AI Foundations",
      "OpenAI Academy — Agents and Workflows",
      "Hugging Face — LLM Course",
      "Hugging Face — AI Agents Course",
      "DeepLearning.AI — Multi AI Agent Systems",
      "DataCamp — Developing AI Applications with the OpenAI & Anthropic APIs",
    ],
  },
  {
    group: "Data platform & BI",
    note: "The stack client work actually runs on. My projects prove Python; this proves the rest of the pipeline.",
    courses: [
      "Microsoft Certified: Power BI Data Analyst Associate (PL-300)",
      "Microsoft Certified: Fabric Data Engineer Associate (DP-700)",
    ],
  },
  {
    group: "Machine learning depth",
    note: "The part behind the Data Science tab — so the CNN and clustering work rests on theory, not just tutorials.",
    courses: [
      "DeepLearning.AI — Machine Learning Specialization",
      "DeepLearning.AI — Deep Learning Specialization",
      "Kaggle — Feature Engineering and Intro to Deep Learning",
      "Microsoft Certified: MLOps Engineer Associate (AI-300)",
    ],
  },
  {
    group: "Applied Azure AI",
    note: "Hands-on assessments rather than multiple choice — you build the thing to pass.",
    courses: [
      "Microsoft Applied Skills — Develop generative AI apps using Azure AI Foundry",
      "Microsoft Applied Skills — Get started developing agents in Microsoft Foundry",
      "Microsoft Certified: Azure AI Apps and Agents Developer Associate",
    ],
  },
  {
    group: "Vendor specializations",
    note: "Depth in the model and data-platform layer.",
    courses: [
      "NVIDIA-Certified Associate — Generative AI LLMs (NCA-GENL)",
      "NVIDIA-Certified Associate — Generative AI Multimodal (NCA-GENM)",
      "Databricks Certified Generative AI Engineer Associate",
    ],
  },
  {
    group: "Risk, sustainability & governance",
    note: "Where the accounting background actually compounds — the AI work is more useful if I can speak climate disclosure and model risk too.",
    courses: [
      "GARP — Sustainability and Climate Risk (SCR)",
      "IFRS Foundation — Fundamentals of Sustainability Accounting (FSA) Credential",
      "IAPP — AI Governance Professional (AIGP)",
    ],
  },
  {
    group: "Stretch goals",
    note: "Breadth once the core path is done. NCP-AAI expects a year or two of production agentic work, so it's genuinely last.",
    courses: [
      "Google Cloud — Generative AI Leader",
      "AWS Certified AI Practitioner (AIF-C01)",
      "NVIDIA Certified Professional — Agentic AI (NCP-AAI)",
    ],
  },
  {
    group: "Outside the AI track",
    note: "A side project rather than part of the path above — though a drone and the computer-vision work would pair well eventually.",
    courses: ["FAA Part 107 — Remote Pilot Certificate (small UAS)"],
  },
];
