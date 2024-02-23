import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import Button from '@/components/common/Button';
import TypoText from '@/components/common/TypoText';
import ButtonGroup from '@/components/common/ButtonGroup';

const EmptyRoom = () => {
  return (
    <div className="empty-data">
      <div>
        <div className="row-box">
          <FaPaperPlane color="white" size={'3rem'} />
          <div className="row-box">
            <TypoText color="white" tagName="h3">
              내 메시지
            </TypoText>
            <TypoText color="white">친구나 그룹에 메시지를 보내보세요</TypoText>
          </div>
        </div>
        <ButtonGroup>
          <Button variant="primary" size="sm" to={'/direct/new'}>
            메세지 보내기
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default EmptyRoom;
