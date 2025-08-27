import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AnimalForm } from '@/types';
import { createAnimal } from '@/api/animals';

export function useCreateAnimal() {
  const queryClient = useQueryClient();

  return useMutation<AnimalForm, Error, AnimalForm>({
    mutationFn: createAnimal,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['animals'] }),
  });
}
