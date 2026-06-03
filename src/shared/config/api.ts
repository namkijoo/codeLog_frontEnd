const DEV_API_BASE_URL = 'http://localhost:8080';

export function getApiUrl(path: string): string {
  const base = (
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    (process.env.NODE_ENV === 'development' ? DEV_API_BASE_URL : '')
  ).replace(/\/$/, '');

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
