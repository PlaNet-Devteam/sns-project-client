import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { BaseProps } from '@/core/types/common';
interface ButtonProps extends BaseProps {
  variant?: keyof VariantType;
  size?: 'sm' | 'md' | 'lg';
  color?: keyof ColorType;
  isFull?: boolean;
  isEnglish?: boolean;
  isDisabled?: boolean;
  to?: string | undefined;
  type?: 'button' | 'submit' | undefined;
  iconSize?: 'sm' | 'md' | 'lg';
  iconOnly?: boolean;
  onClick?: (
    event:
      | React.MouseEvent<Element, MouseEvent>
      | React.FormEvent<HTMLFormElement>,
  ) => void;
}

interface VariantType {
  default: string;
  primary: string;
  secondary: string;
  essential: string;
  ghost: string;
  danger: string;
  gray: string;
}

interface SizeType {
  sm: string;
  md: string;
  lg: string;
}

interface ColorType {
  essential: string;
  white: string;
  black: string;
  success: string;
  danger: string;
  gray: string;
}
interface IconSizeType {
  sm: string;
  md: string;
  lg: string;
}

const SIZES: SizeType = {
  sm: 'button-size--sm',
  md: 'button-size--md',
  lg: 'button-size--lg',
};

const VARIANTS: VariantType = {
  default: 'button-bg--default',
  primary: 'button-bg--primary',
  secondary: 'button-bg--secondary',
  essential: 'button-bg--essential',
  danger: 'button-bg--danger',
  ghost: 'button-bg--ghost',
  gray: 'button-bg--gray',
};

const COLORS: ColorType = {
  essential: 'button-text--essential',
  white: 'button-text--white',
  black: 'button-text--black',
  success: 'button-text--success',
  danger: 'button-text--danger',
  gray: 'button-text--gray',
};

const ICON_SIZES: IconSizeType = {
  sm: 'button__image-size--sm',
  md: 'button__image-size--md',
  lg: 'button__image-size--lg',
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
  iconSize = 'sm',
  iconOnly,
  onClick,
}: ButtonProps) => {
  const classNameValues = classNames(
    'button',
    SIZES[size as keyof SizeType],
    VARIANTS[variant as keyof VariantType],
    COLORS[color as keyof ColorType],
    { 'button-size--full': isFull },
    { 'button-text--english': isEnglish },
    { 'button--disabled': isDisabled },
    { 'button--icon-only': iconOnly },
    className,
  );
  // 링크 기능을 하는 버튼 (to props를 사용했을 때)
  if (to) {
    return (
      <Link href={to} className={classNameValues}>
        <span
          className={classNames(
            'button__image',
            ICON_SIZES[iconSize as keyof IconSizeType],
          )}
        >
          {children}
        </span>
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
      <span
        className={classNames(
          'button__image',
          ICON_SIZES[iconSize as keyof IconSizeType],
        )}
      >
        {children}
      </span>
    </button>
  );

  return EventButton;
};

export default Button;
