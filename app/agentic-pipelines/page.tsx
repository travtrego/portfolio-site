import ProjectGrid from "@/components/ProjectGrid";
import { agenticProjects } from "@/lib/content";

export default function AgenticPipelinesPage() {
  return (
    <ProjectGrid
      title="Agentic & Multi-Agentic Pipelines"
      description="Systems built from multiple specialized AI agents coordinating toward one outcome."
      projects={agenticProjects}
      accent="var(--accent-productivity)"
    />
  );
}
