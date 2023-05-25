import {LoginCallback, ResolvedConfig} from './types.ts';

type LoginItem = {
  callback: LoginCallback;
  statePath: string;
};

export const executeLogins = async (resolvedConfig: ResolvedConfig): Promise<void> => {
  const browserType = resolvedConfig.loginBrowser;
  const browser = await browserType.launch();

  const loginMethods: LoginItem[] = [
    {callback: resolvedConfig.loginAsAdmin, statePath: resolvedConfig.credentialsFileAdmin},
    {callback: resolvedConfig.loginAsUser, statePath: resolvedConfig.credentialsFileUser},
  ];

  await Promise.all(
    loginMethods.map(async ({callback, statePath}) => {
      const page = await browser.newPage();

      await callback(page);

      await page.context().storageState({path: statePath});
    }),
  );
};
