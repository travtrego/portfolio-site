import type { Metadata } from "next";
import Link from "next/link";
import RequestExplorer from "./request-explorer";

export const metadata: Metadata = {
  title: "Meetup REST API — Coursework | Travis Sherman Trego",
  description: "A walkthrough of an Express coursework API: JSON requests, validation, salted password hashing, and JWT-protected meetup routes.",
};

const routes = [
  ["POST", "/signup", "Public", "Create an account"],
  ["POST", "/login", "Public", "Verify credentials; issue a JWT"],
  ["GET", "/meetups", "Public", "Read saved meetups"],
  ["POST", "/meetups", "JWT required", "Create a meetup"],
  ["PATCH", "/meetups/:id", "JWT required", "Update supplied fields"],
  ["DELETE", "/meetups/:id", "JWT required", "Remove a meetup"],
];

export default function MeetupApiPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
      <Link href="/coursework" className="text-sm font-semibold text-[var(--accent-coursework)] hover:underline">← Back to Coursework</Link>
      <header className="mb-8 mt-7 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-coursework)]">Node.js / Express / JWT</p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Meetup REST API</h1>
        <p className="mt-4 text-lg text-[var(--muted)]">Learning what happens between sending a request and getting a response.</p>
        <p className="mt-4 leading-relaxed text-[var(--muted)]">A course project built with AI assistance, then explored through Thunder Client in VS Code. The API stores meetups, registers users, hashes passwords, and checks a signed token before allowing changes.</p>
        <a className="mt-5 inline-block rounded-full border-2 border-[var(--accent-coursework)] px-4 py-2 text-sm font-bold text-[var(--accent-coursework)] hover:underline" href="https://github.com/travtrego/meetup-rest-api" target="_blank" rel="noopener noreferrer">Source & local setup ↗</a>
      </header>

      <RequestExplorer />

      <section className="mt-12" aria-labelledby="routes-heading">
        <h2 id="routes-heading" className="text-2xl font-bold">Six routes, two levels of access</h2>
        <p className="mt-3 text-[var(--muted)]">Anyone can read meetups or create an account. Creating, editing, and deleting meetups requires a valid JWT from login.</p>
        <div className="mt-5 overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--card)]"><tr>{["Method", "Route", "Access", "Purpose"].map(h => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr></thead>
            <tbody>{routes.map(([method, route, access, purpose]) => <tr key={method + route} className="border-t border-[var(--border)]"><td className="px-4 py-3 font-mono font-semibold text-[var(--accent-coursework)]">{method}</td><td className="whitespace-nowrap px-4 py-3 font-mono">{route}</td><td className="whitespace-nowrap px-4 py-3">{access}</td><td className="min-w-44 px-4 py-3 text-[var(--muted)]">{purpose}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="mt-12 grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold">What I practiced</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-[var(--muted)]">
            <li>Turning a plain-English brief into routes, then understanding the generated code.</li>
            <li>Separating JSON parsing from validation: readable JSON can still contain invalid meetup data.</li>
            <li>Using middleware to check a JWT before a protected handler runs.</li>
            <li>Testing failure cases as well as successful requests in Thunder Client.</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold">What the tests showed</h2>
          <p className="mt-4 leading-relaxed text-[var(--muted)]">The September 17, 2026 Thunder Client report recorded passing signup, login, meetup CRUD, validation, and missing/invalid-token checks. Records survived a server restart. Password storage was inspected for salts and hashes rather than plaintext.</p>
          <p className="mt-3 leading-relaxed text-[var(--muted)]">The token declares a one-hour lifetime; actual expiration was not exercised in that report.</p>
        </div>
      </section>

      <section className="mt-10 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="text-xl font-bold">A local learning project</h2>
        <p className="mt-3 leading-relaxed text-[var(--muted)]">The API runs locally with JSON files, not a production database. Any authenticated account can modify any meetup. Rate limiting, account recovery, and token revocation are not implemented. Several handlers still return errors directly, so fully centralized error handling remains a next step in the saved course version.</p>
        <p className="mt-3 leading-relaxed text-[var(--muted)]">The walkthrough above contains illustrative sample exchanges. It does not send requests, create accounts, or store visitor data. To try the actual API, use the source repository’s setup instructions.</p>
      </section>
    </main>
  );
}
