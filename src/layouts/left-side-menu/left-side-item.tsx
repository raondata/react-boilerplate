import { MenuConfigType } from '@@types/component-props-types';
import { Flex, Icon } from '@chakra-ui/react';
import { H4 } from '@components/texts';
import { FaChevronRight } from 'react-icons/fa6';
import { useLocation, useNavigate } from 'react-router';

const LeftSideItem = ({ item }: { item: MenuConfigType }) => {
  const { pathname } = useLocation();
  const focus = `/${pathname.split('/').pop()}` === item.path ? true : false;
  const navigate = useNavigate();

  return (
    <Flex key={`menu-${item.name}`} px={1} boxSizing={'border-box'}>
      <Flex
        rounded={'md'}
        flexDir={'row'}
        alignItems={'center'}
        gap={2}
        w="full"
        p={2}
        bg={(focus && 'gray.600') || undefined}
        boxShadow={(focus && '0 0 0 1px ') || undefined}
        cursor={'pointer'}
        _hover={{
          bg: 'gray.600',
        }}
        onClick={() => {
          navigate(item.path);
        }}
      >
        <Icon color={'gray.50'} as={item.icon} />
        <H4 flex={1}>{item.name}</H4>
        <Icon as={FaChevronRight}></Icon>
      </Flex>
    </Flex>
  );
};

export default LeftSideItem;
