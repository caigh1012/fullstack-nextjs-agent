import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

type AppLocale = 'en' | 'zh' | 'zh-TW';

function normalizeLocale(value: string | null | undefined): AppLocale | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  const lower = trimmed.toLowerCase();
  if (lower === 'en') return 'en';
  if (lower === 'zh') return 'zh';
  if (lower === 'zh-tw') return 'zh-TW';

  if (lower.startsWith('en-')) return 'en';
  if (lower.startsWith('zh-tw')) return 'zh-TW';
  if (lower.startsWith('zh-hk')) return 'zh-TW';
  if (lower.startsWith('zh-mo')) return 'zh-TW';
  if (lower.startsWith('zh-')) return 'zh';

  return null;
}

function resolveLocaleFromAcceptLanguage(headerValue: string | null): AppLocale | null {
  if (!headerValue) return null;
  const candidates = headerValue
    .split(',')
    .map((part) => part.split(';')[0]?.trim())
    .filter(Boolean) as string[];

  for (const candidate of candidates) {
    const normalized = normalizeLocale(candidate);
    if (normalized) return normalized;
  }

  return null;
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const headerStore = await headers();
  console.log(cookieStore.getAll(), '🚀');

  const fromCookie = normalizeLocale(cookieStore.get('NEXT_LOCALE')?.value ?? null);
  const fromHeader = resolveLocaleFromAcceptLanguage(headerStore.get('accept-language'));
  const locale = fromCookie ?? fromHeader ?? 'en';

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
