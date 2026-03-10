import { Panel, Table } from '@/components/ui';
import { servicesCatalog } from '@/lib/mock-data';

export default function ServicesPage() {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-white/10 bg-black/30 p-5 shadow-2xl backdrop-blur">
        <h2 className="text-2xl font-semibold text-[#F8FAFC]">Visa & Travel Services</h2>
        <p className="text-[#CBD5E1]">Configured offerings for visa processing and travel operations.</p>
      </section>
      <Panel title="Service catalog">
        <Table
          headers={['Service Name', 'Category']}
          rows={servicesCatalog.map((s) => [s, s.includes('Visa') ? 'Visa Processing' : 'Travel Services'])}
        />
      </Panel>
    </div>
  );
}
