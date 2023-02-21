import {AdminComponentMap, AdminComponentName} from '@myparcel-pdk/common/src';
import {afterEach, beforeEach, vi} from 'vitest';
import {doComponentTestSetup} from '../tests';
import {executeAdminComponentTest} from './executeAdminComponentTest';

export const executePdkComponentTests = (components: Partial<AdminComponentMap>): void => {
  beforeEach(() => {
    vi.spyOn(console, 'log');
    vi.spyOn(console, 'warn');
    vi.spyOn(console, 'error');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  doComponentTestSetup();

  Object.entries(components).forEach(([name, component]) => {
    if (!component) {
      return;
    }

    executeAdminComponentTest(name as AdminComponentName, component);
  });
};
