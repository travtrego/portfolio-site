export default function Footer() {
  return (
    <footer className="mt-16 border-t-2 border-[var(--border)] bg-[var(--card)]">
      <div className="mx-auto max-w-4xl px-6 py-6 text-sm text-[var(--muted)]">
        Contact Travis Trego —{" "}
        <a href="mailto:travtrego@gmail.com" className="font-medium underline" style={{ color: "var(--accent)" }}>
          travtrego@gmail.com
        </a>
      </div>
    </footer>
  );
}
