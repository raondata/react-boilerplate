import { Text, TextProps } from '@chakra-ui/react';

const H4 = (props: TextProps) => {
  const $props: TextProps = {
    fontSize: {
      base: '0.825rem',
      '2xs': '0.925rem',
      xs: '1rem',
      sm: '1.25rem',
    },
    fontWeight: 'bold',
    ...props,
  };
  return <Text as={'span'} {...$props}></Text>;
};

export default H4;
