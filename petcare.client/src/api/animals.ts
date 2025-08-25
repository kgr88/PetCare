import type { Animal } from '@/types';
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
