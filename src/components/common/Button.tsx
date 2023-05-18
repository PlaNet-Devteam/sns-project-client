import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import React, { ReactNode } from 'react';

type ButtonProps = {
  variant?: 'default' | 'primary' | 'secondary' | 'essential';
  size?: 'sm' | 'md' | 'lg';
  color?: 'essential' | 'white' | 'black' | 'success' | 'danger';
  isFull?: boolean;
  isEnglish?: boolean;
  children?: ReactNode;
  className?: string;
  isDisabled?: boolean;
  to?: string | undefined;
  type?: 'button' | 'submit' | undefined;
  onClick?: (
    e:
      | React.MouseEvent<Element, MouseEvent>
      | React.FormEvent<HTMLFormElement>
      | any,
  ) => void;
};

type VariantTypes = {
  default: string;
  primary: string;
  secondary: string;
  essential: string;
};

type SizeTypes = {
  sm: string;
  md: string;
  lg: string;
};

type ColorTypes = {
  essential: string;
  white: string;
  black: string;
  success: string;
  danger: string;
};

const SIZES: SizeTypes = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

const VARIANTS: VariantTypes = {
  default: 'default',
  primary: 'primary',
  secondary: 'secondary',
  essential: 'essential',
};

const COLORS: ColorTypes = {
  essential: 'text_essential',
  white: 'text_white',
  black: 'text_black',
  success: 'text_success',
  danger: 'text_danger',
};

const Button = ({
  variant = 'default',
  color,
  size = 'md',
  isFull,
  isEnglish,
  children,
  className,
  isDisabled,
  to,
  type,
  onClick,
}: ButtonProps) => {
  const classNameValues = classNames(
    'button',
    SIZES[size as keyof SizeTypes],
    VARIANTS[variant as keyof VariantTypes],
    COLORS[color as keyof ColorTypes],
    { is_full: isFull },
    { is_english: isEnglish },
    { is_disabled: isDisabled },
    className,
  );

  // 링크 기능을 하는 버튼 (to props를 사용했을 때)
  if (to) {
    return (
      <Link href={to} className={classNameValues}>
        {children}
      </Link>
    );
  }

  // 이벤트 핸들러 기능을 하는 버튼  (onClick props를 사용했을 때)
  const EventButton = (
    <button
      type={type}
      className={classNameValues}
      disabled={isDisabled}
      onClick={onClick}
    >
      <span className="icon">{children}</span>
    </button>
  );

  return EventButton;
};

export default Button;
