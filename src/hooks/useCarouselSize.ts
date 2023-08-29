import { useEffect, useRef, useState } from 'react';

export interface useCarouselSizeProps {
  initWidth?: number;
  aspectRadio?: number;
}

export default function useCarouselSize(
  { initWidth = 0 }: useCarouselSizeProps = {
    aspectRadio: 1,
    initWidth: 0,
  },
) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [{ width }, setCarouselSize] = useState({
    width: initWidth,
  });

  useEffect(() => {
    if (!carouselRef.current) return;

    const carouselRect = carouselRef.current.getBoundingClientRect();
    setCarouselSize({
      width: carouselRect.width,
    });
  }, [carouselRef]);

  return {
    ref: carouselRef,
    width,
  };
}
