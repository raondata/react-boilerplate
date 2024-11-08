import { mainMenuRouteConfig } from '@configs/route-config';
import { useLocation } from 'react-router';

const useRouteConfig = () => {
  const { pathname } = useLocation();
  const currentPath = `/${pathname.split('/').pop()}`;

  const pagename = mainMenuRouteConfig.find(
    (d) => d.path === currentPath
  )?.name;

  return { pagename };
};

export default useRouteConfig;
