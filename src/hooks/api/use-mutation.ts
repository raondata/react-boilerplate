import { useMutation } from 'react-query';
import useRequest from './use-request';
import { RequestHeaderType } from '@@types/request-types';

const useMyMutation = <T>(
  {
    type = 'get',
    url,
  }: {
    type?: 'get' | 'put' | 'post' | 'delete';
    url: string;
  },
  options?: { requestType?: RequestHeaderType }
) => {
  const requestFn = useRequest();
  const { mutateAsync, isLoading } = useMutation<
    T,
    string[],
    { [key: string]: any } | undefined,
    unknown
  >({
    // queryKey: [type, url, JSON.stringify(params)],
    // mutationKey: [type, url, JSON.stringify(params)],
    mutationKey: [url, type],
    mutationFn: async (params?: { [key: string]: any } | undefined) =>
      requestFn<T>({ url, params, type, requestType: options?.requestType }),
  });

  return { mutateAsync, isLoading };
};

export default useMyMutation;
