import { useQuery } from '@tanstack/react-query';
import { getAnimalAppointments, getAppointments } from '@/api/appointments';
import type { Appointment } from '@/types';

export function useAppointments(singleAnimal: boolean, animalId?: number) {
  return useQuery<Appointment[], Error>({
    queryKey: ['appointments', { animalId, singleAnimal }],
    queryFn: singleAnimal
      ? () => getAnimalAppointments(animalId ?? 0)
      : () => getAppointments(),
    staleTime: 1000 * 60,
    retry: 1,
  });
}
