import { app } from 'electron';
import { login } from './login';

const externalAppUrl = process.env.EXTERNAL_APP_URL || 'https://mail.google.com/mail/u/0/#inbox';
const cookieNames = typeof process.env.GET_COOKIES === 'string' ? process.env.GET_COOKIES.trim().split(',') : ['SID', 'SSID'];

export async function runElectron() {
  await app.whenReady();
  const cookieJar = await login(externalAppUrl, cookieNames);
  console.log(cookieJar);
}
