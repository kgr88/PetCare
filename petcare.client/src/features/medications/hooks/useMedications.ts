import { useQuery } from '@tanstack/react-query';
import { getAnimalMeds, getMedications } from '@/api/medications';
import type { Medication } from '@/types';

export function useMedications(singleAnimal: boolean, animalId?: number) {
  return useQuery<Medication[], Error>({
    queryKey: ['medications', { animalId, singleAnimal }],
    queryFn: singleAnimal
      ? () => getAnimalMeds(animalId ?? 0)
      : () => getMedications(),
    staleTime: 1000 * 60,
    retry: 1,
  });
}
