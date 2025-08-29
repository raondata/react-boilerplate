import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  VStack,
} from '@chakra-ui/react';
import { H2, H4 } from '@components/texts';
import { useRouteConfig } from '@hooks/route';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import Logo from '@assets/logo.png';
import { mainMenuRouteConfig } from '@configs/route-config';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const TopMenuLayout = ({ children }: { children?: ReactNode }) => {
  const { pathname } = useLocation();
  const { pagename } = useRouteConfig();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // 스크롤 가능 여부 감지
  const checkScrollStatus = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollStatus();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollStatus);
      window.addEventListener('resize', checkScrollStatus);
      return () => {
        container.removeEventListener('scroll', checkScrollStatus);
        window.removeEventListener('resize', checkScrollStatus);
      };
    }
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <VStack
      bg="bg"
      justifyContent={'center'}
      w="full"
      maxW="full"
      overflowX={'hidden'}
      pos={'relative'}
      flexDir={'column'}
      h="100vh"
      gap={0}
      minH={`768px`}
    >
      {/* Top Header with Logo and Page Name */}
      <HStack
        id="top-layout-header"
        w="full"
        alignItems={'center'}
        justifyContent={'space-between'}
        borderBottom={`1px solid`}
        borderColor={'gray.200'}
        p={4}
        bg="white"
        shadow="sm"
      >
        <HStack w="full" alignItems="flex-start" gap={3}>
          <Image w={`auto`} h={8} src={Logo} />
          {pagename && <H2 fontWeight={'black'}>[{pagename}]</H2>}
        </HStack>
      </HStack>
      <HStack
        id="top-layout-menu-bar"
        w="full"
        alignItems={'center'}
        justifyContent={'space-between'}
        borderBottom={`1px solid`}
        borderColor={'gray.200'}
        p={0}
        bg="white"
        shadow="sm"
        gap={2}
      >
        {/* Left Scroll Button */}
        <Button
          size="sm"
          variant="ghost"
          onClick={scrollLeft}
          isDisabled={!canScrollLeft}
          h="48px"
          borderRadius="md"
          _hover={{ bg: canScrollLeft ? 'gray.100' : 'transparent' }}
          opacity={canScrollLeft ? 1 : 0.4}
          fontSize="24px"
          fontWeight="bold"
        >
          <Icon as={FaChevronLeft} w={4} h={4} />
        </Button>

        {/* Scrollable Menu Container */}
        <Box
          ref={scrollContainerRef}
          w="full"
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
          <HStack w="max-content" alignItems="flex-start" gap={3} p={1}>
            {mainMenuRouteConfig.map((d) => {
              const isActive = pathname === d.path;
              return (
                <Link key={d.path} to={d.path}>
                  <Button
                    variant={isActive ? 'solid' : 'ghost'}
                    colorScheme={isActive ? 'blue' : 'gray'}
                    size={'sm'}
                    minW="fit-content"
                    _hover={{
                      bg: isActive ? 'blue.600' : 'gray.100',
                    }}
                  >
                    <HStack>
                      <Icon as={d.icon} w={4} h={4} />
                      <H4>{d.name}</H4>
                    </HStack>
                  </Button>
                </Link>
              );
            })}
          </HStack>
        </Box>

        {/* Right Scroll Button */}
        <Button
          size="sm"
          variant="ghost"
          onClick={scrollRight}
          isDisabled={!canScrollRight}
          h="48px"
          borderRadius="md"
          _hover={{ bg: canScrollRight ? 'gray.100' : 'transparent' }}
          opacity={canScrollRight ? 1 : 0.4}
          fontSize="24px"
          fontWeight="bold"
        >
          <Icon as={FaChevronRight} w={4} h={4} />
        </Button>
      </HStack>

      {/* Top Menu */}

      {/* Main Content Area */}
      <Flex w="full" h="full" flex={1} overflow={'auto'} p={4}>
        <Box w="full" h="full" overflow={'auto'}>
          {children ? children : <Outlet />}
        </Box>
      </Flex>
    </VStack>
  );
};

export default TopMenuLayout;
