import React from 'react';
import classnames from 'classnames';
import { BaseProps } from '@/core/types/common';
import styles from './TypoText.module.scss';

interface ColorType {
  primary: string;
  secondary: string;
  essential: string;
  warning: string;
  success: string;
  danger: string;
  gray: string;
  white: string;
  black: string;
}

interface TypoTextProps extends BaseProps {
  color?: keyof ColorType;
  tagName: keyof JSX.IntrinsicElements;
}

const TypoText = ({ color = 'black', tagName, children }: TypoTextProps) => {
  const Element = tagName;

  return (
    <Element
      className={classnames(styles.text, styles[color as keyof ColorType])}
    >
      {children}
    </Element>
  );
};

export default TypoText;
