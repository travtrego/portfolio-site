export default function Footer() {
  return (
    <footer className="mt-16 border-t-2 border-[var(--border)] bg-[var(--card)]">
      <div className="mx-auto max-w-4xl px-6 py-6 text-sm text-[var(--muted)]">
        Contact Travis Trego —{" "}
        <a href="mailto:travtrego@gmail.com" className="font-medium underline" style={{ color: "var(--accent)" }}>
          travtrego@gmail.com
        </a>{" "}
        ·{" "}
        <a
          href="https://www.linkedin.com/in/travis-t-14496347"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline"
          style={{ color: "var(--accent)" }}
        >
          LinkedIn
        </a>
        <p
          className="mt-1 text-xs text-[var(--muted)] opacity-70"
          title="A walrus's tusks never stop growing — same energy as this site."
        >
          A Walrus Production site 🦭
        </p>
      </div>
    </footer>
  );
}
