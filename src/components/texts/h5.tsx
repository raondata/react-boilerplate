import { Text, TextProps } from '@chakra-ui/react';

const H5 = (props: TextProps) => {
  return (
    <Text
      as="span"
      fontSize={{
        base: '2xs',
        sm: 'xs',
      }}
      {...props}
    ></Text>
  );
};

export default H5;
