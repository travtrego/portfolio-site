import { courseDone, courseName, learningPlan } from "@/lib/content";

export default function LearningPlan({ accent }: { accent: string }) {
  const all = learningPlan.flatMap((group) => group.courses);
  const total = all.length;
  const doneCount = all.filter(courseDone).length;

  return (
    <section className="mt-14">
      <h2 className="text-2xl font-extrabold" style={{ color: accent }}>
        AI Education Roadmap
      </h2>
      <p className="mt-2 text-[var(--muted)]">
        {total} courses and certifications I plan to work through, in the order I intend to take them —
        fundamentals first, then hands-on building, then depth.{" "}
        {doneCount > 0 ? `${doneCount} done so far.` : "Updated as I finish them."}
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
            <ul className="mt-3 space-y-1 text-sm">
              {group.courses.map((course) => {
                const name = courseName(course);
                const done = courseDone(course);

                return (
                  <li key={name} className="flex items-baseline gap-2">
                    <span
                      aria-hidden
                      className="shrink-0 text-xs"
                      style={done ? { color: accent } : undefined}
                    >
                      {done ? "✓" : "•"}
                    </span>
                    <span className={done ? "font-medium" : undefined}>
                      {name}
                      {done ? <span className="sr-only"> (completed)</span> : null}
                    </span>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
