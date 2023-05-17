import React, { ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';
// import useModal from '@/hooks/useModal';

interface ModalProps {
  variant?: 'default' | 'primary';
  isModalOpen: boolean;
  onClose: () => void;
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

function ModalBottom({
  variant = 'default',
  isModalOpen,
  onClose,
  children,
}: ModalProps) {
  //   const isOpen = useModal(isModalOpen, 200);
  //   if (!isOpen) return null;
  return (
    <div
      className={isModalOpen ? 'modalBottom open' : 'modalBottom close'}
      onClick={onClose}
    >
      <section
        className={classNames(
          VARIANTS[variant as keyof VariantTypes],
          isModalOpen
            ? 'modalBottom_section open'
            : 'modalBottom_section close',
        )}
      >
        <header className="modalBottom_header">
          <button className="modalBottom_header_button" />
        </header>
        <main className="modalBottom_main">{children}</main>
      </section>
    </div>
  );
}

export default ModalBottom;
