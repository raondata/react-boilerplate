import { Flex, Button, Text, useLocation, useNavigate } from '@chakra-ui/react';
import { useRouteConfig } from '@hooks/route';
import { mainMenuRouteConfig } from '@configs/route-config';

const TopSideMenu = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { pagename } = useRouteConfig();

  const handleMenuClick = (path: string) => {
    // /top 경로에서 메뉴 클릭 시 /top + path로 이동
    const currentPath = pathname.startsWith('/top') ? '/top' : '';
    navigate(`${currentPath}${path}`);
  };

  return (
    <Flex
      w="full"
      bg="white"
      borderBottom={`1px solid`}
      borderColor={'gray.200'}
      px={4}
      py={2}
      gap={2}
      overflowX="auto"
      css={{
        '&::-webkit-scrollbar': {
          height: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'gray.300',
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: 'gray.400',
        },
      }}
    >
      {mainMenuRouteConfig.map((route) => {
        // /top 경로에서도 올바르게 active 상태 감지
        const isActive =
          pathname === route.path || pathname === `/top${route.path}`;
        const IconComponent = route.icon;

        return (
          <Button
            key={route.path}
            variant={isActive ? 'solid' : 'ghost'}
            colorScheme={isActive ? 'blue' : 'gray'}
            size="sm"
            onClick={() => handleMenuClick(route.path)}
            minW="fit-content"
            h="40px"
            px={3}
            borderRadius="md"
            _hover={{
              bg: isActive ? 'blue.600' : 'gray.100',
            }}
          >
            <Flex alignItems="center" gap={2}>
              {IconComponent && <IconComponent size={16} />}
              <Text fontSize="sm" fontWeight="medium">
                {route.name}
              </Text>
            </Flex>
          </Button>
        );
      })}
    </Flex>
  );
};

export default TopSideMenu;
