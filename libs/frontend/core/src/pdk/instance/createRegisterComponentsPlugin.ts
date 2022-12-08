import {PdkComponentMap, PdkComponentName, componentNames, logger} from '@myparcel-pdk/common';
import {Plugin} from 'vue';

type RegisterComponentsPlugin = (components: PdkComponentMap) => Plugin;

const baseComponents = Object.freeze(
  componentNames.reduce(
    (acc, name) => ({
      ...acc,
      [name]: null,
    }),
    {} as Record<PdkComponentName, null>,
  ),
);

/**
 * All components must be manually passed, because dynamic importing is not performant enough.
 */
export const createRegisterComponentsPlugin: RegisterComponentsPlugin = (components) => {
  return {
    install(app) {
      logger.debug('Installing components plugin');

      Object.entries({...baseComponents, ...components}).forEach(([name, component]) => {
        if (!component) {
          logger.error(
            `Component is missing: ${name}. You must provide your own, or pass DefaultPdk${name} in your config.`,
          );
          return;
        }

        app.component(name, component);
      });
    },
  };
};
