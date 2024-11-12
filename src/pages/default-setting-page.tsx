import { Box, Center, Flex, Icon } from '@chakra-ui/react';
import { H1, H2, H3, H4 } from '@components/texts';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { FaNodeJs, FaReact } from 'react-icons/fa6';
import { SiTypescript } from 'react-icons/si';
import { LiaYarn } from 'react-icons/lia';
import { useEffect, useState } from 'react';
import MdBox from '@components/md-box';

const packageJsonMd = `
${'```'}
{
  \"name\": \"create-raondata-react-boilerplate\",
  \"version\": \"1.1.1\",
  \"description\": \"react boilerplate use in raondata\",
  \"homepage\": \"git+https://github.com/raondata/react-boilerplate\",
  \"repository\": \"git+https://github.com/raondata/react-boilerplate\",
  \"author\": \"raondata\",
  .
  .
  .
  ${'```'}
`;

const DefaultSettingPage = () => {
  return (
    <Flex gap={4}>
      <H4>
        보일러 플레이트를 내 프로젝트에 맞게 설정하기 위한 몇 가지 단계들이
        있다.
      </H4>
      <Flex gap={2}>
        <H2>1. package.json 수정</H2>
        <H4>
          package.json에는 프로젝트의 이름, git repository 주소 등이 설정되어
          있음.
        </H4>
        <MdBox source={packageJsonMd}></MdBox>
        <H4>각 항목을 내 프로젝트에 맞게 바꿔준다.</H4>
      </Flex>
      <Flex gap={2}>
        <H2>2. .env 파일들 수정</H2>
        <H4>환경변수 파일들을 내 프로젝트에 맞게 변경한다.</H4>
        <H4>
          .env, .env.dev, .env.prod 의 .env 의 뒷부분은 실행 환경 이름이므로, 이
          부분도 커스텀을 원하면 바꿀 수 있다.
        </H4>
      </Flex>

      <Flex gap={2}>
        <H2>3. 필요없는 파일 삭제</H2>
        <H4>
          내 프로젝트와 무관한 파일들인 components, pages 등에 있는 파일들을
          삭제해준다.
        </H4>
        <H4>
          이와 관련해, route-config에 메뉴, route등이 설정되어 있으므로, 이
          파일도 바꾸거나 새로 추가할 내 페이지에 맞게 코드를 수정해준다.
        </H4>
      </Flex>
      <Flex gap={2}>
        <H2>4. Chakra-ui 관련 설정 변경</H2>
        <H4>
          chakra-config.ts 파일에서 색상, breakpoints 등의 설정을 내 환경에 맞게
          변경한다.
        </H4>
      </Flex>
    </Flex>
  );
};

export default DefaultSettingPage;
