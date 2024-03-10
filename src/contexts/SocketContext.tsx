import { Socket } from 'dgram';
import { createContext, ReactNode, useEffect } from 'react';

interface SocketContextProps {
  socket: Socket;
  children: ReactNode;
}

export const SocketContext = createContext<Socket | undefined>(undefined);

export function SocketProvider({ socket, children }: SocketContextProps) {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket server connected.');
    });
    socket.on('disconnect', () => {
      console.log('socket server disconnected.');
    });
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
