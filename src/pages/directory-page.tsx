import { Box, Center, Flex, Icon } from '@chakra-ui/react';
import { H1, H2, H3, H4 } from '@components/texts';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { FaNodeJs, FaReact } from 'react-icons/fa6';
import { SiTypescript } from 'react-icons/si';
import { LiaYarn } from 'react-icons/lia';
import { useEffect, useState } from 'react';
import MdBox from '@components/md-box';

const DirectoryPage = () => {
  const [directoryMd, setDirectoryMd] = useState<string>('');

  useEffect(() => {
    fetch('/public/directory.md').then((res) =>
      res.text().then((md) => {
        setDirectoryMd(md);
      })
    );
  }, []);
  return (
    <Flex gap={4}>
      <Flex gap={2}>
        <H2>기본 디렉토리 구조</H2>
        <MdBox source={directoryMd}></MdBox>
      </Flex>
    </Flex>
  );
};

export default DirectoryPage;
