import { AuthResponseType } from '@@types/response-types';
import {
  accessTokenAtom,
  refreshRequestAtom,
  refreshTokenAtom,
} from '@atoms/global-atom';
import apiUtils from '@utils/api-utils';
import { useAtom } from 'jotai';

const useToken = () => {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [refreshToken, setRefreshToken] = useAtom(refreshTokenAtom);
  const [refreshRequest, setRefreshRequest] = useAtom(refreshRequestAtom);

  const refreshFn = async () => {
    const result = await apiUtils.request<AuthResponseType>({
      url: '/refresh',
      token: refreshToken,
      type: 'get',
    });

    // const result = await mutateAsync({});
    setAccessToken(result.data.accessToken);
    setRefreshToken(result.data.refreshToken);

    return result.data;
  };

  const setToken = async ($accessToken: string, $refreshToken?: string) => {
    setAccessToken($accessToken);
    if ($refreshToken) {
      setRefreshToken($refreshToken);
    }
  };

  return {
    setToken,
    accessToken,
    refreshToken,
    refreshFn,
    refreshRequest,
    setRefreshRequest,
  };
};

export default useToken;
