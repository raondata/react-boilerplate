import { Box, Flex, Image } from '@chakra-ui/react';
import { H2 } from '@components/texts';
import { useRouteConfig } from '@hooks/route';
import { ReactNode, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import Logo from '@assets/logo.png';
import LeftSideMenu from './left-side-menu';

const LeftMenuLayout = ({ children }: { children?: ReactNode }) => {
  const { pathname } = useLocation();
  const { pagename } = useRouteConfig();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Flex
      bg="bg"
      justifyContent={'center'}
      w="full"
      flexDir={'row'}
      p={4}
      pr={0}
      h="100vh"
      minH={`768px`}
    >
      <Flex pos="relative" h="full" w="full">
        <Flex flex={1} h="full">
          <Flex
            flexDir={'row'}
            id="left-layout-header"
            w="full"
            alignItems={'center'}
            justifyContent={'space-between'}
            borderBottom={`1px solid`}
            borderColor={'gray.200'}
            mb={4}
            pr={4}
          >
            {pagename && (
              <H2 ml={2} fontWeight={'black'}>
                [{pagename}]
              </H2>
            )}
            <Image w={`auto`} h={5} src={Logo} />
          </Flex>
          <Flex w="full" h="full" gap={4} flexDir={'row'} overflow={'hidden'}>
            <LeftSideMenu />
            <Flex flex={1} rounded={'md'} h="full">
              <Box h="full" overflow={'auto'} pr={4}>
                {children ? children : <Outlet />}
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LeftMenuLayout;
