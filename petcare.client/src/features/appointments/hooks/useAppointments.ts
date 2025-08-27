import { useQuery } from '@tanstack/react-query';
import { getAppointments } from '@/api/appointments';
import type { Appointment } from '@/types';

export function useAppointments() {
  return useQuery<Appointment[], Error>({
    queryKey: ['appointments'],
    queryFn: getAppointments,
    staleTime: 1000 * 60,
    retry: 1,
  });
}
