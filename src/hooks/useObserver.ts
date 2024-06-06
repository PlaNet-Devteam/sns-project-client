import { RefObject, useLayoutEffect } from 'react';
import router from 'next/router';
import { IntersectionObserverCallback } from '@/core/types/feed';
import { useLocalStorage } from './useLocalStorage';

interface ObserverProps {
  ref: boolean;
  target: Element | RefObject<Element> | any;
  onIntersect: IntersectionObserverCallback;
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export const useObserver = ({
  target,
  onIntersect,
  root = null,
  rootMargin = '0px 0px -60px 0px',
  threshold = 0,
}: ObserverProps) => {
  useLayoutEffect(() => {
    let observer: IntersectionObserver | null = null;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        root,
        rootMargin,
        threshold,
      });

      if (target.current) {
        observer.observe(target.current);
      }
    }

    return () => {
      if (observer && target?.current) {
        observer.unobserve(target.current);
      }
    };
  }, [target, rootMargin, threshold, onIntersect, root]);
};

export const useScrollObserver = () => {
  const setScrollY = useLocalStorage('scroll_location', 0)[1];

  useLayoutEffect(() => {
    const handleRoute = () => {
      const onIntersect: IntersectionObserverCallback = (entries) => {
        entries.forEach(
          (entry: {
            isIntersecting: boolean;
            intersectionRatio: number;
            target: Element | RefObject<Element>;
          }) => {
            if (
              entry.isIntersecting &&
              entry.intersectionRatio === 1 &&
              window.scrollY !== 0
            ) {
              setScrollY(window.scrollY);
            }
          },
        );
      };
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1,
      };

      const observer = new IntersectionObserver(onIntersect, options);
      const allDivElements = document.querySelectorAll('div');
      allDivElements.forEach((element) => {
        observer.observe(element);
      });

      return () => {
        observer.disconnect();
      };
    };
    router.events.on('routeChangeStart', handleRoute);

    return () => {
      router.events.off('routeChangeStart', handleRoute);
    };
  }, []);
};
