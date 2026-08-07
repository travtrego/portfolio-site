import Image from "next/image";
import Link from "next/link";
import PhotoStrip from "@/components/PhotoStrip";
import ProjectCard from "@/components/ProjectCard";
import { site, funStuff, agenticProjects } from "@/lib/content";

const featured = [
  { project: funStuff.find((p) => p.title === "Phillies Prospect Pulse")!, accent: "var(--accent-fun)" },
  { project: agenticProjects.find((p) => p.title === "Cold War: Decided")!, accent: "var(--accent-productivity)" },
  { project: funStuff.find((p) => p.title === "MycoFlow")!, accent: "var(--accent-fun)" },
];

const categoryLinks = [
  { href: "/agentic-pipelines", label: "Agentic Pipelines", accent: "var(--accent-productivity)" },
  { href: "/passion-projects", label: "Passion Projects", accent: "var(--accent-fun)" },
  { href: "/data-science", label: "Data Science", accent: "var(--accent-data)" },
  { href: "/helpful-apps", label: "Apps", accent: "var(--accent-apps)" },
  { href: "/coming-soon", label: "Coming Soon", accent: "var(--accent-comingsoon)" },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <section className="grid items-center gap-8 sm:grid-cols-[1fr_1.3fr]">
        <div>
          <h1 className="text-4xl font-extrabold sm:text-5xl" style={{ color: "var(--accent)" }}>
            {site.name}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
            Navy veteran turned tax accountant, currently teaching myself to build real things with AI.
          </p>
          <a
            href="mailto:travtrego@gmail.com"
            className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold shadow-sm transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--accent)", color: "var(--on-accent)" }}
          >
            ✉️ Say hi — travtrego@gmail.com
          </a>
        </div>

        <div className="relative aspect-square overflow-hidden rounded-2xl border-2 bg-[var(--card)]"
          style={{ borderColor: "var(--accent)" }}
        >
          <Image
            src="/hero/walrus.jpg"
            alt="A walrus working on a laptop on a rocky beach, waterfall behind him"
            fill
            priority
            sizes="(max-width: 640px) 100vw, 480px"
            className="object-cover"
          />
        </div>
      </section>

      <section className="mt-10 border-t-2 border-[var(--border)] pt-6">
        <h2 className="text-2xl font-extrabold">Featured work</h2>
        <div className="mt-4 grid gap-4">
          {featured.map(({ project, accent }) => (
            <ProjectCard key={project.title} project={project} accent={accent} />
          ))}
        </div>
      </section>

      <section className="mt-10 border-t-2 border-[var(--border)] pt-6">
        <h2 className="text-2xl font-extrabold">A bit about me</h2>
        <div className="mt-4 space-y-3 text-[var(--muted)]">
          {site.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
          <p>
            Now I work in accounting, where a few required AI training courses turned into teaching myself Python, web
            development, and automation — building real things instead of just reading about them.
          </p>
        </div>
        <PhotoStrip photos={site.photos} accent="var(--accent)" />
      </section>

      <section className="mt-10 border-t-2 border-[var(--border)] pt-6">
        <h2 className="text-xs font-bold uppercase tracking-wide text-[var(--muted)]">More projects</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {categoryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border-2 px-3 py-1 text-sm font-semibold transition-transform hover:-translate-y-0.5"
              style={{ borderColor: link.accent, color: link.accent }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
