import React from 'react';
import { createPortal } from 'react-dom';
import { BaseProps } from '@/core/types/common';
import DialogDimmed from '../dialog/DialogDimmed';
import styles from './CommentInputModal.module.scss';

interface DialogMainProps extends BaseProps {
  isOpen: boolean;
  onClose: () => void;
}

const DialogMain = ({ children, isOpen, onClose }: DialogMainProps) => {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <>
      <div className={styles.container}>
        <DialogDimmed onClick={onClose} />
        <div className={styles.dialog}>{children}</div>
      </div>
    </>,
    document.body,
  );
};

const CommentInputModal = DialogMain;

export default CommentInputModal;
