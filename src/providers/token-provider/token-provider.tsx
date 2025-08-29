import { createContext, ReactNode, useEffect, useState } from 'react';
import TokenContext from './token-context';
import { Center, Flex, Text } from '@chakra-ui/react';
import { H3 } from '@components/texts';
import apiUtils from '@utils/api-utils';
import { CustomerType } from '@@types/field-types';
import { TokenResponseType } from '@@types/response-types';
import { useAtom } from 'jotai';
import {
  accessTokenAtom,
  refreshTokenAtom,
  refreshRequestAtom,
} from '@atoms/global-atom';
import { useLocation, useNavigate } from 'react-router';
import { useApiContext } from '@providers/api-provider';

const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [refreshRequest] = useAtom(refreshRequestAtom);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { isMeLoaded, meData } = useApiContext();

  // 토큰이 없고 토큰 갱신 중이 아닐 때만 로그인 페이지로 리다이렉트
  useEffect(() => {
    // 이미 로그인 페이지에 있으면 리다이렉트하지 않음
    if (pathname === '/auth/login') {
      return;
    }

    if (!accessToken && !refreshRequest) {
      // navigate('/auth/login');
    }
  }, [accessToken, refreshRequest, navigate, pathname, isMeLoaded]);

  // 토큰이 없고 갱신 중이 아니면 아무것도 렌더링하지 않음 (리다이렉트 처리 중)

  if (!accessToken && !refreshRequest) {
    return null;
  }

  // 토큰 갱신 중이면 로딩 표시
  if (!accessToken && refreshRequest) {
    return (
      <Center w="full" h="100vh">
        <H3>토큰 갱신 중입니다...</H3>
      </Center>
    );
  }

  // 토큰이 있으면 항상 children을 렌더링 (API 에러와 관계없이)
  if (accessToken) {
    return (
      <TokenContext.Provider value={{ accessToken, userInfo: meData || {} }}>
        {!isMeLoaded ? (
          <Center w="full" h="100vh">
            <H3>불러오는 중입니다...</H3>
          </Center>
        ) : (
          <>{children}</>
        )}
      </TokenContext.Provider>
    );
  }

  // 토큰이 없는 경우만 처리
  return (
    <TokenContext.Provider value={{ accessToken: '', userInfo: {} }}>
      <>{children}</>
    </TokenContext.Provider>
  );
};

export default TokenProvider;
