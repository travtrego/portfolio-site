import ProjectGrid from "@/components/ProjectGrid";
import { videoGames } from "@/lib/content";

export default function VideoGamesPage() {
  return (
    <ProjectGrid
      title="Video Games"
      description="Game projects — one built from an open-source engine up, one from zero."
      projects={videoGames}
      accent="var(--accent-games)"
    />
  );
}
