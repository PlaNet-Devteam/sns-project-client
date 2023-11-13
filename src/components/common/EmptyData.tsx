import React from 'react';
import { GiAstronautHelmet } from 'react-icons/gi';
import TypoText from './TypoText';

function EmptyData() {
  return (
    <div className="empty-data">
      <div>
        <GiAstronautHelmet size={'3rem'} color="white" />
        <div className="row-box">
          <TypoText tagName="p" color="white">
            데이터가 없습니다
          </TypoText>
        </div>
      </div>
    </div>
  );
}

export default EmptyData;
