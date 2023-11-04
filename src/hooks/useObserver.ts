import { RefObject, useLayoutEffect } from 'react';
import { IntersectionObserverCallback } from '@/core/types/feed';

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
