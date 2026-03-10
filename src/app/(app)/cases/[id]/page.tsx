import { MiniList, Panel, PriorityBadge, StatusBadge } from '@/components/ui';
import { caseTimeline, clients, documentChecklist, workerCases } from '@/lib/mock-data';

const docBadge: Record<string, string> = {
  pending: 'bg-amber-600 text-[#F8FAFC]',
  uploaded: 'bg-blue-700 text-[#F8FAFC]',
  verified: 'bg-emerald-700 text-[#F8FAFC]',
  rejected: 'bg-rose-700 text-[#F8FAFC]',
};

export default async function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = workerCases.find((c) => c.id === id) ?? workerCases[0];
  const client = clients.find((c) => c.fullName === item.client);

  return (
    <div className="space-y-4 pb-28">
      <section className="rounded-2xl border border-white/10 bg-black/30 p-5 shadow-2xl backdrop-blur">
        <h2 className="text-2xl font-semibold text-[#F8FAFC]">Case {item.id}</h2>
        <p className="text-[#CBD5E1]">{item.client} · {item.service}</p>
        <div className="mt-3 flex flex-wrap gap-2"><StatusBadge value={item.status} /><PriorityBadge value={item.priority} /><span className="rounded-full bg-blue-700 px-3 py-1 text-xs text-[#F8FAFC]">Destination {item.destination_country}</span><span className="rounded-full bg-amber-700 px-3 py-1 text-xs text-[#F8FAFC]">Outstanding {item.outstanding}</span></div>
      </section>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <Panel title="Case activity timeline">
          <div className="space-y-4">
            {caseTimeline.map((event, index) => (
              <div key={`${event.timestamp}-${index}`} className="relative border-l border-white/10 pl-5">
                <span className="absolute -left-3 top-0 rounded-full border border-white/10 bg-black/60 px-2 py-1 text-xs">{event.icon}</span>
                <p className="text-xs text-[#CBD5E1]">{event.timestamp} · {event.staff}</p>
                <p className="text-sm text-[#F8FAFC]">{event.description}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Client & travel identity">
          <MiniList items={[
            `Passport · ${client?.passport_number ?? 'N/A'}`,
            `Nationality · ${client?.nationality ?? 'N/A'}`,
            `DOB · ${client?.date_of_birth ?? 'N/A'}`,
            `Destination · ${item.destination_country}`,
            `Embassy/Consulate · ${item.embassy_or_consulate}`,
            `Travel date · ${item.travel_date}`,
            `Return date · ${item.return_date}`,
            `Submission date · ${item.submission_date}`,
            `Decision date · ${item.decision_date}`,
            `Assigned staff · ${item.assigned_staff}`,
          ]}
          />
        </Panel>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Panel title="Document checklist">
          <div className="space-y-2">
            {documentChecklist.map((doc) => (
              <div key={doc.name} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                <span>{doc.name}</span>
                <span className={`rounded-full px-2 py-1 text-xs font-semibold ${docBadge[doc.status]}`}>{doc.status}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Notes & invoice/payment summary">
          <MiniList items={[
            `Case notes · ${item.notes}`,
            'Invoice amount · $1,200',
            'Paid amount · $420',
            'Balance due · $780',
            'Last payment · 2026-03-10 via Card',
          ]}
          />
        </Panel>
      </div>

      <div className="fixed bottom-4 right-4 z-30 w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-blue-400/30 bg-[#0b1735]/90 p-4 shadow-2xl backdrop-blur">
        <p className="mb-2 text-sm font-semibold text-[#CBD5E1]">Quick actions</p>
        <div className="grid grid-cols-2 gap-2">
          {['Add Note', 'Create Invoice', 'Record Payment', 'Upload Document'].map((action) => (
            <button key={action} className="rounded-lg border border-blue-300/30 bg-blue-500/10 px-3 py-2 text-xs font-medium text-[#F8FAFC] hover:bg-blue-500/20">{action}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
