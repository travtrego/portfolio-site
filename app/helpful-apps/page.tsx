import ProjectGrid from "@/components/ProjectGrid";
import { apps } from "@/lib/content";

export default function HelpfulAppsPage() {
  return (
    <ProjectGrid
      title="Apps"
      description="Everyday apps I've built to solve real problems."
      projects={apps}
      accent="var(--accent-apps)"
    />
  );
}
