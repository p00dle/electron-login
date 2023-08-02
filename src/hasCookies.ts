import { CookieJar } from '@kksiuda/https-request';
import { ExpectedCookie } from './types/ExpectedCookie';

export function hasCookies(cookieJar: CookieJar, expectedCookies: ExpectedCookie[]): boolean {
  return expectedCookies.every((cookie) =>
    typeof cookie === 'string' ? !!cookieJar.getCookie(cookie) : !!cookieJar.getCookie(cookie.key, cookie.domain, cookie.path)
  );
}
