import Image from "next/image";
import { site } from "@/lib/content";

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
    </main>
  );
}
