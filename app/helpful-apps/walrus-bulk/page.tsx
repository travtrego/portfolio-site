import Link from "next/link";
import CaseStudySection from "@/components/CaseStudySection";

const accent = "var(--accent-apps)";

const analysisSteps = [
  [
    "Find the lift in the clip",
    "A coarse 3 fps scan looks for hands low to hands high using a scale-free wrist height, so walking toward the camera isn't mistaken for a pull. A 20 fps pass then covers the lift window — 3s before mid-thigh to 5.5s after the hands reach the top, capped at 9.5s — long enough to include a held catch and the stand.",
  ],
  [
    "Time the phases",
    "A pure analyzer smooths keypoints, estimates camera view from shoulder width versus torso length, and finds events: liftoff, knee pass, extension, apex, catch, stand. Receiving drills like the snatch balance get a rack/dip/drive model instead of a pull from the floor; squats get descent/bottom/ascent; jerks get dip/drive/receive.",
  ],
  [
    "Measure what the view can support",
    "Hip-versus-shoulder rise, extension height, catch depth, pull-under time, stance change, bar loop, dip and drive time, lockout-versus-landing. Joint angles and fore-aft bar travel are marked low-reliability unless the view is side-on — from 45°, the model is told what that angle can settle and what it can't.",
  ],
  [
    "Ground the review in a versioned playbook",
    "The same review rules, knowledge base, principles, cues, and standard label list are assembled for every clip of that lift type. The exact playbook version is stored on every analysis row, so a later rule change never gets confused with an earlier one.",
  ],
  [
    "Validate, gate, and store",
    "The model must return a schema-validated result — summary, what went well, review bullets, and faults with a standard label, phase, timestamps, evidence, and confidence. Afterward, calls the camera angle can't support are dropped, confidence is capped under camera skew, and sub-causes must match known signs or they're stored as unclear.",
  ],
];

const evaluation: [string, string, string][] = [
  ["Public elite snatches (negative set)", "Re-run after 23.5 and 23.6", "0 faults; no invented calls"],
  [
    "Earlier-session pose tracks (regression)",
    "After 23.5 and 23.6 analyzer changes",
    "Identical measurements when the 45°-only prompt didn't apply",
  ],
  [
    "12 front-view snatch balances, one session",
    "23.4 vs. 23.5-snatch-balance-calibration",
    "Before: 7 of 12 false late-lockout calls. After: 12 of 12 correct, lockout synced with the feet within 0.15s, 0 false calls",
  ],
  [
    "14 snatches filmed at ~45°, one session",
    "23.6-snatch-45-calibration",
    "Foot-landing and standing-reference bugs fixed; a power receive no longer called as a high catch. Landing-width flags remain inconsistent on some wide reps",
  ],
];

