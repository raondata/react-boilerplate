import { TokenResponseType } from '@@types/response-types';
import { createContext } from 'react';

const TokenContext = createContext<{
  accessToken: string;
  userInfo?: TokenResponseType;
}>({
  accessToken: '',
});

export default TokenContext;
