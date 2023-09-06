import {config} from '@vue/test-utils';

export const doComponentTestTeardown = (): void => {
  config.global.plugins = [];
  config.global.stubs = {};
};
