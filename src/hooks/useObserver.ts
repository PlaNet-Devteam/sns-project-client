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
  rootMargin = '0px',
  threshold = 1.0,
}: ObserverProps) => {
  useLayoutEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        root,
        rootMargin,
        threshold,
      });
      observer.observe(target.current ?? target);
    }

    return () => observer && observer.disconnect();
  }, [target, rootMargin, threshold, onIntersect, root]);
};
