import { atom } from 'recoil';

const commentState = atom({
  key: 'commentState',
  default: [],
});

const commentIdState = atom({
  key: 'commentIdState',
  default: '',
});

export { commentState, commentIdState };
