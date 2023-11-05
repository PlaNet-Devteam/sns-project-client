import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { BaseProps } from '@/core/types/common';

const HeaderLeft = ({ children }: BaseProps) => {
  return <div className="top-header__left-area">{children}</div>;
};

interface HeaderTitleProps extends BaseProps {
  isEnglish?: boolean;
}

const HeaderTitle = ({ children, isEnglish }: HeaderTitleProps) => {
  return (
    <div
      className={classNames('top-header__title-area', {
        'is-english': isEnglish,
      })}
    >
      {children}
    </div>
  );
};

const HeaderRight = ({ children }: BaseProps) => {
  return <div className="top-header__right-area">{children}</div>;
};

const HeaderMain = ({ children, className }: BaseProps) => {
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 0) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={classNames(
        'top-header',
        { 'is-scrolling': isScrolling },
        className,
      )}
    >
      <div className="inner__container">{children}</div>
    </header>
  );
};

const Header = Object.assign(HeaderMain, {
  Left: HeaderLeft,
  Title: HeaderTitle,
  Right: HeaderRight,
});

export default Header;
