import type { WeightLog } from '@/types';

export async function getWeightLogs(animalId: number): Promise<WeightLog[]> {
  const res = await fetch(`/api/weightlogs/${animalId}`);
  if (!res.ok) {
    const error = new Error('Failed to fetch weight logs') as Error & {
      status?: number;
    };
    error.status = res.status;
    throw error;
  }
  return res.json();
}

// export async function createAnimal(animal: AnimalForm): Promise<AnimalForm> {
//   const res = await fetch('/api/animals', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(animal),
//   });
//   if (!res.ok) {
//     const error: Error & { status?: number } = new Error(
//       'Failed to add animal'
//     );
//     error.status = res.status;
//     throw error;
//   }
//   return res.json();
// }
