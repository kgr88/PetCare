import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AppointmentForm } from '@/types';
import { createAppointment } from '@/api/appointments';

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation<AppointmentForm, Error, AppointmentForm>({
    mutationFn: createAppointment,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['appointments'] }),
  });
}
