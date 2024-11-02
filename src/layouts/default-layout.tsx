import { Flex, Image } from '@chakra-ui/react';
import { H2 } from '@components/texts';
import { useRouteConfig } from '@hooks/route';
import { ReactNode, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import Logo from '@assets/logo.png';

const DefaultLayout = ({ children }: { children?: ReactNode }) => {
  const { pathname } = useLocation();
  const { pagename } = useRouteConfig();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Flex justifyContent={'center'} h="full" w="full" flexDir={'row'} pb={12}>
      <Flex h="full" w="full" flexDir={'column'} px={4}>
        <Flex
          id="default-layout-header"
          w="full"
          alignItems={'center'}
          justifyContent={'space-between'}
          py={2}
          borderBottom={`1px solid #BDBDBD`}
          mb={2}
        >
          {pagename && (
            <H2 ml={2} fontWeight={'black'}>
              [{pagename}]
            </H2>
          )}
          <Image w={`auto`} h={5} src={Logo} />
        </Flex>
        {children ? children : <Outlet />}
      </Flex>
    </Flex>
  );
};

export default DefaultLayout;
