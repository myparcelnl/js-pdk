/* eslint-disable new-cap */
import {Config, ExtendedCmsFixtures} from './types.ts';
import {
  Fixtures,
  PlaywrightTestArgs,
  PlaywrightTestOptions,
  PlaywrightWorkerArgs,
  PlaywrightWorkerOptions,
} from '@playwright/test/types/test';
import {parseConfiguration} from './parseConfiguration.ts';

export const registerFixtures = (
  config: Omit<Config, 'loginAsAdmin' | 'loginAsUser'>,
): Fixtures<
  ExtendedCmsFixtures,
  object,
  PlaywrightTestArgs & PlaywrightTestOptions,
  PlaywrightWorkerArgs & PlaywrightWorkerOptions
> => {
  const resolvedConfig = parseConfiguration(config as Config);

  return {
    asAdmin: async ({browser}, use) => {
      const context = await browser.newContext({storageState: resolvedConfig.credentialsFileAdmin});
      const page = await context.newPage();

      await use(new (resolvedConfig.asAdmin())(page));
    },

    asLoggedInUser: async ({browser}, use) => {
      const context = await browser.newContext({storageState: resolvedConfig.credentialsFileUser});
      const page = await context.newPage();

      await use(new (resolvedConfig.asLoggedInUser())(page));
    },

    asGuest: async ({page}, use) => {
      await use(new (resolvedConfig.asGuest())(page));
    },
  };
};
