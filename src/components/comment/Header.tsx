import React from 'react';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <div className="header">
        <div className="header__button" onClick={() => router.back()}>
          뒤 로
        </div>
        <div className="header__content">댓 글</div>
        <div className="header__button">공 유</div>
      </div>
    </>
  );
};

export default Header;
