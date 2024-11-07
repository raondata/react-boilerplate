import { MenuConfigType } from '@@types/component-props-types';
import { FaCheck, FaCode, FaImage, FaLayerGroup } from 'react-icons/fa6';
import { FiLayout } from 'react-icons/fi';
import { MdOutlineHttp } from 'react-icons/md';
import { CiSettings } from 'react-icons/ci';
import { HiOutlineDocumentDuplicate } from 'react-icons/hi2';
import { LuFolderTree } from 'react-icons/lu';
import { IoText } from 'react-icons/io5';

const menuConfig: MenuConfigType[] = [
  {
    text: '기본 소개',
    link: '/',
    icon: FaCheck,
  },
  {
    text: '디렉토리 구조',
    link: '/directory',
    icon: LuFolderTree,
  },
  {
    text: '기본 설정',
    link: '/setting',
    icon: CiSettings,
  },
  {
    text: '페이지 설계',
    link: '/page',
    icon: HiOutlineDocumentDuplicate,
  },
  {
    text: '레이아웃 가이드',
    link: '/layout',
    icon: FiLayout,
  },
  {
    text: '코드 작성 방법',
    link: '/coding',
    icon: FaCode,
  },
  {
    text: '텍스트 가이드',
    link: '/text',
    icon: IoText,
  },
  {
    text: '이미지 가이드',
    link: '/image',
    icon: FaImage,
  },
  {
    text: 'API 설정',
    link: '/api',
    icon: MdOutlineHttp,
  },
];

export default menuConfig;
