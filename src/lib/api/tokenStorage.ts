const KEY = 'gasapp.station.token';

// Storage can throw (private window, blocked site data). Treat that as "no token".
export function getToken(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string): void {
  try {
    localStorage.setItem(KEY, token);
  } catch {
    // The session lasts until reload when storage is blocked.
    memoryToken = token;
  }
}

export function clearToken(): void {
  memoryToken = null;
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Nothing stored, nothing to clear.
  }
}

let memoryToken: string | null = null;

export function readToken(): string | null {
  return getToken() ?? memoryToken;
}
