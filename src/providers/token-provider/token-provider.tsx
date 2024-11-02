import { createContext, ReactNode, useEffect, useState } from 'react';
import TokenContext from './token-context';
import { useQuery } from '@hooks/api';
import useToken from '@hooks/token';
import { Center, Flex, Text } from '@chakra-ui/react';
import { H3 } from '@components/texts';
import apiUtils from '@utils/api-utils';
import { CustomerType } from '@@types/field-types';
import { TokenResponseType } from '@@types/response-types';

const TokenProvider = ({ children }: { children: ReactNode }) => {
  const token = useToken();
  // const token = pathname.split('/').pop();

  const [response, setResponse] = useState<TokenResponseType>();

  useEffect(() => {
    if (token) {
      apiUtils
        .get<TokenResponseType>({
          url: '/token-check',
          token,
        })
        .then((res) => {
          setResponse(res.data);
        })
        .catch((e) => {
          throw new Error('token not found');
        });
    } else {
      throw new Error('token not found');
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      // throw new Error('token not found');
    }
  }, [token]);

  return (
    <TokenContext.Provider
      value={{ token: token || '', customerInfo: response }}
    >
      {!response ? (
        <Center w="full" h="100vh">
          <H3>불러오는 중입니다...</H3>
        </Center>
      ) : (
        <>{children}</>
      )}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
