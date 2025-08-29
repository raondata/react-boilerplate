import { ApiRequestType, RequestHeaderType } from '@@types/request-types';
import { createStandaloneToast } from '@chakra-ui/react';
import useToken from '@hooks/token';
import apiUtils from '@utils/api-utils';
import { useNavigate, useLocation } from 'react-router';
import { singleFlight } from '@utils/single-flight';
import { TOAST_IDS } from '@configs/toast-config';

const useRequest = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { accessToken: token, refreshFn, setRefreshRequest } = useToken();

  const { toast } = createStandaloneToast();

  const getRequestFn = (requestType?: RequestHeaderType) => {
    if (requestType === 'multipart') return apiUtils.multipartRequest;
    else if (requestType === 'login') return apiUtils.loginRequest;
    else return apiUtils.request;
  };

  const refreshTokenDeniedFn = () => {
    // 완전한 로그아웃 처리가 필요한 경우 (토큰 갱신 실패)

    // 로그인 페이지가 아닐 때만 토스트 표시
    if (pathname !== '/auth/login') {
      if (toast.isActive(TOAST_IDS.TOKEN_EXPIRED)) return;

      toast({
        id: TOAST_IDS.TOKEN_EXPIRED,
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
    } else {
      // 로그인 페이지에서는 바로 이동
      navigate('/auth/login');
    }
  };

  const executeRequest = async <T>({
    url,
    params,
    type = 'get',
    requestType = 'normal',
  }: ApiRequestType & { requestType?: RequestHeaderType }) => {
    try {
      const result = await getRequestFn(requestType)<T>({
        url,
        params,
        token,
        type,
      });

      return result.data;
    } catch (err) {
      if (err.status === 401 && requestType !== 'login') {
        try {
          // 토큰 갱신 시작을 알림
          setRefreshRequest(true);

          // Single-flight로 refresh 토큰 요청 중복 제거
          const refreshResult = await singleFlight.execute(
            'refresh-token',
            async () => {
              const result = await refreshFn();
              return result;
            }
          );

          // 토큰 갱신 성공 시 refreshRequest 상태 초기화
          setRefreshRequest(false);

          // 갱신된 토큰으로 재요청 (refreshResult에서 직접 사용)
          const result = await getRequestFn(requestType)<T>({
            url,
            params,
            token: refreshResult.accessToken,
            type,
          });

          return result.data;
        } catch (err2) {
          if (err2.status === 401) {
            setRefreshRequest(true);
            refreshTokenDeniedFn();
          } else {
            // 다른 에러인 경우 refreshRequest 초기화 (토큰 갱신 상태 해제)
            setRefreshRequest(false);
          }
          throw err2;
        }
      } else {
        // 401이 아닌 다른 에러 (404, 500 등)는 그대로 throw
        // refreshRequest 상태를 건드리지 않음 (화면 유지)
        setRefreshRequest(false);
        throw err;
      }
    }
  };

  return executeRequest;
};

export default useRequest;
