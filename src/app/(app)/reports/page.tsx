import { Panel, Table } from '@/components/ui';
import { reportsData } from '@/lib/mock-data';

export default function ReportsPage() {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-white/10 bg-black/30 p-5 shadow-2xl backdrop-blur">
        <h2 className="text-2xl font-semibold text-[#F8FAFC]">Visa & Travel Reports</h2>
        <p className="text-[#CBD5E1]">Operational and financial performance for visa and travel agency workflows.</p>
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        <Panel title="Visa cases report"><Table headers={['Visa Service', 'Total Cases', 'Completed', 'Rejected']} rows={reportsData.visaCases.map((r) => [...r])} /></Panel>
        <Panel title="Travel bookings report"><Table headers={['Booking Service', 'Total Bookings', 'Completed', 'Cancelled']} rows={reportsData.travelBookings.map((r) => [...r])} /></Panel>
        <Panel title="Outstanding payments"><Table headers={['Client', 'Amount', 'Overdue']} rows={reportsData.outstandingPayments.map((r) => [...r])} /></Panel>
        <Panel title="Leads by source"><Table headers={['Source', 'Lead Share %']} rows={reportsData.leadsBySource.map((r) => [...r])} /></Panel>
        <Panel title="Service revenue"><Table headers={['Service', 'Revenue']} rows={reportsData.serviceRevenue.map((r) => [...r])} /></Panel>
        <Panel title="Staff performance"><Table headers={['Staff', 'Completed', 'Overdue']} rows={reportsData.staffPerformance.map((r) => [...r])} /></Panel>
      </div>

      <Panel title="Overdue follow-ups">
        <Table headers={['Client', 'Delay']} rows={reportsData.overdueFollowUps.map((r) => [...r])} />
      </Panel>
    </div>
  );
}
