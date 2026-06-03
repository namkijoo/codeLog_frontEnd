import type { LoginResponse } from '../model/types';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

function resolveAccessToken(response: LoginResponse): string | null {
  return response.accessToken ?? response.token ?? null;
}

export function saveAuthTokens(response: LoginResponse, remember: boolean): void {
  const accessToken = resolveAccessToken(response);
  if (!accessToken) return;

  const storage = remember ? localStorage : sessionStorage;
  storage.setItem(ACCESS_TOKEN_KEY, accessToken);

  if (response.refreshToken) {
    storage.setItem(REFRESH_TOKEN_KEY, response.refreshToken);
  }
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY) ?? sessionStorage.getItem(ACCESS_TOKEN_KEY);
}
