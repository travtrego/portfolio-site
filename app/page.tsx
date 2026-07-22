import Image from "next/image";
import { site } from "@/lib/content";

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <section className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <div className="flex gap-3">
          {site.photos.map((photo) => (
            <div
              key={photo.src}
              className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-[var(--border)] bg-[var(--card)] text-xs text-[var(--muted)]"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={112}
                height={112}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{site.name}</h1>
          <p className="mt-2 max-w-xl text-[var(--muted)]">{site.tagline}</p>
        </div>
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
