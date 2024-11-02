import { Flex, Icon, Text } from '@chakra-ui/react';
import { H2, H3, H4, H5 } from '@components/texts';
import { GrCircleQuestion } from 'react-icons/gr';

const NotFoundPage = () => {
  return (
    <Flex
      w="full"
      h="full"
      flexDir={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      py={32}
      gap={4}
    >
      {/* <Icon as={AiFillWarning} w={16} h={16} color={'#BD1b1b'} /> */}
      <Icon as={GrCircleQuestion} w={16} h={16} color={'#D50136'} />
      <H2>요청하신 페이지가 존재하지 않습니다.</H2>
      <Flex flexDir={'column'} alignItems={'center'} py={4}>
        <H5>URL 이 존재하지 않거나</H5>
        <H5>접근 권한이 없을 수 있습니다.</H5>
      </Flex>
      <H5>계속 에러가 발생할 시, 다음 이메일로 연락하시기 바랍니다.</H5>
      <H5>kiwoongkim@raondata.ai</H5>
    </Flex>
  );
};

export default NotFoundPage;
