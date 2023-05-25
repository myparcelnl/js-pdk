/* eslint-disable new-cap */
import {type Config} from './setup/types.ts';
import {executeLogins} from './setup/executeLogins.ts';
import {parseConfiguration} from './setup/parseConfiguration.ts';

export const initialize = async (config: Config): Promise<void> => {
  const resolvedConfig = parseConfiguration(config);

  // const testRunner = setupTestRunner(resolvedConfig);

  await executeLogins(resolvedConfig);

  // return testRunner;
};
