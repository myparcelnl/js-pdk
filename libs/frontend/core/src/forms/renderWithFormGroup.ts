import {Component, h} from 'vue';
import {PdkComponentName} from '@myparcel-pdk/frontend-shared';
import {usePdkConfig} from '../composables';

export const renderWithFormGroup = (component: PdkComponentName): Component => {
  const config = usePdkConfig();

  if (!config?.components) {
    throw new Error(`Component config is invalid.`);
  }

  return h(config.components.PdkFormGroup, {component});
};
