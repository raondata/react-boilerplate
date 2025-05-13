import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  Spinner,
  VStack,
} from '@chakra-ui/react';
import { H1, H2, H3, H4, H5 } from '@components/texts';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { FaNodeJs, FaPlay, FaReact } from 'react-icons/fa6';
import { SiTypescript } from 'react-icons/si';
import { LiaYarn } from 'react-icons/lia';
import MdBox from '@components/md-box';
import { useMutation, useQuery } from '@hooks/api';
import { useState } from 'react';

const importMd = ` 
${'```'}
import { useQuery } from '@hooks/api';
${'```'}
`;

const useQueryMd = `
${'```'}
const { data, refetch, isLoading, isError, error } = useQuery({
    type: 'get',
    url: '',
  });
${'```'}
`;

const useMutationMd = `
${'```'}
// expire가 되지 않는 토큰을 얻어오는 api.
const { mutateAsync } = useMutation({
    type: 'get',
    url: '/forever',
  },
  { requestType: 'login' }
);

${'```'}
`;

const ApiPage = () => {
  const [mutationResponse, setMutationResponse] = useState<string>('');

  const { data, refetch, isLoading, isError, error } = useQuery(
    {
      type: 'get',
      url: '',
    },
    { disabled: true }
  );

  const postForeverAuth = useMutation<{
    accessToken?: string;
    refreshToken?: string;
  }>(
    {
      type: 'post',
      url: '/forever',
    },
    { requestType: 'login' }
  );

  return (
    <Flex gap={4}>
      <H1>API 호출</H1>
      <Flex gap={2}>
        <H4>
          react-query나 tanstack 을 사용하는 대신, 미리 boilerplate에서 정의해둔
          useQuery, useMutation 사용한다. 이 hook은 tanstack의 useQuery를 래핑한
          것으로, 간단한 url과 params를 통해 쉽게 호출할 수 있다.
        </H4>
      </Flex>
      <VStack w="full" alignItems={'flex-start'}>
        <H2 fontWeight={'black'}>코드 예시</H2>
        <H4>아래와 같이 코드 작성</H4>
        <MdBox source={importMd} />
        <H4 mt={4}>useQuery 사용예시</H4>
        <MdBox source={useQueryMd} />

        <HStack alignItems={'center'} mt={4}>
          <H4>useMutation 사용예시</H4>
          <Button
            w={84}
            size="xs"
            bg="point.900"
            color="white"
            onClick={async () => {
              const result = await postForeverAuth.mutateAsync();
              setMutationResponse(result?.accessToken || '');
            }}
          >
            <HStack alignItems={'center'} justifyContent={'center'} h="full">
              {postForeverAuth.isLoading ? (
                <Center w="full" h="full">
                  <Spinner size="sm" />
                </Center>
              ) : (
                <>
                  <H5 top={`2px`}>코드 실행</H5>
                  <Icon as={FaPlay}></Icon>
                </>
              )}
            </HStack>
          </Button>
        </HStack>
        <MdBox source={useMutationMd} />

        <H4 mt={4}>useMutation 실행 결과</H4>
        <MdBox source={`${'```'}${mutationResponse}${'```'}`}></MdBox>
      </VStack>

      <Flex gap={2}></Flex>
    </Flex>
  );
};

export default ApiPage;
