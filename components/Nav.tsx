"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home", accent: "var(--accent)" },
  { href: "/apps", label: "Apps", accent: "var(--accent-apps)" },
  { href: "/data-projects", label: "Data Projects", accent: "var(--accent-data)" },
  { href: "/productivity", label: "Productivity", accent: "var(--accent-productivity)" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-[var(--border)]">
      <div className="mx-auto flex max-w-4xl items-center gap-6 px-6 py-4">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              style={active ? { color: link.accent } : undefined}
              className={`text-sm font-medium transition-colors ${
                active ? "" : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
