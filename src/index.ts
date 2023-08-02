import { isMainModule } from './lib/isMainModule';

if (isMainModule(module)) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { runElectron } = require('./runElectron');
  runElectron().then(
    () => console.log('Completed without errors'),
    (err: any) => console.error(err)
  );
} else {
  console.log('is not main module');
}

export { getSessionCookieJar } from './getSessionCookieJar';
