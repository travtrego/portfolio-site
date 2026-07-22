export type Project = {
  title: string;
  description: string;
  href?: string;
  tags?: string[];
  improvements?: string[];
  nextSteps?: string[];
  comingSoon?: boolean;
  images?: { src: string; alt: string }[];
};

export const site = {
  name: "Travis Sherman Trego",
  tagline: "Building things with AI, data, and code — one project at a time.",
  about: [
    "In an effort to upskill within the accounting field, I fell into the AI rabbit hole — a few training modules turned into Python tutorials, and Python tutorials turned into building things I had no business building. Here we are. This site is that sandbox: hobby apps, data analytics projects I'm still figuring out, and a few productivity experiments aimed at making an accountant's life less painful. Call it upskilling with a sense of humor.",
  ],
  bio: [
    "Navy veteran, Electronic Warfare Operator, deployed across the Middle East and North Africa. I'm still working through the scars that came home with me — building things, one project at a time, is part of how I find my way back.",
  ],
  photos: [
    { src: "/photos/navy-uniform.jpg", alt: "In U.S. Navy uniform aboard ship" },
    { src: "/photos/wedding-kiss.jpg", alt: "Wedding day" },
    { src: "/photos/body-armor-selfie.jpg", alt: "Geared up on deployment" },
    { src: "/photos/dog-belly-rub.jpg", alt: "Belly rubs for the dog" },
    { src: "/photos/dog-blanket.jpg", alt: "The dog, unbothered" },
  ],
};

export const apps: Project[] = [
  {
    title: "Phillies Prospect Pulse",
    description: "A prospect-tracking app built for fun.",
    href: "https://github.com/travtrego/phillies-prospect-pulse",
    tags: ["Next.js", "TypeScript", "Sports data integration", "Component-based UI"],
    improvements: [
      "Limited to static or manually-updated data (no live sync yet)",
      "No automated testing",
      "Could use better error handling for API failures",
      "UI is functional but not yet polished",
    ],
  },
  {
    title: "More apps",
    description: "Next slot.",
    comingSoon: true,
  },
];

export const dataProjects: Project[] = [
  {
    title: "TCP Mastery — CPA Study App",
    description:
      "Built a fully offline-capable Progressive Web App for CPA exam prep (Tax Compliance & Planning) — installable to your home screen, works without a connection, and runs entirely client-side in vanilla JavaScript with zero backend. Features an adaptive quiz engine (weak-area drilling, timed mode, custom quizzes, question-of-the-day), a full analytics dashboard (accuracy, streaks, topic breakdowns, weekly heatmap), multi-profile support with JSON backup/restore, and a built-in tutor that explains every question three ways — plain English, step-by-step, and \"why the trap.\"",
    href: "https://tcp-study-app.vercel.app/",
    tags: [
      "Vanilla JavaScript",
      "Progressive Web App (PWA)",
      "Offline-first / service worker",
      "Client-side state & analytics",
    ],
    nextSteps: [
      "Wire up a live AI tutor (the app currently flags this as the next step beyond its built-in explanations)",
      "Expand past Unit 1 to cover the rest of the TCP discipline",
    ],
  },
  {
    title: "Digit Recognizer (Kaggle MNIST)",
    description:
      "Designed and trained three progressively deeper CNNs from scratch in Keras/TensorFlow — stacking Conv2D blocks with batch normalization and dropout, tuning learning rate schedules with EarlyStopping and ReduceLROnPlateau, and diagnosing failures with a full misclassification breakdown. Landed at 99.34% test accuracy, missing just 66 out of 10,000 handwritten digits.",
    href: "https://github.com/travtrego/digit-recognizer",
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
];

export const productivityProjects: Project[] = [
  {
    title: "More productivity experiments",
    description: "In progress.",
    comingSoon: true,
  },
];
