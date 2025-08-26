import type { Medication, MedicationLog } from '@/types';
export async function getMedications(): Promise<Medication[]> {
  const res = await fetch('/api/medications');
  if (!res.ok) {
    const error: Error & { status?: number } = new Error(
      'Failed to fetch medications'
    );
    error.status = res.status;
    throw error;
  }
  return res.json();
}

export async function createMedLog(log: MedicationLog): Promise<MedicationLog> {
  const res = await fetch('/api/medicationlogs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(log),
  });
  if (!res.ok) {
    const error: Error & { status?: number } = new Error(
      'Failed to create medication log'
    );
    error.status = res.status;
    throw error;
  }
  return res.json();
}
