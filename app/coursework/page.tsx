import ProjectGrid from "@/components/ProjectGrid";
import { courseworkProjects } from "@/lib/content";

export default function CourseworkPage() {
  return (
    <ProjectGrid
      title="Coursework"
      description="Assignments and projects from courses and training. Not flagship work — just where it lives."
      projects={courseworkProjects}
      accent="var(--accent-comingsoon)"
    />
  );
}
