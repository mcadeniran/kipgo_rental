import { routing } from '@/i18n/routing';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kipgoo.com';

export function getLocalizedPath(locale: string, path = '') {
  const normalizedPath = path === '/' ? '' : path.replace(/^\/+/, '');

  const isDefaultLocale = locale === routing.defaultLocale;

  if (isDefaultLocale) {
    return normalizedPath ? `/${normalizedPath}` : '/';
  }

  return normalizedPath ? `/${locale}/${normalizedPath}` : `/${locale}`;
}

export function getLocalizedUrl(locale: string, path = '') {
  return `${SITE_URL}${getLocalizedPath(locale, path)}`;
}

export function getLanguageAlternates(path = '') {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, getLocalizedUrl(locale, path)]),
  );
}
