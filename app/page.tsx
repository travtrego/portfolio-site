import Image from "next/image";
import Link from "next/link";
import PhotoStrip from "@/components/PhotoStrip";
import { site } from "@/lib/content";

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <section className="grid items-center gap-8 sm:grid-cols-[1fr_1.3fr]">
        <div>
          <h1 className="text-4xl font-extrabold sm:text-5xl" style={{ color: "var(--accent)" }}>
            {site.name}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
            Navy veteran, tax accountant, husband, and dog dad, currently teaching myself how to build with AI.
          </p>
          <p className="mt-3 text-lg leading-relaxed text-[var(--muted)]">
            A few required training courses at work turned into teaching myself Python, web development, databases, and automation — building real things instead of just reading about them.
          </p>
          <ul className="mt-5 space-y-2 text-lg leading-relaxed">
            <li>
              <Link href="/helpful-apps" className="font-semibold underline decoration-2 underline-offset-4" style={{ color: "var(--accent-apps)" }}>
                Helpful apps
              </Link>
            </li>
            <li>
              <Link href="/data-science" className="font-semibold underline decoration-2 underline-offset-4" style={{ color: "var(--accent-data)" }}>
                Data science
              </Link>
            </li>
            <li>
              <Link href="/passion-projects" className="font-semibold underline decoration-2 underline-offset-4" style={{ color: "var(--accent-fun)" }}>
                Passion projects
              </Link>
            </li>
            <li>
              <Link href="/agentic-pipelines" className="font-semibold underline decoration-2 underline-offset-4" style={{ color: "var(--accent-productivity)" }}>
                Agentic &amp; multi-agentic pipelines
              </Link>
            </li>
            <li>
              <Link href="/coming-soon" className="font-semibold underline decoration-2 underline-offset-4" style={{ color: "var(--accent-comingsoon)" }}>
                Coming soon
              </Link>
            </li>
          </ul>
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
        <h2 className="text-2xl font-extrabold">A bit about me</h2>
        <div className="mt-4 space-y-3 text-[var(--muted)]">
          {site.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <PhotoStrip photos={site.photos} accent="var(--accent)" />
      </section>
    </main>
  );
}
