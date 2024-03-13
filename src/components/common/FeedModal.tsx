import React, { useRef } from 'react';
import classNames from 'classnames';
import { createPortal } from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import useModal from '@/hooks/useModal';
import { BaseProps } from '@/core/types/common';
import styles from './FeedModal.module.scss';
import Button from './Button';

interface FeedModalProps extends BaseProps {
  isModalOpen: boolean;
  onClickCloseModal?: () => void;
}

const FeedModal = ({
  isModalOpen,
  onClickCloseModal,
  children,
}: FeedModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const isOpen = useModal(isModalOpen, 100);

  if (!isOpen) return null;

  return createPortal(
    <>
      <div
        className={classNames(
          styles.container,
          { [styles.is_opened]: isOpen },
          { [styles.is_closed]: !isOpen },
        )}
      >
        <section ref={modalRef} className={styles.modal}>
          <Button
            iconOnly
            className={styles.button}
            onClick={onClickCloseModal}
          >
            <AiOutlineClose color="white" size={'1.5rem'} />
          </Button>
          <main className={styles.content}>{children}</main>
        </section>
      </div>
    </>,
    document.body,
  );
};

export default FeedModal;
