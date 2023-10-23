import { useCallback, useEffect, useState } from 'react';

export function useIsScrolling() {
  const [isScrolling, setIsScrolling] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [handleScroll]);

  return isScrolling;
}
