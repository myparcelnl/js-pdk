import {FormConfiguration, MyParcelFormBuilderPlugin} from '@myparcel/vue-form-builder';
import {PdkAppPlugin} from './plugins.types';
import {componentNames} from '@myparcel-pdk/common';
import {globalLogger} from '../../../services';
import {merge} from 'lodash-unified';
import {useTranslate} from '../../../composables';

/**
 * Registers all replaceable vue components. They must all be provided, for tree shaking purposes.
 */
export const createRegisterComponentsPlugin: PdkAppPlugin = ({config, logger}) => {
  return {
    install(app) {
      logger.debug(`Installing components plugin`);

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

      const translate = useTranslate();

      app.use(
        MyParcelFormBuilderPlugin,
        merge(
          {
            renderLabel: translate,
            field: {
              wrapper: config.components.PdkFormGroup,
            },
          },
          config.formConfig,
        ) as FormConfiguration,
      );
    },
  };
};
