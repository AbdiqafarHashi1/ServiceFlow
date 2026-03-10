import { CaseWorkflowBoard } from '@/components/case-workflow-board';
import { PriorityBadge, StatusBadge } from '@/components/ui';
import { workerCases } from '@/lib/mock-data';

export default function CasesPage() {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-white/10 bg-black/30 p-5 shadow-2xl backdrop-blur">
        <h2 className="text-2xl font-semibold text-[#F8FAFC]">Case Workflow Board</h2>
        <p className="text-sm text-[#CBD5E1]">Drag and drop cases across New, In Progress, Waiting Client, Waiting Payment, and Completed.</p>
      </section>

      <CaseWorkflowBoard initialCases={[...workerCases]} />

      <section className="rounded-2xl border border-white/10 bg-[#0b1020]/70 p-4 shadow-2xl backdrop-blur">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#CBD5E1]">Case list</h3>
        <div className="grid gap-3 md:hidden">
          {workerCases.map((c) => (
            <article key={c.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-[#F8FAFC]">{c.id} · {c.client}</p>
                <PriorityBadge value={c.priority} />
              </div>
              <p className="mt-1 text-sm text-[#CBD5E1]">{c.service}</p>
              <div className="mt-2 flex items-center justify-between">
                <StatusBadge value={c.status} />
                <span className="text-xs text-[#CBD5E1]">Due {c.dueDate}</span>
              </div>
              <p className="mt-2 text-sm text-[#F8FAFC]">Outstanding {c.outstanding}</p>
            </article>
          ))}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="min-w-[980px] w-full text-base md:text-sm">
            <thead className="text-[#CBD5E1]">
              <tr>
                <th className="p-2 text-left">Case</th><th className="p-2 text-left">Client</th><th className="p-2 text-left">Service</th><th className="p-2 text-left">Status</th><th className="p-2 text-left">Priority</th><th className="p-2 text-left">Due Date</th><th className="p-2 text-left">Days Since Contact</th><th className="p-2 text-left">Outstanding</th>
              </tr>
            </thead>
            <tbody>
              {workerCases.map((c) => (
                <tr key={c.id} className="border-t border-white/10">
                  <td className="p-2 font-medium text-[#F8FAFC]">{c.id}</td>
                  <td className="p-2">{c.client}</td>
                  <td className="p-2">{c.service}</td>
                  <td className="p-2"><StatusBadge value={c.status} /></td>
                  <td className="p-2"><PriorityBadge value={c.priority} /></td>
                  <td className="p-2">{c.dueDate}</td>
                  <td className="p-2">{c.daysSinceContact}</td>
                  <td className="p-2 text-[#F8FAFC]">{c.outstanding}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
