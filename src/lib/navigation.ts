export type WorkspaceMode = 'worker' | 'owner';

export type NavItem = {
  id: string;
  label: string;
  href: string;
  description: string;
};

export const workerLinks: NavItem[] = [
  { id: 'worker-dashboard', label: 'Dashboard', href: '/dashboard', description: 'Daily queue and assigned work.' },
  { id: 'worker-leads', label: 'Leads', href: '/leads', description: 'Track incoming leads and follow-ups.' },
  { id: 'worker-cases', label: 'Cases', href: '/cases', description: 'Manage visa and travel cases.' },
  { id: 'worker-settings', label: 'Settings', href: '/settings', description: 'Personal and workspace preferences.' },
];

export const ownerLinks: NavItem[] = [
  { id: 'owner-dashboard', label: 'Owner Dashboard', href: '/owner-dashboard', description: 'Business health and operations snapshot.' },
  { id: 'owner-revenue', label: 'Revenue', href: '/revenue', description: 'Revenue totals, collections, and invoices.' },
  { id: 'owner-leads', label: 'Leads', href: '/leads', description: 'Lead sources and conversion pipeline.' },
  { id: 'owner-cases', label: 'Cases', href: '/cases', description: 'Case throughput across services.' },
  { id: 'owner-staff-performance', label: 'Staff Performance', href: '/staff-performance', description: 'Team output, overdue work, and collections.' },
  { id: 'owner-reports', label: 'Reports', href: '/reports', description: 'Reporting hub for all major business reports.' },
  { id: 'owner-settings', label: 'Settings', href: '/settings', description: 'Organization and account configuration.' },
];

const ownerRoutes = new Set(ownerLinks.map((item) => item.href));
const workerRoutes = new Set(workerLinks.map((item) => item.href));

export function getWorkspaceFromPathname(pathname: string): WorkspaceMode {
  if (ownerRoutes.has(pathname)) return 'owner';
  if (workerRoutes.has(pathname)) return 'worker';
  return pathname.startsWith('/owner') || pathname.startsWith('/revenue') || pathname.startsWith('/staff-performance') || pathname.startsWith('/reports')
    ? 'owner'
    : 'worker';
}

export function mapRouteForWorkspace(pathname: string, target: WorkspaceMode): string {
  const routeMap: Record<string, { worker: string; owner: string }> = {
    '/dashboard': { worker: '/dashboard', owner: '/owner-dashboard' },
    '/owner-dashboard': { worker: '/dashboard', owner: '/owner-dashboard' },
    '/revenue': { worker: '/dashboard', owner: '/revenue' },
    '/staff-performance': { worker: '/dashboard', owner: '/staff-performance' },
    '/reports': { worker: '/dashboard', owner: '/reports' },
    '/leads': { worker: '/leads', owner: '/leads' },
    '/cases': { worker: '/cases', owner: '/cases' },
    '/settings': { worker: '/settings', owner: '/settings' },
  };

  if (routeMap[pathname]) return routeMap[pathname][target];
  return target === 'owner' ? '/owner-dashboard' : '/dashboard';
}

export function getPageMeta(pathname: string) {
  const allLinks = [...ownerLinks, ...workerLinks];
  const active = allLinks.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));

  return {
    title: active?.label ?? 'ServiceFlow',
    description: active?.description ?? 'Workspace operations dashboard.',
  };
}
