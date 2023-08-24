import React, { Children, ReactNode, isValidElement } from 'react';
import { createPortal } from 'react-dom';
import { BaseProps } from '@/core/types/common';
import DialogLabelButton from './DialogLabelButton';
import styles from './Dialog.module.scss';
import DialogDimmed from './DialogDimmed';

// * 라벨버튼은 최대 2개만 가져오기
const DialogLabelButtonType = (<DialogLabelButton />).type;
function getDialogLabelButtons(children: ReactNode) {
  const childrenArray = Children.toArray(children);
  return childrenArray
    .filter(
      (child) => isValidElement(child) && child.type === DialogLabelButtonType,
    )
    .slice(0, 2);
}

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

  const dialogLabelButtons = getDialogLabelButtons(children);
  const dialogDimmed = getDialogDimmed(children);

  return createPortal(
    <div>
      {dialogLabelButtons && (
        <div className={styles.container}>
          {dialogDimmed}
          <div className={styles.dialog}>{dialogLabelButtons}</div>
        </div>
      )}
    </div>,
    document.body,
  );
};

const Dialog = Object.assign(DialogMain, {
  LabelButton: DialogLabelButton,
  Dimmed: DialogDimmed,
});

export default Dialog;
