export type Project = {
  title: string;
  description: string;
  github?: string;
  demo?: string;
  tags?: string[];
  improvements?: string[];
  nextSteps?: string[];
  comingSoon?: boolean;
  images?: { src: string; alt: string }[];
};

export const site = {
  name: "Travis Sherman Trego",
  tagline: "Navy veteran, husband, and dog dad, currently teaching myself AI and how to build things.",
  about: [
    "I work in accounting. A few required training modules on AI turned into a real interest in Python and building things. This site is where that interest turns into actual projects — hobby apps, data analytics I'm still learning, and tools aimed at making accounting work less painful.",
  ],
  bio: [
    "Navy veteran, Electronic Warfare Operator, deployed across the Middle East and North Africa. Still dealing with the PTSD that came home with me. Building things is one of the ways I manage it.",
  ],
  photos: [
    { src: "/photos/wedding-kiss.jpg", alt: "Wedding day" },
    { src: "/photos/body-armor-selfie.jpg", alt: "Geared up on deployment" },
    { src: "/photos/dog-belly-rub.jpg", alt: "Belly rubs for the dog" },
    { src: "/photos/dog-blanket.jpg", alt: "The dog, unbothered" },
  ],
};

export const apps: Project[] = [
  {
    title: "TCP Mastery — CPA Study App",
    description:
      "Built a fully offline-capable Progressive Web App for CPA exam prep (Tax Compliance & Planning) — installable to your home screen, works without a connection, and runs entirely client-side in vanilla HTML/CSS/JavaScript with zero backend or framework. Deployed as a static site on Vercel with custom cache-control headers so service worker and manifest updates roll out immediately instead of going stale. Features an adaptive quiz engine (weak-area drilling, timed mode, custom quizzes, question-of-the-day), a full analytics dashboard (accuracy, streaks, topic breakdowns, weekly heatmap), multi-profile support with JSON backup/restore, and a built-in tutor that explains every question three ways — plain English, step-by-step, and \"why the trap.\"",
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
      { src: "/projects/tcp-mastery/home.png", alt: "Unit 1 course home and daily study plan" },
      { src: "/projects/tcp-mastery/quiz.png", alt: "Practice quiz with answer feedback" },
      { src: "/projects/tcp-mastery/stats.png", alt: "Analytics dashboard with topic accuracy and study heatmap" },
    ],
    nextSteps: [
      "Wire up a live AI tutor (the app currently flags this as the next step beyond its built-in explanations)",
      "Expand past Unit 1 to cover the rest of the TCP discipline",
    ],
  },
  {
    title: "More apps",
    description: "Next slot.",
    comingSoon: true,
  },
];

export const funStuff: Project[] = [
  {
    title: "Phillies Prospect Pulse",
    description:
      "A full-stack farm-system dashboard for the Phillies' minor-league prospects. An automated pipeline pulls and reconciles news, stats, promotions, and injuries on a schedule (a daily Vercel cron job snapshots rankings history), feeding a custom weighted ranking model (scouting, performance, age/level, media sentiment, risk) that shows exactly what moved each player's rank, not just a final score. \"Prospect Genie\" is a Claude-powered chat assistant that reasons over the live database to answer natural-language questions about the system — why a player hasn't been promoted, who's trending, head-to-head comparisons. Backed by Supabase, with an automated quality pipeline (data audits, ranking backtests against historical outcomes, and typechecking) run before every deploy.",
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
      "Wire up \"Ask Pulse,\" a scaffolded natural-language query page, to answer directly against the live database",
      "Feed backtest results back into the ranking model to tune its weights over time",
    ],
  },
  {
    title: "MycoFlow",
    description:
      "A mushroom cultivation tracker built around a real phase state machine — every batch moves through grain colonization, break & shake, bulk colonizing, fruiting, drying, and done, with location assignment and dried-weight yields logged at each step. The lab map (shelves and chambers) derives occupancy from each batch's location instead of storing the relationship twice, and every mutating action writes one entry to both the batch's own history and a global activity log in the same call — so the audit trail can't drift out of sync. Next.js + TypeScript on the frontend, Postgres (Neon) on the backend.",
    github: "https://github.com/travtrego/MycoFlow",
    tags: ["Next.js", "TypeScript", "Postgres (Neon)", "State machine design", "Data modeling"],
    images: [
      { src: "/projects/mycoflow/dashboard.png", alt: "Cultivation overview dashboard" },
      { src: "/projects/mycoflow/batches.png", alt: "Active batches with phase and yield" },
      { src: "/projects/mycoflow/locations.png", alt: "Lab map showing shelf and chamber occupancy" },
    ],
    nextSteps: [
      "Add photos per flush to build a visual harvest log over time",
      "Surface simple yield trends per species once there's enough history",
    ],
  },
];

export const dataProjects: Project[] = [
  {
    title: "Digit Recognizer (Kaggle MNIST)",
    description:
      "Designed and trained three progressively deeper CNNs from scratch in Keras/TensorFlow — stacking Conv2D blocks with batch normalization and dropout, tuning learning rate schedules with EarlyStopping and ReduceLROnPlateau, and diagnosing failures with a full misclassification breakdown. Landed at 99.34% test accuracy, missing just 66 out of 10,000 handwritten digits.",
    github: "https://github.com/travtrego/digit-recognizer",
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
      "Build an interactive demo — draw a digit, get a live prediction",
      "Test it against messier real-world handwriting, not just clean/centered MNIST digits",
    ],
  },
  {
    title: "Greenwashing Risk Detector",
    description:
      "A screening model for greenwashing risk in corporate climate claims, built from 2025 sustainability and environmental performance reports from three major airlines. Each claim is scored against five credibility indicators — a stated number, target year, baseline year, emissions scope, and progress evidence — with only the indicators actually applicable to that type of claim counted, so a claim isn't penalized for missing a scope reference it was never expected to have. Claims that back up fewer of their applicable indicators score higher on a 0–5 Greenwashing Risk Score. Rebuilt from a messy exploratory notebook into a clean, documented Python/pandas pipeline (verified to reproduce the original scored output row-for-row before trusting the refactor) and a Next.js/Recharts dashboard modeled on the original Power BI report.",
    github: "https://github.com/travtrego/greenwashing",
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
      "Deploy the dashboard so the live version isn't just screenshots",
      "Extend the credibility-indicator model beyond airlines to other high-emitting industries",
    ],
  },
];

export const productivityProjects: Project[] = [
  {
    title: "More productivity experiments",
    description: "In progress.",
    comingSoon: true,
  },
];
