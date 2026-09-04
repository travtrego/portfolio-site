import type { ReactNode } from "react";
import type { Project } from "@/lib/content";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectGrid({
  title,
  description,
  projects,
  accent,
  children,
}: {
  title: string;
  description: string;
  projects: Project[];
  accent: string;
  children?: ReactNode;
}) {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div
        className="rounded-2xl border-2 p-5"
        style={{ borderColor: accent, backgroundColor: `color-mix(in srgb, ${accent} 8%, transparent)` }}
      >
        <h1 className="text-3xl font-extrabold" style={{ color: accent }}>
          {title}
        </h1>
        <p className="mt-2 text-[var(--muted)]">{description}</p>
      </div>
      {projects.length > 0 ? (
        <div className="mt-8 grid gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} accent={accent} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-[var(--muted)]">Nothing here yet — first project is in the works.</p>
      )}
      {children}
    </main>
  );
}
