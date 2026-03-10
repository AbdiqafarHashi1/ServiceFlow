import Link from 'next/link';
import { Panel, Table } from '@/components/ui';
import { reportsData } from '@/lib/mock-data';

const reportSections = [
  { title: 'Visa Cases Report', href: '/reports#visa-cases', description: 'Completion and rejection rates for visa processing services.' },
  { title: 'Travel Bookings Report', href: '/reports#travel-bookings', description: 'Bookings completed versus cancellations by service line.' },
  { title: 'Outstanding Payments', href: '/reports#outstanding-payments', description: 'Aging balances and overdue receivables by client.' },
  { title: 'Leads by Source', href: '/reports#leads-by-source', description: 'Lead mix and channel contribution to pipeline.' },
  { title: 'Service Revenue', href: '/reports#service-revenue', description: 'Revenue totals by visa and travel service category.' },
  { title: 'Overdue Follow-ups', href: '/reports#overdue-followups', description: 'Daily follow-up exceptions needing manager action.' },
];

export default function ReportsPage() {
  return (
    <div className="space-y-4">
      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {reportSections.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className="rounded-2xl border border-white/10 bg-black/30 p-4 transition hover:border-cyan-300/40 hover:bg-white/10"
          >
            <p className="text-lg font-semibold text-[#F8FAFC]">{section.title}</p>
            <p className="mt-1 text-sm text-[#CBD5E1]">{section.description}</p>
          </Link>
        ))}
      </section>

      <Panel title="Reports quick preview">
        <Table
          headers={['Report', 'Last Updated', 'Owner']}
          rows={[
            ['Visa Cases', 'Today 09:10', 'Operations Manager'],
            ['Travel Bookings', 'Today 08:42', 'Travel Supervisor'],
            ['Outstanding Payments', 'Today 10:20', 'Finance Team'],
            ['Leads by Source', 'Yesterday 18:05', 'Marketing Lead'],
            ['Service Revenue', 'Today 09:00', 'Finance Team'],
            ['Overdue Follow-ups', 'Today 10:15', 'Team Leads'],
          ]}
        />
      </Panel>

      <section className="grid gap-4 xl:grid-cols-2">
        <Panel title="Visa cases report" className="scroll-mt-24" ><div id="visa-cases"><Table headers={['Visa Service', 'Total Cases', 'Completed', 'Rejected']} rows={reportsData.visaCases.map((r) => [...r])} /></div></Panel>
        <Panel title="Travel bookings report" className="scroll-mt-24" ><div id="travel-bookings"><Table headers={['Booking Service', 'Total Bookings', 'Completed', 'Cancelled']} rows={reportsData.travelBookings.map((r) => [...r])} /></div></Panel>
        <Panel title="Outstanding payments" className="scroll-mt-24" ><div id="outstanding-payments"><Table headers={['Client', 'Amount', 'Overdue']} rows={reportsData.outstandingPayments.map((r) => [...r])} /></div></Panel>
        <Panel title="Leads by source" className="scroll-mt-24" ><div id="leads-by-source"><Table headers={['Source', 'Lead Share %']} rows={reportsData.leadsBySource.map((r) => [...r])} /></div></Panel>
        <Panel title="Service revenue" className="scroll-mt-24" ><div id="service-revenue"><Table headers={['Service', 'Revenue']} rows={reportsData.serviceRevenue.map((r) => [...r])} /></div></Panel>
        <Panel title="Overdue follow-ups" className="scroll-mt-24" ><div id="overdue-followups"><Table headers={['Client', 'Delay']} rows={reportsData.overdueFollowUps.map((r) => [...r])} /></div></Panel>
      </section>
    </div>
  );
}
