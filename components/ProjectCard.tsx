import type { Project } from "@/lib/content";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg border border-[var(--border)] bg-[var(--card)] p-5 transition-colors hover:border-[var(--accent)]"
    >
      <h3 className="text-lg font-semibold">{project.title}</h3>
      <p className="mt-2 text-sm text-[var(--muted)]">{project.description}</p>
      {project.tags && project.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--border)] px-2 py-0.5 text-xs text-[var(--muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}
