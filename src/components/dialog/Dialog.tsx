import React, { Children, ReactNode, isValidElement } from 'react';
import { createPortal } from 'react-dom';
import { BaseProps } from '@/core/types/common';
import DialogLabelButton from './DialogLabelButton';
import styles from './Dialog.module.scss';
import DialogDimmed from './DialogDimmed';
import DialogContent from './DialogContent';
import DialogHeader from './DialogHeader';

const DialogLabelButtonType = (<DialogLabelButton />).type;
function getDialogLabelButtons(children: ReactNode) {
  const childrenArray = Children.toArray(children);
  return childrenArray.filter(
    (child) => isValidElement(child) && child.type === DialogLabelButtonType,
  );
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

const DialogHeaderType = (<DialogHeader />).type;
function getDialogHeader(children: ReactNode) {
  const childrenArray = Children.toArray(children);
  return childrenArray
    .filter((child) => isValidElement(child) && child.type === DialogHeaderType)
    .slice(0, 1);
}

const DialogContentType = (<DialogContent />).type;
function getDialogContent(children: ReactNode) {
  const childrenArray = Children.toArray(children);
  return childrenArray
    .filter(
      (child) => isValidElement(child) && child.type === DialogContentType,
    )
    .slice(0, 1);
}

const DialogMain = ({ children, isOpen }: DialogMainProps) => {
  if (!isOpen) {
    return null;
  }
  const dialogHeader = getDialogHeader(children);
  const dialogContent = getDialogContent(children);
  const dialogLabelButtons = getDialogLabelButtons(children);
  const dialogDimmed = getDialogDimmed(children);

  return createPortal(
    <>
      {dialogLabelButtons && (
        <div className={styles.container}>
          {dialogDimmed}
          <div className={styles.dialog}>
            {dialogHeader}
            {dialogContent}
            {dialogLabelButtons}
          </div>
        </div>
      )}
    </>,
    document.body,
  );
};

const Dialog = Object.assign(DialogMain, {
  Header: DialogHeader,
  LabelButton: DialogLabelButton,
  Dimmed: DialogDimmed,
  Content: DialogContent,
});

export default Dialog;
