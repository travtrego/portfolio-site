export default function CaseStudySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 border-t-2 border-[var(--border)] pt-6">
      <h2 className="text-2xl font-extrabold">{title}</h2>
      <div className="mt-4 space-y-3 text-[var(--muted)]">{children}</div>
    </section>
  );
}
