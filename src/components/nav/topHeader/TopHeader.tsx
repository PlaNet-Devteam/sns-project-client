import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { BaseProps } from '@/core/types/common';
import LogoTitleSVG from '@/assets/intro/logo_title.svg';
import { userState } from '@/store/userAtom';

const HeaderLeft = ({ children }: BaseProps) => {
  const myInfo = useRecoilValue(userState);

  return (
    <div className="top-header__left-area">
      {!myInfo ? (
        <Link href="/feed">
          <h1 className="top-header__logo">
            <LogoTitleSVG />
          </h1>
        </Link>
      ) : (
        children
      )}
    </div>
  );
};

interface HeaderTitleProps extends BaseProps {
  isEnglish?: boolean;
}

const HeaderTitle = ({ children, isEnglish }: HeaderTitleProps) => {
  const myInfo = useRecoilValue(userState);

  if (!myInfo) return <></>;

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
  const myInfo = useRecoilValue(userState);

  return (
    <div className="top-header__right-area">
      {!myInfo ? <Link href="/login">로그인</Link> : children}
    </div>
  );
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
