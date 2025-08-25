import type { Medication } from '@/types';
export async function getMedications(): Promise<Medication[]> {
  const res = await fetch('/api/medications');
  if (!res.ok) {
    const error = new Error('Failed to fetch medications') as Error & {
      status?: number;
    };
    error.status = res.status;
    throw error;
  }
  return res.json();
}
