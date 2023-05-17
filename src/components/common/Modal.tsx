import React, { ReactNode } from 'react';
import classNames from 'classnames';
// import useModal from '@/hooks/useModal';

interface ModalProps {
  variant?: 'default' | 'primary';
  isModalOpen: boolean;
  onClose: () => void;
  headerText?: string;
  children?: ReactNode;
}

type VariantTypes = {
  default: string;
  primary: string;
};

const VARIANTS: VariantTypes = {
  default: 'default',
  primary: 'primary',
};

function Modal({
  variant = 'default',
  isModalOpen,
  onClose,
  headerText,
  children,
}: ModalProps) {
  //   const isOpen = useModal(isModalOpen, 100);
  //   if (!isOpen) return null;
  return (
    <div className={isModalOpen ? 'modal open' : 'modal close'}>
      {isModalOpen ? (
        <section
          className={classNames(
            VARIANTS[variant as keyof VariantTypes],
            isModalOpen ? 'modal_section open' : 'modal_section close',
          )}
        >
          <header className="modal_header">
            {headerText}
            <button onClick={onClose}>&times;</button>
          </header>
          <main className="modal_main">{children}</main>
        </section>
      ) : null}
    </div>
  );
}

export default Modal;
