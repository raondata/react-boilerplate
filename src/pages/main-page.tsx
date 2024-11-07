import { Box, Center, Flex } from '@chakra-ui/react';
import { H1 } from '@components/texts';

const MainPage = () => {
  return (
    <Flex gap={2}>
      <H1>Raondata Boilerplate 소개</H1>
      <Box h="40" border={`1px solid red`}></Box>
      <Box h="40" border={`1px solid red`}></Box>
      <Box h="40" border={`1px solid red`}></Box>
      <Box h="40" border={`1px solid red`}></Box>
      <Box h="40" border={`1px solid red`}></Box>
      <Box h="40" border={`1px solid red`}></Box>
    </Flex>
  );
};

export default MainPage;
