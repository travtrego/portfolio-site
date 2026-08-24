"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home", emoji: "👋", accent: "var(--accent)" },
  { href: "/agentic-pipelines", label: "Agentic Pipelines", emoji: "🤖", accent: "var(--accent-productivity)" },
  { href: "/passion-projects", label: "Passion Projects", emoji: "🎉", accent: "var(--accent-fun)" },
  { href: "/data-science", label: "Data Science", emoji: "📊", accent: "var(--accent-data)" },
  { href: "/helpful-apps", label: "Apps", emoji: "💻", accent: "var(--accent-apps)" },
  { href: "/coming-soon", label: "Coming Soon", emoji: "🔜", accent: "var(--accent-comingsoon)" },
  { href: "/coursework", label: "Coursework", emoji: "🎓", accent: "var(--accent-coursework)" },
  { href: "/philosophy", label: "Philosophy", emoji: "🔥", accent: "var(--accent-philosophy)" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="border-b-2 border-[var(--border)] bg-[var(--card)]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-6 py-3">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              style={active ? { backgroundColor: link.accent, color: "var(--on-accent)" } : undefined}
              className={`rounded-full px-3 py-1.5 text-sm font-bold transition-colors ${
                active ? "" : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <span className="mr-1">{link.emoji}</span>
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
