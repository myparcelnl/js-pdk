import {PdkAppPlugin} from '../types';
import {componentNames} from '@myparcel-pdk/common';
import {globalLogger} from '../../services';

/**
 * Registers all replaceable vue components. They must all be provided, for tree shaking purposes.
 */
export const createRegisterComponentsPlugin: PdkAppPlugin = ({config}) => {
  return {
    install(app) {
      globalLogger.debug(`Installing components plugin`);

      const components = {
        ...componentNames.reduce((acc, name) => ({...acc, [name]: null}), {}),
        ...config.components,
      };

      Object.entries(components).forEach(([componentName, component]) => {
        if (!component) {
          globalLogger.error(
            `Missing component: "${componentName}". You must provide your own, or use the default(s) from @myparcel/pdk-components.`,
          );
          return;
        }

        app.component(componentName, component);
      });
    },
  };
};
