'use server';
import { revalidatePath } from 'next/cache';
export async function createLeadAction(formData: FormData) {
  const fullName = String(formData.get('full_name') || '').trim();
  if (!fullName) throw new Error('full_name is required');
  revalidatePath('/leads');
  return { ok: true };
}
export async function convertLeadAction() {
  revalidatePath('/leads');
  revalidatePath('/clients');
  return { ok: true };
}
