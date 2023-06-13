import React from 'react';
import { BaseProps } from '@/core/types/common';

const HeaderLeft = ({ children }: BaseProps) => {
  return <div className="top-header__left-area">{children}</div>;
};

const HeaderTitle = ({ children }: BaseProps) => {
  return <div className="top-header__title-area">{children}</div>;
};

const HeaderRight = ({ children }: BaseProps) => {
  return <div className="top-header__right-area">{children}</div>;
};

const HeaderMain = ({ children }: BaseProps) => {
  return (
    <header className="top-header">
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
