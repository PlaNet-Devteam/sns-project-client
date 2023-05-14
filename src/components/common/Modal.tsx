import React, { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  close: () => void;
  header?: string;
  children: ReactNode;
}

function Modal({ open, close, header, children }: ModalProps) {
  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button onClick={close}>&times;</button>
          </header>
          <main>{children}</main>
        </section>
      ) : null}
    </div>
  );
}

export default Modal;
