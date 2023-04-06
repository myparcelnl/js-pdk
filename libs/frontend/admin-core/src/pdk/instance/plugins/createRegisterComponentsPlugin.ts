import {
  AdminComponent,
  PrefixedAdminComponent,
  optionalAdminActionContainerComponentNames,
  optionalAdminPlainWrapperComponentNames,
  requiredAdminComponentNames,
} from '@myparcel-pdk/common/src';
import {App, Component, markRaw} from 'vue';
import {FormConfiguration, MyParcelFormBuilderPlugin} from '@myparcel/vue-form-builder/src';
import {memoize, mergeWith} from 'lodash-unified';
import {PdkAppPlugin} from './plugins.types';
import {PlainElement} from '../../../components';
import {prefixComponent} from '../../../helpers';
import {useLanguage} from '../../../composables';

const memoizedGetOptionalComponents = memoize((app: App): Record<string, Component | AdminComponent> => {
  const isNotRegistered = (component: PrefixedAdminComponent): boolean => app.component(component) === undefined;

  const createComponentMap = (
    componentNames: readonly AdminComponent[],
    fallback: Component | PrefixedAdminComponent,
  ): Record<string, Component | AdminComponent> => {
    return componentNames
      .map(prefixComponent)
      .filter(isNotRegistered)
      .reduce((acc, componentName) => ({...acc, [componentName]: fallback}), {});
  };

  return {
    ...createComponentMap(optionalAdminPlainWrapperComponentNames, PlainElement),
    ...createComponentMap(optionalAdminActionContainerComponentNames, prefixComponent(AdminComponent.Box)),
  };
});

/**
 * Registers all replaceable vue components. They must all be provided, for tree shaking purposes.
 */
export const createRegisterComponentsPlugin: PdkAppPlugin = ({config, logger}) => {
  return {
    install(app) {
      const requiredComponents: Record<string, Component> = {
        ...requiredAdminComponentNames.reduce((acc, name) => ({...acc, [prefixComponent(name)]: null}), {}),
        ...config.components,
      };

      Object.entries(requiredComponents).forEach(([componentName, component]) => {
        if (!component) {
          logger.error(
            `Missing component: "${componentName}". You must provide your own, or use one provided by one of the @myparcel-pdk/admin-preset-* packages.`,
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

      const defaultConfig: Partial<FormConfiguration> = {
        renderLabel: translate,
        field: {
          wrapper: config.components.PdkFormGroup,
        },
      };

      app.use(MyParcelFormBuilderPlugin, mergeWith(defaultConfig, config.formConfig));

      logger.debug('Installed components plugin.');
    },
  };
};
