import Image from "next/image";
import Link from "next/link";
import PhotoStrip from "@/components/PhotoStrip";
import { apps, dataProjects, funStuff, productivityProjects, site } from "@/lib/content";

// Referenced by title rather than array index so reordering a section can't
// silently swap out what the homepage features.
const FEATURED = [
  { title: "MycoFlow", href: "/fun-stuff" },
  { title: "TCP Mastery — CPA Study App", href: "/apps" },
  { title: "Phillies Prospect Pulse", href: "/fun-stuff" },
];

const projectsByTitle = new Map(
  [...apps, ...funStuff, ...dataProjects, ...productivityProjects].map((p) => [p.title, p])
);

const featuredProjects = FEATURED.map(({ title, href }) => {
  const project = projectsByTitle.get(title);
  // Fails the build rather than rendering a broken card if a title drifts.
  if (!project) throw new Error(`Featured project not found in content.ts: "${title}"`);
  return { project, href };
});

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <section>
        <h1 className="text-4xl font-extrabold sm:text-5xl" style={{ color: "var(--accent)" }}>
          {site.name}
        </h1>
        <p className="mt-3 max-w-xl text-lg text-[var(--muted)]">
          Navy veteran, husband, and dog dad, currently teaching myself how to build with AI.
        </p>
      </section>

      <section className="mt-8">
        <div
          className="relative aspect-[4/3] overflow-hidden rounded-2xl border-2 bg-[var(--card)] sm:aspect-[16/9]"
          style={{ borderColor: "var(--accent)" }}
        >
          <Image
            src="/hero/walrus.jpg"
            alt="A walrus working on a laptop on a rocky beach, waterfall behind him"
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
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
        <p className="mt-3 text-[var(--muted)]">
          I stumbled into AI through a few required training courses at work. Since then, I&apos;ve been teaching myself Python, web development, databases, and automation by building real projects with AI as a collaborator—not just a tool.
        </p>
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
        <PhotoStrip photos={site.photos} accent="var(--accent-apps)" />
      </section>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-extrabold">Featured Projects</h2>
          <span className="text-sm text-[var(--muted)]">Swipe to explore →</span>
        </div>

        <div className="mt-5 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
          {featuredProjects.map(({ project, href }) => (
            <Link
              key={project.title}
              href={href}
              className="group w-[86%] shrink-0 snap-start overflow-hidden rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] transition-transform hover:-translate-y-1 sm:w-[58%] lg:w-[40%]"
            >
              {project.images?.[0] && (
                <div className="relative aspect-[16/9] overflow-hidden border-b-2 border-[var(--border)]">
                  <Image
                    src={project.images[0].src}
                    alt={project.images[0].alt}
                    fill
                    sizes="(max-width: 640px) 86vw, 40vw"
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="text-lg font-extrabold">{project.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {project.summary ?? project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
