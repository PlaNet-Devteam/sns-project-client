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
  default: 'Img-modal-section--default',
  primary: 'Img-modal-section--primary',
};

function ImgModal({
  variant = 'default',
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
            ? 'Img-modal-section Img-modal-section--opened'
            : 'Img-modal-section Img-modal-section--closed',
        )}
      >
        <main className="Img-modal-main">{children}</main>
      </section>
    </div>
  );
}

export default ImgModal;
