import { Text, TextProps } from '@chakra-ui/react';

const H2 = (props: TextProps) => {
  return (
    <Text
      fontWeight={'black'}
      fontSize={{
        base: 'xl',
        '2xs': '1.2rem',
        xs: '2xl',
        sm: '2xl',
      }}
      {...props}
    ></Text>
  );
};

export default H2;
