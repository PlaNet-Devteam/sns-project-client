import React from 'react';
import Button from '@/components/common/Button';
import IconCircleCheck from '@/assets/icons/icon_circle_check.svg';
import ButtonGroup from '@/components/common/ButtonGroup';

const SinUpComplete = () => (
  <div className="signup-complete grid">
    <div className="content-area">
      <div className="middle-area">
        <div className="inner-container">
          {/** TODO : 컴포넌트  */}
          <div className="title-group text-center">
            <div className="title-group__icon">
              <IconCircleCheck />
            </div>
            <div className="title-group__text">
              <h3 className="title-group__title">회원가입이 완료되었습니다</h3>
              <p className="title-group__dscr">
                지금 바로 플래닛 SNS 서비스를
                <br />
                이용해보세요!
              </p>
            </div>
            <ButtonGroup>
              <Button to="/login" size="md" variant="primary" isEnglish isFull>
                Login
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SinUpComplete;
