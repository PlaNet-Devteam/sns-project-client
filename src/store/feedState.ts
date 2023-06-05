import { atom } from 'recoil';

const feedImageState = atom<string[]>({
  key: 'feedImageState',
  default: [],
});

export { feedImageState };
