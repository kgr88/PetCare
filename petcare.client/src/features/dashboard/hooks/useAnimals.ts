import { useQuery } from '@tanstack/react-query';
import { getAnimals } from '@/api/animals';
import type { Animal } from '@/types';

export function useAnimals() {
  return useQuery<Animal[], Error>({
    queryKey: ['animals'],
    queryFn: getAnimals,
    staleTime: 1000 * 60,
    retry: 1,
  });
}
