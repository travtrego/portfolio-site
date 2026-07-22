import Image from "next/image";
import { site } from "@/lib/content";

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <section>
        <h1 className="text-3xl font-bold">{site.name}</h1>
        <p className="mt-2 max-w-xl text-[var(--muted)]">{site.tagline}</p>
      </section>

      <section className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {site.photos.map((photo) => (
          <div
            key={photo.src}
            className="relative aspect-square overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]"
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

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Why AI, analytics, and development</h2>
        <div className="mt-3 space-y-3 text-[var(--muted)]">
          {site.about.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">A bit about me</h2>
        <div className="mt-3 space-y-3 text-[var(--muted)]">
          {site.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>
    </main>
  );
}
