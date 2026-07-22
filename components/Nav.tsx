"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home", emoji: "👋", accent: "var(--accent)" },
  { href: "/apps", label: "Apps", emoji: "💻", accent: "var(--accent-apps)" },
  { href: "/fun-stuff", label: "Fun Stuff", emoji: "🎉", accent: "var(--accent-fun)" },
  { href: "/data-projects", label: "Data Projects", emoji: "📊", accent: "var(--accent-data)" },
  { href: "/productivity", label: "Productivity", emoji: "🧾", accent: "var(--accent-productivity)" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="border-b-2 border-[var(--border)] bg-[var(--card)]">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-2 px-6 py-3">
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
