import { ApiRequestType } from '@@types/request-types';
import { useToast } from '@chakra-ui/react';
import useToken from '@hooks/token';
import apiUtils from '@utils/api-utils';
import { useNavigate } from 'react-router';

const useRequest = () => {
  const navigate = useNavigate();
  const { accessToken: token } = useToken();
  const toast = useToast();
  const requestFn = async <T>({
    url,
    params,
    type = 'get',
  }: ApiRequestType) => {
    try {
      const result = await apiUtils.request<T>({
        url,
        params,
        // token,
        type,
      });

      return result.data;
    } catch (err) {
      if (err.status === 401) {
        toast({
          position: 'top',
          isClosable: true,
          duration: null,
          status: 'error',
          title: '인증이 만료되었습니다.',
          description: '로그인 페이지로 이동합니다.',
          onCloseComplete: () => {
            navigate('/auth/login');
          },
        });
      } else {
        throw err;
      }
    }
  };

  return requestFn;
};

export default useRequest;
