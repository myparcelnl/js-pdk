import {AdminComponentMap, AdminComponentName} from '@myparcel-pdk/common/src';
import {doComponentTestSetup} from '../tests';
import {executeAdminComponentTest} from './executeAdminComponentTest';
import {vi} from 'vitest';

export const executePdkComponentTests = (components: Partial<AdminComponentMap>): void => {
  vi.spyOn(console, 'log');
  vi.spyOn(console, 'warn');
  vi.spyOn(console, 'error');

  doComponentTestSetup();

  Object.entries(components).forEach(([name, component]) => {
    if (!component) {
      return;
    }

    executeAdminComponentTest(name as AdminComponentName, component);
  });
};
