import { extendTheme } from '@chakra-ui/react';

const extendedTheme = extendTheme({
  breakpoints: {
    '2xs': '360px',
    xs: '380px',
  },
  colors: {
    bg: '#FAFAFA',
    point: {
      100: '#C9FCD9',
      200: '#95F9BD',
      300: '#5EEDA6',
      400: '#36DB99',
      500: '#00C489',
      600: '#00A886',
      700: '#008D7E',
      800: '#007170',
      900: '#00555E',
    },
  },
  components: {
    Toast: {
      defaultProps: {
        position: 'top',
      },
    },
  },
});

export default extendedTheme;
