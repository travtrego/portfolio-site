import Image from "next/image";
import Link from "next/link";
import { apps, funStuff, site } from "@/lib/content";

const featuredProjects = [
  {
    project: funStuff[1],
    href: "/fun-stuff",
    description:
      "A mushroom cultivation manager that tracks batches from agar to harvest, including locations, yields, and inventory.",
  },
  {
    project: apps[0],
    href: "/apps",
    description:
      "A CPA study app with adaptive quizzes, detailed explanations, progress tracking, and offline support.",
  },
  {
    project: funStuff[0],
    href: "/fun-stuff",
    description:
      "An automated dashboard for following Phillies prospects through live statistics, rankings, injuries, and news.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <section>
        <h1 className="text-4xl font-extrabold sm:text-5xl" style={{ color: "var(--accent)" }}>
          {site.name}
        </h1>
        <p className="mt-3 max-w-xl text-lg text-[var(--muted)]">{site.tagline}</p>
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

      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-extrabold">Featured Projects</h2>
          <span className="text-sm text-[var(--muted)]">Swipe to explore →</span>
        </div>

        <div className="mt-5 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
          {featuredProjects.map(({ project, href, description }) => (
            <Link
              key={project.title}
              href={href}
              className="group w-[86%] shrink-0 snap-start overflow-hidden rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] transition-transform hover:-translate-y-1 sm:w-[58%] lg:w-[46%]"
            >
              {project.images?.[0] && (
                <div className="relative aspect-[16/9] overflow-hidden border-b-2 border-[var(--border)]">
                  <Image
                    src={project.images[0].src}
                    alt={project.images[0].alt}
                    fill
                    sizes="(max-width: 640px) 86vw, 46vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="text-lg font-extrabold">{project.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
