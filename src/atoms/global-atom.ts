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

const refreshRequestAtom = atom<boolean>(false);

export { accessTokenAtom, refreshTokenAtom, refreshRequestAtom };
