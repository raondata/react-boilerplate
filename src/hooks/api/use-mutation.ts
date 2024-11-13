import { useMutation } from 'react-query';
import useRequest from './use-request';

const useMyMutation = <T>({
  type = 'get',
  url,
}: {
  type?: 'get' | 'put' | 'post' | 'delete';
  url: string;
}) => {
  const requestFn = useRequest();
  const { mutateAsync, isLoading } = useMutation<
    T,
    string[],
    { [key: string]: string } | undefined,
    unknown
  >({
    // queryKey: [type, url, JSON.stringify(params)],
    // mutationKey: [type, url, JSON.stringify(params)],
    mutationKey: [url, type],
    mutationFn: async (params) => requestFn<T>({ url, params, type }),
  });

  return { mutateAsync, isLoading };
};

export default useMyMutation;
