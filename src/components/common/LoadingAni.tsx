import React, { useEffect, useRef } from 'react';
import styles from './LoadingAni.module.scss';

const LoadingAni = () => {
  const rocketRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const rocket = rocketRef.current;
    const flames = rocket?.querySelectorAll<SVGPathElement>('.rocket__flame');
    const delay = 40;
    let now = Date.now();
    let then = Date.now();

    const random = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const animeFlames = () => {
      now = Date.now();
      const elapsed = now - then;

      if (elapsed > delay && flames) {
        flames.forEach((flame) => {
          flame.style.transform = `scale(${random(0.8, 1)}, ${random(0.8, 1)})`;
        });

        then = Date.now();
      }

      requestAnimationFrame(animeFlames);
    };

    const createStar = () => {
      const star = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'circle',
      );
      star.setAttribute('r', random(4.5, 22.5).toString());
      star.setAttribute('cx', random(900, 2000).toString());
      star.setAttribute('cy', random(-150, -2000).toString());
      star.setAttribute('fill', '#898989');

      return star;
    };

    const animeStars = () => {
      let starDuration = 0;
      const randomStar = random(0, 5);
      if (randomStar > 4.8) {
        const star = createStar();
        rocket?.insertBefore(star, rocket.firstChild);

        const starSize = parseFloat(star.getAttribute('r') || '0');
        if (starSize < 7) {
          starDuration = 10000;
          star.style.opacity = random(0.5, 0.7).toString();
        } else if (starSize < 10) {
          starDuration = 8000;
          star.style.opacity = random(0.6, 0.8).toString();
        } else if (starSize < 18) {
          starDuration = 5000;
          star.style.opacity = random(0.7, 0.9).toString();
        } else {
          starDuration = 3000;
          star.style.opacity = random(0.8, 0.95).toString();
        }

        let startTime: number | null = null;

        const animate = (timestamp: number) => {
          if (!startTime) {
            startTime = timestamp;
          }

          const progress = timestamp - startTime;

          const translateX = -3000 * (progress / starDuration);
          const translateY = 3000 * (progress / starDuration);

          star.setAttribute(
            'transform',
            `translate(${translateX}, ${translateY})`,
          );

          if (progress < starDuration) {
            requestAnimationFrame(animate);
          } else {
            star.remove();
          }
        };

        requestAnimationFrame(animate);
      }

      requestAnimationFrame(animeStars);
    };

    const space = () => {
      requestAnimationFrame(animeFlames);
      requestAnimationFrame(animeStars);
    };

    requestAnimationFrame(space);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.loading}>
        <svg
          className="rocket"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-450 -450 1500 1500"
          ref={rocketRef}
        >
          <path
            d="M359.828 328.707L246.761 378.84l37.333 56.533 52.267-48c-5.333-21.333 3.2-44.8 23.467-58.666z"
            fill="#646464"
          />
          <path
            d="M305.428 512.173l65.067-65.067c23.467-23.467 36.267-55.467 36.267-88.533-33.067 0-65.067 12.8-88.533 36.267l-65.067 65.067 52.266 52.266z"
            fill="#5322e0"
          />
          <path
            d="M120.894 176.173l-42.667 53.333 56.533 36.267 50.133-113.067c-15.999 21.334-41.599 29.867-63.999 23.467z"
            fill="#646464"
          />
          <path
            d="M.361 207.107l65.067-65.067c23.467-23.467 55.467-36.267 88.533-36.267 0 33.067-12.8 65.067-36.267 88.533l-65.067 65.067L.361 207.107z"
            fill="#5322e0"
          />
          <g fill="#00e1b9">
            <path d="M322.816 495.137l-17.347 17.347-52.042-52.041 17.348-17.348zM69.392 241.284L52.045 258.63.003 206.59l17.347-17.347z" />
          </g>
          <path
            d="M208.361 415.107C551.828 284.973 510.228-3.027 511.294 1.24c4.267 1.067-283.733-39.467-413.867 302.933l110.934 110.934z"
            fill="#f3f3f3"
          />
          <g fill="#415a6b">
            <path d="M108.094 279.64c-3.2 8.533-6.4 16-9.6 24.533L209.428 414.04c8.533-3.2 17.067-6.4 24.533-9.6l-125.867-124.8z" />
            <circle cx="302.228" cy="210.307" r="73.6" />
          </g>
          <circle cx="302.228" cy="210.307" r="55.467" fill="#8ad7f8" />
          <g fill="#55c0eb">
            <path d="M340.628 249.773V170.84c-6.4-6.4-13.867-9.6-21.333-12.8v104.533c8.533-3.2 14.933-7.466 21.333-12.8zM294.761 155.907v108.8a25.992 25.992 0 0 0 12.8 0V154.84c-4.267 0-8.533 0-12.8 1.067z" />
          </g>
          <path
            d="M332.094 33.24l146.133 146.133c4.267-8.533 7.467-17.067 10.667-24.533L356.628 23.64c-7.467 3.2-16 6.4-24.534 9.6z"
            fill="#00e1b9"
          />
          <path
            d="M488.894 154.84c32-86.4 22.4-155.733 22.4-153.6 2.133 0-67.2-8.533-153.6 22.4l131.2 131.2z"
            fill="#5322e0"
          />
          <path
            className="rocket__flame rocket__flame--power"
            d="M137.961 455.64c-22.4 22.4-137.6 56.533-137.6 56.533s34.133-115.2 56.533-137.6c22.4-22.4 58.667-22.4 80 0 22.4 22.4 22.4 58.667 1.067 81.067z"
            fill="#ffd15c"
          />
          <path
            className="rocket__flame"
            d="M137.961 421.507c-12.8 12.8-80 33.067-80 33.067s20.267-67.2 33.067-80c12.8-12.8 34.133-12.8 46.933 0 12.8 12.799 12.8 34.133 0 46.933z"
            fill="#f7b64c"
          />
        </svg>
      </div>
    </div>
  );
};

export default LoadingAni;
