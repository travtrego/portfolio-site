import Image from "next/image";
import Link from "next/link";
import { apps, dataProjects, funStuff, site } from "@/lib/content";

const featured = [
  { project: funStuff[1], href: "/fun-stuff", label: "Track", accent: "var(--accent-fun)" },
  { project: apps[0], href: "/apps", label: "Study", accent: "var(--accent-apps)" },
  { project: funStuff[0], href: "/fun-stuff", label: "Automate", accent: "var(--accent-fun)" },
  { project: dataProjects[0], href: "/data-projects", label: "Learn", accent: "var(--accent-data)" },
];

const workshopDoors = [
  {
    title: "Build",
    description: "Apps that turn a real need or odd idea into something usable.",
    href: "/apps",
    emoji: "🛠️",
    accent: "var(--accent-apps)",
  },
  {
    title: "Analyze",
    description: "Data projects where I learn by testing, measuring, and revising.",
    href: "/data-projects",
    emoji: "📊",
    accent: "var(--accent-data)",
  },
  {
    title: "Automate",
    description: "Experiments in reducing repetitive work and keeping systems current.",
    href: "/productivity",
    emoji: "⚙️",
    accent: "var(--accent-productivity)",
  },
  {
    title: "Explore",
    description: "Sports, mushrooms, hobbies, and ideas that were too fun not to build.",
    href: "/fun-stuff",
    emoji: "🧪",
    accent: "var(--accent-fun)",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <section>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
              Welcome to the workshop
            </p>
            <h1 className="text-4xl font-extrabold sm:text-5xl" style={{ color: "var(--accent)" }}>
              {site.name}
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-[var(--muted)]">{site.tagline}</p>
            <p className="mt-3 max-w-2xl text-[var(--foreground)]">
              I use this site as a workbench for practical tools, data experiments, automation ideas, and whatever else catches my attention.
            </p>
          </div>
          <a
            href="https://www.linkedin.com/in/travis-t-14496347"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center rounded-full border-2 px-4 py-2 text-sm font-bold transition-transform hover:-translate-y-0.5"
            style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
          >
            Follow the experiments ↗
          </a>
        </div>
      </section>

      <section className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {site.photos.map((photo) => (
          <div
            key={photo.src}
            className="relative aspect-square overflow-hidden rounded-2xl border-2 bg-[var(--card)] transition-transform hover:-translate-y-1"
            style={{ borderColor: "var(--accent)" }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </section>

      <section className="mt-12 overflow-hidden rounded-3xl border-2 border-[var(--border)] bg-[var(--card)]">
        <div className="border-b-2 border-[var(--border)] p-6 sm:flex sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--muted)]">Inside the lab</p>
            <h2 className="mt-1 text-2xl font-extrabold">One curiosity, four ways of working</h2>
          </div>
          <p className="mt-3 max-w-md text-sm text-[var(--muted)] sm:mt-0 sm:text-right">
            The projects look different, but they all start the same way: find something interesting, make it useful, then keep improving it.
          </p>
        </div>

        <div className="grid sm:grid-cols-2">
          {workshopDoors.map((door, index) => (
            <Link
              key={door.title}
              href={door.href}
              className={`group p-6 transition-colors hover:bg-black/[0.03] ${index % 2 === 0 ? "sm:border-r-2 sm:border-[var(--border)]" : ""} ${index < 2 ? "border-b-2 border-[var(--border)]" : index === 2 ? "border-b-2 border-[var(--border)] sm:border-b-0" : ""}`}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl" aria-hidden="true">{door.emoji}</span>
                <div>
                  <h3 className="text-lg font-extrabold" style={{ color: door.accent }}>
                    {door.title} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{door.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--muted)]">On the workbench</p>
            <h2 className="mt-1 text-2xl font-extrabold">A few things taking shape</h2>
          </div>
          <span className="hidden text-sm text-[var(--muted)] sm:block">Click any card to explore</span>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {featured.map(({ project, href, label, accent }) => (
            <Link
              key={project.title}
              href={href}
              className="group overflow-hidden rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] transition-transform hover:-translate-y-1"
            >
              {project.images?.[0] && (
                <div className="relative aspect-[16/9] overflow-hidden border-b-2 border-[var(--border)]">
                  <Image
                    src={project.images[0].src}
                    alt={project.images[0].alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
              )}
              <div className="p-5">
                <span className="text-xs font-extrabold uppercase tracking-[0.16em]" style={{ color: accent }}>
                  {label}
                </span>
                <h3 className="mt-1 text-lg font-extrabold">{project.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--muted)]">{project.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section
        className="mt-12 rounded-2xl border-2 p-6"
        style={{
          borderColor: "var(--accent-fun)",
          backgroundColor: "color-mix(in srgb, var(--accent-fun) 8%, transparent)",
        }}
      >
        <h2 className="text-xl font-bold" style={{ color: "var(--accent-fun)" }}>
          Why AI, analytics, and development
        </h2>
        <div className="mt-3 space-y-3 text-[var(--muted)]">
          {site.about.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section
        className="mt-6 rounded-2xl border-2 p-6"
        style={{
          borderColor: "var(--accent-apps)",
          backgroundColor: "color-mix(in srgb, var(--accent-apps) 8%, transparent)",
        }}
      >
        <h2 className="text-xl font-bold" style={{ color: "var(--accent-apps)" }}>
          A bit about me
        </h2>
        <div className="mt-3 space-y-3 text-[var(--muted)]">
          {site.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>
    </main>
  );
}