export default function WalrusBulkCaseStudy() {
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
          Walrus Bulk
        </h1>
        <p className="mt-1 text-sm font-bold uppercase tracking-wide" style={{ color: accent }}>
          A Lift Video Is Not a Coach — This Tries to Measure the Gap
        </p>
        <p className="mt-3 text-[var(--muted)]">
          A self-coached weightlifter can film every attempt, but replay is subjective, friends are polite, and
          most AI video tools invent faults or ignore the camera angle. Built to close that gap with
          measurement instead of impression.
        </p>
      </div>

      <CaseStudySection title="The problem">
        <p>
          Upload a snatch, clean, jerk, squat, or a variant like a snatch balance. The app tracks the lifter on
          the device, measures timing and position, and writes a technique review grounded in a coaching
          knowledge base. Faults use a fixed label set so they can be compared from one session to the next,
          and the lifter can agree, reject, or edit every call — those corrections calibrate later reviews
          without any model training.
        </p>
      </CaseStudySection>

      <CaseStudySection title="What it does">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className="font-semibold text-[var(--foreground)]">Upload, record, or share from the camera roll.</span>{" "}
            A PWA with a Web Share Target on Android. Large files use resumable uploads, and a 720p lift-only
            review copy is what the model actually sees — a phone original that can run hundreds of megabytes
            is never sent whole.
          </li>
          <li>
            <span className="font-semibold text-[var(--foreground)]">Camera-angle guidance.</span> The lifter
            picks side, 45°, front, or behind; the app warns when a high or angled camera will skew hip height
            and bar path, and later treats calls that view can't confirm as possible rather than definite.
          </li>
          <li>
            <span className="font-semibold text-[var(--foreground)]">Skeleton and bar-path overlays.</span>{" "}
            Synced to playback, with a measured panel for timing, extension height, catch depth, and stance
            change — side-only metrics are flagged when the view isn't side-on.
          </li>
          <li>
            <span className="font-semibold text-[var(--foreground)]">Agree, reject, edit, or add a missed fault.</span>{" "}
            Reviewed analyses join a reference library used as few-shot examples; rejected labels become a
            common-false-calls list. History is never treated as evidence about the new clip.
          </li>
          <li>
            <span className="font-semibold text-[var(--foreground)]">Progress and fault patterns across sessions.</span>{" "}
            Session make rate, fault trends (fading, flat, worse), and a view of exactly what the model is told
            — make/miss has to be explicitly picked to count toward the statistic.
          </li>
        </ul>
        <p>
          Covers the snatch, power/hang/block snatch, snatch pull, snatch balance, clean, power/hang clean,
          clean pull, clean &amp; jerk, jerk, push jerk, and back/front/overhead squat.
        </p>
      </CaseStudySection>

      <CaseStudySection title="How the analysis works">
        <ol className="list-decimal space-y-2 pl-5">
          {analysisSteps.map(([title, detail]) => (
            <li key={title}>
              <span className="font-semibold text-[var(--foreground)]">{title}.</span> {detail}
            </li>
          ))}
        </ol>
        <p>
          Pose tracking never leaves the phone — the server only ever sees a stored video, a compact pose
          track, and the lifter's own labels. The coaching library itself also stays server-side: the browser
          gets a thin fault index, not the full rule definitions.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Accuracy and evaluation">
        <p>
          Public elite competition snatches are treated as a negative set: a competent lift should come back
          with an empty fault list. The model is never fine-tuned — every improvement is a measurement fix, a
          playbook rule, or a calibration drawn from real corrections.
        </p>
        <div className="overflow-x-auto rounded-xl border-2 border-[var(--border)]">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="bg-[var(--card)]">
                <th className="border-b-2 border-[var(--border)] px-3 py-2 text-left font-bold text-[var(--foreground)]">
                  Check
                </th>
                <th className="border-b-2 border-[var(--border)] px-3 py-2 text-left font-bold text-[var(--foreground)]">
                  Playbook
                </th>
                <th className="border-b-2 border-[var(--border)] px-3 py-2 text-left font-bold text-[var(--foreground)]">
                  Result
                </th>
              </tr>
            </thead>
            <tbody>
              {evaluation.map(([check, playbook, result]) => (
                <tr key={check} className="border-b border-[var(--border)] last:border-b-0">
                  <td className="px-3 py-2 align-top font-semibold text-[var(--foreground)]">{check}</td>
                  <td className="px-3 py-2 align-top">{playbook}</td>
                  <td className="px-3 py-2 align-top">{result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="font-semibold text-[var(--foreground)]">Two real tracking bugs, found by testing against real sessions:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Lifters who hold the bottom of a catch for 2–3 seconds lost the stand from a 3.5-second window
            tail, so extension height read as 165–205% of standing height instead of the real ~95–102%. Fixed
            by extending the dense window to 5.5 seconds past the top, capped at 9.5 seconds.
          </li>
          <li>
            A locked snatch-grip arm only reads about 158–167° in a front-view image, but lockout was defined
            at 165° — so a genuinely locked-out lift landed 0.1–0.6 seconds after the arms were already locked,
            and got called as a late lockout. Fixed by refusing that call from a front or 45° image unless the
            video clearly shows the elbows still bending after the feet are planted.
          </li>
        </ul>
      </CaseStudySection>

      <CaseStudySection title="Engineering decisions that held up">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className="font-semibold text-[var(--foreground)]">On-device pose, not a server GPU.</span>{" "}
            RTMDet-nano finds the lifter and RTMPose-m extracts 17 keypoints, both running in the browser over
            WebGPU with a single-thread WASM fallback. No video ever leaves the phone for tracking.
          </li>
          <li>
            <span className="font-semibold text-[var(--foreground)]">A versioned playbook instead of fine-tuning.</span>{" "}
            Corrections become prompt context — a handful of scored references, recurring confirmed faults,
            common false calls — under one hard rule: history can never raise confidence, and a clean rep must
            still come back clean.
          </li>
          <li>
            <span className="font-semibold text-[var(--foreground)]">A review copy, not the original file.</span>{" "}
            The browser builds a ≤720p, lift-only copy for the model to see, while timestamps still come from
            the original's on-screen clock.
          </li>
        </ul>
        <p className="font-semibold text-[var(--foreground)]">Limits still in the design:</p>
        <p>
          Everything is read in the image plane — joint angles and bar travel only mean much from a true side
          view, and the bar path itself is the wrist midpoint, a few centimeters off the actual plates. WASM
          tracking is meaningfully slower than WebGPU (seconds versus roughly 47 seconds for a 29-second clip on
          a CPU-only box). Hang and block starts aren't special-cased yet, and clean &amp; jerk currently
          measures the clean half only.
        </p>
      </CaseStudySection>

      <CaseStudySection title="What's next">
        <ul className="list-disc space-y-1 pl-5">
          <li>Hang- and block-aware event detection, and measuring the jerk half of a clean &amp; jerk.</li>
          <li>Clip management — re-running analysis, deleting a clip, and editing details after upload aren't built yet.</li>
          <li>Server-side size checks and compression for long clips, beyond the current client-side review copy.</li>
          <li>
            Tighter 45° landing-width calls — the 45° calibration still misses some clearly wide landings the
            measurements themselves show.
          </li>
        </ul>
      </CaseStudySection>
    </main>
  );
}
