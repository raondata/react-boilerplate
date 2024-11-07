import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ChakraProvider, theme, extendTheme } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LeftMenuLayout from '@layouts/left-menu-layout';
import NotFoundPage from '@pages/not-found-page';
import { QueryClient, QueryClientProvider } from 'react-query';
import MainPage from '@pages/main-page';
import ErrorPage from '@pages/error-page';
import extendedTheme from '@configs/chakra-config';

const queryClient = new QueryClient();
const basename = import.meta.env.VITE_BASE_URL;
const router = createBrowserRouter(
  [
    {
      path: `/`,
      element: (
        <QueryClientProvider client={queryClient}>
          <LeftMenuLayout />
        </QueryClientProvider>
      ),
      errorElement: (
        <LeftMenuLayout>
          <ErrorPage />
        </LeftMenuLayout>
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // <React.StrictMode >
  <ChakraProvider theme={extendedTheme}>
    <RouterProvider router={router} />
  </ChakraProvider>
  // </React.StrictMode>
);
