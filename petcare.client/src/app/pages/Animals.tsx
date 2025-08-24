import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AuthorizeView from '../../features/auth/AuthorizeView';
import AddAnimal from '../../features/animals/AddAnimal';
import type { Animal, FormData } from '../../types';

export default function Animals() {
  const queryClient = useQueryClient();
  const { data, error, isError, isLoading } = useQuery<Animal[]>({
    queryKey: ['animals'],
    queryFn: () => fetch('/api/animals').then((res) => res.json()),
  });

  const handleSubmit = (payload: Omit<Animal, 'id'>) => {
    return fetch('/api/animals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  };

  const mutation = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['animals'] });
    },
  });

  //validate form to handle nullable types in database
  const validateForm = (formData: FormData) => {
    const payload: Omit<Animal, 'id'> = {
      name: formData.name,
      species: formData.species,
      breed: formData.breed === '' ? undefined : formData.breed,
      dateOfBirth:
        formData.dateOfBirth === '' ? undefined : formData.dateOfBirth,
      microchipId:
        formData.microchipId === '' ? undefined : formData.microchipId,
    };
    mutation.mutate(payload);
  };

  return (
    <AuthorizeView>
      {isLoading && <div>Loading...</div>}
      {isError && <div>{error.message}</div>}
      {mutation.isError && (
        <div style={{ color: 'red' }}>
          {mutation.error instanceof Error
            ? mutation.error.message
            : 'An error occurred'}
        </div>
      )}
      {data &&
        data.map((animal) => (
          <div key={animal.id}>
            {animal.name} ({animal.species})
          </div>
        ))}
      <br />
      <AddAnimal validateForm={validateForm} />
    </AuthorizeView>
  );
}
