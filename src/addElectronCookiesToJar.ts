import { CookieJar, makeCookie } from '@kksiuda/https-request';
import * as Electron from 'electron';

const sameSiteMap: Record<Electron.Cookie['sameSite'], 'Strict' | 'Lax' | 'None'> = {
  lax: 'Lax',
  no_restriction: 'None',
  strict: 'Strict',
  unspecified: 'Lax',
};

export function addElectronCookiesToJar(cookieJar: CookieJar, electronCookies: Electron.Cookie[]): void {
  cookieJar.addCookies(
    electronCookies.map((cookie) =>
      makeCookie({
        key: cookie.name,
        value: cookie.value,
        domain: typeof cookie.domain === 'string' && cookie.domain.startsWith('.') ? cookie.domain.slice(1) : cookie.domain,
        path: cookie.path,
        secure: cookie.secure,
        expires: cookie.expirationDate ? cookie.expirationDate * 1000 : null,
        sameSite: sameSiteMap[cookie.sameSite],
        allowSubDomains: typeof cookie.domain === 'string' && cookie.domain.startsWith('.'),
      })
    )
  );
}
