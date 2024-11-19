import { ApiRequestType } from '@@types/request-types';
import { useToast, createStandaloneToast } from '@chakra-ui/react';
import useToken from '@hooks/token';
import apiUtils from '@utils/api-utils';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const useRequest = () => {
  const navigate = useNavigate();
  // const {
  //   accessToken: token,
  //   refreshFn,
  //   refreshRequest,
  //   setRefreshRequest,
  // } = useToken();
  const { toast } = createStandaloneToast();

  const refreshTokenDeniedFn = () => {
    toast({
      id: 'token-expired',
      position: 'top',
      isClosable: true,
      duration: null,
      status: 'error',
      title: '인증이 만료되었습니다.',
      description: '이 창을 닫으면 로그인 페이지로 이동합니다.',
      onCloseComplete: () => {
        navigate('/auth/login');
      },
    });
  };

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
        try {
          // const { access_token: newAccessToken } = await refreshFn();
          // const result = await apiUtils.request<T>({
          //   url,
          //   params,
          //   token: newAccessToken,
          //   type,
          // });
          // return result.data;
        } catch (err2) {
          // if (!refreshRequest && err2.status === 401) {
          //   setRefreshRequest(true);
          //   refreshTokenDeniedFn();
          // }
        }
      } else {
        console.log('@@@@', err);
        throw err;
      }
    }
  };

  return requestFn;
};

export default useRequest;
