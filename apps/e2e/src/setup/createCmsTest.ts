import {type Config} from './types.ts';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createCmsTest = (config: Omit<Config, 'loginAsAdmin' | 'loginAsUser'>) => {
  // return test.extend<ExtendedCmsFixtures>(registerFixtures(config));
};
