import React, { MouseEventHandler } from 'react';
import classNames from 'classnames';
import { BaseProps } from '@/core/types/common';
import styles from './DialogLabelButton.module.scss';

interface ColorType {
  essential: string;
  white: string;
  black: string;
  success: string;
  danger: string;
}

const COLORS: ColorType = {
  essential: 'button-text--essential',
  white: 'button-text--white',
  black: 'button-text--black',
  success: 'button-text--success',
  danger: 'button-text--danger',
};

interface DialogLabelButtonProps extends BaseProps {
  color?: 'essential' | 'white' | 'black' | 'success' | 'danger';
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const DialogLabelButton = ({
  color,
  children,
  onClick,
}: DialogLabelButtonProps) => {
  return (
    <div
      className={classNames(styles.button, COLORS[color as keyof ColorType])}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default DialogLabelButton;
