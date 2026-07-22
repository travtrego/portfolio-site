import ProjectGrid from "@/components/ProjectGrid";
import { dataProjects } from "@/lib/content";

export default function DataProjectsPage() {
  return (
    <ProjectGrid
      title="Data Projects"
      description="Data analytics projects — still learning, still building."
      projects={dataProjects}
    />
  );
}
