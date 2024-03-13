import { useEffect, useState } from 'react';

function useModal(isModalOpen: boolean, delay: number) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let timer: any;
    if (isModalOpen) {
      setIsOpen(true);
    } else {
      timer = setTimeout(() => setIsOpen(false), delay);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [delay, isModalOpen]);

  return isOpen;
}

export default useModal;
