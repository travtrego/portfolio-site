export type Project = {
  title: string;
  description: string;
  href: string;
  tags?: string[];
};

export const site = {
  name: "Your Name",
  tagline: "Building things with AI, data, and code — one project at a time.",
  about: [
    "I'm getting into AI, data analytics, and software development because I like building things that solve real problems and I'm hooked on the pace of what's possible right now.",
    "I'm still learning — this site is where I'm putting the apps, dashboards, and tools I build along the way, mistakes and all.",
  ],
  bio: [
    "Placeholder: a couple sentences on your military service — branch, role, years served.",
    "Placeholder: a couple sentences on your recovery from PTSD, in whatever level of detail you're comfortable sharing. This section is yours to write — keep it short or expand it, your call.",
  ],
  photos: [
    { src: "/photos/photo-1.jpg", alt: "Add a photo of yourself" },
    { src: "/photos/photo-2.jpg", alt: "Add another photo" },
  ],
};

export const apps: Project[] = [
  {
    title: "Example App",
    description: "Replace this with a short description of an app you built for fun.",
    href: "https://github.com/travtrego",
    tags: ["Next.js"],
  },
];

export const dataProjects: Project[] = [
  {
    title: "Example Data Project",
    description: "Replace this with a short description of a data analytics project you're learning from.",
    href: "https://github.com/travtrego",
    tags: ["Python", "SQL"],
  },
];

export const productivityProjects: Project[] = [
  {
    title: "Example Productivity Tool",
    description: "Replace this with a short description of an accounting or productivity tool you built.",
    href: "https://github.com/travtrego",
    tags: ["Automation"],
  },
];
