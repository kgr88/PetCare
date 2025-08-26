import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMedLog } from '@/api/medications';
import type { MedicationLog } from '@/types';

export function useCreateMedLog() {
  const queryClient = useQueryClient();

  return useMutation<MedicationLog, Error, MedicationLog>({
    mutationFn: createMedLog,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['medications'] }),
  });
}
