import { useLocalStorage } from './useLocalStorage';

export const useScrollYPosition = (positionNum: number) => {
  const [scrollY, setScrollY] = useLocalStorage('scroll_location', positionNum);
  return { scrollY, setScrollY };
};
