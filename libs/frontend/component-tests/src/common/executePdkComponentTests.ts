import {PdkComponentMap, PdkComponentName} from '@myparcel-pdk/frontend-shared';
import {executePdkComponentTest} from './executePdkComponentTest';

export const executePdkComponentTests = (components: Partial<PdkComponentMap>): void => {
  Object.entries(components).forEach(([name, component]) => {
    executePdkComponentTest(name as PdkComponentName, component);
  });
};
