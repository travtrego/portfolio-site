import Image from "next/image";
import type { Project } from "@/lib/content";

export default function ProjectCard({ project, accent }: { project: Project; accent: string }) {
  const content = (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-bold">{project.title}</h3>
        {project.comingSoon && (
          <span className="shrink-0 rounded-full border border-dashed border-[var(--border)] px-2 py-0.5 text-xs text-[var(--muted)]">
            In progress
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-[var(--muted)]">{project.description}</p>
      {project.images && project.images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {project.images.map((image) => (
            <div
              key={image.src}
              className="relative h-44 overflow-hidden rounded-lg border-2 border-[var(--border)] bg-[var(--background)]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      )}
      {(project.github || project.demo) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-3 py-1 text-xs font-bold text-white shadow-sm transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: accent }}
            >
              Live demo ↗
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 px-3 py-1 text-xs font-bold transition-transform hover:-translate-y-0.5"
              style={{ borderColor: accent, color: accent }}
            >
              GitHub ↗
            </a>
          )}
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

  if (project.comingSoon) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-[var(--border)] bg-[var(--card)] p-5 opacity-70">
        {content}
      </div>
    );
  }

  return (
    <div
      className="project-card rounded-2xl border-2 bg-[var(--card)] p-5 transition-transform hover:-translate-y-1 hover:rotate-[-0.3deg]"
      style={{ borderColor: accent, boxShadow: `5px 5px 0 0 ${accent}` }}
    >
      {content}
    </div>
  );
}
