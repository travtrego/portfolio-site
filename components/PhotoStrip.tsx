"use client";

import { useState } from "react";
import Image from "next/image";

type Photo = { src: string; alt: string };

export default function PhotoStrip({ photos, accent }: { photos: Photo[]; accent: string }) {
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  return (
    <>
      <div className="mt-5 grid max-w-sm grid-cols-4 gap-3">
        {photos.map((photo) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setLightbox(photo)}
            className="group relative aspect-square cursor-zoom-in overflow-hidden rounded-xl border-2 bg-[var(--background)] transition-transform hover:-translate-y-0.5"
            style={{ borderColor: accent }}
          >
            <Image src={photo.src} alt={photo.alt} fill sizes="96px" className="object-cover" />
            <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 drop-shadow"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </span>
          </button>
        ))}
      </div>

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
