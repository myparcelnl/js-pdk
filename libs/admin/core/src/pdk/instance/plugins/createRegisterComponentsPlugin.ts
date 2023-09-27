import {type App, type Component, markRaw} from 'vue';
import {mergeWith} from 'lodash-unified';
import {
  AdminComponent,
  type AdminComponentMap,
  optionalAdminActionContainerComponentNames,
  optionalAdminPlainWrapperComponentNames,
  prefixComponent,
  type PrefixedAdminComponent,
  requiredAdminComponentNames,
  unprefixComponent,
} from '@myparcel-pdk/admin-common';
import {type FormConfiguration, MyParcelFormBuilderPlugin} from '@myparcel/vue-form-builder';
import {useLanguage} from '../../../composables';
import {PlainElement} from '../../../components';
import {type PdkAppPlugin} from './plugins.types';

const getOptionalComponents = (app: App): Record<string, Component | AdminComponent> => {
  const isNotRegistered = (component: PrefixedAdminComponent): boolean => app.component(component) === undefined;

  const createComponentMap = (
    componentNames: readonly AdminComponent[],
    fallback: Component | AdminComponent,
  ): Record<string, Component | AdminComponent> => {
    return componentNames
      .map(prefixComponent)
      .filter(isNotRegistered)
      .reduce((acc, componentName) => ({...acc, [componentName]: fallback}), {});
  };

  return {
    ...createComponentMap(optionalAdminPlainWrapperComponentNames, PlainElement),
    ...createComponentMap(optionalAdminActionContainerComponentNames, AdminComponent.Box),
  };
};

/**
 * Registers all replaceable vue components. They must all be provided, for tree shaking purposes.
 */
export const createRegisterComponentsPlugin: PdkAppPlugin = ({config, logger}) => {
  return {
    install(app) {
      const componentsFromConfig: Required<AdminComponentMap> = Object.entries(config.components).reduce(
        (acc, [name, component]) => ({
          ...acc,
          [unprefixComponent(name)]: component,
        }),
        {} as Required<AdminComponentMap>,
      );

      const requiredComponents = {
        ...requiredAdminComponentNames.reduce(
          (acc, name) => ({
            ...acc,
            [name]: null,
          }),
          {},
        ),
        ...componentsFromConfig,
      };

      Object.entries(requiredComponents).forEach(([componentName, component]) => {
        if (!component) {
          logger.error(
            `Missing component: "${componentName}". You must provide your own, or use one provided by one of the @myparcel-pdk/admin-preset-* packages.`,
          );
          return;
        }

        app.component(prefixComponent(componentName), markRaw(component));
      });

      Object.entries(getOptionalComponents(app)).forEach(([componentName, component]) => {
        const componentToRegister = typeof component === 'string' ? componentsFromConfig[component] : component;

        app.component(prefixComponent(componentName), markRaw(componentToRegister));
      });

      const {translate} = useLanguage();

      const defaultConfig: Partial<FormConfiguration> = {
        renderLabel: translate,
        field: {
          wrapper: componentsFromConfig[AdminComponent.FormGroup],
        },
      };

      app.use(MyParcelFormBuilderPlugin, mergeWith(defaultConfig, config.formConfig));

      logger.debug('Installed components plugin.');
    },
  };
};
