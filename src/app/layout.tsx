import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'ServiceFlow', description: 'Operations-first CRM for service businesses' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className="bg-zinc-950 text-zinc-100">{children}</body></html>; }
