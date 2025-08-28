import { Text, TextProps } from '@chakra-ui/react';

const H2 = (props: TextProps) => {
  const $props: TextProps = {
    fontSize: {
      base: 'xl',
      '2xs': '1.2rem',
      xs: '2xl',
      sm: '2xl',
    },
    fontWeight: 'semibold',
    ...props,
  };
  return <Text {...$props}></Text>;
};

export default H2;
