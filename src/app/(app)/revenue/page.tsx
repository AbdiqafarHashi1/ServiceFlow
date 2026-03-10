import { KpiCard, Panel, SparkBars, Table } from '@/components/ui';
import { byService, reportsData, revenueKpis, revenueTrend } from '@/lib/mock-data';

export default function RevenuePage() {
  return (
    <div className="space-y-4">
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {revenueKpis.map((kpi) => <KpiCard key={kpi.label} label={kpi.label} value={kpi.value} accent="orange" />)}
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Panel title="Revenue run-rate (daily trend)" className="xl:col-span-2">
          <SparkBars values={revenueTrend} tone="orange" />
        </Panel>
        <Panel title="Top services by revenue">
          <Table headers={['Service', 'Revenue']} rows={byService.map((service) => [service.name, service.amount])} />
        </Panel>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Panel title="Outstanding invoices">
          <Table headers={['Client', 'Amount', 'Overdue']} rows={reportsData.outstandingPayments.map((row) => [...row])} />
        </Panel>
        <Panel title="Collected payments (recent)">
          <Table
            headers={['Invoice', 'Client', 'Collected', 'Method']}
            rows={[
              ['INV-9031', 'Ahmed Hassan', '$780', 'Card'],
              ['INV-9038', 'Fatima Ali', '$1,250', 'Bank Transfer'],
              ['INV-9050', 'Northstar Tours', '$2,400', 'Wire'],
              ['INV-9052', 'Rahul Mehta', '$460', 'Cash'],
            ]}
          />
        </Panel>
      </section>
    </div>
  );
}
