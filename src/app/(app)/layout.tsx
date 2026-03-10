import { getCurrentUser } from '@/lib/auth';
import { AppShell } from '@/components/app-shell';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  const isOwnerView = user.role !== 'staff';

  const workerLinks: [string, string][] = [
    ['Dashboard', '/dashboard'],
    ['Leads', '/leads'],
    ['Cases', '/cases'],
    ['Tasks', '/tasks'],
    ['Invoices', '/invoices'],
    ['Payments', '/payments'],
    ['Documents', '/cases'],
  ];

  const ownerLinks: [string, string][] = [
    ['Owner Dashboard', '/owner-dashboard'],
    ['Revenue', '/reports'],
    ['Leads', '/leads'],
    ['Cases', '/cases'],
    ['Staff Performance', '/reports'],
    ['Reports', '/reports'],
    ['Settings', '/settings'],
  ];

  return (
    <AppShell fullName={user.fullName} role={user.role} isOwnerView={isOwnerView} links={isOwnerView ? ownerLinks : workerLinks}>
      {children}
    </AppShell>
  );
}
