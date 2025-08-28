import { createContext, ReactNode, useEffect, useState } from 'react';
import TokenContext from './token-context';
import { useQuery } from '@hooks/api';
import useToken from '@hooks/token';
import { Center, Flex, Text } from '@chakra-ui/react';
import { H3 } from '@components/texts';
import apiUtils from '@utils/api-utils';
import { CustomerType } from '@@types/field-types';
import { TokenResponseType } from '@@types/response-types';
import { useAtom } from 'jotai';
import { accessTokenAtom, refreshTokenAtom } from '@atoms/global-atom';
import { useLocation, useNavigate } from 'react-router';

const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [refreshToken, setRefreshToken] = useAtom(refreshTokenAtom);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const getMe = useQuery<{ [key: string]: any }>(
    {
      type: 'get',
      url: '/me',
    },
    {
      disabled: !accessToken, // 토큰이 없으면 요청하지 않음
    }
  );

  useEffect(() => {
    if (accessToken) {
      getMe.refetch();
    }
  }, [accessToken, pathname]);

  // 토큰이 없으면 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!accessToken) {
      navigate('/auth/login');
    }
  }, [accessToken, navigate]);

  // API 에러 시 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (getMe.isError) {
      navigate('/auth/login');
    }
  }, [getMe.isError, navigate]);

  // 토큰이 없으면 아무것도 렌더링하지 않음 (리다이렉트 처리 중)
  if (!accessToken) {
    return null;
  }

  return (
    <TokenContext.Provider value={{ accessToken, userInfo: getMe.data || {} }}>
      {getMe.isLoading && (
        <Center w="full" h="100vh">
          <H3>불러오는 중입니다...</H3>
        </Center>
      )}
      {getMe.data && !getMe.isLoading && <>{children}</>}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
