"use client";

import { useState } from "react";

const meetup = { title: "Node.js study group", summary: "Practicing REST requests and authentication.", address: "Example Community Room" };
const scenarios = [
  {
    key: "create", label: "Create a meetup", method: "POST", path: "/meetups", status: "201 Created", accepted: true,
    auth: "Bearer <valid token>", request: meetup, response: { id: 1, ...meetup },
    title: "A valid request becomes a saved meetup",
    explanation: "The JWT passes authentication. All three meetup fields pass validation, so the server assigns a numeric ID, writes the record to meetups.json, and returns it.",
  },
  {
    key: "protected", label: "Missing token", method: "POST", path: "/meetups", status: "401 Unauthorized", accepted: false,
    auth: "Not supplied", request: meetup, response: { error: "An Authorization header with a Bearer token is required" },
    title: "No token, no change",
    explanation: "Authentication runs before the meetup handler. Without a Bearer token, the request is rejected and no meetup is saved—even though the JSON body itself is valid.",
  },
  {
    key: "validation", label: "Blank title", method: "POST", path: "/meetups", status: "400 Bad Request", accepted: false,
    auth: "Bearer <valid token>", request: { ...meetup, title: "   " }, response: { error: "Provide only title, summary, and address as non-empty strings" },
    title: "Valid JSON is not always valid data",
    explanation: "The token is valid, but the title contains only spaces. Trimming reveals an empty value, so validation rejects the request before the file is updated.",
  },
  {
    key: "patch", label: "Update one field", method: "PATCH", path: "/meetups/1", status: "200 OK", accepted: true,
    auth: "Bearer <valid token>", request: { summary: "Next session: request validation." }, response: { id: 1, ...meetup, summary: "Next session: request validation." },
    title: "PATCH changes only what you send",
    explanation: "The URL identifies meetup 1. The request supplies only a summary, so the existing title and address stay intact while the updated record is saved.",
  },
];

export default function RequestExplorer() {
  const [selected, setSelected] = useState("create");
  const scenario = scenarios.find(item => item.key === selected)!;

  return (
    <section aria-labelledby="explorer-heading" className="rounded-2xl border-2 border-[var(--accent-coursework)] bg-[var(--card)] p-5 shadow-[5px_5px_0_0_var(--accent-coursework)] sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><h2 id="explorer-heading" className="text-2xl font-bold">Follow a request</h2><p className="mt-1 text-sm text-[var(--muted)]">Illustrative examples · no requests are sent</p></div>
        <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-semibold">API walkthrough</span>
      </div>
      <div className="my-5 flex flex-wrap gap-2" aria-label="Choose a request example">
        {scenarios.map(item => <button key={item.key} type="button" aria-pressed={selected === item.key} onClick={() => setSelected(item.key)} className="rounded-full border px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-coursework)]" style={{ borderColor: selected === item.key ? "var(--accent-coursework)" : "var(--border)", background: selected === item.key ? "var(--accent-coursework)" : "transparent", color: selected === item.key ? "var(--on-accent)" : "var(--foreground)" }}>{item.label}</button>)}
      </div>
      <div id="request-example" className="grid gap-4 lg:grid-cols-2" aria-live="polite" aria-atomic="true">
        <div className="min-w-0 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Request</p>
          <p className="mt-3 font-mono text-lg"><span className="font-bold text-[var(--accent-coursework)]">{scenario.method}</span> {scenario.path}</p>
          <p className="mt-3 break-words font-mono text-xs text-[var(--muted)]">Content-Type: application/json<br />Authorization: {scenario.auth}</p>
          <pre className="mt-4 whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed">{JSON.stringify(scenario.request, null, 2)}</pre>
        </div>
        <div className="min-w-0 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Response</p>
          <p className="mt-3 font-mono text-lg font-bold" style={{ color: scenario.accepted ? "var(--accent-coursework)" : "var(--accent-philosophy)" }}>{scenario.status}</p>
          <pre className="mt-4 whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed">{JSON.stringify(scenario.response, null, 2)}</pre>
        </div>
      </div>
      <div className="mt-5"><h3 className="font-bold">{scenario.title}</h3><p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{scenario.explanation}</p></div>
    </section>
  );
}
