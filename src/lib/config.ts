const apiUrl: string | undefined =
  import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? 'http://localhost:4000/api/v1' : undefined)

if (!apiUrl) {
  throw new Error('VITE_API_URL is not set. Add it to your .env file.')
}

export const API_URL = apiUrl.replace(/\/$/, '')
// Socket.IO lives on the API host, not under /api/v1.
export const SOCKET_URL = new URL(API_URL).origin
