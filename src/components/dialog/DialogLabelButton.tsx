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
  gray: string;
}

const COLORS: ColorType = {
  essential: 'essential',
  white: 'white',
  black: 'black',
  success: 'success',
  danger: 'danger',
  gray: 'gray',
};

interface DialogLabelButtonProps extends BaseProps {
  color?: keyof ColorType;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const DialogLabelButton = ({
  color,
  children,
  onClick,
}: DialogLabelButtonProps) => {
  return (
    <div
      className={classNames(
        styles.button,
        styles[COLORS[color as keyof ColorType]],
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default DialogLabelButton;
