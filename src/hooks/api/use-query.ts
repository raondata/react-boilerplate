import { useQuery } from '@tanstack/react-query';
import useRequest from './use-request';
import formatUtils from '@utils/format-utils';

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

  const {
    data,
    isLoading,
    error,
    isError,
    refetch,
    isFetching,
    dataUpdatedAt,
  } = useQuery({
    queryKey: [type, url, JSON.stringify(params)],
    queryFn: async () =>
      requestFn<T>({
        url,
        type,
        params: params ? formatUtils.camelToSnakeObjectKey(params) : {},
      }),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: options?.disabled !== true,
  });

  return {
    data,
    isLoading,
    error,
    isError,
    refetch,
    isFetching,
    dataUpdatedAt,
  };
};

export default useMyQuery;
