'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { getPageMeta, getWorkspaceFromPathname, mapRouteForWorkspace, type NavItem, type WorkspaceMode } from '@/lib/navigation';

export function AppShell({
  fullName,
  role,
  workerLinks,
  ownerLinks,
  children,
}: {
  fullName: string;
  role: string;
  workerLinks: NavItem[];
  ownerLinks: NavItem[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const workspace = getWorkspaceFromPathname(pathname);
  const links = workspace === 'owner' ? ownerLinks : workerLinks;
  const meta = getPageMeta(pathname);

  const shell = workspace === 'owner'
    ? 'bg-[radial-gradient(circle_at_top,#7c2d12_0%,#09090b_55%)]'
    : 'bg-[radial-gradient(circle_at_top,#1d4ed8_0%,#09090b_55%)]';

  const workspaceLabel = useMemo(
    () => (workspace === 'owner' ? 'Owner Workspace' : 'Worker Workspace'),
    [workspace],
  );

  const handleWorkspaceSwitch = (nextWorkspace: WorkspaceMode) => {
    const nextRoute = mapRouteForWorkspace(pathname, nextWorkspace);
    if (nextRoute !== pathname) router.push(nextRoute);
  };

  return (
    <div className={`min-h-screen ${shell}`}>
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/25 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-md border border-white/15 bg-white/5 px-2 py-1 text-sm text-[#F8FAFC] md:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              ☰
            </button>
            <p className="text-lg font-semibold tracking-tight text-[#F8FAFC]">ServiceFlow</p>
            <span className={`rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${workspace === 'owner' ? 'border-orange-300/40 bg-orange-500/15 text-orange-100' : 'border-blue-300/40 bg-blue-500/15 text-blue-100'}`}>
              {workspaceLabel}
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 p-1">
            <button
              type="button"
              onClick={() => handleWorkspaceSwitch('worker')}
              className={`rounded-md px-3 py-1.5 text-sm transition ${workspace === 'worker' ? 'bg-blue-500/30 text-[#F8FAFC]' : 'text-[#CBD5E1] hover:bg-white/10'}`}
            >
              Worker
            </button>
            <button
              type="button"
              onClick={() => handleWorkspaceSwitch('owner')}
              className={`rounded-md px-3 py-1.5 text-sm transition ${workspace === 'owner' ? 'bg-orange-500/30 text-[#F8FAFC]' : 'text-[#CBD5E1] hover:bg-white/10'}`}
            >
              Owner
            </button>
          </div>

          <p className="text-sm text-[#CBD5E1]">{fullName} · {role}</p>
        </div>
      </header>
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-4 p-4 md:grid-cols-[260px_1fr]">
        <aside className={`${open ? 'block' : 'hidden'} rounded-2xl border border-white/10 bg-black/25 p-4 shadow-2xl backdrop-blur md:sticky md:top-[76px] md:block md:h-[calc(100vh-92px)]`}>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#94A3B8]">
            {workspaceLabel}
          </p>
          <nav className="grid grid-cols-2 gap-2 md:grid-cols-1">
            {links.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.id}
                  className={`rounded-lg border px-3 py-2 text-sm transition ${isActive ? 'border-cyan-300/70 bg-cyan-500/20 font-semibold text-cyan-50 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]' : 'border-white/10 bg-white/5 text-[#CBD5E1] hover:bg-white/10 hover:text-[#F8FAFC]'}`}
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="min-w-0 space-y-4">
          <section className="rounded-2xl border border-white/10 bg-black/25 p-4 shadow-lg backdrop-blur">
            <p className="text-xs uppercase tracking-[0.2em] text-[#94A3B8]">{workspaceLabel}</p>
            <h1 className="mt-1 text-2xl font-semibold text-[#F8FAFC]">{meta.title}</h1>
            <p className="text-sm text-[#CBD5E1]">{meta.description}</p>
          </section>
          {children}
        </main>
      </div>
    </div>
  );
}
