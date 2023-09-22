import { atom } from 'recoil';
import { UserType } from '@/core';

const profileState = atom<UserType | null>({
  key: 'profileState',
  default: null,
});

export { profileState };
