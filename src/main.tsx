import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ChakraProvider, theme, extendTheme } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DefaultLayout from '@layouts/default-layout';
import BillPage from '@pages/bill-page';
import { TokenProvider } from '@providers/token-provider';
import NotFoundPage from '@pages/not-found-page';
import { QueryClient, QueryClientProvider } from 'react-query';
import MainPage from '@pages/main-page';
import ErrorPage from '@pages/error-page';

const queryClient = new QueryClient();
const basename = import.meta.env.VITE_BASE_URL;
const router = createBrowserRouter(
  [
    {
      path: `/`,
      element: (
        <QueryClientProvider client={queryClient}>
          <DefaultLayout />
        </QueryClientProvider>
      ),
      errorElement: (
        <DefaultLayout>
          <ErrorPage />
        </DefaultLayout>
      ),
      children: [
        {
          path: `/`,
          element: <MainPage />,
        },
      ],
    },
    {
      element: <NotFoundPage />,
    },
  ],
  {
    basename,
  }
);

const extendedTheme = extendTheme({
  breakpoints: {
    '2xs': '360px',
    xs: '380px',
  },
  colors: {
    purple: '#A263F8',
    main: {
      // "400": "https://www.youtube.com/watch?v=fuln40NIeZk"
      '100': '#C7D5ED',
      '200': '#3377F6',
      '300': '#2E7FCE',
      '400': '#4976C5',
    },
    gradient: {
      start: '#B17EF9',
      end: '#4078F6',
    },
    darkgreen: {
      '400': '#1B6B26',
      '600': '#0E3513',
    },
    orange: '#FABE15',
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // <React.StrictMode >
  <ChakraProvider theme={extendedTheme}>
    <RouterProvider router={router} />
  </ChakraProvider>
  // </React.StrictMode>
);
