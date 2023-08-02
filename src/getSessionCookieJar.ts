import { CookieJar } from '@kksiuda/https-request';
import { BrowserWindow } from 'electron/main';
import { addElectronCookiesToJar } from './addElectronCookiesToJar';
import { hasCookies } from './hasCookies';
import { ExpectedCookie } from './types/ExpectedCookie';

export async function getSessionCookieJar(url: string, expectedCookies: ExpectedCookie[]): Promise<CookieJar> {
  return new Promise(async (resolve, reject) => {
    const cookieJar = new CookieJar();
    const win = new BrowserWindow({
      skipTaskbar: true,
      center: true,
      alwaysOnTop: true,
      autoHideMenuBar: true,
      title: 'Login',
    });

    win.webContents.on('did-navigate', async () => {
      const electronCookies = await win.webContents.session.cookies.get({});
      addElectronCookiesToJar(cookieJar, electronCookies);
      if (hasCookies(cookieJar, expectedCookies)) {
        win.close();
        resolve(cookieJar);
      }
    });
    win.loadURL(url);
    win.on('closed', () => reject('Login window closed before obtaining session cookies'));
  });
}
