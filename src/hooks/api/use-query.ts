import useToken from '@hooks/token';
import apiUtils from '@utils/api-utils';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

const useMyQuery = <T>({
  type = 'get',
  url,
  params,
}: {
  type?: 'get' | 'put' | 'post' | 'delete';
  url: string;
  params?: { [key: string]: any };
}) => {
  const token = useToken();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: [type, url, JSON.stringify(params)],
    queryFn: async () => {
      if (type === 'get') {
        const result = await apiUtils.get<T>({
          url,
          params,
          token,
        });

        return result.data;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error, isError };
};

export default useMyQuery;
