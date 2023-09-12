import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import useModal from '@/hooks/useModal';
import { BaseProps } from '@/core/types/common';

interface ModalProps extends BaseProps {
  modalPurpose: string;
  headerText?: string;
  isModalOpen: boolean;
  onClickCloseModal: () => void;
}

const FeedModal = ({
  modalPurpose,
  isModalOpen,
  onClickCloseModal,
  children,
}: ModalProps) => {
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

  const getFeedModalSection = (modalPurpose: string, isModalOpen: boolean) => {
    if (isModalOpen) {
      return `${modalPurpose}-modal-section ${modalPurpose}-modal-section--opened`;
    }
    return `${modalPurpose}-modal-section ${modalPurpose}-modal-section--closed`;
  };

  const isOpen = useModal(isModalOpen, 100);
  if (!isOpen) return null;
  return (
    <div className={isOpen ? 'modal modal--opened' : 'modal modal--closed'}>
      <section
        ref={modalRef}
        className={classNames(
          `${modalPurpose}-modal-section`,
          getFeedModalSection(modalPurpose, isModalOpen),
        )}
      >
        <header className={`${modalPurpose}-modal-header`}>
          <button
            className={`${modalPurpose}-modal-header__button`}
            onClick={onClickCloseModal}
          >
            &times;
          </button>
        </header>
        <main className={`${modalPurpose}-modal-main`}>{children}</main>
      </section>
    </div>
  );
};

export default FeedModal;
