import {type Component} from 'vue';
import {type AdminComponent} from '@myparcel-pdk/admin-common';
import {doComponentTestSetup} from '../index';
import {executeAdminComponentTest} from './executeAdminComponentTest';

export const executePdkComponentTests = (components: Partial<Record<AdminComponent, Component>>): void => {
  doComponentTestSetup();

  Object.entries(components).forEach(([name, component]) => {
    if (!component) {
      return;
    }

    executeAdminComponentTest(name as AdminComponent, component);
  });
};
