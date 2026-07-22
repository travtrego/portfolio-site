import ProjectGrid from "@/components/ProjectGrid";
import { productivityProjects } from "@/lib/content";

export default function ProductivityPage() {
  return (
    <ProjectGrid
      title="Productivity"
      description="Accounting and productivity tools I've built."
      projects={productivityProjects}
      accent="var(--accent-productivity)"
    />
  );
}
