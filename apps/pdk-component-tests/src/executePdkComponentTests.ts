import {PdkComponentMap} from '@myparcel-pdk/common';
import {executePdkComponentTest} from './executePdkComponentTest';

export const executePdkComponentTests = (components: Partial<PdkComponentMap>): void => {
  Object.entries(components).forEach(([name, component]) => {
    if (!component) {
      return;
    }

    executePdkComponentTest(name, component);
  });
};
