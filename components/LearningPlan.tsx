import { learningPlan } from "@/lib/content";

export default function LearningPlan({ accent }: { accent: string }) {
  const total = learningPlan.reduce((sum, group) => sum + group.courses.length, 0);

  return (
    <section className="mt-14">
      <h2 className="text-2xl font-extrabold" style={{ color: accent }}>
        AI Education Roadmap
      </h2>
      <p className="mt-2 text-[var(--muted)]">
        {total} courses and certifications I plan to work through, in the order I intend to take them —
        fundamentals first, then hands-on building, then depth. Updated as I finish them.
      </p>

      <ol className="mt-6 grid gap-4">
        {learningPlan.map((group, index) => (
          <li
            key={group.group}
            className="rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-5"
          >
            <div className="flex items-baseline gap-3">
              <span
                className="shrink-0 rounded-full px-2 py-0.5 text-xs font-bold"
                style={{ backgroundColor: accent, color: "var(--on-accent)" }}
              >
                {index + 1}
              </span>
              <h3 className="text-base font-bold">{group.group}</h3>
            </div>
            <p className="mt-2 text-sm text-[var(--muted)]">{group.note}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
              {group.courses.map((course) => (
                <li key={course}>{course}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
