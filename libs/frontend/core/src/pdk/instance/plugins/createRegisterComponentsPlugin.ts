import {FormConfiguration, MyParcelFormBuilderPlugin} from '@myparcel/vue-form-builder';
import {optionalComponentNames, requiredComponentNames} from '@myparcel-pdk/common';
import {PdkAppPlugin} from './plugins.types';
import {PlainElement} from '../../../components';
import {globalLogger} from '../../../services';
import {markRaw} from 'vue';
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
        ...optionalComponentNames.reduce((acc, name) => ({...acc, [name]: PlainElement}), {}),
        ...requiredComponentNames.reduce((acc, name) => ({...acc, [name]: null}), {}),
        ...config.components,
      };

      Object.entries(components).forEach(([componentName, component]) => {
        if (!component) {
          globalLogger.error(
            `Missing component: "${componentName}". You must provide your own, or use the default(s) from @myparcel/pdk-components.`,
          );
          return;
        }

        markRaw(component);

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
