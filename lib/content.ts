export type Project = {
  title: string;
  description: string;
  href?: string;
  tags?: string[];
  improvements?: string[];
  comingSoon?: boolean;
};

export const site = {
  name: "Your Name",
  tagline: "Building things with AI, data, and code — one project at a time.",
  about: [
    "In an effort to upskill within the accounting field, I fell into the AI rabbit hole — a few training modules turned into Python tutorials, and Python tutorials turned into building things I had no business building. Here we are. This site is that sandbox: hobby apps, data analytics projects I'm still figuring out, and a few productivity experiments aimed at making an accountant's life less painful. Call it upskilling with a sense of humor.",
  ],
  bio: [
    "Navy veteran, Electronic Warfare Operator, deployed across the Middle East and North Africa. I'm still working through the scars that came home with me — building things, one project at a time, is part of how I find my way back.",
  ],
  photos: [
    { src: "/photos/photo-1.jpg", alt: "Add a photo of yourself" },
    { src: "/photos/photo-2.jpg", alt: "Add another photo" },
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
    title: "CPA Study App",
    description: "Details coming soon.",
    comingSoon: true,
  },
  {
    title: "Digit Recognizer (Kaggle MNIST)",
    description:
      "The classic Kaggle project — a machine learning model trained to recognize handwritten digits from the MNIST dataset.",
    tags: ["Python", "scikit-learn / TensorFlow-Keras", "Image classification", "Neural networks / CNNs"],
    improvements: [
      "No data augmentation",
      "Likely a simple architecture (room to try CNNs if not already)",
      "No hyperparameter tuning",
      "Doesn't generalize beyond clean/centered digit images",
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
