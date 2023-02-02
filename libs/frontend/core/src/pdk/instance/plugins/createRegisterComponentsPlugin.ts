import {App, Component, markRaw} from 'vue';
import {FormConfiguration, MyParcelFormBuilderPlugin} from '@myparcel/vue-form-builder';
import {
  PdkComponentName,
  optionalActionContainerComponentNames,
  optionalPlainWrapperComponentNames,
  requiredComponentNames,
} from '@myparcel-pdk/common';
import {memoize, mergeWith} from 'lodash-unified';
import {PdkAppPlugin} from './plugins.types';
import {PlainElement} from '../../../components';
import {useLanguage} from '../../../composables';

const memoizedGetOptionalComponents = memoize((app: App): Record<string, Component | PdkComponentName> => {
  const isNotRegistered = (component: string): boolean => app.component(component) === undefined;

  const createComponentMap = (
    componentNames: readonly PdkComponentName[],
    fallback: Component | PdkComponentName,
  ): Record<string, Component | PdkComponentName> => {
    return componentNames
      .filter(isNotRegistered)
      .reduce((acc, componentName) => ({...acc, [componentName]: fallback}), {});
  };

  return {
    ...createComponentMap(optionalPlainWrapperComponentNames, PlainElement),
    ...createComponentMap(optionalActionContainerComponentNames, 'PdkCard'),
  };
});

/**
 * Registers all replaceable vue components. They must all be provided, for tree shaking purposes.
 */
export const createRegisterComponentsPlugin: PdkAppPlugin = ({config, logger}) => {
  return {
    install(app) {
      const requiredComponents: Record<string, Component> = {
        ...requiredComponentNames.reduce((acc, name) => ({...acc, [name]: null}), {}),
        ...config.components,
      };

      Object.entries(requiredComponents).forEach(([componentName, component]) => {
        if (!component) {
          logger.error(
            `Missing component: "${componentName}". You must provide your own, or use the default(s) from @myparcel-pdk/admin-components.`,
          );
          return;
        }

        app.component(componentName, markRaw(component));
      });

      Object.entries(memoizedGetOptionalComponents(app)).forEach(([componentName, component]) => {
        const componentToRegister = typeof component === 'string' ? requiredComponents[component] : component;

        app.component(componentName, markRaw(componentToRegister));
      });

      const {translate} = useLanguage();

      app.use(
        MyParcelFormBuilderPlugin,
        mergeWith(
          {
            renderLabel: translate,
            field: {
              wrapper: config.components.PdkFormGroup,
            },
          },
          config.formConfig,
        ) as FormConfiguration,
      );

      logger.debug('Installed components plugin.');
    },
  };
};
