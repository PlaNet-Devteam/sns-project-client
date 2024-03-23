import { useCallback, useEffect, useState } from 'react';

export function useIsScrolling() {
  const [isScrolling, setIsScrolling] = useState(false);

  const debounce = useCallback((callback: () => void, delay: number) => {
    let timeout: NodeJS.Timeout;

    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callback();
      }, delay);
    };
  }, []);

  const ScrollDebounce = debounce(async () => {
    try {
      setIsScrolling(false);
    } catch (error) {
      console.error(error);
    }
  }, 500);

  const handleScroll = useCallback(() => {
    if (!isScrolling) {
      setIsScrolling(true);
    }
    ScrollDebounce();
  }, [isScrolling, ScrollDebounce]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return isScrolling;
}
