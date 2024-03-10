import { useContext } from 'react';
import { SocketContext } from '@/contexts/SocketContext';

const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error('useSocket은 SocketProvider에서만 동작합니다');
  }
  return socket;
};

export default useSocket;
