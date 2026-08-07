import ProjectGrid from "@/components/ProjectGrid";
import { dataProjects } from "@/lib/content";

export default function DataSciencePage() {
  return (
    <ProjectGrid
      title="Data Science"
      description="Data analytics projects — still learning, still building."
      projects={dataProjects}
      accent="var(--accent-data)"
    />
  );
}
