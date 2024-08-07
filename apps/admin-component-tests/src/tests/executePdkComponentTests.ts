import {config} from '@vue/test-utils';
import {doComponentTestSetup} from '@myparcel-pdk/admin/testing';
import {type AdminComponent, type AdminComponentMap} from '@myparcel-pdk/admin';
import {wrapperPlugin} from '../helpers/wrapperPlugin';
import {executeAdminComponentTest} from './executeAdminComponentTest';

export const executePdkComponentTests = (components: Partial<AdminComponentMap> = {}): void => {
  config.plugins.VueWrapper.install(wrapperPlugin);

  doComponentTestSetup(components);

  Object.entries(components).forEach(([name, component]) => {
    if (!component) {
      return;
    }

    executeAdminComponentTest(name as AdminComponent, component);
  });
};
