import { TokenResponseType } from '@@types/response-types';
import { createContext } from 'react';

const TokenContext = createContext<{
  token: string;
  customerInfo?: TokenResponseType;
}>({
  token: '',
});

export default TokenContext;
