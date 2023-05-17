import React, { ReactNode } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import Image from 'next/image';

type ButtonProps = {
  variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'dashed';
  size?: 'sm' | 'md' | 'lg';
  color?: 'essential' | 'white' | 'black' | 'success' | 'danger';
  full?: boolean;
  en?: boolean;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
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
};

const COLORS: ColorTypes = {
  essential: 'text_essential',
  white: 'text_white',
  black: 'text_black',
  success: 'text_success',
  danger: 'text_danger',
};

const Button = ({
  type,
  variant = 'default',
  color,
  size = 'md',
  full,
  en,
  children,
  className,
  disabled,
  to,
  onClick,
}: ButtonProps) => {
  const classNameValues = classNames(
    'button',
    SIZES[size as keyof SizeTypes],
    VARIANTS[variant as keyof VariantTypes],
    COLORS[color as keyof ColorTypes],
    { is_full: full },
    { is_english: en },
    { is_disabled: disabled },
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
      disabled={disabled}
      onClick={onClick}
    >
      <span className="icon">{children}</span>
    </button>
  );

  return EventButton;
};

export default Button;
