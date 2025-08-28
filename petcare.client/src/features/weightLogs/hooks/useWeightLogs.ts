import { useQuery } from '@tanstack/react-query';
import { getWeightLogs } from '@/api/weightLogs';
import type { WeightLog } from '@/types';

export function useWeightLogs(animalId: number) {
  return useQuery<WeightLog[], Error>({
    queryKey: ['weightLogs'],
    queryFn: () => getWeightLogs(animalId),
    staleTime: 1000 * 60,
    retry: 1,
    refetchOnMount: 'always',
  });
}
