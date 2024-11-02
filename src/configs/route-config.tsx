import CommonPage from '@pages/common-page';
import FeeTypePage from '@pages/fee-type-page';
import GasTypePage from '@pages/gas-type-page';
import MainPage from '@pages/main-page';
import NormalTypePage from '@pages/normal-type-page';
import TextPage from '@pages/text-page';

const defaultRouteConfig: {
  path: string;
  element: JSX.Element;
  name?: string;
}[] = [
  {
    path: `/`,
    element: <MainPage />,
    name: '메인 페이지',
  },
];

export { defaultRouteConfig };
