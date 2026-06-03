'use client';

import {
  ACCESS_TOKEN_KEY,
  AUTH_COOKIE_KEY,
  AUTH_COOKIE_MAX_AGE,
  REFRESH_TOKEN_KEY,
} from './constants';

type AuthTokenResponse = {
  accessToken?: string;
  token?: string;
  refreshToken?: string;
};

function resolveAccessToken(response: AuthTokenResponse): string | null {
  return response.accessToken ?? response.token ?? null;
}

function clearTokenStorage(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function setAuthCookie(token: string, remember: boolean): void {
  const parts = [
    `${AUTH_COOKIE_KEY}=${encodeURIComponent(token)}`,
    'path=/',
    'SameSite=Lax',
  ];

  if (remember) {
    parts.push(`max-age=${AUTH_COOKIE_MAX_AGE}`);
  }

  document.cookie = parts.join('; ');
}

export function clearAuthCookie(): void {
  document.cookie = `${AUTH_COOKIE_KEY}=; path=/; max-age=0`;
}

export function syncAuthCookie(): void {
  const fromLocal = localStorage.getItem(ACCESS_TOKEN_KEY);
  const fromSession = sessionStorage.getItem(ACCESS_TOKEN_KEY);
  const token = fromLocal ?? fromSession;

  if (!token) {
    clearAuthCookie();
    return;
  }

  setAuthCookie(token, Boolean(fromLocal));
}

export function saveAuthTokens(response: AuthTokenResponse, remember: boolean): void {
  const accessToken = resolveAccessToken(response);
  if (!accessToken) return;

  clearTokenStorage();

  const storage = remember ? localStorage : sessionStorage;
  storage.setItem(ACCESS_TOKEN_KEY, accessToken);

  if (response.refreshToken) {
    storage.setItem(REFRESH_TOKEN_KEY, response.refreshToken);
  }

  setAuthCookie(accessToken, remember);
}

function getAccessTokenFromCookie(): string | null {
  if (typeof document === 'undefined') return null;

  const match = document.cookie.match(new RegExp(`(?:^|; )${AUTH_COOKIE_KEY}=([^;]*)`));
  if (!match?.[1]) return null;

  try {
    return decodeURIComponent(match[1]);
  } catch {
    return null;
  }
}

export function getAccessToken(): string | null {
  return (
    localStorage.getItem(ACCESS_TOKEN_KEY) ??
    sessionStorage.getItem(ACCESS_TOKEN_KEY) ??
    getAccessTokenFromCookie()
  );
}

export function clearAuthTokens(): void {
  clearTokenStorage();
  clearAuthCookie();
}
