/* eslint-disable new-cap */
import {
  type Fixtures,
  type PlaywrightTestArgs,
  type PlaywrightTestOptions,
  type PlaywrightWorkerArgs,
  type PlaywrightWorkerOptions,
} from '@playwright/test/types/test';
import {type Config, type ExtendedCmsFixtures} from './types.ts';
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
