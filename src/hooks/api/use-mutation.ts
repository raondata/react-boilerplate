import { useMutation } from 'react-query';
import useRequest from './use-request';
import { RequestHeaderType } from '@@types/request-types';

type Type = { [key: string]: any } | undefined;
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
  const { mutateAsync, isLoading } = useMutation<T, Error, Type>({
    // queryKey: [type, url, JSON.stringify(params)],
    // mutationKey: [type, url, JSON.stringify(params)],
    mutationFn: async (params) =>
      requestFn<T>({ url, params, type, requestType: options?.requestType }),
  });

  return { mutateAsync, isLoading };
};

export default useMyMutation;
