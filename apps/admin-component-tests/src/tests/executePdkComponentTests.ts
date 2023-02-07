import {PdkComponentMap, PdkComponentName} from '@myparcel-pdk/common/src';
import {doComponentTestSetup} from '../tests';
import {executePdkComponentTest} from './executePdkComponentTest';
import {vi} from 'vitest';

export const executePdkComponentTests = (components: Partial<PdkComponentMap>): void => {
  vi.spyOn(console, 'log');
  vi.spyOn(console, 'warn');
  vi.spyOn(console, 'error');

  doComponentTestSetup();

  Object.entries(components).forEach(([name, component]) => {
    if (!component) {
      return;
    }

    executePdkComponentTest(name as PdkComponentName, component);
  });
};
