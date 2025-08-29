import { ReactNode, useEffect, useState } from 'react';
import ApiContext from './api-context';
import { useQuery } from '@hooks/api';
import { useAtom } from 'jotai';
import { accessTokenAtom, userInfoAtom } from '@atoms/global-atom';

const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken] = useAtom(accessTokenAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [isMeLoaded, setIsMeLoaded] = useState(false);

  // 토큰이 있으면 항상 /me 호출 (최초 호출 시에도)
  const shouldFetchMe = accessToken;

  const getMe = useQuery<{ [key: string]: any }>(
    {
      type: 'get',
      url: '/me',
    },
    {
      disabled: !shouldFetchMe, // 토큰이 없으면 호출 안 함
    }
  );

  // 초기화 시 기존 사용자 정보 확인
  useEffect(() => {
    console.log('📊 ApiProvider 상태:', {
      accessToken: !!accessToken,
      userInfo: !!userInfo,
      isMeLoaded,
    });

    if (!accessToken && isMeLoaded) {
      console.log('❌ 토큰 없음 - isMeLoaded = false 설정');
      setIsMeLoaded(false);
      // 사용자 정보 초기화는 로그아웃 시에만 수행
      // setUserInfo(null); // 임시로 주석 처리하여 문제 해결
    }
  }, [accessToken, isMeLoaded, setUserInfo]);

  // /me API 완료 시 사용자 정보 저장
  useEffect(() => {
    if (accessToken && getMe.data && !getMe.isLoading) {
      setUserInfo(getMe.data);
      setIsMeLoaded(true);
    }
  }, [accessToken, getMe.data, getMe.isLoading, setUserInfo]);

  const refetchMe = () => {
    if (accessToken) {
      getMe.refetch();
    }
  };

  const logout = () => {
    setUserInfo(null);
    setIsMeLoaded(false);
  };

  return (
    <ApiContext.Provider
      value={{
        isMeLoaded,
        meData: userInfo || getMe.data,
        refetchMe,
        logout,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
