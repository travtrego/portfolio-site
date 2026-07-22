import type { Project } from "@/lib/content";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectGrid({
  title,
  description,
  projects,
  accent,
}: {
  title: string;
  description: string;
  projects: Project[];
  accent: string;
}) {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="border-l-4 pl-4" style={{ borderColor: accent }}>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-2 text-[var(--muted)]">{description}</p>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} accent={accent} />
        ))}
      </div>
    </main>
  );
}
