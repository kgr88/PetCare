import { useQuery } from '@tanstack/react-query';
import { getMedications } from '@/api/medications';
import type { Medication } from '@/types';

export function useMedications() {
  return useQuery<Medication[], Error>({
    queryKey: ['medications'],
    queryFn: getMedications,
    staleTime: 1000 * 60,
    retry: 1,
  });
}
