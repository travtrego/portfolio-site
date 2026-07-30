import ProjectGrid from "@/components/ProjectGrid";
import { productivityProjects } from "@/lib/content";

export default function ProductivityPage() {
  return (
    <ProjectGrid
      title="Current Projects"
      description="What I'm building right now."
      projects={productivityProjects}
      accent="var(--accent-productivity)"
    />
  );
}
