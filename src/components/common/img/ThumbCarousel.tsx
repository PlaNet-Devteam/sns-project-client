import React, { useRef } from 'react';
import { BaseProps } from '@/core';
import useMouseDrag from '@/hooks/useMouseDrag';
import styles from './ThumbCarousel.module.scss';

const ThumbCarousel = ({ children }: BaseProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { isDrag, onDragStart, onDragEnd, onThrottleDragMove } =
    useMouseDrag(scrollRef);

  return (
    <div
      className={styles.carousel}
      onMouseDown={onDragStart}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      onMouseMove={isDrag ? onThrottleDragMove : undefined}
      ref={(e) => (scrollRef.current = e)}
    >
      {children}
    </div>
  );
};

export default ThumbCarousel;
