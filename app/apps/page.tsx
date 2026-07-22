import ProjectGrid from "@/components/ProjectGrid";
import { apps } from "@/lib/content";

export default function AppsPage() {
  return (
    <ProjectGrid
      title="Apps"
      description="Apps I've built for fun."
      projects={apps}
    />
  );
}
