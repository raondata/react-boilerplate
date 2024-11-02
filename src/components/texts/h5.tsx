import { Text, TextProps } from '@chakra-ui/react';

const H5 = (props: TextProps) => {
  return (
    <Text
      as="span"
      fontSize={{
        base: 'xs',
        sm: 'medium',
      }}
      {...props}
    ></Text>
  );
};

export default H5;
