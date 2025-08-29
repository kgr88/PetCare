import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createWeightLog } from '@/api/weightLogs';
import type { WeightLog } from '@/types';

export function useCreateWeightLog() {
  const queryClient = useQueryClient();

  return useMutation<WeightLog, Error, WeightLog>({
    mutationFn: createWeightLog,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['weightLogs'] }),
  });
}
