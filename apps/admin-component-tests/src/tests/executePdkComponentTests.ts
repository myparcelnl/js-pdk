import {type Component} from 'vue';
import {doComponentTestSetup} from '@myparcel-pdk/admin/testing';
import {type AdminComponent} from '@myparcel-pdk/admin';
import {executeAdminComponentTest} from './executeAdminComponentTest';

export const executePdkComponentTests = (components: Partial<Record<AdminComponent, Component>>): void => {
  doComponentTestSetup(components);

  Object.entries(components).forEach(([name, component]) => {
    if (!component) {
      return;
    }

    executeAdminComponentTest(name as AdminComponent, component);
  });
};
