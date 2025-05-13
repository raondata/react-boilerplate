import { useQuery } from '@tanstack/react-query';
import useRequest from './use-request';

const useMyQuery = <T>(
  {
    type = 'get',
    url,
    params,
  }: {
    type?: 'get' | 'put' | 'post' | 'delete';
    url: string;
    params?: { [key: string]: any };
  },
  options?: { disabled?: boolean }
) => {
  const requestFn = useRequest();

  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: [type, url, JSON.stringify(params)],
    queryFn: async () => requestFn<T>({ url, type, params }),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: options?.disabled !== true,
  });

  return { data, isLoading, error, isError, refetch };
};

export default useMyQuery;
