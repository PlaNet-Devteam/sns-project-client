import React, { Children, ReactNode, isValidElement } from 'react';
import { createPortal } from 'react-dom';
import { BaseProps } from '@/core/types/common';
import DialogDimmed from '../dialog/DialogDimmed';
import styles from './CommentInputModal.module.scss';
import CommentInput from './CommentInput';

const DialogDimmedTye = (<DialogDimmed />).type;
function getDialogDimmed(children: ReactNode) {
  const childrenArray = Children.toArray(children);
  return childrenArray
    .filter((child) => isValidElement(child) && child.type === DialogDimmedTye)
    .slice(0, 1);
}

interface DialogMainProps extends BaseProps {
  isOpen: boolean;
}

const DialogMain = ({ children, isOpen }: DialogMainProps) => {
  if (!isOpen) {
    return null;
  }

  const dialogDimmed = getDialogDimmed(children);

  return createPortal(
    <div>
      <div className={styles.container}>
        {dialogDimmed}
        <div className={styles.dialog}>
          <CommentInput />
        </div>
      </div>
    </div>,
    document.body,
  );
};

const CommentInputModal = Object.assign(DialogMain, {
  Dimmed: DialogDimmed,
});

export default CommentInputModal;
