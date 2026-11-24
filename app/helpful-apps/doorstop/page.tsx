import Link from "next/link";
import CaseStudySection from "@/components/CaseStudySection";

const accent = "var(--accent-apps)";

export default function DoorstopCaseStudy() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Link href="/helpful-apps" className="text-sm font-semibold" style={{ color: accent }}>
        ← Apps
      </Link>

      <div
        className="mt-4 rounded-2xl border-2 p-5"
        style={{ borderColor: accent, backgroundColor: `color-mix(in srgb, ${accent} 8%, transparent)` }}
      >
        <h1 className="text-3xl font-extrabold" style={{ color: accent }}>
          Doorstop
        </h1>
        <p className="mt-1 text-sm font-bold uppercase tracking-wide" style={{ color: accent }}>
          A Pre-Flight Check for the House
        </p>
        <p className="mt-3 text-[var(--muted)]">
          Built for a specific, small anxiety — "did I actually do that?" — rather than as a general to-do
          app. Every design choice traces back to that one problem.
        </p>
      </div>

      <CaseStudySection title="Project objective">
        <p>
          A generic checklist app lets your eyes skim past items without really checking them. The goal was to
          make each item a single, deliberate decision — closer to a pre-flight check than a to-do list — and
          to make the resulting habit durable: it had to survive switching phones, not just sit in one
          browser's local storage.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Design choices">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className="font-semibold text-[var(--foreground)]">Full-screen swipe cards, not a list.</span>{" "}
            Each item appears alone, full-screen. Swipe right (or tap Confirmed) to confirm it; swipe left (or
            tap Not sure) to flag it for a second look. One decision per screen, instead of a scrollable list
            the eye can skip.
          </li>
          <li>
            <span className="font-semibold text-[var(--foreground)]">Profiles as distinct ordered subsets.</span>{" "}
            "Leaving for work" and "Leaving for vacation" are each their own ordered subset of the same item
            pool, not two copies of the same checklist maintained separately.
          </li>
          <li>
            <span className="font-semibold text-[var(--foreground)]">Accounts with row-level-security-scoped sync.</span>{" "}
            Checklists, profiles, and history sync through Supabase, scoped per user, so the same state follows
            the account across devices instead of being stuck on whichever phone set it up.
          </li>
        </ul>
      </CaseStudySection>

      <CaseStudySection title="The honest scope decision: the location nudge">
        <p>
          The original concept included a background nudge — a notification if you left home without checking
          in that day. A browser tab can't reliably watch location once it's closed; that needs a native app
          with background location permission, which a PWA structurally cannot get.
        </p>
        <p>
          Rather than fake that guarantee or quietly drop the feature, the nudge is built foreground-only and
          labeled that way in the app itself: while Doorstop is open, it watches position and fires a browser
          Notification if you've wandered outside a saved home radius without checking in — gated by a
          per-user radius and an enabled flag stored in Supabase, so it's opt-in rather than a surprise. It is
          a best-effort convenience while the app happens to be open, not a background safety feature, and it
          doesn't pretend otherwise.
        </p>
      </CaseStudySection>

      <CaseStudySection title="What this is">
        <p>
          A prototype built with Vite, React, TypeScript, and Tailwind CSS, with Framer Motion driving the
          swipe gesture and <code>vite-plugin-pwa</code> handling offline support and installability. The
          interesting part isn't the stack — it's choosing a swipe-to-confirm interaction over a checkbox list,
          and choosing to label a feature honestly as foreground-only instead of overselling it.
        </p>
      </CaseStudySection>
    </main>
  );
}
