import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const accessTokenAtom = atomWithStorage<string>('access-token', '', undefined, {
  getOnInit: true,
});
const refreshTokenAtom = atomWithStorage<string>(
  'refresh-token',
  '',
  undefined,
  {
    getOnInit: true,
  }
);

// 사용자 정보 저장 (localStorage에 저장)
const userInfoAtom = atomWithStorage<any>('user-info', null, undefined, {
  getOnInit: true,
});

const refreshRequestAtom = atom<boolean>(false);

export { accessTokenAtom, refreshTokenAtom, userInfoAtom, refreshRequestAtom };
