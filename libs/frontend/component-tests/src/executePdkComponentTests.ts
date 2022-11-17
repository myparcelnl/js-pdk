import {ComponentMap, PdkComponentName} from '@myparcel-pdk/frontend-shared';
import {executePdkComponentTest} from './executePdkComponentTest';

export const executePdkComponentTests = (components: Partial<ComponentMap>) => {
  Object.entries(components).forEach(([name, component]) => {
    executePdkComponentTest(name as PdkComponentName, component);
  });
};
