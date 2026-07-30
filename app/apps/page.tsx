import ProjectGrid from "@/components/ProjectGrid";
import { apps } from "@/lib/content";

export default function AppsPage() {
  return (
    <ProjectGrid
      title="Practical"
      description="Everyday apps I've built to solve real problems."
      projects={apps}
      accent="var(--accent-apps)"
    />
  );
}
