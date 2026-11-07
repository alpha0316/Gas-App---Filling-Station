import { io, type Socket } from 'socket.io-client';
import { SOCKET_URL } from './config';
import { readToken } from './api/tokenStorage';

let socket: Socket | null = null;

// One shared connection per signed-in session. Returns null when there is no token.
export function getSocket(): Socket | null {
  const token = readToken();
  if (!token) return null;
  if (!socket) {
    socket = io(SOCKET_URL, { path: '/socket.io', auth: { token } });
  }
  return socket;
}

export function disconnectSocket(): void {
  socket?.disconnect();
  socket = null;
}
