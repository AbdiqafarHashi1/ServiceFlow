import { ReactNode } from 'react';

const statusStyles: Record<string, string> = {
  new: 'bg-blue-700 text-[#F8FAFC]',
  documents_pending: 'bg-amber-600 text-[#F8FAFC]',
  application_prepared: 'bg-cyan-700 text-[#F8FAFC]',
  submitted: 'bg-indigo-700 text-[#F8FAFC]',
  under_review: 'bg-violet-700 text-[#F8FAFC]',
  approved: 'bg-emerald-700 text-[#F8FAFC]',
  rejected: 'bg-rose-700 text-[#F8FAFC]',
  passport_ready: 'bg-sky-700 text-[#F8FAFC]',
  inquiry: 'bg-blue-700 text-[#F8FAFC]',
  quoted: 'bg-orange-600 text-[#F8FAFC]',
  reserved: 'bg-cyan-700 text-[#F8FAFC]',
  ticketed: 'bg-indigo-700 text-[#F8FAFC]',
  issued: 'bg-emerald-700 text-[#F8FAFC]',
  cancelled: 'bg-slate-700 text-[#F8FAFC]',
  completed: 'bg-emerald-700 text-[#F8FAFC]',
  contacted: 'bg-cyan-700 text-[#F8FAFC]',
  waiting_client: 'bg-amber-600 text-[#F8FAFC]',
  invoice_sent: 'bg-sky-700 text-[#F8FAFC]',
  payment_pending: 'bg-orange-600 text-[#F8FAFC]',
  in_progress: 'bg-cyan-700 text-[#F8FAFC]',
  waiting_response: 'bg-amber-700 text-[#F8FAFC]',
  lost: 'bg-rose-700 text-[#F8FAFC]',
};

const priorityStyles: Record<string, string> = {
  low: 'bg-slate-700 text-[#F8FAFC]',
  medium: 'bg-blue-700 text-[#F8FAFC]',
  high: 'bg-orange-700 text-[#F8FAFC]',
  urgent: 'bg-red-700 text-[#F8FAFC]',
};

export function StatusBadge({ value }: { value: string }) {
  return <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusStyles[value] ?? 'bg-slate-700 text-[#F8FAFC]'}`}>{value.replace('_', ' ')}</span>;
}

export function PriorityBadge({ value }: { value: string }) {
  return <span className={`rounded-full px-2 py-1 text-xs font-semibold uppercase tracking-wide ${priorityStyles[value] ?? 'bg-slate-700 text-[#F8FAFC]'}`}>{value}</span>;
}

export function Panel({ title, children, className = '' }: { title: string; children: ReactNode; className?: string }) {
  return <section className={`rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-xl backdrop-blur-xl ${className}`}><h3 className="mb-3 text-sm font-semibold text-[#CBD5E1]">{title}</h3>{children}</section>;
}

export function KpiCard({ label, value, accent }: { label: string; value: string | number; accent: 'blue' | 'orange' }) {
  const styles = accent === 'blue' ? 'from-blue-500/15 to-cyan-500/5 text-[#F8FAFC]' : 'from-orange-500/20 to-amber-500/5 text-[#F8FAFC]';
  return <div className={`rounded-xl border border-white/10 bg-gradient-to-br ${styles} p-4 shadow-xl backdrop-blur-xl`}><p className="text-xs text-[#CBD5E1]">{label}</p><p className="mt-2 text-2xl font-bold">{value}</p></div>;
}

export function MiniList({ items }: { items: string[] }) {
  return <ul className="space-y-2 text-sm text-[#CBD5E1]">{items.map((item) => <li key={item} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">{item}</li>)}</ul>;
}

export function SparkBars({ values, tone }: { values: number[]; tone: 'blue' | 'orange' }) {
  const bar = tone === 'blue' ? 'bg-gradient-to-t from-cyan-500 to-blue-400' : 'bg-gradient-to-t from-amber-500 to-orange-400';
  return <div className="flex h-32 items-end gap-2">{values.map((v, i) => <div key={i} className={`w-full rounded-t ${bar}`} style={{ height: `${v}%` }} />)}</div>;
}


export function Card({ title, value }: { title: string; value: string }) {
  return <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 shadow-lg backdrop-blur"><p className="text-xs text-[#CBD5E1]">{title}</p><p className="mt-1 text-xl font-semibold text-[#F8FAFC]">{value}</p></div>;
}

export function Table({ headers, rows }: { headers: string[]; rows: (string | number)[][] }) {
  return <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/[0.03] shadow-lg backdrop-blur"><table className="min-w-full text-base md:text-sm"><thead><tr>{headers.map((h) => <th key={h} className="p-2 text-left text-[#CBD5E1]">{h}</th>)}</tr></thead><tbody>{rows.map((r, i) => <tr key={i} className="border-t border-white/10">{r.map((c, j) => <td key={j} className="p-2">{c}</td>)}</tr>)}</tbody></table></div>;
}
