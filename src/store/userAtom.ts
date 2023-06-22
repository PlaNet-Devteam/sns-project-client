import { atom } from 'recoil';
import { UserType } from '@/core';

const userState = atom<UserType | null>({
  key: 'userState',
  default: null,
});

const userIdState = atom<number>({
  key: 'userIdState',
  default: 0,
});

export { userState, userIdState };
