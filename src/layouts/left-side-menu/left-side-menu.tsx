import { Box, Flex, Icon } from '@chakra-ui/react';
import { H2, H3, H4, H5 } from '@components/texts';
import { FaChevronRight } from 'react-icons/fa6';
import LeftSideItem from './left-side-item';
import { mainMenuRouteConfig } from '@configs/route-config';

const LeftSideMenu = () => {
  return (
    <Box pos="relative" h={'full'} rounded={'md'} bg="gray.700" flexShrink={1}>
      <Flex h="full" p={4} px={0} color="gray.50" gap={4}>
        <Flex flexDir={'column'} alignItems={'flex-start'} px={4}>
          <H3 fontWeight={'black'}>React Boilerplate</H3>
          <H3 fontWeight={'black'}>RAONDATA©</H3>
        </Flex>
        <Box w="full" h={0} borderBottom={`1px solid`} borderColor="bg"></Box>
        <Flex flexDir={'column'} gap={1}>
          {mainMenuRouteConfig.map((m) => (
            <LeftSideItem key={`menu-${m.name}`} item={m} />
          ))}
        </Flex>
        <Flex
          flex={1}
          alignItems={'flex-start'}
          justifyContent={'flex-end'}
          px={4}
        >
          <H5 color="gray.300">version {import.meta.env.VITE_VERSION}</H5>
        </Flex>
      </Flex>
    </Box>
  );
};

export default LeftSideMenu;
