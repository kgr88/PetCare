import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAppointment } from '@/api/appointments';
import { deleteMedication } from '@/api/medications';

type EntityType = 'appointments' | 'medications';

interface UseDeleteOptions {
  entityType: EntityType;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useDelete({
  entityType,
  onSuccess,
  onError,
}: UseDeleteOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      entityType == 'appointments'
        ? deleteAppointment(id)
        : deleteMedication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [entityType] });
      onSuccess?.();
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });
}
