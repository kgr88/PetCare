import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadPhoto } from '@/api/images';

export function useUploadPhoto(animalId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadPhoto(file, animalId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['animals', { animalId, singleAnimal: true }],
      });
      queryClient.invalidateQueries({
        queryKey: ['animals'],
      });
    },
  });
}
