import MainPage from '@pages/main-page';
import { IconType } from 'react-icons/lib';
import { FaCheck, FaCode, FaImage, FaLayerGroup } from 'react-icons/fa6';
import { FiLayout } from 'react-icons/fi';
import { MdOutlineHttp } from 'react-icons/md';
import { CiSettings } from 'react-icons/ci';
import { HiOutlineDocumentDuplicate } from 'react-icons/hi2';
import { LuFolderTree } from 'react-icons/lu';
import { IoText } from 'react-icons/io5';
import { RouteObject } from 'react-router';
import DirectoryPage from '@pages/directory-page';
import DefaultSettingPage from '@pages/default-setting-page';
import ApiPage from '@pages/api-page';

const mainMenuRouteConfig: {
  path: string;
  element: JSX.Element;
  name?: string;
  icon?: IconType;
  children?: RouteObject[];
}[] = [
  {
    name: '기본 소개',
    path: '/',
    icon: FaCheck,
    element: <MainPage />,
  },
  {
    name: '디렉토리 구조',
    path: '/directory',
    icon: LuFolderTree,
    element: <DirectoryPage />,
  },
  {
    name: '기본 설정',
    path: '/setting',
    icon: CiSettings,
    element: <DefaultSettingPage />,
  },
  {
    name: '페이지 설계',
    path: '/page',
    icon: HiOutlineDocumentDuplicate,
    element: <MainPage />,
  },
  {
    name: '레이아웃 가이드',
    path: '/layout',
    icon: FiLayout,
    element: <MainPage />,
  },
  {
    name: '코드 작성 방법',
    path: '/coding',
    icon: FaCode,
    element: <MainPage />,
  },
  {
    name: '텍스트 가이드',
    path: '/name',
    icon: IoText,
    element: <MainPage />,
  },
  {
    name: '이미지 가이드',
    path: '/image',
    icon: FaImage,
    element: <MainPage />,
  },
  {
    name: 'API 호출',
    path: '/api',
    icon: MdOutlineHttp,
    element: <ApiPage />,
  },
];

export { mainMenuRouteConfig };
