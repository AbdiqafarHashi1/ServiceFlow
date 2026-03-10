import { getCurrentUser } from '@/lib/auth';
import { AppShell } from '@/components/app-shell';
import { ownerLinks, workerLinks } from '@/lib/navigation';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return (
    <AppShell fullName={user.fullName} role={user.role} workerLinks={workerLinks} ownerLinks={ownerLinks}>
      {children}
    </AppShell>
  );
}
