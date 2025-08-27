import type { Animal, AnimalForm } from '@/types';
export async function getAnimals(): Promise<Animal[]> {
  const res = await fetch('/api/animals');
  if (!res.ok) {
    const error = new Error('Failed to fetch animals') as Error & {
      status?: number;
    };
    error.status = res.status;
    throw error;
  }
  return res.json();
}

export async function getAnimalDetails(animalId: number): Promise<Animal[]> {
  const res = await fetch(`/api/animals/${animalId}`);
  if (!res.ok) {
    const error = new Error('Failed to fetch animal') as Error & {
      status?: number;
    };
    error.status = res.status;
    throw error;
  }
  return res.json();
}

export async function createAnimal(animal: AnimalForm): Promise<AnimalForm> {
  const res = await fetch('/api/animals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(animal),
  });
  if (!res.ok) {
    const error: Error & { status?: number } = new Error(
      'Failed to add animal'
    );
    error.status = res.status;
    throw error;
  }
  return res.json();
}
