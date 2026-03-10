import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { KpiCard, MiniList, Panel, SparkBars, StatusBadge } from '@/components/ui';
import {
  byService,
  bySource,
  leadSourceRoi,
  ownerKpis,
  pipelineFunnel,
  profitabilityBars,
  recentActivity,
  revenueTrend,
  staffPerformance,
  workerCases,
  workloadHeat,
} from '@/lib/mock-data';

export default async function OwnerDashboardPage() {
  const user = await getCurrentUser();
  if (user.role === 'staff') redirect('/dashboard');

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-orange-400/20 bg-[#2b140a]/80 p-6 shadow-2xl backdrop-blur">
        <h1 className="text-3xl font-semibold text-[#F8FAFC]">Good morning {user.fullName}.</h1>
        <p className="mt-1 text-lg text-[#CBD5E1]">Here’s your visa and travel business snapshot.</p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {ownerKpis.map((kpi) => <KpiCard key={kpi.label} label={kpi.label} value={kpi.value} accent="orange" />)}
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Panel title="Revenue Today/Week/Month" className="xl:col-span-2"><SparkBars values={revenueTrend} tone="orange" /></Panel>
        <Panel title="Lead Conversion Funnel"><SparkBars values={pipelineFunnel} tone="orange" /></Panel>
      </section>

      <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <Panel title="Service profitability (Revenue vs cost)"><SparkBars values={profitabilityBars} tone="orange" /></Panel>
        <Panel title="Staff workload heatmap">
          <div className="grid grid-cols-3 gap-2">
            {workloadHeat.map((value, i) => (
              <div key={i} className="rounded-lg bg-orange-500/10 p-3 text-center">
                <p className="text-xs text-[#CBD5E1]">Staff {i + 1}</p>
                <p className="text-lg font-semibold text-[#F8FAFC]">{value}</p>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Lead source ROI"><SparkBars values={leadSourceRoi} tone="orange" /></Panel>
      </section>

      <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        <Panel title="Cases by status">
          <div className="space-y-2">
            {['documents_pending', 'under_review', 'ticketed', 'quoted', 'completed'].map((s) => (
              <div key={s} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                <StatusBadge value={s} />
                <span>{workerCases.filter((c) => c.status === s).length}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Revenue by service"><MiniList items={byService.map((x) => `${x.name} · ${x.amount}`)} /></Panel>
        <Panel title="Leads by source"><MiniList items={bySource.map((x) => `${x.name} · ${x.value}`)} /></Panel>
        <Panel title="Recent activity timeline"><MiniList items={recentActivity} /></Panel>
      </section>

      <Panel title="Staff performance & overdue follow-ups">
        <div className="overflow-x-auto">
          <table className="min-w-[600px] w-full text-base md:text-sm">
            <thead className="text-[#CBD5E1]"><tr><th className="p-2 text-left">Staff</th><th className="p-2 text-left">Completed Cases</th><th className="p-2 text-left">Overdue Items</th><th className="p-2 text-left">Health</th></tr></thead>
            <tbody>
              {staffPerformance.map((row) => (
                <tr key={row.name} className="border-t border-white/10">
                  <td className="p-2 text-[#F8FAFC]">{row.name}</td>
                  <td className="p-2 text-[#F8FAFC]">{row.completed}</td>
                  <td className="p-2 text-[#F8FAFC]">{row.overdue}</td>
                  <td className="p-2">{row.overdue > 4 ? 'Needs support' : 'Healthy'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
