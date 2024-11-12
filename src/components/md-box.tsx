import { Box } from '@chakra-ui/react';
import MarkdownPreview from '@uiw/react-markdown-preview';

const MdBox = ({ source }: { source: string }) => {
  return (
    <Box
      rounded={'md'}
      overflow={'hidden'}
      border={`1px solid`}
      borderColor={'gray.400'}
    >
      <MarkdownPreview
        style={{
          padding: 2,
          background: 'transparent',
        }}
        source={source}
      ></MarkdownPreview>
    </Box>
  );
};

export default MdBox;
