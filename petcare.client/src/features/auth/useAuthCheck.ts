import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

async function fetchAuth() {
  const res = await fetch('/pingauth');
  if (!res.ok) {
    throw new Error('Not authenticated');
  }
  return res.json();
}

export function useAuthRedirect(redirectPath: string = '/dashboard') {
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: fetchAuth,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      navigate(redirectPath, { replace: true });
    }
  }, [data, navigate, redirectPath]);

  return { error: error as Error | null, loading: isLoading };
}
