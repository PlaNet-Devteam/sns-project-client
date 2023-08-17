import { useCallback, useEffect, useState } from 'react';

export function useIsScrolling() {
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = () => {
    if (!isScrolling) {
      setIsScrolling(true);
    }
    ScrollDebounce();
  };

  const debounce = (callback: () => void, delay: number) => {
    let timeout: NodeJS.Timeout;

    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callback();
      }, delay);
    };
  };

  const ScrollDebounce = useCallback(
    debounce(async () => {
      try {
        setIsScrolling(false);
      } catch (error) {
        console.error(error);
      }
    }, 500),
    [isScrolling],
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isScrolling;
}
