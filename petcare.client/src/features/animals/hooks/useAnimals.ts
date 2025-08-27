import { useQuery } from '@tanstack/react-query';
import { getAnimals, getAnimalDetails } from '@/api/animals';
import type { Animal } from '@/types';

export function useAnimals(singleAnimal: boolean, animalId?: number) {
  return useQuery<Animal[], Error>({
    queryKey: ['animals', { animalId, singleAnimal }],
    queryFn: singleAnimal
      ? () => getAnimalDetails(animalId ?? 0)
      : () => getAnimals(),
    staleTime: 1000 * 60,
    retry: 1,
  });
}
