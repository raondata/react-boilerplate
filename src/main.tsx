import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ChakraProvider, theme, extendTheme } from '@chakra-ui/react';
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import LeftMenuLayout from '@layouts/left-menu-layout';
import NotFoundPage from '@pages/not-found-page';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import ErrorPage from '@pages/error-page';
import extendedTheme from '@configs/chakra-config';
import { mainMenuRouteConfig } from '@configs/route-config';
import { TokenProvider } from '@providers/token-provider';

const queryClient = new QueryClient();
const basename = import.meta.env.VITE_BASE_URL;
const router = createBrowserRouter(
  [
    {
      path: `/`,
      element: (
        <QueryClientProvider client={queryClient}>
          <TokenProvider>
            <LeftMenuLayout />
          </TokenProvider>
        </QueryClientProvider>
      ),
      errorElement: (
        <LeftMenuLayout>
          <ErrorPage />
        </LeftMenuLayout>
      ),
      children: mainMenuRouteConfig.map((d): RouteObject => {
        return {
          path: d.path,
          element: d.element,
          children: d.children,
        };
      }),
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
