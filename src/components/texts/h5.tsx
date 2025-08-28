import { Text, TextProps } from '@chakra-ui/react';

const H5 = (props: TextProps) => {
  const $props: TextProps = {
    fontSize: {
      base: '2xs',
      sm: 'xs',
    },
    ...props,
  };
  return <Text as="span" {...$props}></Text>;
};

export default H5;
