import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { KpiCard, MiniList, Panel, PriorityBadge, StatusBadge } from '@/components/ui';
import { workerCases, workerKpis, workerSecondary } from '@/lib/mock-data';

const actions = ['Call client', 'Add note', 'Upload document', 'Move status', 'Create invoice', 'Record payment'];

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (user.role !== 'staff') redirect('/owner-dashboard');

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-blue-400/20 bg-[#0b1735]/80 p-6">
        <h1 className="text-3xl font-semibold text-[#F8FAFC]">Good morning, {user.fullName}.</h1>
        <p className="mt-1 text-lg text-[#CBD5E1]">Here’s your daily visa and travel work queue.</p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {workerKpis.map((kpi) => <KpiCard key={kpi.label} label={kpi.label} value={kpi.value} accent="blue" />)}
      </section>

      <Panel title="Today's Cases">
        <div className="grid gap-3 md:hidden">
          {workerCases.map((row) => (
            <article key={row.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="flex items-center justify-between"><p className="font-semibold text-[#F8FAFC]">{row.client}</p><PriorityBadge value={row.priority} /></div>
              <p className="text-sm text-[#CBD5E1]">{row.service} · {row.destination_country}</p>
              <div className="mt-2 flex items-center justify-between"><StatusBadge value={row.status} /><span className="text-xs text-[#CBD5E1]">Due {row.dueDate}</span></div>
              <p className="mt-2 text-xs text-[#CBD5E1]">Days since contact: {row.daysSinceContact}</p>
              <p className="text-sm text-[#F8FAFC]">Outstanding {row.outstanding}</p>
              <div className="mt-2 flex flex-wrap gap-1">{actions.map((action) => <button key={action} className="rounded-md border border-blue-400/30 bg-blue-500/10 px-2 py-1 text-xs text-[#CBD5E1] hover:bg-blue-500/20">{action}</button>)}</div>
            </article>
          ))}
        </div>
        <div className="hidden overflow-x-auto md:block">
          <table className="min-w-[1100px] w-full text-base md:text-sm">
            <thead className="text-[#CBD5E1]">
              <tr>
                <th className="p-2 text-left">Client</th><th className="p-2 text-left">Service</th><th className="p-2 text-left">Status</th><th className="p-2 text-left">Priority</th><th className="p-2 text-left">Due date</th><th className="p-2 text-left">Days since contact</th><th className="p-2 text-left">Outstanding amount</th><th className="p-2 text-left">Quick actions</th>
              </tr>
            </thead>
            <tbody>
              {workerCases.map((row) => (
                <tr key={row.id} className="border-t border-white/10">
                  <td className="p-2 font-medium text-[#F8FAFC]">{row.client}</td>
                  <td className="p-2">{row.service}</td>
                  <td className="p-2"><StatusBadge value={row.status} /></td>
                  <td className="p-2"><PriorityBadge value={row.priority} /></td>
                  <td className="p-2">{row.dueDate}</td>
                  <td className="p-2">{row.daysSinceContact}</td>
                  <td className="p-2 text-[#F8FAFC]">{row.outstanding}</td>
                  <td className="p-2">
                    <div className="flex flex-wrap gap-1">
                      {actions.map((action) => <button key={action} className="rounded-md border border-blue-400/30 bg-blue-500/10 px-2 py-1 text-xs text-[#CBD5E1] hover:bg-blue-500/20">{action}</button>)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <Panel title="Upcoming Follow-ups"><MiniList items={workerSecondary.upcomingFollowUps} /></Panel>
        <Panel title="Urgent Visa Cases"><MiniList items={workerCases.filter((c) => c.priority === 'urgent' || c.service.includes('Visa')).slice(0, 3).map((c) => `${c.id} · ${c.client} · ${c.status}`)} /></Panel>
        <Panel title="Tasks Assigned To Me"><MiniList items={workerSecondary.tasksAssigned} /></Panel>
        <Panel title="Documents Waiting For Client"><MiniList items={workerSecondary.docsWaitingClient} /></Panel>
        <Panel title="Cases Awaiting Decision"><MiniList items={workerCases.filter((c) => c.status === 'under_review').map((c) => `${c.id} · ${c.client} · ${c.decision_date}`)} /></Panel>
        <Panel title="Pending Ticket Issuance"><MiniList items={workerCases.filter((c) => c.service === 'Flight Booking').map((c) => `${c.client} · ${c.travel_date}`)} /></Panel>
      </section>
    </div>
  );
}
