import React from 'react';
import classNames from 'classnames';
import useModal from '@/hooks/useModal';
import { BaseProps } from '@/core/types/common';

interface ModalProps extends BaseProps {
  variant?: 'default' | 'primary';
  isModalOpen: boolean;
  onClickCloseModal: () => void;
}

interface VariantType {
  default: string;
  primary: string;
}

const VARIANTS: VariantType = {
  default: 'modalBottom-section--default',
  primary: 'modalBottom-section--primary',
};

function ModalBottom({
  variant = 'default',
  isModalOpen,
  onClickCloseModal,
  children,
}: ModalProps) {
  const isOpen = useModal(isModalOpen, 200);
  if (!isOpen) return null;
  return (
    <div
      className={
        isOpen
          ? 'modalBottom modalBottom--opened'
          : 'modalBottom modalBottom--closed'
      }
      onClick={onClickCloseModal}
    >
      <section
        className={classNames(
          VARIANTS[variant as keyof VariantType],
          isModalOpen
            ? 'modalBottom-section modalBottom-section--opened'
            : 'modalBottom-section modalBottom-section--closed',
        )}
      >
        <header className="modalBottom-header">
          <button className="modalBottom-header__button" />
        </header>
        <main className="modalBottom-main">{children}</main>
      </section>
    </div>
  );
}

export default ModalBottom;
