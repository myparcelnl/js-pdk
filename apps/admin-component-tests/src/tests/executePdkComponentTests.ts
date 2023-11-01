import {type Component} from 'vue';
import {type AdminComponent, testing} from '@myparcel-pdk/admin';
import {executeAdminComponentTest} from './executeAdminComponentTest';

export const executePdkComponentTests = (components: Partial<Record<AdminComponent, Component>>): void => {
  testing.doComponentTestSetup();

  Object.entries(components).forEach(([name, component]) => {
    if (!component) {
      return;
    }

    executeAdminComponentTest(name as AdminComponent, component);
  });
};
