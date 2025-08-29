import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { MedicationForm } from '@/types';
import { createMedication } from '@/api/medications';

export function useCreateMedication() {
  const queryClient = useQueryClient();

  return useMutation<MedicationForm, Error, MedicationForm>({
    mutationFn: createMedication,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['medications'] }),
  });
}
