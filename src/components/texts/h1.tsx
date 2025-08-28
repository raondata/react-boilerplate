import { Text, TextProps } from '@chakra-ui/react';

const H1 = (props: TextProps) => {
  const $props: TextProps = {
    fontSize: {
      base: '1.75rem',
      '2xs': '1.8rem',
      xs: '2.25rem',
      sm: '2.5rem',
    },
    fontWeight: 'bold',
    ...props,
  };
  return <Text {...$props}></Text>;
};

export default H1;
