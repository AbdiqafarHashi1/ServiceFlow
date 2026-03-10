import { KpiCard, Panel, Table } from '@/components/ui';
import { staffPerformanceKpis, staffRanking } from '@/lib/mock-data';

export default function StaffPerformancePage() {
  return (
    <div className="space-y-4">
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {staffPerformanceKpis.map((kpi) => <KpiCard key={kpi.label} label={kpi.label} value={kpi.value} accent="orange" />)}
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Panel title="Staff ranking by completed work">
          <Table
            headers={['Staff', 'Cases Completed', 'Overdue Items', 'Payments Collected', 'Lead Conversion']}
            rows={staffRanking.map((row) => [...row])}
          />
        </Panel>
        <Panel title="Performance coaching queue">
          <Table
            headers={['Staff', 'Focus Area', 'Manager Action', 'Due']}
            rows={[
              ['Ravi Patel', 'Reduce overdue follow-ups', 'Daily review standup', 'This week'],
              ['Sarah Khan', 'Balance workload', 'Reassign 2 complex cases', 'Tomorrow'],
              ['Nadia Ibrahim', 'Upsell on high-value leads', 'Script refresher', 'Friday'],
            ]}
          />
        </Panel>
      </section>
    </div>
  );
}
