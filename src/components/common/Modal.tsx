import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import useModal from '@/hooks/useModal';
import { BaseProps } from '@/core/types/common';

interface ModalProps extends BaseProps {
  variant?: 'default' | 'primary';
  headerText?: string;
  isModalOpen: boolean;
  onClickCloseModal: () => void;
}

interface VariantType {
  default: string;
  primary: string;
}

const VARIANTS: VariantType = {
  default: 'modal-section--default',
  primary: 'modal-section--primary',
};

function Modal({
  variant = 'default',
  headerText,
  isModalOpen,
  onClickCloseModal,
  children,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node | null)
      ) {
        onClickCloseModal();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClickCloseModal]);

  const isOpen = useModal(isModalOpen, 100);
  if (!isOpen) return null;
  return (
    <div className={isOpen ? 'modal modal--opened' : 'modal modal--closed'}>
      <section
        ref={modalRef}
        className={classNames(
          VARIANTS[variant as keyof VariantType],
          isModalOpen
            ? 'modal-section modal-section--opened'
            : 'modal-section modal-section--closed',
        )}
      >
        <header className="modal-header">
          {headerText}
          <button className="modal-header__button" onClick={onClickCloseModal}>
            &times;
          </button>
        </header>
        <main className="modal-main">{children}</main>
      </section>
    </div>
  );
}

export default Modal;
