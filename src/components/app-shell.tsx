'use client';

import Link from 'next/link';
import { useState } from 'react';

export function AppShell({
  fullName,
  role,
  isOwnerView,
  links,
  children,
}: {
  fullName: string;
  role: string;
  isOwnerView: boolean;
  links: [string, string][];
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const shell = isOwnerView
    ? 'bg-[radial-gradient(circle_at_top,#7c2d12_0%,#09090b_55%)]'
    : 'bg-[radial-gradient(circle_at_top,#1d4ed8_0%,#09090b_55%)]';

  return (
    <div className={`min-h-screen ${shell}`}>
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/25 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-md border border-white/15 bg-white/5 px-2 py-1 text-sm text-[#F8FAFC] md:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              ☰
            </button>
            <p className="text-lg font-semibold tracking-tight text-[#F8FAFC]">ServiceFlow</p>
          </div>
          <p className="text-sm text-[#CBD5E1]">{fullName} · {role}</p>
        </div>
      </header>
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-4 p-4 md:grid-cols-[250px_1fr]">
        <aside className={`${open ? 'block' : 'hidden'} rounded-2xl border border-white/10 bg-black/25 p-4 shadow-2xl backdrop-blur md:sticky md:top-[76px] md:block md:h-[calc(100vh-92px)]`}>
          <p className={`mb-4 text-xs font-semibold uppercase tracking-[0.2em] ${'text-[#94A3B8]'}`}>
            {isOwnerView ? 'Owner Workspace' : 'Worker Workspace'}
          </p>
          <nav className="grid grid-cols-2 gap-2 md:grid-cols-1">
            {links.map(([label, href]) => (
              <Link
                key={href}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#F8FAFC] hover:bg-white/10"
                href={href}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
