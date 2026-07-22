import Image from "next/image";
import type { Project } from "@/lib/content";

export default function ProjectCard({ project, accent }: { project: Project; accent: string }) {
  const content = (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        {project.comingSoon && (
          <span className="shrink-0 rounded-full border border-dashed border-[var(--border)] px-2 py-0.5 text-xs text-[var(--muted)]">
            In progress
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-[var(--muted)]">{project.description}</p>
      {project.images && project.images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {project.images.map((image) => (
            <div
              key={image.src}
              className="relative aspect-video overflow-hidden rounded-md border border-[var(--border)] bg-[var(--background)]"
            >
              <Image src={image.src} alt={image.alt} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover" />
            </div>
          ))}
        </div>
      )}
      {project.tags && project.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2 py-0.5 text-xs font-medium"
              style={{ color: accent, backgroundColor: `color-mix(in srgb, ${accent} 15%, transparent)` }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      {project.improvements && project.improvements.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">Areas for improvement</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-[var(--muted)]">
            {project.improvements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {project.nextSteps && project.nextSteps.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">What&apos;s next</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-[var(--muted)]">
            {project.nextSteps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );

  const baseClasses = "block rounded-lg border p-5 transition-colors";

  if (project.comingSoon || !project.href) {
    return (
      <div className={`${baseClasses} border-dashed border-[var(--border)] bg-[var(--card)] opacity-70`}>
        {content}
      </div>
    );
  }

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} project-card-link border-[var(--border)] bg-[var(--card)]`}
      style={{ ["--card-accent" as string]: accent }}
    >
      {content}
    </a>
  );
}
