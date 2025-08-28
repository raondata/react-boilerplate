import { Text, TextProps } from '@chakra-ui/react';

const H3 = (props: TextProps) => {
  const $props: TextProps = {
    fontSize: {
      base: 'md',
      '2xs': '1.025rem',
      xs: '1.125rem',
      sm: 'x-large',
    },
    ...props,
  };
  return <Text as={'span'} {...$props}></Text>;
};

export default H3;
