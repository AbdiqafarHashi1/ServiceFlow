'use client';

import { useMemo, useState } from 'react';
import { PriorityBadge } from '@/components/ui';

type BoardCase = {
  id: string;
  client: string;
  service: string;
  priority: string;
  outstanding: string;
  dueDate: string;
  boardStatus: 'new' | 'in_progress' | 'waiting_client' | 'waiting_payment' | 'completed';
};

const columns: { key: BoardCase['boardStatus']; label: string }[] = [
  { key: 'new', label: 'New' },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'waiting_client', label: 'Waiting Client' },
  { key: 'waiting_payment', label: 'Waiting Payment' },
  { key: 'completed', label: 'Completed' },
];

export function CaseWorkflowBoard({ initialCases }: { initialCases: BoardCase[] }) {
  const [items, setItems] = useState(initialCases);

  const groups = useMemo(
    () => columns.map((col) => ({ ...col, items: items.filter((i) => i.boardStatus === col.key) })),
    [items],
  );

  const onDrop = (id: string, target: BoardCase['boardStatus']) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, boardStatus: target } : item)));
  };

  return (
    <div className="grid gap-3 xl:grid-cols-5">
      {groups.map((column) => (
        <div
          key={column.key}
          className="rounded-2xl border border-white/10 bg-black/20 p-3"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop(e.dataTransfer.getData('text/plain'), column.key)}
        >
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#F8FAFC]">{column.label}</h3>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-[#CBD5E1]">{column.items.length}</span>
          </div>
          <div className="space-y-2">
            {column.items.map((card) => (
              <article
                key={card.id}
                draggable
                onDragStart={(e) => e.dataTransfer.setData('text/plain', card.id)}
                className="cursor-move rounded-xl border border-white/10 bg-white/5 p-3 shadow-lg"
              >
                <p className="text-sm font-semibold text-[#F8FAFC]">{card.client}</p>
                <p className="text-xs text-[#CBD5E1]">{card.service}</p>
                <div className="mt-2 flex items-center justify-between">
                  <PriorityBadge value={card.priority} />
                  <span className="text-xs text-[#F8FAFC]">{card.outstanding}</span>
                </div>
                <p className="mt-2 text-xs text-[#CBD5E1]">Due: {card.dueDate}</p>
              </article>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
