import ProjectGrid from "@/components/ProjectGrid";
import { comingSoonProjects } from "@/lib/content";

export default function ComingSoonPage() {
  return (
    <ProjectGrid
      title="Coming Soon"
      description="What I'm building right now."
      projects={comingSoonProjects}
      accent="var(--accent-comingsoon)"
    />
  );
}
