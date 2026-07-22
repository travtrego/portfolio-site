"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/lib/content";

export default function ProjectCard({ project, accent }: { project: Project; accent: string }) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const textContent = (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-bold">{project.title}</h3>
        {project.comingSoon && (
          <span className="shrink-0 rounded-full border border-dashed border-[var(--border)] px-2 py-0.5 text-xs text-[var(--muted)]">
            In progress
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-[var(--muted)]">{project.description}</p>
      {(project.github || project.demo) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-3 py-1 text-xs font-bold shadow-sm transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: accent, color: "var(--on-accent)" }}
            >
              Live demo ↗
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 px-3 py-1 text-xs font-bold transition-transform hover:-translate-y-0.5"
              style={{ borderColor: accent, color: accent }}
            >
              GitHub ↗
            </a>
          )}
        </div>
      )}
      {project.tags && project.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2 py-0.5 text-xs font-semibold"
              style={{ backgroundColor: accent, color: "var(--on-accent)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      {(project.improvements || project.nextSteps) && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {project.improvements && project.improvements.length > 0 && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
                Areas for improvement
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-[var(--muted)]">
                {project.improvements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {project.nextSteps && project.nextSteps.length > 0 && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">What&apos;s next</p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-[var(--muted)]">
                {project.nextSteps.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );

  const imageContent = project.images && project.images.length > 0 && (
    <div className="mt-4 flex gap-2 sm:mt-0 sm:w-52 sm:shrink-0 sm:flex-col">
      {project.images.map((image) => (
        <button
          key={image.src}
          type="button"
          onClick={() => setLightbox(image)}
          className="relative h-24 flex-1 cursor-zoom-in overflow-hidden rounded-lg border-2 border-[var(--border)] bg-[var(--background)] transition-opacity hover:opacity-80 sm:h-28 sm:flex-none sm:w-full"
        >
          <Image src={image.src} alt={image.alt} fill sizes="208px" className="object-contain" />
        </button>
      ))}
    </div>
  );

  const content = (
    <div className="sm:flex sm:items-start sm:gap-6">
      <div className="min-w-0 flex-1">{textContent}</div>
      {imageContent}
    </div>
  );

  return (
    <>
      {project.comingSoon ? (
        <div className="rounded-2xl border-2 border-dashed border-[var(--border)] bg-[var(--card)] p-5 opacity-70">
          {content}
        </div>
      ) : (
        <div
          className="project-card rounded-2xl border-2 bg-[var(--card)] p-5 transition-transform hover:-translate-y-1 hover:rotate-[-0.3deg]"
          style={{ borderColor: accent, boxShadow: `5px 5px 0 0 ${accent}` }}
        >
          {content}
        </div>
      )}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/80 p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-5 top-5 text-3xl leading-none text-white/80 hover:text-white"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-h-[88vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
