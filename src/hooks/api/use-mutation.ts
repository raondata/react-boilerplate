import { useMutation } from '@tanstack/react-query';
import useRequest from './use-request';
import { RequestHeaderType } from '@@types/request-types';
import { useState } from 'react';

type ParamType = { [key: string]: any } | void;

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
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync, mutate } = useMutation<T | undefined, Error, ParamType>({
    // queryKey: [type, url, JSON.stringify(params)],
    // mutationKey: [type, url, JSON.stringify(params)],
    mutationFn: async (params?: ParamType) => {
      setIsLoading(true);

      try {
        const result = await requestFn<T | undefined>({
          url,
          params: params || {},
          type,
          requestType: options?.requestType,
        });

        return result;
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
  });

  return { mutateAsync, mutate, isLoading };
};

export default useMyMutation;
