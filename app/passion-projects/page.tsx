import ProjectGrid from "@/components/ProjectGrid";
import { funStuff } from "@/lib/content";

export default function PassionProjectsPage() {
  return (
    <ProjectGrid
      title="Passion Projects"
      description="Side projects built purely because they were fun to build."
      projects={funStuff}
      accent="var(--accent-fun)"
    />
  );
}
