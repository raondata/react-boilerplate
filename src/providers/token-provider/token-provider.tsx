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
import { useLocation } from 'react-router';

const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [refreshToken, setRefreshToken] = useAtom(refreshTokenAtom);
  const { pathname } = useLocation();
  // const token = pathname.split('/').pop();

  const { data, refetch, isLoading, isError, error } =
    useQuery<TokenResponseType>(
      {
        type: 'post',
        url: '/forever',
      },
      {
        disabled: !!accessToken,
      }
    );

  const getMe = useQuery<{ [key: string]: any }>({
    type: 'get',
    url: '/me',
  });
  useEffect(() => {
    if (data?.accessToken && data?.refreshToken) {
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
    }
  }, [data]);

  useEffect(() => {
    getMe.refetch();
  }, [pathname]);

  return (
    <TokenContext.Provider value={{ accessToken, userInfo: {} }}>
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
