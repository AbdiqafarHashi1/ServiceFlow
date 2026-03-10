import { Panel, StatusBadge, Table } from '@/components/ui';
import { leads, servicesCatalog } from '@/lib/mock-data';

export default function LeadsPage() {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-white/10 bg-black/30 p-5 shadow-2xl backdrop-blur">
        <h2 className="text-2xl font-semibold text-[#F8FAFC]">Visa & Travel Leads</h2>
        <p className="text-[#CBD5E1]">Track intake from consultation to converted visa/travel clients.</p>
      </section>

      <Panel title="Popular agency services">
        <div className="flex flex-wrap gap-2">
          {servicesCatalog.map((s) => <span key={s} className="rounded-full bg-blue-700 px-3 py-1 text-xs font-semibold text-[#F8FAFC]">{s}</span>)}
        </div>
      </Panel>

      <Panel title="Lead pipeline">
        <div className="grid gap-3 md:hidden">
          {leads.map((lead) => (
            <article key={lead.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="font-semibold">{lead.name}</p>
              <p className="text-sm text-[#CBD5E1]">{lead.service}</p>
              <div className="mt-2 flex items-center justify-between">
                <StatusBadge value={lead.status} />
                <span className="text-xs">{lead.source}</span>
              </div>
              <p className="mt-1 text-xs text-[#CBD5E1]">Follow-up: {lead.followUp}</p>
            </article>
          ))}
        </div>

        <div className="hidden md:block">
          <Table
            headers={['Lead ID', 'Name', 'Source', 'Service', 'Status', 'Follow-up', 'Owner']}
            rows={leads.map((lead) => [lead.id, lead.name, lead.source, lead.service, lead.status, lead.followUp, lead.owner])}
          />
        </div>
      </Panel>
    </div>
  );
}
