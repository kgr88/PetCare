import { useParams } from 'react-router-dom';
import AuthorizeView from '../../features/auth/AuthorizeView';
import { useQuery } from '@tanstack/react-query';

export default function AnimalDetails() {
  const { id } = useParams();
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['animal', id],
    queryFn: async () => {
      const res = await fetch(`/api/animals/${id}`);
      if (res.status === 404) {
        throw new Error('not found');
      }
      if (!res.ok) {
        throw new Error('error');
      }
      return res.json();
    },
    retry: false,
  });

  return (
    <AuthorizeView>
      {isLoading && <div>Loading...</div>}
      {isError && error instanceof Error && error.message === 'not found' && (
        <div>Not found</div>
      )}
      {isError && error instanceof Error && error.message !== 'not found' && (
        <div>Error: {error.message}</div>
      )}
      {data && <div>{JSON.stringify(data)}</div>}
    </AuthorizeView>
  );
}
