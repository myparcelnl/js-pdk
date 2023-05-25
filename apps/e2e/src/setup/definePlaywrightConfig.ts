/* eslint-disable @typescript-eslint/no-magic-numbers */
import {type PlaywrightTestConfig} from '@playwright/test/types/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export const definePlaywrightConfig = <E extends PlaywrightTestConfig>(config?: E): PlaywrightTestConfig => {
  return {
    globalSetup: './global-setup.ts',
    testDir: './tests',
    timeout: 30 * 1000,
    expect: {
      timeout: 5000,
    },
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
      actionTimeout: 10 * 1000,
      /* Base URL to use in actions like `await page.goto('/')`. */
      baseURL: process.env.PW_BASE_URL,

      /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
      testIdAttribute: 'data-test-id',

      /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
      trace: 'on-first-retry',
    },

    projects: [],

    /* Folder for test artifacts such as screenshots, videos, traces, etc. */
    outputDir: 'test-results/',
    ...config,
  };
};
