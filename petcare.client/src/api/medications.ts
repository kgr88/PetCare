import type { Medication, MedicationForm, MedicationLog } from '@/types';
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

export async function createMedication(
  medication: MedicationForm
): Promise<MedicationForm> {
  const res = await fetch('/api/medications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(medication),
  });
  if (!res.ok) {
    const error: Error & { status?: number } = new Error(
      'Failed to create medication'
    );
    error.status = res.status;
    throw error;
  }
  return res.json();
}

export async function getAnimalMeds(animalId: number): Promise<Medication[]> {
  const res = await fetch(`/api/medications/${animalId}`);
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
