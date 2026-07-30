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
          <p className="mt-5 text-lg leading-relaxed">
            Mostly I build things impulsively:{" "}
            <Link href="/apps" className="font-semibold underline decoration-2 underline-offset-4" style={{ color: "var(--accent-apps)" }}>
              productivity tools
            </Link>
            ,{" "}
            <Link href="/fun-stuff" className="font-semibold underline decoration-2 underline-offset-4" style={{ color: "var(--accent-fun)" }}>
              projects for hobbies
            </Link>
            ,{" "}
            <Link href="/data-projects" className="font-semibold underline decoration-2 underline-offset-4" style={{ color: "var(--accent-data)" }}>
              data science models
            </Link>
            ... and{" "}
            <Link href="/productivity" className="font-semibold underline decoration-2 underline-offset-4" style={{ color: "var(--accent-productivity)" }}>
              whatever&apos;s got me scatterbrained this week
            </Link>
            .
          </p>
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
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <p className="text-[var(--muted)]">
            I stumbled into AI through a few required training courses at work. Since then, I&apos;ve been teaching myself Python, web development, databases, and automation by building real projects with AI as a collaborator—not just a tool.
          </p>
          <div className="space-y-3 text-[var(--muted)]">
            {site.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
        <PhotoStrip photos={site.photos} accent="var(--accent)" />
      </section>
    </main>
  );
}
