import { Box, Center, Flex, Icon } from '@chakra-ui/react';
import { H1, H2, H3, H4 } from '@components/texts';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { FaNodeJs, FaReact } from 'react-icons/fa6';
import { SiTypescript } from 'react-icons/si';
import { LiaYarn } from 'react-icons/lia';
import MdBox from '@components/md-box';
import { useQuery } from '@hooks/api';

const installMd = `
${'```'}
npx create-raondata-react-boilerplate [myapp]
${'```'}
`;
const executeMd = ` 
${'```'}
yarn start
${'```'}
`;

const MainPage = () => {
  const aa = useQuery({
    url: '/aa1',
  });
  const bb = useQuery({
    url: '/aa2',
  });
  const cc = useQuery({
    url: '/aa3',
  });

  return (
    <Flex gap={4}>
      <H1>Raondata Boilerplate 소개</H1>
      <Flex gap={2}>
        <H4>
          개발 시 자주 사용하는 유틸과 훅, 컴포넌트, 패키지를 포함하고 있어
          간단한 설치로 기존 프로젝트 세팅을 그대로 가져올 수 있는 Boiler Plate
        </H4>
      </Flex>
      <Flex gap={2}>
        <H2 fontWeight={'black'}>환경</H2>
        <Flex flexDir={'row'} alignItems={'center'} gap={2}>
          <Icon as={FaReact}></Icon>
          <H4> React 18.2.0</H4>
        </Flex>

        <Flex flexDir={'row'} alignItems={'center'} gap={2}>
          <Icon as={FaNodeJs}></Icon>
          <H4> {'Node.js >=14'}</H4>
        </Flex>

        <Flex flexDir={'row'} alignItems={'center'} gap={2}>
          <Icon as={LiaYarn}></Icon>
          <H4> {'Yarn >= 1.22.5'}</H4>
        </Flex>

        <Flex flexDir={'row'} alignItems={'center'} gap={2}>
          <Icon as={SiTypescript}></Icon>
          <H4> {'Typescript'}</H4>
        </Flex>
      </Flex>
      <Flex gap={2}>
        <H2 fontWeight={'black'}>설치법</H2>
        <H4>아래의 명령어를 터미널에 입력</H4>
        <MdBox source={installMd} />
      </Flex>

      <Flex gap={2}>
        <H2 fontWeight={'black'}>실행법</H2>
        <H4>
          위 명령어를 사용하여 설치하였으면, 루트 폴더로 이동하여 아래의
          명령어를 터미널에 입력
        </H4>
        <MdBox source={executeMd}></MdBox>
      </Flex>
    </Flex>
  );
};

export default MainPage;
