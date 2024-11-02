import { useContext } from 'react';
import TokenContext from './token-context';

const useTokenContext = () => {
  const tokenContext = useContext(TokenContext);
  return tokenContext;
};

export default useTokenContext;
