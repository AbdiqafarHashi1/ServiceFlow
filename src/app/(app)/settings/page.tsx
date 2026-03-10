import { Table, Card } from '@/components/ui';
export default function Page(){return <div className='space-y-4'><h2 className='text-2xl font-semibold'>Settings</h2><Card title='Workflow' value='Operational'/><Table headers={['Item','Status','Owner']} rows={[['Sample','active','team']]} /></div>;}
